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
  crimson: { pill: 'bg-crimson-50 text-crimson border-crimson-100', line: 'from-crimson to-crimson-light' },
  blue: { pill: 'bg-blue-50 text-blue-600 border-blue-100', line: 'from-blue-500 to-violet' },
  gold: { pill: 'bg-gold-50 text-gold-dark border-amber-200', line: 'from-gold to-gold-light' },
  emerald: { pill: 'bg-emerald-50 text-emerald border-emerald-light/30', line: 'from-emerald to-emerald-light' },
}

export function SectionHeading({ pill, heading, subheading, dark = false, centered = true, accent = 'crimson' }: SectionHeadingProps) {
  const colors = accentColors[accent]

  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={fadeInUp.transition}
      className={`${centered ? 'text-center' : ''} mb-14 md:mb-20`}
    >
      {pill && (
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
          dark 
            ? 'bg-white/10 text-white/70 border border-white/10' 
            : `${colors.pill} border`
        }`}>
          <Sparkles size={12} className="opacity-60" />
          {pill}
        </span>
      )}
      <h2 className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
        dark ? 'text-white' : 'text-slate-900'
      }`}>
        {heading}
      </h2>
      {/* Accent line */}
      <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${colors.line} ${centered ? 'mx-auto' : ''} mb-5`} />
      {subheading && (
        <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${
          dark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {subheading}
        </p>
      )}
    </motion.div>
  )
}
