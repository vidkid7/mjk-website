'use client'
import Image from 'next/image'
import { useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { ArrowRight, Heart } from 'lucide-react'
import { useStoredData } from '@/lib/storage'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const campaignLinks = [
  { label: 'Support the Campaign', href: '#support' },
  { label: 'Volunteer', href: '#support' },
  { label: 'News & Updates', href: '#news' },
]

const socialUrl = (url: string | undefined, fallback: string, legacyFallback?: string) =>
  !url || url === legacyFallback ? fallback : url

const defaultSettings = {
  site_title: 'Mukesh Jung Khadka | Mayor Candidate',
  meta_description: 'Official website of Mukesh Jung Khadka — Entrepreneur, Social Worker, Youth Inspirator, and Mayor Candidate for Kathmandu.',
  phone: '+977 9851241656',
  email: 'khadkamukesh423@gmail.com',
  address: 'Ward No. 10, Kathmandu Metropolitan City, Bagmati Province, Nepal',
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
  const settings = { ...defaultSettings, ...storedSettings }
  const socialLinks = [
    { icon: FaLinkedin, url: socialUrl(settings.linkedin_url, defaultSettings.linkedin_url), color: 'hover:bg-blue-700 hover:border-blue-700' },
    { icon: FaFacebook, url: socialUrl(settings.facebook_url, defaultSettings.facebook_url, 'https://facebook.com/mjk'), color: 'hover:bg-blue-600 hover:border-blue-600' },
    { icon: FaTwitter, url: socialUrl(settings.twitter_url, defaultSettings.twitter_url, 'https://twitter.com/mjk'), color: 'hover:bg-sky-500 hover:border-sky-500' },
    { icon: FaInstagram, url: socialUrl(settings.instagram_url, defaultSettings.instagram_url, 'https://instagram.com/mjk'), color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500' },
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
    <footer className="bg-[#071224]">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-crimson via-gold to-[#003893]" />
      
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative h-11 w-24 shrink-0">
                <Image
                  src="/janaki-temple-logo.png"
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain object-center drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-playfair font-semibold text-white text-base leading-none">Mukesh Khadka</span>
                <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.34em] text-white/60">For Nepal</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              सँगै अगाडि बढौं — Moving Forward Together. Building a transparent, youth-driven, 
              and prosperous future for Nepal.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-300 ${social.color}`}
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-500 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Campaign */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Campaign</h4>
            <ul className="space-y-2.5">
              {campaignLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-500 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Subscribe to receive the latest campaign updates directly in your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email for newsletter"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/40 transition-all"
                required
              />
              <button type="submit" className="px-4 py-2.5 bg-crimson text-white rounded-lg font-bold text-sm hover:bg-crimson-dark hover:shadow-glow-crimson transition-all">
                {subscribed ? 'Subscribed ✓' : 'Join'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-crimson">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/80 text-xs text-center sm:text-left">
            © 2025 Mukesh Jung Khadka. All Rights Reserved.
          </p>
          <p className="text-white/80 text-xs inline-flex items-center gap-1">
            Made with <Heart size={10} className="text-white fill-white" /> for Nepal
          </p>
        </div>
      </div>
    </footer>
  )
}
