export type Locale = 'en' | 'ne'

export const DEFAULT_LOCALE: Locale = 'en'
export const LANGUAGE_STORAGE_KEY = 'mukesh-portfolio-language'
export const LANGUAGE_COOKIE_KEY = 'mukesh-portfolio-language'
export const LANGUAGE_SCROLL_KEY = 'mukesh-portfolio-language-scroll'

export function normalizeLocale(value: unknown): Locale {
  return value === 'ne' ? 'ne' : DEFAULT_LOCALE
}
