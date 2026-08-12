import type { Locale } from '@/lib/i18n'

export type LocalizedTranslations = Record<string, Partial<Record<Locale, unknown>>>

export function isLocalizedValue(value: unknown): value is LocalizedTranslations {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

function usable(value: unknown): value is string | string[] | Record<string, unknown> {
  return typeof value === 'string' || Array.isArray(value) || Boolean(value && typeof value === 'object')
}

export function resolveLocalizedValue<T>(englishValue: T, translations: unknown, field: string, locale: Locale): T {
  if (locale === 'en' || !isLocalizedValue(translations)) return englishValue
  const localized = translations[field]?.[locale]
  return usable(localized) ? localized as T : englishValue
}

export function resolveLocalizedArray<T>(englishValue: T[], translations: unknown, field: string, locale: Locale): T[] {
  const value = resolveLocalizedValue(englishValue, translations, field, locale)
  return Array.isArray(value) ? value as T[] : englishValue
}
