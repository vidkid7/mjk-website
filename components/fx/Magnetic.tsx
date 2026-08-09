'use client'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * Magnetic — children gently follow the cursor while hovered,
 * then spring back to rest on leave. Wraps buttons / links / icons.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const onLeave = () => {
    if (reduceMotion) return
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
