'use client'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import TiltCard from '@/components/fx/TiltCard'
import { pfProjects } from '@/lib/portfolio-content'

export default function Projects() {
  return (
    <section id="work" className="relative scroll-mt-16 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(196,102,31,0.07),transparent_40%),radial-gradient(circle_at_10%_85%,rgba(176,61,47,0.05),transparent_40%)]"
      />
      <div className="portfolio-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeader index="02" eyebrow="Field Files" heading="Evidence from projects designed and shipped." />
          </Reveal>
          <Reveal delay={100}>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-night-400">
              2022 — 2025 · GovTech to Fintech
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pfProjects.map((project, i) => {
            const featured = i === 0
            const titleId = `project-${i}-title`

            return (
              <article
                key={project.title}
                aria-labelledby={titleId}
                className={featured ? 'h-full lg:col-span-2 lg:row-span-2' : 'h-full'}
              >
                <Reveal delay={(i % 3) * 90} blur className="h-full">
                  <TiltCard className="h-full" intensity={featured ? 5 : 9}>
                    <div
                      className={`group relative flex h-full flex-col rounded-3xl border border-ink/10 bg-white/60 p-7 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-ember-500/40 hover:shadow-2xl hover:shadow-ember-500/15 sm:p-8 ${
                        featured ? 'conic-border min-h-[26rem] bg-night-900/40' : ''
                      }`}
                    >
                      <div className="relative">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ember-700">
                          File {String(i + 1).padStart(2, '0')} · {project.category} · {project.year}
                        </p>
                        <h3
                          id={titleId}
                          className="mt-5 font-fraunces text-2xl font-semibold leading-tight tracking-tight text-night-50 transition-colors duration-300 group-hover:text-ember-600 sm:text-[1.7rem]"
                        >
                          {project.title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-night-300">{project.description}</p>
                        <p className="mt-4 rounded-2xl border border-ember-500/20 bg-ember-500/[0.07] px-4 py-3 text-sm leading-relaxed text-ember-800">
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-700">
                            Outcome ·{' '}
                          </span>
                          {project.outcome}
                        </p>
                      </div>

                      <div className="relative mt-6 flex flex-wrap items-end justify-between gap-5">
                        <ul aria-label="Technologies and capabilities" className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-ink/10 bg-night-900/60 px-3 py-1 text-xs font-medium text-night-300 transition-colors duration-300 group-hover:border-ember-500/30"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#contact"
                          aria-label={`Discuss ${project.title}`}
                          className="inline-flex items-center gap-2 rounded-full border border-ember-500/45 bg-white/80 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ember-700 transition-colors hover:border-ember-500 hover:bg-ember-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-500"
                        >
                          VIEW FILE
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
