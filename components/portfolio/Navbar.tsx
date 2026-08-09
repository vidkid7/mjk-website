'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import FieldLabel from '@/components/portfolio/FieldLabel'
import { pfMeta } from '@/lib/portfolio-content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Field Files', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'History', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = links.map((l) => l.href.slice(1))

export default function PortfolioNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
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
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="portfolio-container flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Mukesh Khadka — home">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl font-mono text-sm font-bold text-white shadow-lg shadow-ember-500/30 transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 bg-gradient-to-br from-ember-500 to-rose-500" />
            <span className="absolute inset-0 animate-glow-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_55%)]" />
            <span className="relative z-10">MK</span>
          </span>
          <span className="font-fraunces text-lg font-semibold tracking-tight text-night-50">
            Mukesh<span className="text-ember-500">.</span>
          </span>
        </a>

        <div className="hidden lg:block">
          <FieldLabel label="Field Notes" detail="Portfolio index" />
        </div>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-sm font-medium transition-colors ${
                active === link.href.slice(1)
                  ? 'text-ember-700'
                  : 'text-night-300 hover:text-ink'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-ember-500 to-rose-500 transition-all duration-300 ${
                  active === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
          <a
            href="#contact"
            className="sheen group relative overflow-hidden rounded-full bg-gradient-to-r from-ember-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ember-500/25 transition-transform duration-200 hover:scale-[1.03] hover:shadow-ember-500/40"
          >
            <span className="relative z-10">Let&apos;s talk</span>
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="relative h-4 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      <noscript>
        <div className="border-t border-ink/10 bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-ink/5 py-4 text-base font-medium text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </noscript>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink/10 bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <div className="px-6 py-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-ink/5 py-4 text-base font-medium text-ink"
                >
                  {link.label}
                  <span className="font-mono text-xs text-ember-600">0{i + 1}</span>
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-5 block rounded-xl bg-gradient-to-r from-ember-500 to-rose-500 px-4 py-3 text-center font-semibold text-white shadow-lg shadow-ember-500/25"
              >
                Let&apos;s talk
              </a>
              <p className="mt-5 text-center text-xs text-night-400">{pfMeta.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
