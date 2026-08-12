'use client'

import { useLanguage } from './LanguageProvider'
import type { Locale } from '@/lib/i18n'

const options: Array<{ locale: Locale; label: string }> = [
  { locale: 'en', label: 'EN' },
  { locale: 'ne', label: 'नेपाली' },
]

export default function LanguageSwitch() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="language-switch" role="group" aria-label="Language">
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          className={locale === option.locale ? 'is-active' : ''}
          aria-label={`Switch to ${option.label}`}
          aria-pressed={locale === option.locale}
          onClick={() => setLocale(option.locale)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
