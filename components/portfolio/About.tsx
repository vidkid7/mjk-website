'use client'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import TiltCard from '@/components/fx/TiltCard'
import { pfAbout, pfMeta } from '@/lib/portfolio-content'

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-16 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ember-500/40 to-transparent"
      />
      <div className="portfolio-container grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait */}
        <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0 lg:sticky lg:top-24">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-t-[12rem] rounded-b-[2.5rem] bg-gradient-to-b from-ember-500/30 via-rose-500/15 to-transparent blur-2xl"
            />
            <TiltCard className="relative" intensity={7}>
              <div className="relative overflow-hidden rounded-t-[12rem] rounded-b-[2.5rem] border border-ink/10 bg-night-900/60 shadow-2xl shadow-ink/25">
                <div className="grain-overlay absolute inset-0" />
                <img
                  src={pfAbout.portrait}
                  alt="Portrait of Mukesh Khadka"
                  className="h-[24rem] w-full object-cover object-top sm:h-[28rem]"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night-950/70 to-transparent" />
              </div>
            </TiltCard>

            <div className="glass-night absolute -bottom-5 left-1/2 flex w-max -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-3.5 shadow-xl shadow-ink/20">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ember-500 to-rose-500 text-white">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div>
                <div className="display-number font-fraunces text-lg font-semibold leading-none text-night-50">7+ yrs</div>
                <div className="mt-1 text-xs text-night-300">building real products</div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-6 -top-6 -z-10 h-20 w-20 rounded-2xl border border-ember-500/30"
            />
          </div>
        </Reveal>

        {/* Content */}
        <div>
          <Reveal delay={80}>
            <SectionHeader index={pfAbout.index} eyebrow="Operator Profile" heading={pfAbout.heading} />
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-7 space-y-5">
              {pfAbout.paragraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-night-300">
                  {i === 0 ? (
                    <span className="float-left mr-3 mt-1 font-fraunces text-6xl font-semibold leading-[0.8] text-ember-600">
                      “
                    </span>
                  ) : null}
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <dl aria-label="Operator metadata" className="mt-9 grid gap-3 border-y border-ink/10 py-4 sm:grid-cols-3">
              {[
                ['Location', 'Kathmandu, Nepal'],
                ['Experience', '7+ years'],
                ['Organizations served', '26+'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-3 sm:block">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-night-100">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {pfAbout.highlights.map((point) => (
                <div
                  key={point}
                  className="group flex items-start gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4 transition-colors duration-300 hover:border-ember-500/40 hover:bg-ember-500/10"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500 shadow-[0_0_8px_rgba(196,102,31,0.5)]" />
                  <span className="text-sm font-medium text-night-100">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <a
              href={pfAbout.resumeHref}
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-ember-700 transition-colors hover:text-ember-600"
            >
              Contact {pfMeta.name}
              <span className="grid h-8 w-8 place-items-center rounded-full border border-ember-500/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
