import { ArrowUp, ArrowUpRight } from 'lucide-react'
import type { PublicSite } from '@/lib/public-content'

type PublicImprintProps = {
  /**
   * Context label that appears in the masthead (e.g. "Field Notes", "Services", "Contact").
   * Lets the footer speak to the page the visitor is reading.
   */
  context: string
  site?: PublicSite
  /**
   * Tagline shown next to the context. Short subtitle for the imprint.
   */
  tagline?: string
}

const navigationLinks = [
  { label: 'Home', code: 'A-01', href: '/#about' },
  { label: 'Field Files', code: 'A-02', href: '/#work' },
  { label: 'Skills', code: 'A-03', href: '/#skills' },
  { label: 'History', code: 'A-04', href: '/#experience' },
  { label: 'Reports', code: 'A-05', href: '/#testimonials' },
  { label: 'Articles', code: 'A-06', href: '/articles' },
  { label: 'Contact', code: 'A-07', href: '/contact' },
]

const serviceLinks = [
  { label: 'Custom Software', code: 'S-01', href: '/services/custom-software-development-nepal' },
  { label: 'Web Development', code: 'S-02', href: '/services/web-development-nepal' },
  { label: 'Business Automation', code: 'S-03', href: '/services/business-automation-nepal' },
  { label: 'Service Index', code: 'S-04', href: '/services' },
]

export default function PublicImprint({ context, tagline, site }: PublicImprintProps) {
  const year = new Date().getFullYear()
  const buildId = `${year}.${String(new Date().getMonth() + 1).padStart(2, '0')}`
  const publicSite = site ?? { name: '', role: '', tagline: '', location: '', email: '', phone: '', availability: '', availabilityHref: '', siteTitle: '', metaDescription: '', socials: [], visibleSections: {} }
  const localizedName = publicSite.name || 'Mukesh Khadka'
  const localizedFirstName = localizedName.split(/\s+/)[0]
  const studioNotes = [
    { label: 'Studio', value: publicSite.availability },
    { label: 'Standing', value: publicSite.role },
    { label: 'Region', value: publicSite.location },
    { label: 'Channel', value: publicSite.email },
  ]

  return (
    <footer className="imprint imprint--public relative border-t border-ink/10">
      <div aria-hidden="true" className="imprint__hairline" />
      <div className="portfolio-container imprint__container">
        <header className="imprint__header">
          <div className="imprint__brand">
            <a href="/#top" className="imprint__mark" aria-label={`${localizedName} — home`}>
              <span className="imprint__mark-mark" aria-hidden="true" />
              <span className="imprint__mark-text">MK</span>
            </a>
            <div className="imprint__brand-copy">
              <span className="imprint__brand-eyebrow">Imprint · {context}</span>
              <h2 className="imprint__brand-name">
                {localizedFirstName}<span className="imprint__brand-dot">.</span>
              </h2>
              {tagline ? (
                <span className="imprint__brand-tagline">{tagline}</span>
              ) : (
                <span className="imprint__brand-tagline">{publicSite.tagline}</span>
              )}
            </div>
          </div>
          <div className="imprint__status">
            <span className="imprint__status-pulse" aria-hidden="true" />
            <span className="imprint__status-text">
              <strong>Studio live</strong>
              <span>Compiler · {buildId}</span>
            </span>
          </div>
          <a href="/#top" className="imprint__top" aria-label="Back to top">
            <span className="imprint__top-label">Back to top</span>
            <span className="imprint__top-arrow" aria-hidden="true">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </header>

        <div className="imprint__grid">
          <section className="imprint__column" aria-label="Site navigation">
            <header className="imprint__column-head">
              <span className="imprint__column-index">A</span>
              <span className="imprint__column-title">Navigation</span>
              <span className="imprint__column-rule" aria-hidden="true" />
            </header>
            <ol className="imprint__list">
              {navigationLinks.map((link) => (
                <li key={link.href} className="imprint__list-item">
                  <a href={link.href} className="imprint__link">
                    <span className="imprint__link-code">{link.code}</span>
                    <span className="imprint__link-label">{link.label}</span>
                    <span className="imprint__link-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section className="imprint__column" aria-label="Services">
            <header className="imprint__column-head">
              <span className="imprint__column-index">B</span>
              <span className="imprint__column-title">Services</span>
              <span className="imprint__column-rule" aria-hidden="true" />
            </header>
            <ol className="imprint__list">
              {serviceLinks.map((link) => (
                <li key={link.href} className="imprint__list-item">
                  <a href={link.href} className="imprint__link">
                    <span className="imprint__link-code">{link.code}</span>
                    <span className="imprint__link-label">{link.label}</span>
                    <span className="imprint__link-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section className="imprint__column" aria-label="Studio notes">
            <header className="imprint__column-head">
              <span className="imprint__column-index">C</span>
              <span className="imprint__column-title">Studio</span>
              <span className="imprint__column-rule" aria-hidden="true" />
            </header>
            <dl className="imprint__notes">
              {studioNotes.map((note) => (
                <div key={note.label} className="imprint__note">
                  <dt>{note.label}</dt>
                  <dd>{note.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section className="imprint__wires" aria-label="Outbound social links">
          <span className="imprint__wires-label">Wires · outbound</span>
          <span className="imprint__wires-rule" aria-hidden="true" />
          <ul className="imprint__wires-list">
            {publicSite.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer" className="imprint__wire">
                  <span className="imprint__wire-bullet" aria-hidden="true" />
                  <span>{social.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="imprint__footer">
          <span className="imprint__footer-fact">
            © {year} {publicSite.name}. Built with care in {publicSite.location}.
          </span>
          <span className="imprint__footer-rule" aria-hidden="true" />
          <span className="imprint__footer-fact">
            <span className="imprint__footer-mark">SHA ·</span> next studio update · Q4
          </span>
          <span className="imprint__footer-rule" aria-hidden="true" />
          <span className="imprint__footer-fact">
            <span className="imprint__footer-mark">REV ·</span> {buildId}
          </span>
          <a
            className="imprint__footer-fact imprint__footer-credit"
            href="https://www.youtube.com/watch?v=YritHjh4Isc"
            target="_blank"
            rel="noreferrer"
          >
            🎵 Music Credit: Gauchha Geet Nepali — Lyrics by 🙏 National Poet Madhav Prasad Ghimire | Music by Ustad Gobinda Lal | © Music Nepal. All rights belong to the respective creators and copyright holders.
          </a>
        </footer>
      </div>
    </footer>
  )
}
