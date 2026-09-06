'use client'

import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { PublicSite, PublicUiCopy } from '@/lib/public-content'
import LanguageSwitch from '@/components/i18n/LanguageSwitch'
import { useLanguage } from '@/components/i18n/LanguageProvider'
import { translateKnown } from '@/lib/i18n-content'

const THEME_STORAGE_KEY = 'mukesh-portfolio-theme'
const COLOR_STORAGE_KEY = 'mukesh-portfolio-color'

type PortfolioTheme = 'light' | 'dark'

const sectionLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Field Files', href: '/#work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'History', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

const pageLinks = [
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact' },
]

const sectionIds = sectionLinks.map((l) => {
  // Convert "/#about" → "about", "#about" → "about"
  const hash = l.href.split('#')[1] ?? l.href.slice(1)
  return hash
})

const COLOR_THEMES = [
  { id: 'red', color: '#c9342e', label: 'Red' },
  { id: 'orange', color: '#e07a1a', label: 'Orange' },
  { id: 'blue', color: '#2563eb', label: 'Blue' },
  { id: 'green', color: '#16a34a', label: 'Green' },
  { id: 'navy', color: '#1e3a8a', label: 'Navy' },
] as const

type ColorThemeId = (typeof COLOR_THEMES)[number]['id']

function applyTheme(theme: PortfolioTheme) {
  document.documentElement.dataset.portfolioTheme = theme
  document.querySelector<HTMLElement>('.gateway-shell')?.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
  document.querySelector<HTMLMetaElement>("meta[name='theme-color']")?.setAttribute('content', theme === 'dark' ? '#080808' : '#FAF5ED')
}

function applyColor(id: ColorThemeId) {
  document.documentElement.dataset.portfolioColor = id
  document.querySelector<HTMLElement>('.gateway-shell')?.setAttribute('data-portfolio-color', id)
  document.querySelector<HTMLElement>('.public-route-shell')?.setAttribute('data-portfolio-color', id)
  document.querySelector<HTMLElement>('.not-found-shell')?.setAttribute('data-portfolio-color', id)
}

export type SignalRailProps = {
  site?: PublicSite
  /**
   * When set, shows the page-context field label in the centre of the rail (used on public-route pages).
   * When omitted, falls back to the homepage behaviour: an IntersectionObserver that highlights the
   * currently-scrolled section and shows the desktop nav links to anchors.
   */
  context?: string
  detail?: string
  /**
   * Optional override for the desktop anchor links. When provided, replaces the default 4-link set
   * (typically for routes that do not have those anchors).
   */
  desktopLinks?: Array<{ label: string; href: string }>
  navigation?: PublicUiCopy['navigation']
}

export default function SignalRail({ context, desktopLinks, site, navigation }: SignalRailProps) {
  const pathname = usePathname()
  const { locale } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState<PortfolioTheme>('light')
  const [colorTheme, setColorTheme] = useState<ColorThemeId>('red')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
      const nextTheme: PortfolioTheme = stored === 'dark' ? 'dark' : 'light'
      setTheme(nextTheme)
      applyTheme(nextTheme)
    } catch {
      applyTheme('light')
    }

    try {
      const storedColor = window.localStorage.getItem(COLOR_STORAGE_KEY) as ColorThemeId | null
      const validColor = COLOR_THEMES.find((t) => t.id === storedColor)
      const nextColor: ColorThemeId = validColor ? validColor.id : 'red'
      setColorTheme(nextColor)
      applyColor(nextColor)
    } catch {
      applyColor('red')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme: PortfolioTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    applyTheme(nextTheme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // Keep the in-memory switch working when storage is unavailable.
    }
  }

  const setColor = (id: ColorThemeId) => {
    setColorTheme(id)
    applyColor(id)
    try {
      window.localStorage.setItem(COLOR_STORAGE_KEY, id)
    } catch {
      // Keep the in-memory switch working when storage is unavailable.
    }
  }

  useEffect(() => {
    if (context) return // Anchor tracking only makes sense on the homepage
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [context])

  const sections = navigation?.sectionLinks?.length ? navigation.sectionLinks : sectionLinks
  const pages = navigation?.pageLinks?.length ? navigation.pageLinks : pageLinks
  const primaryLinks = desktopLinks ?? sections.slice(0, 4)
  const localizedName = translateKnown('Mukesh Khadka', locale)
  const localizedFirstName = translateKnown('MUKESH', locale)
  const localizedLastName = translateKnown('KHADKA', locale)

  return (
    <header className={`signal-rail fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'signal-rail--scrolled' : ''}`}>
      <nav className="signal-rail__nav portfolio-container">
        <a href="/" className="signal-rail__brand" aria-label={`${localizedName} — home`}>
          <span className="signal-rail__mark"><img src="/heritage-mark-v2.webp" alt="" width={64} height={64} /></span>
          <span className="signal-rail__name">{localizedFirstName}<span>.</span></span>
        </a>

        <div className="signal-rail__desktop-links hidden lg:flex" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.slice(1) ? 'is-active' : ''}
            >
              {link.label}
            </a>
          ))}
          {pages.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`signal-rail__page-link${pathname?.startsWith(link.href) ? ' is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="signal-rail__tools">
          <LanguageSwitch />
          <div className="signal-rail__color-picker" role="group" aria-label="Theme color">
            {COLOR_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setColor(t.id)}
                className={`signal-rail__color-swatch portfolio-color-swatch${colorTheme === t.id ? ' is-active' : ''}`}
                style={{ ['--swatch-color' as string]: t.color } as React.CSSProperties}
                aria-label={`Switch to ${t.label} theme`}
                aria-pressed={colorTheme === t.id}
                title={t.label}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="signal-rail__theme-toggle portfolio-theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'light' ? <Moon className="h-3.5 w-3.5" aria-hidden="true" /> : <Sun className="h-3.5 w-3.5" aria-hidden="true" />}
            <span>{theme === 'light' ? 'DARK' : 'LIGHT'}</span>
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="signal-rail__menu-button md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span>{open ? 'CLOSE' : 'INDEX'}</span>
            <i className={open ? 'is-open' : ''} />
          </button>
        </div>
      </nav>

      <div className="signal-rail__side-label" aria-hidden="true">MK / {localizedLastName}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="signal-rail__menu-panel"
          >
            <div className="portfolio-container signal-rail__menu-inner">
              <div>
                <span className="signal-rail__panel-kicker">{navigation?.menuKicker || 'NAVIGATION / OPEN CHANNEL'}</span>
                <p>{navigation?.menuDescription || 'Move through the work, the tools, and the thinking behind the systems.'}</p>
              </div>
              <div className="signal-rail__menu-links">
                {sections.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <span>0{i + 1}</span>{link.label}
                  </motion.a>
                ))}
                {pages.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="signal-rail__menu-link-page"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sections.length + i) * 0.04 }}
                  >
                    <span>0{sectionLinks.length + i + 1}</span>{link.label}
                  </motion.a>
                ))}
              </div>
              <div className="signal-rail__menu-footer">
                <span>{site?.location}</span>
                <a href={`mailto:${site?.email}`}>{site?.email}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
