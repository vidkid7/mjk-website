'use client'
import { useState } from 'react'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaTiktok } from 'react-icons/fa'
import { ArrowRight, Heart } from 'lucide-react'

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

const socialLinks = [
  { icon: FaFacebook, url: '#', color: 'hover:bg-blue-600 hover:border-blue-600' },
  { icon: FaInstagram, url: '#', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500' },
  { icon: FaYoutube, url: '#', color: 'hover:bg-red-600 hover:border-red-600' },
  { icon: FaTwitter, url: '#', color: 'hover:bg-sky-500 hover:border-sky-500' },
  { icon: FaTiktok, url: '#', color: 'hover:bg-white hover:border-white' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

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
    <footer className="bg-slate-900">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-crimson via-gold to-blue-500" />
      
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center">
                <span className="font-bold text-white text-sm">M</span>
              </div>
              <span className="font-semibold text-white text-lg">MJK</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              सँगै अगाडि बढौं — Moving Forward Together. Building a transparent, youth-driven, 
              and prosperous future for Kathmandu.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-300 ${social.color}`}
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
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/40 transition-all"
                required
              />
              <button type="submit" className="px-4 py-2.5 bg-gradient-to-r from-crimson to-crimson-dark text-white rounded-xl font-medium text-sm hover:shadow-glow-crimson transition-all">
                {subscribed ? 'Subscribed ✓' : 'Join'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © 2025 Mukesh Jung Khadka. All Rights Reserved.
          </p>
          <p className="text-slate-600 text-xs inline-flex items-center gap-1">
            Made with <Heart size={10} className="text-crimson fill-crimson" /> for Nepal
          </p>
        </div>
      </div>
    </footer>
  )
}
