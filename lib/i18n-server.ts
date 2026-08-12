import { cookies } from 'next/headers'
import { LANGUAGE_COOKIE_KEY, normalizeLocale, type Locale } from '@/lib/i18n'

export function getRequestLocale(): Locale {
  return normalizeLocale(cookies().get(LANGUAGE_COOKIE_KEY)?.value)
}
