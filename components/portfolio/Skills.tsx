'use client'
import { Database, Layers, PenTool, Workflow } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import Marquee from '@/components/portfolio/Marquee'
import TiltCard from '@/components/fx/TiltCard'
import { pfSkills } from '@/lib/portfolio-content'

const icons = [Layers, Database, PenTool, Workflow]

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-16 border-y border-ink/10 bg-ink/[0.02] py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(196,102,31,0.06),transparent_40%)]"
      />
      <div className="portfolio-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeader index="03" eyebrow="System Inventory" heading="What I can help you with." />
          </Reveal>
          <Reveal delay={100}>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-night-400">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-ember-500" />
              Inventory ready
            </div>
          </Reveal>
        </div>

        <Reveal delay={110}>
          <dl aria-label="System inventory metadata" className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-y border-ink/10 py-4">
            <div className="flex items-baseline gap-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">Categories</dt>
              <dd className="text-sm font-semibold text-night-100">{pfSkills.disciplines.length}</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">Tools in rotation</dt>
              <dd className="text-sm font-semibold text-night-100">{pfSkills.toolbox.length}</dd>
            </div>
          </dl>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pfSkills.disciplines.map((discipline, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={discipline.title} delay={i * 80} blur className="h-full">
                <TiltCard className="h-full" intensity={8}>
                  <div className="group relative flex h-full flex-col rounded-3xl border border-ink/10 bg-white/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ember-500/40 hover:shadow-xl hover:shadow-ember-500/15">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-500/0 to-transparent transition-all duration-500 group-hover:via-ember-500/60"
                    />
                    <div className="flex items-center justify-between">
                      <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-ember-500/20 to-rose-500/20 text-ember-700 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                        <span className="absolute inset-0 rounded-2xl bg-ember-500/0 blur-md transition-colors duration-300 group-hover:bg-ember-500/25" />
                      </span>
                      <span className="display-number font-mono text-sm font-semibold text-night-500 transition-colors duration-300 group-hover:text-ember-600">
                        Category {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-6 font-fraunces text-xl font-semibold tracking-tight text-night-50">
                      {discipline.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-night-300">{discipline.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>

        {/* Toolbox marquee */}
        <Reveal delay={120} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white/60">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
            />
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-7 py-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ember-700">Toolbox</span>
              <span className="font-mono text-xs text-night-500">{pfSkills.toolbox.length} tools in rotation</span>
            </div>
            <Marquee items={pfSkills.toolbox} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
