'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/i18n/LanguageProvider'
import { translateKnown } from '@/lib/i18n-content'

const STATUS_SEQUENCE = [
  'BOOTING STUDIO',
  'CALIBRATING SIGNAL',
  'LOADING FIELD NOTES',
  'SYNCING HERITAGE',
  'READY',
]

export default function PortfolioLoadingScreen() {
  const { locale } = useLanguage()
  const reduceMotion = useReducedMotion() ?? false
  const [visible, setVisible] = useState(true)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const start = window.setTimeout(() => setVisible(false), reduceMotion ? 120 : 3200)
    return () => window.clearTimeout(start)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const interval = window.setInterval(() => {
      setStatusIndex((i) => Math.min(i + 1, STATUS_SEQUENCE.length - 1))
    }, 620)
    return () => window.clearInterval(interval)
  }, [reduceMotion])

  const [titleFirstName, ...titleSecondNames] = translateKnown('Mukesh Khadka', locale).split(/\s+/)
  const titleFirst = titleFirstName.split('')
  const titleSecond = titleSecondNames.join(' ').split('')

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="gateway-loader"
          initial={reduceMotion ? false : { opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04, filter: 'blur(8px)' }
          }
          transition={{ duration: reduceMotion ? 0.05 : 0.55, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-live="polite"
          aria-label={translateKnown('Initializing Mukesh Khadka portfolio', locale)}
        >
          {/* Grid + radial vignette */}
          <span className="gateway-loader__grid" aria-hidden="true" />
          <span className="gateway-loader__vignette" aria-hidden="true" />

          {/* Sweeping radar line */}
          <motion.span
            className="gateway-loader__radar"
            aria-hidden="true"
            initial={reduceMotion ? false : { rotate: 0, opacity: 0 }}
            animate={reduceMotion ? {} : { rotate: 360, opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 3.2, ease: 'linear' }}
          />

          {/* Horizontal scanning lines */}
          <motion.span
            className="gateway-loader__scanline gateway-loader__scanline--top"
            aria-hidden="true"
            initial={reduceMotion ? false : { y: '-50%', opacity: 0 }}
            animate={reduceMotion ? {} : { y: '150%', opacity: [0, 0.55, 0] }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
          <motion.span
            className="gateway-loader__scanline gateway-loader__scanline--bottom"
            aria-hidden="true"
            initial={reduceMotion ? false : { y: '150%', opacity: 0 }}
            animate={reduceMotion ? {} : { y: '-50%', opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.6 }}
          />

          {/* Top label line */}
          <motion.div
            className="gateway-loader__topline"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="gateway-loader__top-tag">
              <span className="gateway-loader__pulse" aria-hidden="true" />
              MK / 2026
            </span>
            <span className="gateway-loader__top-meta">INITIALIZING PORTFOLIO</span>
            <span className="gateway-loader__top-tag">
              <span className="gateway-loader__counter" aria-hidden="true">
                {String(statusIndex + 1).padStart(2, '0')}/{String(STATUS_SEQUENCE.length).padStart(2, '0')}
              </span>
            </span>
          </motion.div>

          {/* Core composition */}
          <div className="gateway-loader__core">
            {/* Orbiting satellites */}
            <motion.span
              className="gateway-loader__orbit gateway-loader__orbit--one"
              aria-hidden="true"
              initial={reduceMotion ? false : { rotate: 0, opacity: 0 }}
              animate={reduceMotion ? {} : { rotate: 360, opacity: 1 }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
            >
              <span className="gateway-loader__orbit-dot" />
            </motion.span>
            <motion.span
              className="gateway-loader__orbit gateway-loader__orbit--two"
              aria-hidden="true"
              initial={reduceMotion ? false : { rotate: 180, opacity: 0 }}
              animate={reduceMotion ? {} : { rotate: 540, opacity: 1 }}
              transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
            >
              <span className="gateway-loader__orbit-dot" />
            </motion.span>
            <motion.span
              className="gateway-loader__orbit gateway-loader__orbit--three"
              aria-hidden="true"
              initial={reduceMotion ? false : { rotate: 90, opacity: 0 }}
              animate={reduceMotion ? {} : { rotate: -270, opacity: 1 }}
              transition={{ duration: 9, ease: 'linear', repeat: Infinity }}
            >
              <span className="gateway-loader__orbit-dot" />
            </motion.span>

            {/* Crosshairs at compass points */}
            <span className="gateway-loader__crosshair gateway-loader__crosshair--n" aria-hidden="true" />
            <span className="gateway-loader__crosshair gateway-loader__crosshair--e" aria-hidden="true" />
            <span className="gateway-loader__crosshair gateway-loader__crosshair--s" aria-hidden="true" />
            <span className="gateway-loader__crosshair gateway-loader__crosshair--w" aria-hidden="true" />

            {/* Heritage mark */}
            <motion.div
              className="gateway-loader__mark"
              initial={reduceMotion ? false : { scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="gateway-loader__mark-frame" aria-hidden="true" />
              <span className="gateway-loader__mark-corner gateway-loader__mark-corner--tl" aria-hidden="true" />
              <span className="gateway-loader__mark-corner gateway-loader__mark-corner--tr" aria-hidden="true" />
              <span className="gateway-loader__mark-corner gateway-loader__mark-corner--bl" aria-hidden="true" />
              <span className="gateway-loader__mark-corner gateway-loader__mark-corner--br" aria-hidden="true" />
              <img src="/heritage-mark-generated-v2.png" alt="" />
            </motion.div>

            {/* Kinetic headline */}
            <strong className="gateway-loader__title">
              <span className="gateway-loader__title-row">
                {titleFirst.map((char, i) => (
                  <motion.span
                    key={`f-${i}`}
                    className="gateway-loader__char"
                    initial={reduceMotion ? false : { opacity: 0, y: '1.1em', rotateX: -45 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.55, delay: 0.4 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
              </span>
              <span className="gateway-loader__title-row gateway-loader__title-row--accent">
                {titleSecond.map((char, i) => (
                  <motion.span
                    key={`s-${i}`}
                    className="gateway-loader__char gateway-loader__char--accent"
                    initial={reduceMotion ? false : { opacity: 0, y: '1.1em', rotateX: -45 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.55, delay: 0.62 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  className="gateway-loader__title-cursor"
                  aria-hidden="true"
                  initial={reduceMotion ? false : { opacity: 0, scaleY: 0 }}
                  animate={reduceMotion ? {} : { opacity: [0, 1, 1, 0], scaleY: [0, 1, 1, 1] }}
                  transition={{ duration: 1.6, delay: 1.05, times: [0, 0.1, 0.9, 1] }}
                />
              </span>
            </strong>
          </div>

          {/* Bottom line */}
          <motion.div
            className="gateway-loader__bottomline"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="gateway-loader__bottom-meta">ORIGIN SIGNAL / KATHMANDU</span>
            <span className="gateway-loader__bottom-status">
              <span className="gateway-loader__status-blink" aria-hidden="true" />
              {STATUS_SEQUENCE[statusIndex]}
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="gateway-loader__progress" aria-hidden="true">
            <span className="gateway-loader__progress-track" />
            <motion.span
              className="gateway-loader__progress-fill"
              initial={reduceMotion ? false : { width: '0%' }}
              animate={reduceMotion ? { width: '100%' } : { width: '100%' }}
              transition={{ duration: reduceMotion ? 0.1 : 2.6, ease: [0.65, 0, 0.35, 1] }}
            >
              <span className="gateway-loader__progress-glow" />
            </motion.span>
            <span className="gateway-loader__progress-marker" aria-hidden="true" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
