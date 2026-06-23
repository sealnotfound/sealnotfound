# Генерация картинок для статьи "Метод Монте-Карло в трейдинге"
# Тёмная тема под сайт: фон zinc-950 (#09090b), акцент amber (#f59e0b).
suppressWarnings(suppressMessages({
  if (!requireNamespace("ggplot2", quietly = TRUE))
    install.packages("ggplot2", repos = "https://cloud.r-project.org")
  library(ggplot2)
}))
set.seed(42)

OUT <- file.path("..", "public", "images")  # запускать из scripts/

# --- движок модели (как в ftmo_model.R) ---
sim_one <- function(p, b, max_days = 5000, keep_path = FALSE) {
  bal <- 0; max_eod <- 0; sum_pos <- 0; best_day <- 0
  path <- if (keep_path) numeric(max_days) else NULL
  for (d in seq_len(max_days)) {
    floor_lvl <- max(max_eod, 0) - 20
    if (runif(1) < p) day <- b
    else if (runif(1) < p) day <- b - 1
    else day <- -2
    bal <- bal + day
    if (keep_path) path[d] <- bal
    if (bal <= floor_lvl + 1e-9) return(list(res = "bust", days = d, path = if (keep_path) path[1:d] else NULL))
    if (day > 0) { sum_pos <- sum_pos + day; if (day > best_day) best_day <- day }
    if (bal > max_eod) max_eod <- bal
    if (bal >= 20 && best_day <= 0.5 * sum_pos + 1e-9)
      return(list(res = "pass", days = d, path = if (keep_path) path[1:d] else NULL))
  }
  list(res = "timeout", days = max_days, path = if (keep_path) path else NULL)
}
pass_rate <- function(p, b, N) { k <- 0; for (i in seq_len(N)) if (sim_one(p, b)$res == "pass") k <- k + 1; 100 * k / N }

# --- тёмная тема ---
dark <- theme_minimal(base_size = 14) + theme(
  plot.background  = element_rect(fill = "#09090b", color = NA),
  panel.background = element_rect(fill = "#09090b", color = NA),
  panel.grid       = element_line(color = "#27272a"),
  text             = element_text(color = "#e4e4e7"),
  axis.text        = element_text(color = "#a1a1aa"),
  plot.title       = element_text(color = "#fafafa", face = "bold"),
  plot.subtitle    = element_text(color = "#a1a1aa"),
  legend.key       = element_rect(fill = "#09090b", color = NA)
)
amber <- "#f59e0b"; green <- "#22c55e"; red <- "#ef4444"; violet <- "#a78bfa"

# =====================================================================
# 1) ХИТМАП: Pass% по сетке винрейт x R:R  ("таблица вероятностей")
# =====================================================================
N_heat <- 8000
ps <- seq(0.1, 0.8, 0.1); bs <- c(1.5, 2, 2.5, 3)
grid <- expand.grid(p = ps, b = bs)
grid$pass <- mapply(function(p, b) pass_rate(p, b, N_heat), grid$p, grid$b)

p_heat <- ggplot(grid, aes(factor(b), factor(p * 100), fill = pass)) +
  geom_tile(color = "#09090b", linewidth = 1.5) +
  geom_text(aes(label = sprintf("%.0f%%", pass)), color = "#0a0a0a", fontface = "bold", size = 4.5) +
  scale_fill_gradient2(low = "#7f1d1d", mid = amber, high = green, midpoint = 50,
                       limits = c(0, 100), name = "Pass %") +
  labs(title = "Вероятность пройти челлендж",
       subtitle = "Монте-Карло, 8000 прогонов на ячейку. Винрейт x R:R",
       x = "R:R", y = "Винрейт, %") + dark
ggsave(file.path(OUT, "monte-carlo-trading-heatmap.png"), p_heat, width = 8, height = 5, dpi = 130, bg = "#09090b")

# =====================================================================
# 2) Pass% по R:R при винрейте 50%
# =====================================================================
g1 <- subset(grid, p == 0.5)
p_pass <- ggplot(g1, aes(b, pass)) +
  geom_line(color = amber, linewidth = 1.2) +
  geom_point(color = amber, size = 3) +
  geom_text(aes(label = sprintf("%.1f%%", pass)), vjust = -1.2, color = "#e4e4e7", size = 4) +
  ylim(min(g1$pass) - 1, 101) +
  labs(title = "Вероятность прохождения по R:R (винрейт 50%)", x = "R:R", y = "Pass %") + dark
ggsave(file.path(OUT, "monte-carlo-trading-passrate.png"), p_pass, width = 8, height = 4.8, dpi = 130, bg = "#09090b")

# =====================================================================
# 3) Распределение дней до прохождения (50% / 1:2)
# =====================================================================
N_hist <- 20000; hd <- integer(0)
for (i in seq_len(N_hist)) { r <- sim_one(0.5, 2); if (r$res == "pass") hd <- c(hd, r$days) }
df_h <- data.frame(days = hd)
p_hist <- ggplot(df_h, aes(days)) +
  geom_histogram(binwidth = 2, fill = violet, color = "#09090b") +
  geom_vline(xintercept = median(hd), color = amber, linewidth = 1, linetype = "dashed") +
  annotate("text", x = median(hd), y = Inf, label = paste0("  медиана ", median(hd), " дн."),
           hjust = 0, vjust = 2, color = amber, fontface = "bold") +
  labs(title = "Сколько торговых дней до прохождения (винрейт 50%, R:R 1:2)",
       x = "Торговых дней", y = "Частота") + dark
ggsave(file.path(OUT, "monte-carlo-trading-days.png"), p_hist, width = 8, height = 4.8, dpi = 130, bg = "#09090b")

# =====================================================================
# 4) Кривые эквити (50% / 1:2) — hero
# =====================================================================
n_paths <- 60; lst <- list()
for (i in seq_len(n_paths)) {
  r <- sim_one(0.5, 2, keep_path = TRUE)
  lst[[i]] <- data.frame(day = seq_along(r$path), bal = r$path, id = i, res = r$res)
}
df_p <- do.call(rbind, lst)
p_eq <- ggplot(df_p, aes(day, bal, group = id, color = res)) +
  geom_line(alpha = 0.55, linewidth = 0.5) +
  geom_hline(yintercept = 20, color = green, linewidth = 1) +
  geom_hline(yintercept = -20, color = red, linewidth = 1) +
  scale_color_manual(values = c(pass = green, bust = red, timeout = "#71717a"), name = "Исход") +
  labs(title = "60 случайных прохождений челленджа (винрейт 50%, R:R 1:2)",
       subtitle = "Зелёная линия — таргет +20R, красная — стартовый трейлинг-флор -20R",
       x = "Торговый день", y = "Баланс, R") + dark
ggsave(file.path(OUT, "monte-carlo-trading-equity.png"), p_eq, width = 8, height = 5, dpi = 130, bg = "#09090b")

cat("OK: 4 PNG сохранены в", normalizePath(OUT), "\n")
