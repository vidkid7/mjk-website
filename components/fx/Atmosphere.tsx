'use client'
import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

// Deterministic pseudo-random so SSR and client render identical dust.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const DUST = 44
const EMBERS = 12

export default function Atmosphere() {
  const reduceMotion = useReducedMotion()
  const { dust, embers } = useMemo(() => {
    const rand = mulberry32(20260806)
    const dust = Array.from({ length: DUST }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 2.2,
      delay: rand() * 5,
      duration: 2.4 + rand() * 3.4,
      warm: rand() > 0.72,
    }))
    const embers = Array.from({ length: EMBERS }, (_, i) => ({
      id: i,
      left: 4 + rand() * 92,
      size: 2.5 + rand() * 5,
      delay: -rand() * 14,
      duration: 10 + rand() * 9,
    }))
    return { dust, embers }
  }, [])

  return (
    <div aria-hidden="true" className="portfolio-atmosphere">
      <div className="portfolio-atmosphere__bloom portfolio-atmosphere__bloom--gold" />
      <div className="portfolio-atmosphere__bloom portfolio-atmosphere__bloom--crimson" />

      <div>
        {dust.map((mote) => (
          <span
            key={mote.id}
            className={`portfolio-atmosphere__dust${mote.warm ? ' portfolio-atmosphere__dust--gold' : ''}`}
            style={{
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              opacity: 0.35,
              animation: reduceMotion ? 'none' : `twinkle ${mote.duration}s ease-in-out ${mote.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {embers.map((ember) => (
        <span
          key={ember.id}
          className="portfolio-atmosphere__ember"
          style={{
            left: `${ember.left}%`,
            width: ember.size,
            height: ember.size,
            animation: reduceMotion ? 'none' : `ember-rise ${ember.duration}s linear ${ember.delay}s infinite`,
            opacity: 0.55,
          }}
        />
      ))}

      <div className="portfolio-atmosphere__haze" />
    </div>
  )
}
