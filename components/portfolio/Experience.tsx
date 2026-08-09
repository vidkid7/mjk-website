'use client'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import { pfExperience } from '@/lib/portfolio-content'

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-16 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_30%,rgba(176,61,47,0.05),transparent_40%)]"
      />
      <div className="portfolio-container">
        <Reveal>
          <SectionHeader index="04" eyebrow="Operational History" heading="A timeline of the work that shaped me." />
        </Reveal>

        <div className="relative mt-16">
          {/* Timeline spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[11px] top-2 w-px bg-gradient-to-b from-ember-500 via-rose-500/60 to-transparent shadow-[0_0_12px_rgba(196,102,31,0.35)]"
          />

          <ol className="space-y-12">
            {pfExperience.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 100} blur>
                  <article className="group relative pl-12">
                  {/* Node */}
                    <span className="checkpoint-marker absolute left-0 top-2 grid h-6 w-6 place-items-center" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-500/30 opacity-60 motion-reduce:animate-none group-hover:opacity-100" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-ember-600 bg-ember-500 shadow-[0_0_12px_rgba(196,102,31,0.6)]" />
                  </span>

                  <div className="rounded-3xl border border-ink/10 bg-white/60 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-ember-500/30 hover:bg-white/80 hover:shadow-xl hover:shadow-ember-500/10 sm:p-8">
                    <dl className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Period</dt>
                        <dd className="inline-flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/10 px-3.5 py-1 font-mono text-xs font-semibold tracking-wide text-ember-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-ember-500 shadow-[0_0_8px_rgba(196,102,31,0.6)]" />
                          {item.period}
                        </dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">Organization</dt>
                        <dd className="font-mono text-xs text-night-400">{item.org}</dd>
                      </div>
                    </dl>

                    <h3 className="mt-4 font-fraunces text-2xl font-semibold tracking-tight text-night-50 transition-colors duration-300 group-hover:text-ember-600">
                      {item.title}
                    </h3>

                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-night-300">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-500" aria-hidden="true" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
