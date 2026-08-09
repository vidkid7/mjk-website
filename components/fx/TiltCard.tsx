'use client'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * TiltCard — optional cursor tilt with a tracked glare highlight.
 * Reduced-motion users receive the same card without pointer-driven transforms.
 */
export default function TiltCard({
  children,
  className = '',
  intensity = 10,
  glare = true,
}: {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 180,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 180,
    damping: 20,
  })
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduceMotion) {
    return <div className={`tilt-card ${className}`}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`tilt-card ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="tilt-glare"
          style={{ '--glare-x': glareX, '--glare-y': glareY } as React.CSSProperties}
        />
      )}
    </motion.div>
  )
}
