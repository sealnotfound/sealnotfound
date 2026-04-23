# Sealnotfound Personal Website — контекст

## Суть проекта
Личный сайт-блог для трейдинговых статей. Публичный, под ником Sealnotfound.

## Стек
- **Astro** — фреймворк (content-first, Markdown из коробки)
- **Tailwind CSS** + `@tailwindcss/typography` — стилизация
- **TypeScript** — типизация

## Дизайн
Тёмная тема (zinc-950 фон), акцентный цвет — amber (#f59e0b). Минималистичный, без лишнего.

## Структура проекта
```
sealnotfound-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts          ← схема статей (title, description, pubDate, tags, draft)
│   │   └── blog/
│   │       └── *.md           ← статьи в Markdown
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── index.astro        ← главная (последние 5 статей)
│   │   └── blog/
│   │       ├── index.astro    ← список всех статей
│   │       └── [...slug].astro ← динамический роутинг статей
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## Как добавить статью
Создать файл `src/content/blog/название-статьи.md` с frontmatter:
```md
---
title: "Заголовок"
description: "Краткое описание"
pubDate: 2026-04-22
tags: ["vwap", "es"]
---

Текст статьи в Markdown...
```

## Запуск локально
```bash
cd trading/sealnotfound-website
npm install
npm run dev
```
Открыть: http://localhost:4321

## Деплой (планируется)
Домен есть. Хостинг не выбран. Варианты: Vercel, Netlify, Cloudflare Pages.

## Статус
**Создан:** 2026-04-22
**Хостинг:** локально (деплой отложен)
