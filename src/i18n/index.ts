export const languages = {
  ru: 'Русский',
  en: 'English',
  uk: 'Українська',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  ru: {
    'nav.home': 'Главная',
    'nav.articles': 'Статьи',
    'nav.search': 'Поиск',
    'home.bio': 'Дей-трейдер. Пишу о фьючерсных рынках, геополитике и том, что реально работает.',
    'home.coming_soon': 'Скоро',
    'home.recent': 'Последние статьи',
    'home.all': 'Все статьи →',
    'blog.title': 'Статьи',
    'blog.empty': 'Статей пока нет.',
    'blog.all': 'Все',
    'search.title': 'Поиск',
    'search.placeholder': 'Поиск статей...',
    'search.empty': 'Статьи не найдены.',
    'search.total': '{n} статей всего',
    'search.filtered': '{n} из {total} статей',
    'post.older': '← Старше',
    'post.newer': 'Новее →',
    'post.back': '← Все статьи',
    'tag.back': '← Все статьи',
    'tag.articles': 'статья',
  },
  en: {
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.search': 'Search',
    'home.bio': 'Day trader. Writing about futures markets, geopolitics, and what actually works.',
    'home.coming_soon': 'Coming soon',
    'home.recent': 'Recent articles',
    'home.all': 'All articles →',
    'blog.title': 'Articles',
    'blog.empty': 'No articles yet.',
    'blog.all': 'All',
    'search.title': 'Search',
    'search.placeholder': 'Search articles...',
    'search.empty': 'No articles found.',
    'search.total': '{n} articles total',
    'search.filtered': '{n} of {total} articles',
    'post.older': '← Older',
    'post.newer': 'Newer →',
    'post.back': '← All articles',
    'tag.back': '← All articles',
    'tag.articles': 'article',
  },
  uk: {
    'nav.home': 'Головна',
    'nav.articles': 'Статті',
    'nav.search': 'Пошук',
    'home.bio': 'Дей-трейдер. Пишу про ф\'ючерсні ринки, геополітику та те, що реально працює.',
    'home.coming_soon': 'Незабаром',
    'home.recent': 'Останні статті',
    'home.all': 'Всі статті →',
    'blog.title': 'Статті',
    'blog.empty': 'Статей поки немає.',
    'blog.all': 'Всі',
    'search.title': 'Пошук',
    'search.placeholder': 'Пошук статей...',
    'search.empty': 'Статей не знайдено.',
    'search.total': '{n} статей загалом',
    'search.filtered': '{n} з {total} статей',
    'post.older': '← Старіше',
    'post.newer': 'Новіше →',
    'post.back': '← Всі статті',
    'tag.back': '← Всі статті',
    'tag.articles': 'стаття',
  },
  de: {
    'nav.home': 'Start',
    'nav.articles': 'Artikel',
    'nav.search': 'Suche',
    'home.bio': 'Day Trader. Ich schreibe über Futures-Märkte, Geopolitik und was wirklich funktioniert.',
    'home.coming_soon': 'Demnächst',
    'home.recent': 'Neueste Artikel',
    'home.all': 'Alle Artikel →',
    'blog.title': 'Artikel',
    'blog.empty': 'Noch keine Artikel.',
    'blog.all': 'Alle',
    'search.title': 'Suche',
    'search.placeholder': 'Artikel suchen...',
    'search.empty': 'Keine Artikel gefunden.',
    'search.total': '{n} Artikel gesamt',
    'search.filtered': '{n} von {total} Artikeln',
    'post.older': '← Älter',
    'post.newer': 'Neuer →',
    'post.back': '← Alle Artikel',
    'tag.back': '← Alle Artikel',
    'tag.articles': 'Artikel',
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang], vars?: Record<string, number | string>): string {
    const dict = ui[lang] ?? ui[defaultLang];
    const str = (dict as any)[key] ?? (ui[defaultLang] as any)[key] ?? key;
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, (_: string, k: string) => String(vars[k] ?? ''));
  };
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}


export const langFlags: Record<Lang, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
  uk: '🇺🇦',
  de: '🇩🇪',
};
