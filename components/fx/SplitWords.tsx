'use client'
import { motion, type Variants } from 'framer-motion'

const container: Variants = {
  hidden: {},
  visible: (i: number) => ({
    transition: { staggerChildren: 0.055, delayChildren: i * 0.06 },
  }),
}

const word: Variants = {
  hidden: { opacity: 0, y: '0.85em', rotateX: 25 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * SplitWords — kinetic per-word masked reveal for headings.
 * Each word lives inside an overflow-hidden line wrapper so the
 * whole set behaves like a single flowing block.
 */
export default function SplitWords({
  text,
  className = '',
  start = 0,
  highlight = [],
}: {
  text: string
  className?: string
  start?: number
  /** Word(s) rendered with the ember gradient treatment */
  highlight?: string[]
}) {
  const words = text.split(' ')
  const highlightSet = new Set(highlight)

  return (
    <motion.span
      custom={start}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: 'block' }}
    >
      {words.map((wordText, i) => (
        <span
          key={`${wordText}-${i}`}
          className="kinetic-line"
          style={{ display: 'inline-block' }}
        >
          <motion.span
            variants={word}
            style={{ display: 'inline-block' }}
            className={highlightSet.has(wordText) ? 'text-gradient-ember' : undefined}
          >
            {wordText}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}