'use client'

import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import Magnetic from '@/components/fx/Magnetic'
import SignalPill from '@/components/portfolio/SignalPill'
import type { PublicHero, PublicSite } from '@/lib/public-content'

const DUST_PATHS = [
  { x: -2.2, y: 1.25, rotate: -9, scale: 0.72 },
  { x: 1.8, y: -1.05, rotate: 8, scale: 0.84 },
  { x: -1.3, y: -1.65, rotate: 12, scale: 0.68 },
  { x: 2.35, y: 1.45, rotate: -13, scale: 0.78 },
  { x: -2.8, y: -0.35, rotate: 6, scale: 0.74 },
  { x: 1.15, y: 1.85, rotate: -7, scale: 0.88 },
  { x: -1.95, y: 0.7, rotate: 11, scale: 0.8 },
]

const segmentGraphemes = (text: string) =>
  Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text), ({ segment }) => segment)

function DustWord({
  text,
  className,
  lane,
  typeOffset = 0,
}: {
  text: string
  className: string
  lane: 'front' | 'back'
  typeOffset?: number
}) {
  return (
    <span className={className} aria-hidden="true">
      {segmentGraphemes(text).map((char, index) => {
        const path = DUST_PATHS[index % DUST_PATHS.length]
        const direction = lane === 'front' ? 1 : -1
        const style = {
          '--dust-x': `${(path.x * direction).toFixed(2)}em`,
          '--dust-y': `${path.y.toFixed(2)}em`,
          '--dust-rotate': `${path.rotate * direction}deg`,
          '--dust-scale': path.scale,
          '--dust-delay': `${(index * 0.045 + (lane === 'back' ? 0.08 : 0)).toFixed(2)}s`,
          '--wave-delay': `${((index % 6) * 0.08).toFixed(2)}s`,
          '--type-delay': `${(typeOffset + index * 0.12).toFixed(2)}s`,
        } as CSSProperties

        return (
          <span className="gateway-title__dust" key={`${lane}-${index}`} style={style}>
            <span className="gateway-title__dust-wave gateway-title__typewriter-letter">
              {char === ' ' ? '\u00a0' : char}
            </span>
          </span>
        )
      })}
    </span>
  )
}

export default function PortfolioHero({ content, site }: { content: PublicHero; site: PublicSite }) {
  const reduceMotion = useReducedMotion() ?? false
  const [headlineFront, ...headlineBack] = content.headline.split(' ')

  return (
    <section id="top" className="gateway-hero relative overflow-hidden">
      <div aria-hidden="true" className="gateway-crosshair gateway-crosshair--one" />
      <div aria-hidden="true" className="gateway-crosshair gateway-crosshair--two" />
      <div aria-hidden="true" className="gateway-scanline" />

      <div className="gateway-hero__heritage" aria-hidden="true">
        <motion.img
          className="gateway-hero__heritage-flag"
          src="/cultural/nepal-flag-transparent.png"
          alt=""
          loading="eager"
          decoding="async"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 0.96, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
        />
        <motion.img
          className="gateway-hero__heritage-environment"
          src="/cultural/janaki-everest-water-environment.png"
          alt=""
          initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        />
        <motion.div
          className="gateway-hero__heritage-shadow-layer"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
        >
          <img
            className="gateway-hero__heritage-buddha-shadow"
            src="/cultural/buddha-profile-left.png"
            alt=""
            aria-hidden="true"
          />
        </motion.div>
        <motion.div
          className="gateway-hero__heritage-figures"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 0.92, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
        >
          <img className="gateway-hero__heritage-person" src={content.portrait} alt="" />
        </motion.div>
      </div>

      <div className="portfolio-container gateway-stage relative">
        <motion.div
          className="gateway-status-row"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.35 }}
        >
          <SignalPill label={site.availability} href={site.availabilityHref} />
          <span className="gateway-status-row__case">MK / 2026</span>
        </motion.div>

        <div className="gateway-composition">
          <motion.div
            className="gateway-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
          >
            <motion.h1
              className="gateway-title gateway-title--ember noir-display"
              aria-label={content.headline}
              initial={reduceMotion ? false : { opacity: 0, y: '110%', filter: 'blur(0.5rem)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0rem)' }}
              transition={{ duration: reduceMotion ? 0 : 2.1, delay: reduceMotion ? 0 : 3.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span aria-hidden="true" className="gateway-title__ember-aura" />
              <span aria-hidden="true" className="gateway-title__ember-field">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <DustWord
                text={headlineFront}
                className="gateway-title__front gateway-title__typewriter"
                lane="front"
              />
              <DustWord
                text={headlineBack.join(' ')}
                className="gateway-title__back gateway-title__typewriter"
                lane="back"
                typeOffset={segmentGraphemes(headlineFront).length * 0.12 + 0.22}
              />
            </motion.h1>
          </motion.div>

        </div>
      </div>

      <motion.div
        className="gateway-hero-ctas"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.7, ease: 'easeOut' }}
      >
        <a href={content.ctaPrimary.href} className="gateway-hero-cta gateway-hero-cta--about">
          <span className="gateway-hero-cta__label">{content.ctaPrimary.label}</span>
          <ArrowDown className="gateway-hero-cta__icon h-4 w-4" aria-hidden="true" />
        </a>
        <a href={content.ctaSecondary.href} className="gateway-hero-cta gateway-hero-cta--contact">
          <span className="gateway-hero-cta__label">{content.ctaSecondary.label}</span>
          <ArrowUpRight className="gateway-hero-cta__icon h-4 w-4" aria-hidden="true" />
        </a>
      </motion.div>

    </section>
  )
}
