'use client'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import TiltCard from '@/components/fx/TiltCard'
import { MapPin, Clock, Building2 } from 'lucide-react'
import type { PublicAbout, PublicSite } from '@/lib/public-content'

export default function About({ content, site }: { content: PublicAbout; site: PublicSite }) {
  const icons = [MapPin, Clock, Building2]
  return (
    <section id="about" className="about-dossier relative scroll-mt-16 py-20 sm:py-28">
      <div className="portfolio-container">
        <Reveal>
          <div className="about-dossier__masthead">
            <SectionHeader index={content.index} eyebrow={content.eyebrow} heading={content.heading} />
            <dl className="about-dossier__meta" aria-label="Operator metadata at a glance">
              {content.meta.map((row, index) => {
                const Icon = icons[index % icons.length]
                return (
                <div key={row.label} className="about-dossier__meta-item">
                  <dt>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {row.label}
                  </dt>
                  <dd>{row.value}</dd>
                </div>
                )
              })}
            </dl>
          </div>
        </Reveal>

        <div className="about-dossier__layout">
          <Reveal className="about-dossier__portrait-col" delay={80}>
            <article className="about-portrait">
              <header className="about-portrait__header">
                <span className="about-portrait__corner about-portrait__corner--tl" aria-hidden="true" />
                <span className="about-portrait__corner about-portrait__corner--tr" aria-hidden="true" />
                <span className="about-portrait__corner about-portrait__corner--bl" aria-hidden="true" />
                <span className="about-portrait__corner about-portrait__corner--br" aria-hidden="true" />
                <div className="about-portrait__badge">
                  <span className="about-portrait__badge-mark" aria-hidden="true" />
                  <span className="about-portrait__badge-text">DOSSIER {content.index}</span>
                </div>
                <span className="about-portrait__code">SUBJECT · MK</span>
              </header>

              <div className="about-portrait__stage">
                <div
                  aria-hidden="true"
                  className="noir-profile-glow absolute inset-0 -z-10 blur-2xl"
                />
                <TiltCard className="relative h-full" intensity={7}>
                  <div className="about-profile-stage relative">
                    <img
                      src={content.portrait}
                      alt={`Portrait of ${site.name}`}
                      className="about-cutout-portrait relative z-10 h-[26rem] w-full object-contain object-bottom sm:h-[31rem]"
                    />
                  </div>
                </TiltCard>
                <span className="about-portrait__reticle about-portrait__reticle--tl" aria-hidden="true" />
                <span className="about-portrait__reticle about-portrait__reticle--br" aria-hidden="true" />
              </div>

              <footer className="about-portrait__footer">
                <span className="about-portrait__footer-label">Verified</span>
                <span className="about-portrait__footer-rule" aria-hidden="true" />
                <span className="about-portrait__footer-value">{site.location}</span>
              </footer>
            </article>
          </Reveal>

          <div className="about-dossier__content-col">
            <Reveal delay={140}>
              <div className="about-portrait-note">
                <span className="about-portrait-note__rule" aria-hidden="true" />
                <blockquote className="about-portrait-note__quote">
                  <span className="about-portrait-note__quote-tag" aria-hidden="true">“</span>
                  {content.paragraphs[0]}
                </blockquote>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <ol className="about-portrait-note__list" aria-label="Operator narrative">
                {content.paragraphs.slice(1).map((paragraph, i) => (
                  <li key={i} className="about-portrait-note__item">
                    <span className="about-portrait-note__item-index">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                    <span className="about-portrait-note__item-text">{paragraph}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={240}>
              <ol className="about-highlights" aria-label="Operator highlights">
                {content.highlights.map((point, i) => (
                  <li key={point} className="about-highlights__item">
                    <span className="about-highlights__bar" aria-hidden="true" />
                    <span className="about-highlights__index">HL · {String(i + 1).padStart(2, '0')}</span>
                    <span className="about-highlights__text">{point}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={280}>
              <a href={content.resumeHref} className="about-cta">
                <span className="about-cta__index">CH-00</span>
                <span className="about-cta__label">Contact {site.name}</span>
                <span className="about-cta__arrow" aria-hidden="true">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
