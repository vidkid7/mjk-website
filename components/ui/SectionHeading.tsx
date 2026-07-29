'use client'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { Sparkles } from 'lucide-react'

interface SectionHeadingProps {
  pill?: string
  heading: string
  subheading?: string
  dark?: boolean
  centered?: boolean
  accent?: 'crimson' | 'blue' | 'gold' | 'emerald'
}

const accentColors = {
  crimson: { pill: 'text-crimson border-crimson-100', line: 'from-crimson to-[#003893]' },
  blue: { pill: 'text-blue-700 border-blue-100', line: 'from-[#003893] to-crimson' },
  gold: { pill: 'text-gold-dark border-amber-200', line: 'from-gold to-crimson' },
  emerald: { pill: 'text-emerald border-emerald-light/30', line: 'from-emerald to-[#003893]' },
}

export function SectionHeading({ pill, heading, subheading, dark = false, centered = true, accent = 'crimson' }: SectionHeadingProps) {
  const colors = accentColors[accent]

  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={fadeInUp.transition}
      className={`${centered ? 'text-center' : ''} mb-10 md:mb-14`}
    >
      {pill && (
        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase mb-4 ${
          dark
            ? 'glass glass-dark text-white/70 border border-white/10'
            : `glass-inset ${colors.pill} border`
        }`}>
          <Sparkles size={12} className="opacity-60" />
          {pill}
        </span>
      )}
      <h2 className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight ${
        dark ? 'text-white' : 'text-slate-900'
      }`}>
        {heading}
      </h2>
      {/* Accent line */}
      <div className={`h-1 w-14 rounded-full bg-gradient-to-r shadow-sm ${colors.line} ${centered ? 'mx-auto' : ''} mb-5`} />
      {subheading && (
        <p className={`text-sm md:text-base max-w-2xl leading-7 ${centered ? 'mx-auto' : ''} ${
          dark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {subheading}
        </p>
      )}
    </motion.div>
  )
}
