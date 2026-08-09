'use client'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function CursorGlow() {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.4 })

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (reduceMotion || !hasFinePointer) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduceMotion, x, y])

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow hidden md:block"
      style={{ x: springX, y: springY }}
    />
  )
}
