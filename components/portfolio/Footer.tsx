import { ArrowUp } from 'lucide-react'
import type { PublicService, PublicSite, PublicUiCopy } from '@/lib/public-content'

const navigationLinks = [
  { label: 'About', code: '01', href: '#about' },
  { label: 'Work', code: '02', href: '#work' },
  { label: 'Skills', code: '03', href: '#skills' },
  { label: 'Experience', code: '04', href: '#experience' },
  { label: 'Reports', code: '05', href: '#testimonials' },
  { label: 'Contact', code: '06', href: '#contact' },
]

export default function Footer({ site, services, copy }: { site: PublicSite; services: PublicService[]; copy: PublicUiCopy['footer'] }) {
  const year = new Date().getFullYear()
  const buildId = `${year}.${String(new Date().getMonth() + 1).padStart(2, '0')}`
  const serviceLinks = services.map((service, index) => ({ label: service.shortName || service.name, code: `S-${String(index + 1).padStart(2, '0')}`, href: `/services/${service.slug}` }))
  serviceLinks.push({ label: copy.servicesTitle, code: `S-${String(serviceLinks.length + 1).padStart(2, '0')}`, href: '/services' })
  const studioNotes = [
    { label: 'Studio', value: site.availability },
    { label: 'Standing', value: site.role },
    { label: 'Region', value: site.location },
    { label: 'Channel', value: site.email },
  ]

  return (
    <footer className="imprint relative border-t border-ink/10">
      <div aria-hidden="true" className="imprint__hairline" />
      <div className="portfolio-container imprint__container">
        <header className="imprint__header">
          <div className="imprint__brand">
            <a href="#top" className="imprint__mark" aria-label="Back to top">
              <span className="imprint__mark-mark" aria-hidden="true" />
              <span className="imprint__mark-text">MK</span>
            </a>
            <div className="imprint__brand-copy">
                <span className="imprint__brand-eyebrow">{copy.brandEyebrow}</span>
              <h2 className="imprint__brand-name">
                Mukesh<span className="imprint__brand-dot">.</span>
              </h2>
                <span className="imprint__brand-tagline">{site.tagline}</span>
            </div>
          </div>
          <div className="imprint__status">
            <span className="imprint__status-pulse" aria-hidden="true" />
            <span className="imprint__status-text">
              <strong>{copy.statusValue}</strong>
              <span>{copy.compilerLabel} · {buildId}</span>
            </span>
          </div>
          <a href="#top" className="imprint__top" aria-label="Back to top">
            <span className="imprint__top-label">{copy.topLabel}</span>
            <span className="imprint__top-arrow" aria-hidden="true">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </header>

        <div className="imprint__grid">
          <section className="imprint__column" aria-label="Navigation index">
            <header className="imprint__column-head">
              <span className="imprint__column-index">A</span>
              <span className="imprint__column-title">{copy.navigationTitle}</span>
              <span className="imprint__column-rule" aria-hidden="true" />
            </header>
            <ol className="imprint__list">
              {navigationLinks.map((link) => (
                <li key={link.label} className="imprint__list-item">
                  <a href={link.href} className="imprint__link">
                    <span className="imprint__link-code">{link.code}</span>
                    <span className="imprint__link-label">{link.label}</span>
                    <span className="imprint__link-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section className="imprint__column" aria-label="Services index">
            <header className="imprint__column-head">
              <span className="imprint__column-index">B</span>
              <span className="imprint__column-title">{copy.servicesTitle}</span>
              <span className="imprint__column-rule" aria-hidden="true" />
            </header>
            <ol className="imprint__list">
              {serviceLinks.map((link) => (
                <li key={link.label} className="imprint__list-item">
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
              <span className="imprint__column-title">{copy.studioTitle}</span>
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

        <section className="imprint__wires" aria-label="Outbound wires">
          <span className="imprint__wires-label">{copy.wiresLabel}</span>
          <span className="imprint__wires-rule" aria-hidden="true" />
          <ul className="imprint__wires-list">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="imprint__wire"
                >
                  <span className="imprint__wire-bullet" aria-hidden="true" />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="imprint__footer">
          <span className="imprint__footer-fact">
            © {year} {site.name}. Built with care in {site.location}.
          </span>
          <span className="imprint__footer-rule" aria-hidden="true" />
          <span className="imprint__footer-fact">
            <span className="imprint__footer-mark">SHA ·</span> next studio update · Q4
          </span>
          <span className="imprint__footer-rule" aria-hidden="true" />
          <span className="imprint__footer-fact">
            <span className="imprint__footer-mark">REV ·</span> {buildId}
          </span>
          <span className="imprint__footer-rule" aria-hidden="true" />
          <span className="imprint__footer-fact">{copy.musicCredit}</span>
        </footer>
      </div>
    </footer>
  )
}
