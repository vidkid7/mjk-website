'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
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
        className={`fixed left-0 right-0 top-0 z-50 border-b border-slate-200/60 bg-white/95 text-[#0b2b55] shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-2.5 lg:py-3'
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-4 sm:px-7 lg:px-10 xl:px-12">
          {/* Logo */}
          <a href="#home" className="group flex shrink-0 items-center gap-2.5 sm:gap-3">
            <div className="relative h-10 w-20 shrink-0 sm:h-12 sm:w-24">
              <Image
                src="/janaki-temple-logo.png"
                alt=""
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
              <span className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.4em] text-[#12375f]/70 sm:text-[9px]">
                For Nepal
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 xl:flex xl:gap-11">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  href={link.href}
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

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#support"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden items-center gap-3 rounded-md bg-crimson px-5 py-3 text-xs font-extrabold uppercase tracking-[0.15em] text-white shadow-lg shadow-crimson/20 transition-all duration-300 hover:bg-crimson-dark hover:shadow-crimson/30 md:inline-flex xl:px-7"
            >
              <Heart size={16} className="text-white" />
              Support
            </motion.a>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/[0.98] backdrop-blur-2xl flex flex-col xl:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-20 shrink-0">
                  <Image
                    src="/janaki-temple-logo.png"
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain object-center drop-shadow-sm"
                  />
                </div>
                <div>
                  <span className="font-playfair text-base font-bold text-slate-900 block leading-none whitespace-nowrap">Mukesh Khadka</span>
                  <span className="text-[9px] text-crimson/60 font-medium uppercase tracking-[0.28em]">For Nepal</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-start px-6 py-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-slate-600 font-semibold py-3 hover:text-crimson transition-colors w-full flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson/30" />
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="px-6 pb-8">
              <a
                href="#support"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-crimson text-white font-bold uppercase tracking-[0.14em] shadow-lg shadow-crimson/20 transition-all"
              >
                <Heart size={14} />
                Support the Campaign
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
