'use client'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import type { PublicContact, PublicUiCopy } from '@/lib/public-content'

type Channel = {
  label: string
  value: string
  href?: string
  icon: typeof Mail
  meta: string
}

function channelLabel(channel: Channel): string {
  return channel.href ? channel.value : channel.value
}

export default function Contact({ content, copy }: { content: PublicContact; copy: PublicUiCopy['contact'] }) {
  const channels: Channel[] = [
    { label: 'Email', value: content.email, href: `mailto:${content.email}`, icon: Mail, meta: 'CH-01 / 24H REPLY' },
    { label: 'Phone', value: content.phone, href: `tel:${content.phone.replace(/\s/g, '')}`, icon: Phone, meta: 'CH-02 / NEPAL +977' },
    { label: 'Based in', value: content.location, icon: MapPin, meta: 'CH-03 / GMT+05:45' },
  ]
  return (
    <section id="contact" className="contact-terminal relative scroll-mt-16 py-20 sm:py-28">
      <div className="portfolio-container">
        <Reveal>
          <div className="contact-terminal__masthead">
            <div className="contact-terminal__eyebrow">
              <span className="contact-terminal__eyebrow-mark" aria-hidden="true" />
              <span className="contact-terminal__eyebrow-text">
                {content.index} / PROJECT CHANNEL <span aria-hidden="true">·</span> {content.eyebrow}
              </span>
            </div>
            <h2 className="contact-terminal__heading">{content.heading}</h2>
            <p className="contact-terminal__blurb">{content.blurb}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <article className="contact-panel">
            <header className="contact-panel__header">
              <span className="contact-panel__corner contact-panel__corner--tl" aria-hidden="true" />
              <span className="contact-panel__corner contact-panel__corner--tr" aria-hidden="true" />
              <span className="contact-panel__corner contact-panel__corner--bl" aria-hidden="true" />
              <span className="contact-panel__corner contact-panel__corner--br" aria-hidden="true" />
              <div className="contact-panel__brand">
                <span className="contact-panel__brand-pulse" aria-hidden="true" />
                <span>{copy.terminalLabel}</span>
              </div>
              <div className="contact-panel__spectrum" aria-hidden="true">
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
                <span className="contact-panel__spectrum-bar" />
              </div>
              <div className="contact-panel__status">
                <span className="contact-panel__status-dot" aria-hidden="true" />
                <span>{copy.statusValue}</span>
              </div>
            </header>

            <div className="contact-panel__body">
              <div className="contact-panel__copy">
                <span className="contact-panel__copy-rule" aria-hidden="true" />
                <p>
                  {copy.body}
                </p>
                <p className="contact-panel__copy-meta">
                  {copy.bodyMeta}
                </p>
              </div>

              <div className="contact-panel__actions">
                <a
                  href={`mailto:${content.email}?subject=Project%20inquiry%20from%20portfolio`}
                  className="contact-action contact-action--primary"
                >
                  <span className="contact-action__index">TX-01</span>
                  <span className="contact-action__label">{copy.emailAction}</span>
                  <span className="contact-action__arrow" aria-hidden="true">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
                <a
                  href={`tel:${content.phone.replace(/\s/g, '')}`}
                  className="contact-action contact-action--ghost"
                >
                  <span className="contact-action__index">TX-02</span>
                  <span className="contact-action__label">{copy.phoneAction}</span>
                  <span className="contact-action__arrow" aria-hidden="true">
                    <Phone className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>

            <footer className="contact-panel__footer">
              <span>{copy.footerLabel}</span>
              <span className="contact-panel__footer-rule" aria-hidden="true" />
              <span>{content.email}</span>
            </footer>
          </article>
        </Reveal>

        <ol className="contact-channels" role="list">
          {channels.map((channel, i) => {
            const Icon = channel.icon
            const content = (
              <>
                <span className="contact-channel__icon" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="contact-channel__copy">
                  <span className="contact-channel__meta">{channel.meta}</span>
                  <span className="contact-channel__label">{channel.label}</span>
                  <span className="contact-channel__value">{channelLabel(channel)}</span>
                </div>
                <span className="contact-channel__arrow" aria-hidden="true">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </>
            )
            return (
              <li key={channel.label} className="contact-channel__item">
                <Reveal delay={100 + i * 90} blur>
                  {channel.href ? (
                    <a href={channel.href} className="contact-channel">
                      {content}
                    </a>
                  ) : (
                    <div className="contact-channel">
                      {content}
                    </div>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ol>

        <Reveal delay={140}>
          <div className="contact-wires">
            <span className="contact-wires__label">{copy.wiresLabel}</span>
            <span className="contact-wires__rule" aria-hidden="true" />
            <ul className="contact-wires__list" aria-label="Social links">
              {content.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-wire"
                  >
                    <span className="contact-wire__bullet" aria-hidden="true" />
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
