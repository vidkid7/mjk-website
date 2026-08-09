'use client'
import { Landmark, Mountain, Sparkles } from 'lucide-react'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import TiltCard from '@/components/fx/TiltCard'
import { pfCulture } from '@/lib/portfolio-content'

export default function Culture() {
  return (
    <section id="culture" className="relative scroll-mt-16 border-y border-ink/10 bg-ink/[0.02] py-20 sm:py-28">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(196,102,31,0.06),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(176,61,47,0.04),transparent_40%)]"
      />

      <div className="portfolio-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeader index={pfCulture.index} eyebrow="Origin Coordinates" heading={pfCulture.heading} />
          </Reveal>
          <Reveal delay={100}>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-fraunces text-2xl text-ember-700" aria-hidden="true">
                {pfCulture.nepaliWord}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-night-400">
                मेरो देश · मेरो गौरव
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl leading-relaxed text-night-300">{pfCulture.blurb}</p>
        </Reveal>

        {/* Bento grid */}
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Flag video — wide feature tile */}
          <Reveal className="lg:col-span-7" blur>
            <TiltCard className="h-full" intensity={4}>
              <div className="group relative h-full min-h-[22rem] overflow-hidden rounded-3xl border border-ink/10 bg-night-900/60 shadow-2xl shadow-ink/25 sm:min-h-[26rem]">
                {/* Video */}
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={pfCulture.flag.video}
                  poster={pfCulture.flag.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
                {/* Cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-night-950/40" />
                <div className="grain-overlay absolute inset-0" />

                {/* Top badge */}
                <div className="absolute left-6 top-6 flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ember-500 to-rose-500 text-white shadow-lg shadow-ember-500/30">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 21V4.5L10 8l7-3.5V18L10 21.5 3 21z" />
                      <path d="M10 8v13.5M17 4.5V18" />
                    </svg>
                  </span>
                  <span className="rounded-full border border-ink/10 bg-paper/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink backdrop-blur">
                    Animated
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-700">The only non-rectangular flag on Earth</p>
                  <h3 className="mt-2 font-fraunces text-3xl font-semibold text-night-50 sm:text-4xl">
                    {pfCulture.flag.title}
                  </h3>
                  <p className="mt-2 text-sm text-night-200/80">{pfCulture.flag.caption}</p>
                </div>

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(196,102,31,0.35)' }}
                />
              </div>
            </TiltCard>
          </Reveal>

          {/* Janaki temple — tall tile */}
          <Reveal className="lg:col-span-5" delay={100} blur>
            <TiltCard className="h-full" intensity={6}>
              <figure className="group relative h-full min-h-[16rem] overflow-hidden rounded-3xl border border-ink/10 bg-night-900/60 shadow-xl shadow-ink/25">
                <img
                  src={pfCulture.tiles[0].image}
                  alt={pfCulture.tiles[0].title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-ember-700" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ember-700">{pfCulture.tiles[0].location}</span>
                  </div>
                  <h3 className="mt-1.5 font-fraunces text-xl font-semibold text-night-50">{pfCulture.tiles[0].title}</h3>
                  <p className="mt-1 text-sm text-night-200/70">{pfCulture.tiles[0].caption}</p>
                </figcaption>
              </figure>
            </TiltCard>
          </Reveal>

          {/* Everest + Buddha — two half tiles */}
          <Reveal className="lg:col-span-6" delay={120} blur>
            <TiltCard className="h-full" intensity={6}>
              <figure className="group relative h-full min-h-[16rem] overflow-hidden rounded-3xl border border-ink/10 bg-night-900/60 shadow-xl shadow-ink/25">
                <img
                  src={pfCulture.tiles[1].image}
                  alt={pfCulture.tiles[1].title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-2">
                    <Mountain className="h-4 w-4 text-ember-700" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ember-700">{pfCulture.tiles[1].location}</span>
                  </div>
                  <h3 className="mt-1.5 font-fraunces text-xl font-semibold text-night-50">{pfCulture.tiles[1].title}</h3>
                  <p className="mt-1 text-sm text-night-200/70">{pfCulture.tiles[1].caption}</p>
                </figcaption>
              </figure>
            </TiltCard>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={160} blur>
            <TiltCard className="h-full" intensity={6}>
              <figure className="group relative h-full min-h-[16rem] overflow-hidden rounded-3xl border border-ink/10 bg-night-900/60 shadow-xl shadow-ink/25">
                <img
                  src={pfCulture.tiles[2].image}
                  alt={pfCulture.tiles[2].title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-ember-700" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ember-700">{pfCulture.tiles[2].location}</span>
                  </div>
                  <h3 className="mt-1.5 font-fraunces text-xl font-semibold text-night-50">{pfCulture.tiles[2].title}</h3>
                  <p className="mt-1 text-sm text-night-200/70">{pfCulture.tiles[2].caption}</p>
                </figcaption>
              </figure>
            </TiltCard>
          </Reveal>
        </div>

        {/* Bottom marquee-style strip of cultural pride */}
        <Reveal delay={120} className="mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-ember-500/20 bg-ember-500/[0.05] px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {['🇳🇵 Nepal', '🏔️ Sagarmāthā', '☸️ Lumbini', '🏛️ Janakpur', '🪷 Heritage'].map((item) => (
                <span key={item} className="text-sm font-medium text-night-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
