import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import SignalRail from '@/components/portfolio/SignalRail'
import PublicImprint from '@/components/portfolio/PublicImprint'
import CmsUnavailable from '@/components/portfolio/CmsUnavailable'
import { loadPublicContent, PublicContentError } from '@/lib/public-content-server'
import { type PublicContact } from '@/lib/public-content'

const siteUrl = 'https://khadkamukesh.com.np'

export const metadata: Metadata = {
  title: 'Contact Mukesh Khadka — Open a Project Channel',
  description:
    'Open a project channel with Mukesh Khadka. Available for freelance projects, product partnerships, and technical consulting from Kathmandu, Nepal.',
  alternates: { canonical: `${siteUrl}/contact` },
}

type Channel = {
  label: string
  value: string
  href?: string
  meta: string
  icon: typeof Mail
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  let content
  try {
    content = await loadPublicContent()
  } catch (error) {
    if (error instanceof PublicContentError) return <CmsUnavailable message={error.message} />
    throw error
  }
  const contact: PublicContact = content.contact
  const channels: Channel[] = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, meta: 'CH-01 / 24H REPLY', icon: Mail },
    { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}`, meta: 'CH-02 / NEPAL +977', icon: Phone },
    { label: 'Based in', value: contact.location, meta: 'CH-03 / GMT+05:45', icon: MapPin },
  ]
  const studioFacts = contact.studioFacts
  const workPrompts = contact.workPrompts
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Mukesh Khadka',
    url: `${siteUrl}/contact`,
    description: contact.blurb,
    mainEntity: {
      '@type': 'Person',
      name: content.site.name,
      jobTitle: content.site.role,
      email: `mailto:${contact.email}`,
      telephone: contact.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati Province',
        addressCountry: 'NP',
      },
    },
  }

  return (
    <main className="public-route-shell gateway-shell relative min-h-screen">
      <SignalRail site={content.site} context="PROJECT CHANNEL" detail="CONTACT · OPEN WORK" />
      <div className="public-route-content relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="public-route-main public-route-hero">
          <div className="public-route-hero__copy">
            <div className="public-route-index">
              <span>05</span>
              <span>Project channel</span>
              <i />
            </div>
            <p className="public-route-kicker">Open for select work</p>
            <h1>Open a project channel.</h1>
            <p className="public-route-lede">{contact.blurb}</p>
            <div className="public-route-hero__links">
              <a href="#channel">
                Choose a channel <span>↓</span>
              </a>
              <a href="/#work">
                See selected systems <span>↑</span>
              </a>
            </div>
          </div>
          <aside className="public-route-hero__signal" aria-label="Channel status">
            <header className="public-route-hero__signal-head">
              <span className="public-route-hero__pulse" aria-hidden="true">
                <span className="public-route-hero__pulse-dot" />
                <span className="public-route-hero__pulse-ring" />
              </span>
              <span className="public-route-signal-label">CHANNEL / 05</span>
              <span className="public-route-hero__nepal-time">NPL · GMT+05:45</span>
            </header>
            <strong>
              Inbound channels<br />
              are open and reading.
            </strong>

            <svg
              className="public-route-hero__wave"
              viewBox="0 0 320 48"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hero-wave-gradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--route-accent)" stopOpacity="0.15" />
                  <stop offset="40%" stopColor="var(--route-accent)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--route-accent)" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <g fill="none" stroke="url(#hero-wave-gradient)" strokeWidth="1.4" strokeLinecap="round">
                <path d="M0 24 L8 24 M14 18 L18 30 M24 12 L28 36 M34 20 L38 28 M44 16 L48 32 M54 22 L58 26 M64 14 L68 34 M74 19 L78 29 M84 23 L88 25 M94 17 L98 31 M104 21 L108 27 M114 14 L118 34 M124 19 L128 29 M134 22 L138 26 M144 16 L148 32 M154 18 L158 30 M164 12 L168 36 M174 20 L178 28 M184 16 L188 32 M194 22 L198 26 M204 14 L208 34 M214 19 L218 29 M224 23 L228 25 M234 17 L238 31 M244 21 L248 27 M254 14 L258 34 M264 19 L268 29 M274 22 L278 26 M284 16 L288 32 M294 18 L298 30 M304 12 L308 36 M314 20 L318 28" />
              </g>
            </svg>

            <ul className="public-route-hero__channels" role="list">
              {channels.map((ch) => {
                const Icon = ch.icon
                return (
                  <li key={ch.label}>
                    {ch.href ? (
                      <a href={ch.href}>
                        <span className="public-route-hero__channel-icon" aria-hidden="true">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="public-route-hero__channel-copy">
                          <span className="public-route-hero__channel-label">{ch.label}</span>
                          <span className="public-route-hero__channel-value">{ch.value}</span>
                        </span>
                        <ArrowUpRight className="public-route-hero__channel-arrow h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <span>
                        <span className="public-route-hero__channel-icon" aria-hidden="true">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="public-route-hero__channel-copy">
                          <span className="public-route-hero__channel-label">{ch.label}</span>
                          <span className="public-route-hero__channel-value">{ch.value}</span>
                        </span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>

            <footer className="public-route-hero__signal-foot">
              <span>
                24H <small>typical reply</small>
              </span>
              <span>
                LIVE <small>reading now</small>
              </span>
            </footer>
          </aside>
        </section>

        <section
          id="channel"
          className="public-route-main public-route-section public-route-channels"
          aria-labelledby="channels-title"
        >
          <div className="public-route-section-heading">
            <div>
              <span className="public-route-kicker">CHANNELS / OPEN</span>
              <h2 id="channels-title">Three ways to reach the studio.</h2>
            </div>
            <p>
              Pick the channel that fits the work. Short briefs, ongoing partnerships, and quick
              second-opinion calls are all welcome here.
            </p>
          </div>

          <header className="public-route-channels__status" aria-label="Channel status">
            <span className="public-route-channels__pulse" aria-hidden="true">
              <span className="public-route-channels__pulse-dot" />
              <span className="public-route-channels__pulse-ring" />
            </span>
            <span className="public-route-channels__status-text">
              ALL THREE CHANNELS · READING INBOUND NOW
            </span>
            <span className="public-route-channels__status-meta">
              AVG REPLY · 24H · NPL · GMT+05:45
            </span>
          </header>

          <ol className="public-route-channel-grid" role="list">
            {channels.map((channel, i) => {
              const Icon = channel.icon
              const motif = ['mail', 'call', 'pin'][i] ?? 'mail'
              const actionLabel = ['Compose', 'Call now', 'Open map'][i] ?? 'Open'
              const tag = ['Best for briefs', 'Best for calls', 'Best for visits'][i] ?? ''
              return (
                <li key={channel.label} className="public-route-channel-card">
                  <header className="public-route-channel-card__head">
                    <span className="public-route-channel-card__number">
                      CH · {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="public-route-channel-card__tag">{tag}</span>
                  </header>

                  <div
                    className={`public-route-channel-card__icon public-route-channel-card__icon--${motif}`}
                    aria-hidden="true"
                  >
                    {motif === 'mail' && (
                      <svg viewBox="0 0 64 64" fill="none" preserveAspectRatio="xMidYMid meet">
                        <rect
                          x="10"
                          y="18"
                          width="44"
                          height="32"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M10 18 L32 36 L54 18"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="32"
                          cy="44"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeDasharray="2 2"
                          opacity="0.55"
                        />
                        <circle cx="32" cy="44" r="1.6" fill="currentColor" />
                      </svg>
                    )}
                    {motif === 'call' && (
                      <svg viewBox="0 0 64 64" fill="none" preserveAspectRatio="xMidYMid meet">
                        <path
                          d="M18 12 L24 12 L28 22 L22 26 C25 34 30 39 38 42 L42 36 L52 40 L52 46 C52 50 49 52 45 52 C28 52 12 36 12 19 C12 15 14 12 18 12 Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                        <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
                          <path d="M44 12 L48 12 L48 16" />
                          <path d="M48 12 L52 12 L52 16" />
                          <path d="M44 18 L48 18 L48 22" />
                          <path d="M48 18 L52 18 L52 22" />
                        </g>
                      </svg>
                    )}
                    {motif === 'pin' && (
                      <svg viewBox="0 0 64 64" fill="none" preserveAspectRatio="xMidYMid meet">
                        <circle
                          cx="32"
                          cy="28"
                          r="14"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M32 42 L24 56 L32 52 L40 56 Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="32"
                          cy="28"
                          r="4.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          opacity="0.55"
                        />
                        <g stroke="currentColor" strokeWidth="0.9" opacity="0.35">
                          <path d="M6 28 L58 28" strokeDasharray="2 3" />
                          <path d="M32 6 L32 50" strokeDasharray="2 3" />
                        </g>
                      </svg>
                    )}
                    {!['mail', 'call', 'pin'].includes(motif) && (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  <div className="public-route-channel-card__body">
                    <span className="public-route-channel-card__meta">{channel.meta}</span>
                    <span className="public-route-channel-card__label">{channel.label}</span>
                    <span className="public-route-channel-card__value">{channel.value}</span>
                  </div>

                  <footer className="public-route-channel-card__foot">
                    <span className="public-route-channel-card__live" aria-hidden="true">
                      <span /> LIVE
                    </span>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="public-route-channel-card__action"
                        aria-label={`${actionLabel} via ${channel.label}`}
                      >
                        {actionLabel}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="public-route-channel-card__action public-route-channel-card__action--static">
                        Reference only
                      </span>
                    )}
                  </footer>
                </li>
              )
            })}
          </ol>

          <footer className="public-route-channels__footnote" aria-label="Reply expectations">
            <span className="public-route-channels__footnote-key">EXPECTED WINDOW</span>
            <span className="public-route-channels__footnote-value">
              Monday – Friday, 09:00 – 18:00 NPL · weekends read but replies slip into Monday.
            </span>
          </footer>
        </section>

        <section className="public-route-main public-route-section public-route-brief" aria-labelledby="brief-title">
          <div className="public-route-section-heading">
            <div>
              <span className="public-route-kicker">PREP / FIELD KIT</span>
              <h2 id="brief-title">What is useful in the first message.</h2>
            </div>
            <p>
              A short, clear first message is more useful than a long, polished one. Three pieces
              of context help us reply with something useful.
            </p>
          </div>

          <header className="public-route-brief__ledger" aria-label="Brief readiness">
            <span className="public-route-brief__ledger-key">FIRST-MESSAGE DOSSIER</span>
            <span className="public-route-brief__ledger-rule" aria-hidden="true" />
            <span className="public-route-brief__ledger-meta">
              03 ITEMS · OPTIONAL ORDER · SHORTER IS FINE
            </span>
            <span className="public-route-brief__ledger-stamp" aria-hidden="true">
              <span />RECEIVED
            </span>
          </header>

          <ol className="public-route-brief__list" role="list">
            {workPrompts.map((prompt, i) => {
              const motifs = ['blueprint', 'layers', 'rhythm']
              const motif = motifs[i] ?? 'blueprint'
              const taglines = [
                'SHAPE OF THE WORK',
                'WHAT ALREADY LIVES',
                'WHO AND HOW OFTEN',
              ]
              const tag = taglines[i] ?? ''
              return (
                <li key={prompt.title} className="public-route-brief-card">
                  <span className="public-route-brief-card__tab" aria-hidden="true">
                    <span className="public-route-brief-card__tab-index">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>

                  <span className="public-route-brief-card__marks" aria-hidden="true">
                    <i className="public-route-brief-card__mark public-route-brief-card__mark--tl" />
                    <i className="public-route-brief-card__mark public-route-brief-card__mark--tr" />
                    <i className="public-route-brief-card__mark public-route-brief-card__mark--bl" />
                    <i className="public-route-brief-card__mark public-route-brief-card__mark--br" />
                  </span>

                  <header className="public-route-brief-card__head">
                    <span className="public-route-brief-card__kicker">
                      <span /> {tag}
                    </span>
                    <h3 className="public-route-brief-card__title">{prompt.title}</h3>
                  </header>

                  <div className="public-route-brief-card__rule" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  <p className="public-route-brief-card__body">{prompt.body}</p>

                  <div className="public-route-brief-card__postmark" aria-hidden="true">
                    <svg viewBox="0 0 80 80" fill="none">
                      <circle
                        cx="40"
                        cy="40"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                        opacity="0.6"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="22"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        opacity="0.35"
                      />
                      <text
                        x="40"
                        y="36"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="9"
                        fontFamily="var(--gateway-mono, monospace)"
                        fontWeight="500"
                        letterSpacing="1"
                      >
                        FILE 0{i + 1}
                      </text>
                      <text
                        x="40"
                        y="48"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="5"
                        fontFamily="var(--gateway-mono, monospace)"
                        letterSpacing="1.5"
                        opacity="0.7"
                      >
                        OF 03
                      </text>
                    </svg>
                  </div>

                  <footer className="public-route-brief-card__foot">
                    <span
                      className={`public-route-brief-card__sketch public-route-brief-card__sketch--${motif}`}
                      aria-hidden="true"
                    >
                      {motif === 'blueprint' && (
                        <svg viewBox="0 0 80 40" fill="none" preserveAspectRatio="xMidYMid meet">
                          <rect
                            x="6"
                            y="6"
                            width="68"
                            height="28"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            opacity="0.55"
                          />
                          <path
                            d="M14 22 L66 22"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            strokeDasharray="3 2"
                          />
                          <path
                            d="M22 14 L22 30 M58 14 L58 30"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            opacity="0.75"
                          />
                          <circle cx="14" cy="22" r="2.2" fill="currentColor" />
                          <circle cx="66" cy="22" r="2.2" fill="currentColor" />
                          <path
                            d="M14 22 L22 14 M14 22 L22 30 M66 22 L58 14 M66 22 L58 30"
                            stroke="currentColor"
                            strokeWidth="0.9"
                            opacity="0.45"
                          />
                        </svg>
                      )}
                      {motif === 'layers' && (
                        <svg viewBox="0 0 80 40" fill="none" preserveAspectRatio="xMidYMid meet">
                          <rect
                            x="10"
                            y="10"
                            width="60"
                            height="8"
                            stroke="currentColor"
                            strokeWidth="1.1"
                          />
                          <rect
                            x="14"
                            y="20"
                            width="60"
                            height="8"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            opacity="0.75"
                          />
                          <rect
                            x="6"
                            y="30"
                            width="60"
                            height="8"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            opacity="0.5"
                          />
                          <path
                            d="M76 14 L82 14 M76 24 L82 24 M76 34 L82 34"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {motif === 'rhythm' && (
                        <svg viewBox="0 0 80 40" fill="none" preserveAspectRatio="xMidYMid meet">
                          <path
                            d="M4 20 L12 20 M18 12 L18 28 M24 16 L24 24 M30 8 L30 32 M36 18 L36 22 M42 14 L42 26 M48 10 L48 30 M54 16 L54 24 M60 12 L60 28 M66 18 L66 22 M72 14 L72 26 M78 20 L78 20"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M4 32 L76 32"
                            stroke="currentColor"
                            strokeWidth="0.9"
                            opacity="0.4"
                            strokeDasharray="2 2"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="public-route-brief-card__hint">
                      {i === 0 && 'SHAPE'}
                      {i === 1 && 'INHERIT'}
                      {i === 2 && 'PEOPLE'}
                      <i />
                    </span>
                  </footer>
                </li>
              )
            })}
          </ol>

          <footer className="public-route-brief__footnote" aria-label="Brief tip">
            <span className="public-route-brief__footnote-key">TIP</span>
            <span className="public-route-brief__footnote-value">
              Two of the three is fine. A short note with a rough shape beats a long, polished
              brief with everything except the question.
            </span>
          </footer>
        </section>

        <section
          className="public-route-main public-route-section public-route-studio"
          aria-labelledby="studio-title"
        >
          <div className="public-route-section-heading">
            <div>
              <span className="public-route-kicker">STUDIO / FILE FACTS</span>
              <h2 id="studio-title">The studio on record.</h2>
            </div>
            <p>
              A few facts that are useful to know before we talk. The studio is small, the work is
              selective, and most engagements begin with a short conversation rather than a
              proposal.
            </p>
          </div>

          <header className="public-route-studio__ledger" aria-label="Studio dossier">
            <span className="public-route-studio__ledger-key">STUDIO DOSSIER</span>
            <span className="public-route-studio__ledger-rule" aria-hidden="true" />
            <span className="public-route-studio__ledger-meta">
              04 FIELDS · ON FILE · UPDATED LIVE
            </span>
            <span className="public-route-studio__ledger-stamp" aria-hidden="true">
              <span />VERIFIED
            </span>
          </header>

          <ol className="public-route-studio-grid" role="list">
            {studioFacts.map((fact, i) => {
              const motifs = ['org', 'pulse', 'pin', 'envelope']
              const motif = motifs[i] ?? 'org'
              const taglines = [
                'OPERATOR · ORG',
                'STANDING · GATE',
                'REGION · BASE',
                'CHANNEL · INBOX',
              ]
              const tag = taglines[i] ?? ''
              return (
                <li key={fact.label} className="public-route-studio-card">
                  <span className="public-route-studio-card__marks" aria-hidden="true">
                    <i className="public-route-studio-card__mark public-route-studio-card__mark--tl" />
                    <i className="public-route-studio-card__mark public-route-studio-card__mark--br" />
                  </span>

                  <header className="public-route-studio-card__head">
                    <span className="public-route-studio-card__number">
                      F · {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="public-route-studio-card__kicker">
                      <span /> {tag}
                    </span>
                  </header>

                  <div className="public-route-studio-card__rule" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="public-route-studio-card__label">{fact.label}</span>

                  <span
                    className={`public-route-studio-card__sketch public-route-studio-card__sketch--${motif}`}
                    aria-hidden="true"
                  >
                    {motif === 'org' && (
                      <svg viewBox="0 0 80 50" fill="none" preserveAspectRatio="xMidYMid meet">
                        <rect
                          x="22"
                          y="6"
                          width="36"
                          height="14"
                          stroke="currentColor"
                          strokeWidth="1.1"
                        />
                        <path
                          d="M40 20 L40 28 M30 28 L50 28 M30 28 L30 38 M50 28 L50 38 M30 38 L50 38"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                        />
                        <path
                          d="M40 38 L40 44"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeDasharray="2 2"
                          opacity="0.5"
                        />
                      </svg>
                    )}
                    {motif === 'pulse' && (
                      <svg viewBox="0 0 80 30" fill="none" preserveAspectRatio="xMidYMid meet">
                        <path
                          d="M4 15 L20 15 L26 4 L32 26 L38 8 L44 22 L50 15 L76 15"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="38" cy="8" r="1.6" fill="currentColor" />
                      </svg>
                    )}
                    {motif === 'pin' && (
                      <svg viewBox="0 0 80 50" fill="none" preserveAspectRatio="xMidYMid meet">
                        <g stroke="currentColor" strokeWidth="0.9" opacity="0.35">
                          <path d="M6 22 L74 22" strokeDasharray="2 3" />
                          <path d="M40 6 L40 38" strokeDasharray="2 3" />
                        </g>
                        <circle
                          cx="40"
                          cy="22"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M40 32 L34 44 L40 40 L46 44 Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="40"
                          cy="22"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          opacity="0.55"
                        />
                      </svg>
                    )}
                    {motif === 'envelope' && (
                      <svg viewBox="0 0 80 50" fill="none" preserveAspectRatio="xMidYMid meet">
                        <rect
                          x="10"
                          y="14"
                          width="60"
                          height="32"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M10 14 L40 36 L70 14"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="40"
                          cy="36"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          opacity="0.55"
                        />
                      </svg>
                    )}
                  </span>

                  <span className="public-route-studio-card__value">{fact.value}</span>

                  <footer className="public-route-studio-card__foot">
                    <span className="public-route-studio-card__live" aria-hidden="true">
                      <span />ON FILE
                    </span>
                    <span className="public-route-studio-card__hint">
                      {i === 0 && 'ROLE'}
                      {i === 1 && 'GATE'}
                      {i === 2 && 'BASE'}
                      {i === 3 && 'INBOX'}
                      <i />
                    </span>
                  </footer>
                </li>
              )
            })}
          </ol>

          <footer className="public-route-studio__footnote" aria-label="Studio note">
            <span className="public-route-studio__footnote-key">NOTE</span>
            <span className="public-route-studio__footnote-value">
              All four fields are kept current. If any of them look out of date, that is the
              first thing to ask about.
            </span>
          </footer>
        </section>

        <section
          className="public-route-main public-route-cta public-route-transmit"
          aria-labelledby="contact-cta-title"
        >
          <span className="public-route-transmit__marks" aria-hidden="true">
            <i className="public-route-transmit__mark public-route-transmit__mark--tl" />
            <i className="public-route-transmit__mark public-route-transmit__mark--tr" />
            <i className="public-route-transmit__mark public-route-transmit__mark--bl" />
            <i className="public-route-transmit__mark public-route-transmit__mark--br" />
          </span>

          <svg
            className="public-route-transmit__wave"
            viewBox="0 0 600 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="transmit-wave-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <g
              fill="none"
              stroke="url(#transmit-wave-gradient)"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <path d="M0 30 L10 30 M18 22 L22 38 M30 14 L34 46 M42 24 L46 36 M54 18 L58 42 M66 26 L70 34 M78 16 L82 44 M90 23 L94 37 M102 28 L106 32 M114 19 L118 41 M126 25 L130 35 M138 16 L142 44 M150 23 L154 37 M162 13 L166 47 M174 24 L178 36 M186 18 L190 42 M198 26 L202 34 M210 16 L214 44 M222 23 L226 37 M234 27 L238 33 M246 19 L250 41 M258 25 L262 35 M270 14 L274 46 M282 22 L286 38 M294 26 L298 34 M306 18 L310 42 M318 23 L322 37 M330 12 L334 48 M342 24 L346 36 M354 18 L358 42 M366 26 L370 34 M378 16 L382 44 M390 23 L394 37 M402 27 L406 33 M414 19 L418 41 M426 25 L430 35 M438 14 L442 46 M450 22 L454 38 M462 26 L466 34 M474 18 L478 42 M486 23 L490 37 M498 12 L502 48 M510 24 L514 36 M522 18 L526 42 M534 26 L538 34 M546 16 L550 44 M558 23 L562 37 M570 26 L574 34 M582 18 L586 42 M594 24 L598 36" />
            </g>
          </svg>

          <header className="public-route-transmit__head">
            <span className="public-route-transmit__live" aria-hidden="true">
              <span className="public-route-transmit__pulse">
                <span className="public-route-transmit__pulse-dot" />
                <span className="public-route-transmit__pulse-ring" />
              </span>
              <span className="public-route-transmit__live-text">
                ON AIR · READING INBOUND
              </span>
            </span>
            <span className="public-route-transmit__time">NPL · GMT+05:45</span>
          </header>

          <div className="public-route-transmit__copy">
            <span className="public-route-kicker public-route-kicker--inverse">
              WHEN YOU ARE READY · TRANSMIT
            </span>
            <h2 id="contact-cta-title">Start with the channel that fits.</h2>
            <p>
              For longer briefs, the email is the easiest. For quick sense-checks, the phone is
              fine. Both routes reach the same studio, the same inbox, the same desk.
            </p>
          </div>

          <div className="public-route-transmit__actions" aria-label="Contact actions">
            <a
              href={`mailto:${contact.email}?subject=Project%20inquiry%20from%20portfolio`}
              className="public-route-transmit__action public-route-transmit__action--primary"
            >
              <span className="public-route-transmit__action-tag">EMAIL · RECOMMENDED</span>
              <span className="public-route-transmit__action-label">Start a brief</span>
              <span className="public-route-transmit__action-meta">
                {contact.email}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="public-route-transmit__action public-route-transmit__action--secondary"
            >
              <span className="public-route-transmit__action-tag">PHONE · QUICK SENSE-CHECK</span>
              <span className="public-route-transmit__action-label">Call the studio</span>
              <span className="public-route-transmit__action-meta">
                {contact.phone}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <a
              href="/#work"
              className="public-route-transmit__action public-route-transmit__action--ghost"
            >
              <span className="public-route-transmit__action-tag">FIRST, LOOK AT THE WORK</span>
              <span className="public-route-transmit__action-label">See selected systems</span>
              <span className="public-route-transmit__action-meta">
                6 case files
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>

          <footer className="public-route-transmit__foot" aria-label="Reply expectations">
            <span className="public-route-transmit__foot-item">
              <strong>24H</strong>
              <small>typical reply window</small>
            </span>
            <span className="public-route-transmit__foot-item">
              <strong>EN / NE</strong>
              <small>working languages</small>
            </span>
            <span className="public-route-transmit__foot-item">
              <strong>NP / REMOTE</strong>
              <small>primary base · GMT+05:45</small>
            </span>
            <span className="public-route-transmit__foot-item">
              <strong>3 / 3</strong>
              <small>channels live right now</small>
            </span>
          </footer>
        </section>
      </div>
      <PublicImprint site={content.site} context="PROJECT CHANNEL" tagline={content.site.tagline} />
    </main>
  )
}
