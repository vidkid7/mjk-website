'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Sparkles } from 'lucide-react'

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-slate-900/5 border-b border-slate-200/50 py-2.5'
            : 'bg-slate-900/20 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-crimson via-crimson-dark to-red-800 flex items-center justify-center shadow-lg shadow-crimson/25"
            >
              <span className="font-bold text-white text-sm tracking-tight">M</span>
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </motion.div>
            <div className="flex flex-col">
              <span className={`font-bold text-base leading-none tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}>
                MJK
              </span>
              <span className={`text-[9px] font-medium uppercase tracking-[0.15em] mt-0.5 transition-colors duration-300 ${
                scrolled ? 'text-crimson/70' : 'text-white/40'
              }`}>
                For Kathmandu
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-300 ${
            scrolled ? 'bg-slate-100/60' : 'bg-white/[0.06]'
          }`}>
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-xl ${
                    isActive
                      ? scrolled
                        ? 'text-crimson bg-white shadow-sm'
                        : 'text-white bg-white/15'
                      : scrolled
                        ? 'text-slate-500 hover:text-slate-900 hover:bg-white/80'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${
                        scrolled ? 'bg-crimson' : 'bg-white'
                      }`}
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
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                scrolled
                  ? 'bg-gradient-to-r from-crimson to-crimson-dark text-white shadow-lg shadow-crimson/20 hover:shadow-crimson/30'
                  : 'bg-white/10 text-white border border-white/15 hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Heart size={13} className={scrolled ? 'text-white' : 'text-crimson-50'} />
              Support
            </motion.a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
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
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center shadow-lg shadow-crimson/20">
                  <span className="font-bold text-white text-sm">M</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block leading-none">MJK</span>
                  <span className="text-[9px] text-crimson/60 font-medium uppercase tracking-wider">For Kathmandu</span>
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
                  className="text-lg text-slate-600 font-medium py-3 hover:text-crimson transition-colors w-full flex items-center gap-3"
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
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-crimson to-crimson-dark text-white font-medium rounded-xl shadow-lg shadow-crimson/20 transition-all"
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
