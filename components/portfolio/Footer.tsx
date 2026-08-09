import { ArrowUp } from 'lucide-react'
import { pfMeta } from '@/lib/portfolio-content'

const navigationLinks = [
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

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-ink/10 bg-paper">
      <div aria-hidden="true" className="neon-hairline absolute inset-x-0 top-0" />
      <div className="portfolio-container py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ember-500 to-rose-500 font-mono text-sm font-bold text-white shadow-lg shadow-ember-500/25 transition-transform duration-300 group-hover:scale-105">
            MK
          </span>
          <span className="font-fraunces text-lg font-semibold tracking-tight text-night-50">
            Mukesh<span className="text-ember-500">.</span>
          </span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2" aria-label="Social links">
            {pfMeta.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-night-400 transition-colors hover:text-ember-600"
            >
              {social.label}
            </a>
            ))}
            <a href="https://www.facebook.com/Nepali.man.67" target="_blank" rel="noreferrer" className="font-mono text-xs text-night-400 transition-colors hover:text-ember-600">
              Facebook
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <p className="text-sm text-night-400">
              © {year} {pfMeta.name}. Built with care in {pfMeta.location}.
            </p>
            <a
              href="#top"
              className="group grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-night-400 transition-all duration-300 hover:border-ember-500/50 hover:text-ember-600"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-2">
          <nav aria-label="Public navigation">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">Navigation</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {navigationLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-night-300 transition-colors hover:text-ember-600">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          <nav aria-label="Services">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">Services</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {serviceLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-night-300 transition-colors hover:text-ember-600">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}
