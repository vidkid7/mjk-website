'use client'
import { Quote } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import TiltCard from '@/components/fx/TiltCard'
import { pfTestimonials } from '@/lib/portfolio-content'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-16 border-y border-ink/10 bg-ink/[0.02] py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,rgba(196,102,31,0.05),transparent_40%)]"
      />
      <div className="portfolio-container">
        <Reveal>
          <SectionHeader index="05" eyebrow="Verified Reports" heading="What people say about working with me." />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pfTestimonials.map((item, i) => (
            <Reveal key={item.name} as="article" delay={i * 90} blur className="h-full">
              <TiltCard className="h-full" intensity={7}>
                <figure className="group relative flex h-full flex-col rounded-3xl border border-ink/10 bg-white/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-ember-500/40 hover:shadow-xl hover:shadow-ember-500/15">
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-6 font-fraunces text-7xl font-bold leading-none text-ember-500/15 transition-all duration-500 group-hover:text-ember-500/30 group-hover:drop-shadow-[0_0_14px_rgba(196,102,31,0.4)]"
                  >
                    ”
                  </span>

                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-ember-500/25 to-rose-500/25 text-ember-700">
                    <Quote className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">
                    Report {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <blockquote className="mt-6 flex-1 leading-relaxed text-night-200">
                  “{item.quote}”
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-ember-500 to-rose-500 font-fraunces text-base font-semibold text-white shadow-[0_0_16px_rgba(196,102,31,0.3)]">
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-fraunces font-semibold text-night-50">{item.name}</div>
                    <div className="mt-0.5 font-mono text-xs text-night-400">{item.role}</div>
                  </div>
                </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
