'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_SCROLL_KEY,
  LANGUAGE_STORAGE_KEY,
  normalizeLocale,
  type Locale,
} from '@/lib/i18n'
import { translateKnown } from '@/lib/i18n-content'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const TRANSLATABLE_ATTRIBUTES = ['aria-label', 'title', 'placeholder', 'alt'] as const

function translateDom(root: ParentNode, locale: Locale) {
  if (locale !== 'ne') return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let current = walker.nextNode()
  while (current) {
    textNodes.push(current as Text)
    current = walker.nextNode()
  }

  for (const node of textNodes) {
    const parent = node.parentElement
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(parent.tagName)) continue
    const value = node.nodeValue || ''
    const trimmed = value.trim()
    if (!trimmed) continue
    const translated = translateKnown(trimmed, locale)
    if (translated !== trimmed) {
      node.nodeValue = value.replace(trimmed, translated)
    }
  }

  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll('*'))] : Array.from(root.querySelectorAll('*'))
  for (const element of elements) {
    for (const attribute of TRANSLATABLE_ATTRIBUTES) {
      const value = element.getAttribute(attribute)
      if (!value) continue
      const translated = translateKnown(value, locale)
      if (translated !== value) element.setAttribute(attribute, translated)
    }
  }
}

export function LanguageProvider({ children, initialLocale = DEFAULT_LOCALE }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    const stored = normalizeLocale(window.localStorage.getItem(LANGUAGE_STORAGE_KEY))
    setLocaleState(stored)
    document.documentElement.lang = stored
    translateDom(document.body, stored)

    const observer = new MutationObserver((mutations) => {
      if (stored !== 'ne') return
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) translateDom(node as Element, stored)
          })
        } else if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          translateDom(mutation.target, stored)
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: [...TRANSLATABLE_ATTRIBUTES] })

    const savedScroll = window.sessionStorage.getItem(LANGUAGE_SCROLL_KEY)
    if (savedScroll) {
      window.sessionStorage.removeItem(LANGUAGE_SCROLL_KEY)
      window.requestAnimationFrame(() => window.scrollTo({ top: Number(savedScroll), behavior: 'auto' }))
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (nextLocale: Locale) => {
    const next = normalizeLocale(nextLocale)
    setLocaleState(next)
    document.documentElement.lang = next
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
      window.sessionStorage.setItem(LANGUAGE_SCROLL_KEY, String(window.scrollY))
    } catch {
      // Keep the in-memory switch working when storage is unavailable.
    }
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`
    window.location.reload()
  }

  const value = useMemo(() => ({ locale, setLocale }), [locale])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used within LanguageProvider')
  return value
}
