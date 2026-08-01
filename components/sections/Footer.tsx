'use client'
import Image from 'next/image'
import { useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { ArrowRight, Code2 } from 'lucide-react'
import { useStoredData } from '@/lib/storage'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Solutions', href: '#initiatives' },
  { label: 'Portfolio', href: '#client-portfolio' },
  { label: 'Insights', href: '#insights' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  { label: 'Custom Software', href: '/services/custom-software-development-nepal' },
  { label: 'Web Development', href: '/services/web-development-nepal' },
  { label: 'Business Automation', href: '/services/business-automation-nepal' },
  { label: 'All Services', href: '/services' },
]

const socialUrl = (url: string | undefined, fallback: string, legacyFallback?: string) =>
  !url || url === legacyFallback ? fallback : url

const defaultSettings = {
  site_title: 'Mukesh Khadka | Digital Systems Portfolio',
  meta_description: 'Digital portfolio of Mukesh Khadka — software systems, web platforms, automation, and digital transformation work.',
  phone: '+977 985-1241656',
  email: 'khadkamukesh423@gmail.com',
  address: 'Kathmandu, Bagmati Province, Nepal',
  linkedin_url: 'https://www.linkedin.com/in/mukesh-khadka-960401324/',
  facebook_url: 'https://www.facebook.com/Nepali.man.67',
  instagram_url: 'https://www.instagram.com/khadka3546?utm_source=qr',
  youtube_url: '',
  twitter_url: 'https://x.com/khadkamukesh422?s=11',
  tiktok_url: '',
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const storedSettings = useStoredData('settings', defaultSettings)
  const settings = {
    ...defaultSettings,
    ...storedSettings,
    phone: defaultSettings.phone,
    email: defaultSettings.email,
  }
  const socialLinks = [
    { icon: FaLinkedin, url: socialUrl(settings.linkedin_url, defaultSettings.linkedin_url), color: 'hover:bg-blue-700 hover:border-blue-700' },
    { icon: FaFacebook, url: socialUrl(settings.facebook_url, defaultSettings.facebook_url, 'https://facebook.com/mjk'), color: 'hover:bg-blue-600 hover:border-blue-600' },
    { icon: FaTwitter, url: socialUrl(settings.twitter_url, defaultSettings.twitter_url, 'https://twitter.com/mjk'), color: 'hover:bg-sky-500 hover:border-sky-500' },
    { icon: FaInstagram, url: socialUrl(settings.instagram_url, defaultSettings.instagram_url, 'https://instagram.com/mjk'), color: 'hover:bg-pink-600 hover:border-pink-600' },
  ].filter(social => Boolean(social.url))

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const stored = localStorage.getItem('mjk_newsletter')
      const emails: string[] = stored ? JSON.parse(stored) : []
      if (!emails.includes(email)) {
        emails.push(email)
        localStorage.setItem('mjk_newsletter', JSON.stringify(emails))
      }
      setEmail('')
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
    } catch {
      // silently fail
    }
  }

  return (
    <footer className="relative public-section public-section--light">
      <div className="h-1 bg-gradient-to-r from-crimson via-[#003893] to-gold" />

      <div className="glass-panel mx-auto max-w-6xl rounded-none border-x-0 border-b-0 px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="relative h-11 w-24 shrink-0">
                <Image src="/janaki-temple-logo.webp" alt="Mukesh Khadka" fill sizes="96px" className="object-contain object-center drop-shadow-sm" />
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-playfair text-base font-semibold leading-none text-[#071a35]">Mukesh Khadka</span>
                <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.34em] text-slate-500">Digital Systems</span>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-slate-600">
              A professional digital portfolio focused on software systems, web platforms, automation, and practical technology solutions.
            </p>
            <div className="mb-5 space-y-1 text-sm text-slate-600">
              <p>{settings.phone}</p>
              <p>{settings.email}</p>
            </div>
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} className={`glass-inset flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:text-[#071a35] ${social.color}`}>
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#071a35]">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="group inline-flex items-center gap-1 text-sm text-slate-600 transition-all hover:translate-x-1 hover:text-crimson">
                    <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#071a35]">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="group inline-flex items-center gap-1 text-sm text-slate-600 transition-all hover:translate-x-1 hover:text-crimson">
                    <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-[#071a35]">Stay Updated</h4>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">Subscribe for software, design, automation, and project updates.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input type="email" placeholder="Your email" aria-label="Email for newsletter" value={email} onChange={e => setEmail(e.target.value)} className="glass-inset flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#071a35] placeholder:text-slate-400 transition-all focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/50" required />
              <button type="submit" className="glass-action rounded-lg border border-crimson/30 bg-crimson px-4 py-2.5 text-sm font-bold text-white transition-all hover:border-gold/70 hover:bg-crimson-dark">{subscribed ? 'Done ✓' : 'Join'}</button>
            </form>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-none border-x-0 border-b-0 border-t border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-4 sm:flex-row sm:px-8">
          <p className="text-center text-xs text-slate-500 sm:text-left">© 2026 Mukesh Khadka. All Rights Reserved.</p>
          <p className="inline-flex items-center gap-1 text-xs text-slate-500">Built with <Code2 size={10} className="text-gold" /> practical digital thinking</p>
        </div>
      </div>
    </footer>
  )
}
