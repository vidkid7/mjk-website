'use client'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import type { PublicExperience, PublicUiCopy } from '@/lib/public-content'

type StatusTone = 'live' | 'closed' | 'open'

function statusFor(index: number, total: number): StatusTone {
  if (index === 0) return 'live'
  if (index === total - 1) return 'open'
  return 'closed'
}

function periodYear(period: string): string {
  const match = period.match(/\d{4}/)
  if (match) return match[0]
  if (/education/i.test(period)) return 'EDU'
  return period.slice(0, 3).toUpperCase()
}

function periodRange(period: string): string {
  const match = period.match(/(\d{4})\s*[—-]\s*(\d{4}|Present)/)
  if (!match) return period
  return `${match[1].slice(2)}–${match[2].slice(0, 2) === 'Pr' ? 'NOW' : match[2].slice(2)}`
}

export default function Experience({ experience, copy }: { experience: PublicExperience[]; copy: PublicUiCopy['experience'] }) {
  return (
    <section id="experience" className="experience-dossier relative scroll-mt-16 py-20 sm:py-28">
      <div className="portfolio-container">
        <Reveal>
          <div className="experience-dossier__masthead">
            <SectionHeader index={copy.index} eyebrow={copy.eyebrow} heading={copy.heading} />
            <dl className="experience-dossier__meta" aria-label="Dossier metadata">
              <div>
                <dt>{copy.filedLabel}</dt>
                <dd>{copy.index} / {copy.eyebrow}</dd>
              </div>
              <div>
                <dt>{copy.entriesLabel}</dt>
                <dd>{String(experience.length).padStart(2, '0')} on record</dd>
              </div>
              <div>
                <dt>{copy.statusLabel}</dt>
                <dd className="experience-dossier__status">
                  <span className="experience-dossier__pulse" aria-hidden="true" />
                  {copy.statusValue}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <ol className="experience-dossier__list" role="list">
          {experience.map((item, i) => {
            const tone = statusFor(i, experience.length)
            const year = periodYear(item.period)
            const range = periodRange(item.period)
            return (
              <li key={item.title} className="experience-dossier__entry">
                <Reveal delay={i * 90} blur>
                  <article className={`experience-entry experience-entry--${tone}`}>
                    <aside className="experience-entry__gate" aria-hidden="true">
                      <span className="experience-entry__corner experience-entry__corner--tl" />
                      <span className="experience-entry__corner experience-entry__corner--tr" />
                      <span className="experience-entry__corner experience-entry__corner--bl" />
                      <span className="experience-entry__corner experience-entry__corner--br" />
                      <div className="experience-entry__year">
                        <span className="experience-entry__year-mark">YR</span>
                        <strong>{year}</strong>
                      </div>
                      <span className="experience-entry__range">{range}</span>
                      <span className={`experience-entry__status experience-entry__status--${tone}`}>
                        <span className="experience-entry__status-dot" />
                        {tone === 'live' && 'Active'}
                        {tone === 'closed' && 'Closed'}
                        {tone === 'open' && 'Open'}
                      </span>
                    </aside>

                    <div className="experience-entry__body">
                      <header className="experience-entry__header">
                        <span className="experience-entry__counter">
                          <span className="experience-entry__counter-rule" />
                          FILE {String(i + 1).padStart(2, '0')} · {String(experience.length).padStart(2, '0')}
                        </span>
                        <div className="experience-entry__org">
                          <span className="experience-entry__org-label">Filed at</span>
                          <span className="experience-entry__org-value">{item.org}</span>
                        </div>
                      </header>

                      <h3 className="experience-entry__title">{item.title}</h3>

                      <span className="experience-entry__period">
                        <span className="experience-entry__period-bar" aria-hidden="true" />
                        {item.period}
                      </span>

                      <ul className="experience-entry__points">
                        {item.points.map((point, j) => (
                          <li key={point}>
                            <span className="experience-entry__point-index">
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <span className="experience-entry__point-text">{point}</span>
                          </li>
                        ))}
                      </ul>

                      <footer className="experience-entry__footer">
                        <span>Witnessed</span>
                        <span className="experience-entry__footer-rule" aria-hidden="true" />
                        <span>{item.period}</span>
                      </footer>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>

        <Reveal delay={120}>
          <div className="experience-dossier__footnote">
            <span className="experience-dossier__footnote-mark" aria-hidden="true" />
            <p>
              {copy.footnote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
