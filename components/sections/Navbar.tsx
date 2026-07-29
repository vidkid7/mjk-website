'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Solutions', href: '#initiatives' },
  { label: 'Portfolio', href: '#client-portfolio' },
  { label: 'Insights', href: '#insights' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks
        .filter(l => l.href.startsWith('#'))
        .map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`glass-panel fixed left-0 right-0 top-0 z-50 border-x-0 border-t-0 border-white/70 bg-white/80 text-[#0b2b55] shadow-sm shadow-slate-900/[0.03] transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-2.5 lg:py-3'
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-4 sm:px-7 lg:px-10 xl:px-12">
          <a href="/#home" className="group flex shrink-0 items-center gap-2.5 sm:gap-3">
            <div className="relative h-10 w-20 shrink-0 sm:h-12 sm:w-24">
              <Image
                src="/janaki-temple-logo.webp"
                alt="Mukesh Khadka"
                fill
                priority
                sizes="(min-width: 640px) 96px, 80px"
                className="object-contain object-center drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-playfair text-lg font-extrabold leading-none tracking-tight text-[#12375f] sm:text-xl xl:text-2xl">
                Mukesh Khadka
              </span>
              <span className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.36em] text-[#12375f]/70 sm:text-[9px]">
                Digital Systems
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-6 xl:flex xl:gap-8">
            {navLinks.map((link, i) => {
              const isHash = link.href.startsWith('#')
              const isActive = isHash && activeSection === link.href.replace('#', '')
              return (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  href={isHash ? link.href : link.href}
                  className={`relative py-2 text-base font-bold tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-crimson' : 'text-[#0b2b55] hover:text-crimson'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-crimson"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="glass-action hidden rounded-full border border-crimson/25 px-5 py-2.5 text-sm font-bold text-[#0b2b55] transition hover:border-gold/70 hover:bg-crimson hover:text-white md:inline-flex">
              Start Project
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-[#0b2b55] transition-all duration-300 hover:bg-slate-100 xl:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass glass-dark fixed inset-0 z-40 flex flex-col border-0 bg-[#071a35]/[0.96] text-white backdrop-blur-2xl xl:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-20 shrink-0">
                  <Image
                    src="/janaki-temple-logo.webp"
                    alt="Mukesh Khadka"
                    fill
                    sizes="80px"
                    className="object-contain object-center drop-shadow-sm"
                  />
                </div>
                <div>
                  <span className="block whitespace-nowrap font-playfair text-base font-bold leading-none text-white">Mukesh Khadka</span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-gold">Digital Systems</span>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="rounded-xl p-2.5 text-white/70 hover:bg-white/10 hover:text-white">
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-start gap-1 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center gap-3 py-3 text-lg font-semibold text-white/80 transition-colors hover:text-gold"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson/80" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
