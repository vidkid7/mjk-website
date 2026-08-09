'use client'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import SplitWords from '@/components/fx/SplitWords'
import TiltCard from '@/components/fx/TiltCard'
import Magnetic from '@/components/fx/Magnetic'
import FieldLabel from '@/components/portfolio/FieldLabel'
import SignalPill from '@/components/portfolio/SignalPill'
import { pfHero, pfMeta } from '@/lib/portfolio-content'

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduceMotion])

  return (
    <span ref={ref} className="display-number">
      {display}
      {suffix && <span className="text-ember-500">{suffix}</span>}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

function StaticTiltCard({ children, className }: { children: ReactNode; className?: string; intensity?: number }) {
  return <div className={className}>{children}</div>
}

export default function PortfolioHero() {
  const reduceMotion = useReducedMotion()
  const PortraitCard = reduceMotion ? StaticTiltCard : TiltCard

  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      {/* Warm heritage backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(196,102,31,0.16),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(176,61,47,0.1),transparent_42%),radial-gradient(circle_at_70%_90%,rgba(217,138,43,0.1),transparent_45%)]" />
        <div className="animate-aurora absolute -left-32 top-10 h-96 w-96 rounded-full bg-ember-500/15 blur-[110px]" />
        <div className="animate-aurora absolute -right-24 top-40 h-80 w-80 rounded-full bg-rose-500/10 blur-[100px]" />
        <div className="grid-backdrop absolute inset-x-0 top-0 h-[42rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="portfolio-container relative grid items-center gap-12 pb-10 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-16">
        {/* Copy */}
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div custom={0} variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <SignalPill label={pfMeta.availability} />
            <FieldLabel label="SYSTEM ONLINE" detail="KATHMANDU / NEPAL" />
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-6 font-fraunces text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-night-50 sm:text-6xl lg:text-[4.5rem]"
          >
            {reduceMotion ? pfHero.headline : <SplitWords text={pfHero.headline} start={1} highlight={['always', 'belonged.']} />}
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-night-300">
            {pfHero.subheadline}
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={pfHero.ctaPrimary.href}
                className="sheen group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-ember-500 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ember-500/30 transition-all duration-300 hover:shadow-ember-500/50"
              >
                <span className="relative z-10">{pfHero.ctaPrimary.label}</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={pfHero.ctaSecondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-colors duration-300 hover:border-ember-500/50 hover:text-ember-700"
              >
                {pfHero.ctaSecondary.label}
                <ArrowDown className="h-4 w-4" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
            {pfMeta.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1.5 text-sm text-night-400 transition-colors hover:text-ember-600"
              >
                {social.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait — temple-door arch over the waving flag */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative">
            {/* Orbit rings */}
            <div aria-hidden="true" className="orbit-ring -left-8 -top-8 h-24 w-24 animate-orbit">
              <span className="orbit-dot -right-1 -top-1 h-3 w-3" />
            </div>
            <div
              aria-hidden="true"
              className="orbit-ring -bottom-10 -right-6 h-32 w-32 animate-orbit"
              style={{ animationDirection: 'reverse', animationDuration: '34s' }}
            >
              <span className="orbit-dot -bottom-1 -left-1 h-2.5 w-2.5" />
            </div>

            <PortraitCard className="relative" intensity={8}>
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-[0.97] rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-br from-ember-500/40 via-rose-500/30 to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] border border-ink/10 bg-night-900/60 shadow-2xl shadow-ink/25 backdrop-blur">
                {/* Waving flag as living heritage backdrop */}
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/nepal-flag-hero-bg-optimized.mp4"
                  poster="/nepal-flag-wave.png"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
                {/* Warm paper veil so the cutout reads clearly */}
                <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/55 to-paper/25" />
                <div className="grain-overlay absolute inset-0" />
                <img
                  src={pfHero.portrait}
                  alt="Portrait of Mukesh Khadka"
                  className="relative mx-auto h-[26rem] w-full object-contain object-bottom sm:h-[32rem] lg:h-[36rem]"
                  loading="eager"
                />
              </div>
            </PortraitCard>

            {/* Floating badge — top */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-night absolute -left-3 top-10 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl shadow-ink/20 sm:-left-8"
              style={reduceMotion ? undefined : { transform: 'translateZ(40px)' }}
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-ember-500 to-rose-500 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-night-100">
                Software &<br />
                <span className="text-night-400">Digital Systems</span>
              </span>
            </motion.div>

            {/* Floating badge — bottom */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="glass-night absolute -bottom-5 -right-3 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl shadow-ink/20 sm:-right-6"
              style={reduceMotion ? undefined : { transform: 'translateZ(60px)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember-400" />
              </span>
              <span className="text-xs font-medium text-night-100">
                {pfMeta.location}
              </span>
            </motion.div>
          </div>

          <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-night-400">
            मेरो देश · मेरो गौरव
          </p>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-ink/10 bg-ink/[0.02]">
        <div className="grid-backdrop absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent)]" aria-hidden="true" />
        <div className="portfolio-container relative grid grid-cols-2 gap-px sm:grid-cols-4">
          {pfHero.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center py-8 text-center"
            >
              <div className="font-fraunces text-4xl font-semibold text-night-50 transition-colors duration-300 group-hover:text-ember-600 sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1.5 max-w-[11rem] text-sm text-night-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
