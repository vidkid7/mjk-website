'use client'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import type { PublicTestimonial, PublicUiCopy } from '@/lib/public-content'

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function reportCode(index: number): string {
  // Mimics a telegraphic report number: TR-018 / TR-024 / TR-031
  return `TR-${String(18 + index * 6).padStart(3, '0')}`
}

function reportStatus(index: number): string {
  const tones = ['Verified', 'On record', 'On record'] as const
  return tones[index % tones.length]
}

export default function Testimonials({ testimonials, copy }: { testimonials: PublicTestimonial[]; copy: PublicUiCopy['testimonials'] }) {
  return (
    <section id="testimonials" className="testimonials-feed relative scroll-mt-16 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(231,53,46,0.045),transparent_42%)]"
      />
      <div className="portfolio-container">
        <Reveal>
          <div className="testimonials-feed__masthead">
            <SectionHeader index={copy.index} eyebrow={copy.eyebrow} heading={copy.heading} />
            <dl className="testimonials-feed__meta" aria-label="Field transmission metadata">
              <div>
                <dt>{copy.filedLabel}</dt>
                <dd>{copy.index} / {copy.eyebrow}</dd>
              </div>
              <div>
                <dt>{copy.transmissionsLabel}</dt>
                <dd>{String(testimonials.length).padStart(2, '0')} on record</dd>
              </div>
              <div>
                <dt>{copy.channelLabel}</dt>
                <dd className="testimonials-feed__channel">
                  <span className="testimonials-feed__pulse" aria-hidden="true" />
                  {copy.channelValue}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <div className="testimonials-feed__rail" aria-hidden="true">
          <span className="testimonials-feed__rail-line" />
          <span className="testimonials-feed__rail-cap" />
        </div>

        <ol className="testimonials-feed__list" role="list">
          {testimonials.map((item, i) => (
            <li key={item.name} className="testimonials-feed__entry">
              <Reveal delay={i * 110} blur>
                <article className="testimonial-card">
                  <header className="testimonial-card__header">
                    <span className="testimonial-card__corner testimonial-card__corner--tl" aria-hidden="true" />
                    <span className="testimonial-card__corner testimonial-card__corner--tr" aria-hidden="true" />
                    <span className="testimonial-card__corner testimonial-card__corner--bl" aria-hidden="true" />
                    <span className="testimonial-card__corner testimonial-card__corner--br" aria-hidden="true" />
                    <div className="testimonial-card__code">
                      <span className="testimonial-card__code-label">REPORT</span>
                      <strong>{reportCode(i)}</strong>
                    </div>
                    <div className="testimonial-card__trace" aria-hidden="true">
                      <span className="testimonial-card__trace-dot" />
                      <span className="testimonial-card__trace-dot" />
                      <span className="testimonial-card__trace-dot" />
                      <span className="testimonial-card__trace-segment" />
                    </div>
                    <div className="testimonial-card__status">
                      <span className="testimonial-card__status-dot" />
                      {reportStatus(i)}
                    </div>
                  </header>

                  <div className="testimonial-card__body">
                    <span className="testimonial-card__quote-tag" aria-hidden="true">“</span>
                    <blockquote className="testimonial-card__quote">{item.quote}”</blockquote>

                    <div className="testimonial-card__reading" aria-hidden="true">
                      <span className="testimonial-card__reading-bar" />
                      <span className="testimonial-card__reading-bar" />
                      <span className="testimonial-card__reading-bar" />
                      <span className="testimonial-card__reading-bar" />
                    </div>
                  </div>

                  <footer className="testimonial-card__footer">
                    <div className="testimonial-card__signature">
                      <span className="testimonial-card__avatar" aria-hidden="true">
                        {initials(item.name)}
                      </span>
                      <div>
                        <div className="testimonial-card__name">{item.name}</div>
                        <div className="testimonial-card__role">— {item.role}</div>
                      </div>
                    </div>
                    <div className="testimonial-card__signoff">
                      <span aria-hidden="true">FILED</span>
                      <strong>{reportCode(i)}</strong>
                    </div>
                  </footer>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={140}>
          <div className="testimonials-feed__footnote">
            <span className="testimonials-feed__footnote-mark" aria-hidden="true" />
            <p>
              {copy.footnote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
