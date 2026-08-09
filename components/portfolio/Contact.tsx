'use client'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import FieldLabel from '@/components/portfolio/FieldLabel'
import Reveal from '@/components/portfolio/Reveal'
import { pfContact } from '@/lib/portfolio-content'

const infoCards = [
  {
    icon: Mail,
    label: 'Email',
    value: pfContact.email,
    href: `mailto:${pfContact.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: pfContact.phone,
    href: `tel:${pfContact.phone.replace(/\s/g, '')}`,
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: pfContact.location,
    href: undefined,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="portfolio-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ember-600 via-ember-500 to-rose-500 p-8 shadow-2xl shadow-ember-500/20 sm:p-12 lg:p-16">
            {/* Decorative texture */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="grid-backdrop absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_30%_20%,black,transparent_70%)]" />
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-rose-900/40 blur-3xl" />
              <div className="animate-float absolute right-16 top-12 hidden h-16 w-16 rounded-2xl border border-white/20 bg-white/10 backdrop-blur lg:block" />
              <div className="orbit-ring right-10 top-16 hidden h-28 w-28 animate-orbit lg:block" style={{ animationDuration: '30s' }}>
                <span className="orbit-dot -bottom-1 -right-1 h-2.5 w-2.5" />
              </div>
            </div>

            <div className="relative max-w-2xl">
              <FieldLabel index={pfContact.index} label="Project Channel" detail={pfContact.eyebrow} />

              <h2 className="mt-6 font-fraunces text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                {pfContact.heading}
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">{pfContact.blurb}</p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={`mailto:${pfContact.email}?subject=Project%20inquiry%20from%20portfolio`}
                  className="sheen group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-night-950/30 transition-all duration-300 hover:scale-[1.03] hover:bg-night-800"
                >
                  Start an email
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`tel:${pfContact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors duration-300 hover:bg-white/15"
                >
                  <Phone className="h-4 w-4" />
                  Call directly
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Info cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {infoCards.map((card, i) => {
            const Icon = card.icon
            const content = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-ember-500/20 to-rose-500/20 text-ember-700 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-wider text-night-400">
                    {card.label}
                  </span>
                  <span className="mt-1 block select-text text-sm font-medium text-night-50">{card.value}</span>
                </span>
              </>
            )

            const className =
              'group flex items-center gap-4 rounded-3xl border border-ink/10 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500/40 hover:bg-white/80'

            return (
              <Reveal key={card.label} delay={i * 80}>
                {card.href ? (
                  <a href={card.href} className={className}>
                    {content}
                  </a>
                ) : (
                  <div className={className}>{content}</div>
                )}
              </Reveal>
            )
          })}
        </div>

        {/* Socials */}
        <Reveal delay={160}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {pfContact.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-5 py-2.5 text-sm font-medium text-night-300 transition-all duration-300 hover:border-ember-500/50 hover:text-ember-700"
              >
                {social.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
