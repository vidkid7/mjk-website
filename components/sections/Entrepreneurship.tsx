'use client'
import { motion } from 'framer-motion'
import { Rocket, Users, TrendingUp, Quote, Briefcase, ArrowUpRight, Building2, Zap } from 'lucide-react'
import { useState } from 'react'

const businesses = [
  {
    icon: Rocket,
    title: 'Nepal Tech Ventures',
    desc: 'A technology startup incubator that has launched 20+ companies and created 500+ jobs in the tech sector.',
    stat: '20+',
    statLabel: 'Companies Launched',
    gradient: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-500/10',
    color: 'text-blue-400',
  },
  {
    icon: Users,
    title: 'Hamro Social Enterprise',
    desc: 'A social enterprise providing fair-trade market access to rural artisans across 8 districts of Nepal.',
    stat: '8',
    statLabel: 'Districts Reached',
    gradient: 'from-emerald-500 to-teal-400',
    bg: 'bg-emerald-500/10',
    color: 'text-emerald-400',
  },
  {
    icon: TrendingUp,
    title: 'Himalayan Capital Partners',
    desc: 'An impact investment fund focused on sustainable businesses that empower local communities.',
    stat: '1K+',
    statLabel: 'Jobs Created',
    gradient: 'from-amber-500 to-yellow-400',
    bg: 'bg-gold/10',
    color: 'text-gold-light',
  },
]

const stats = [
  { value: '1,000+', label: 'Jobs Created', icon: Briefcase },
  { value: '20+', label: 'Companies Built', icon: Building2 },
  { value: '8', label: 'Districts Served', icon: Zap },
]

export default function Entrepreneurship() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/8 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[180px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold-light text-xs font-semibold uppercase tracking-wider mb-5">
              <Rocket size={12} />
              Entrepreneurship
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
          >
            Building Nepal&apos;s Future
            <br />
            <span className="bg-gradient-to-r from-gold via-gold-light to-amber-400 bg-clip-text text-transparent">
              Through Enterprise
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            From startups to social enterprises, creating sustainable prosperity and empowering communities across Nepal.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-center p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm"
            >
              <stat.icon size={18} className="text-gold/60 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Business Cards - Interactive */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {businesses.map((biz, i) => (
            <motion.div
              key={biz.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="relative rounded-2xl p-6 border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm overflow-hidden h-full transition-colors duration-300 hover:border-slate-600"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${biz.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

                {/* Top row: icon + stat */}
                <div className="relative flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${biz.bg} flex items-center justify-center border border-white/5`}>
                    <biz.icon className={biz.color} size={22} />
                  </div>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.7 }}
                    animate={hoveredCard === i ? { scale: 1.1, opacity: 1 } : { scale: 0.9, opacity: 0.7 }}
                    className="text-right"
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${biz.gradient} bg-clip-text text-transparent`}>
                      {biz.stat}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{biz.statLabel}</div>
                  </motion.div>
                </div>

                {/* Content */}
                <h4 className="relative font-semibold text-white text-lg mb-2 group-hover:text-white transition-colors">
                  {biz.title}
                </h4>
                <p className="relative text-slate-400 text-sm leading-relaxed mb-4">
                  {biz.desc}
                </p>

                {/* Bottom link */}
                <div className="relative flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-gold-light transition-colors">
                  <span>Learn more</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Bottom gradient line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${biz.gradient}`}
                  initial={{ scaleX: 0 }}
                  animate={hoveredCard === i ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote Block - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl p-8 md:p-10 border border-slate-700/40 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-sm text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
            <Quote size={16} className="text-gold" />
          </div>
          <blockquote className="font-playfair text-xl md:text-2xl lg:text-3xl text-slate-200 italic leading-relaxed max-w-3xl mx-auto mb-6 pt-2">
            &ldquo;A nation&apos;s wealth is not measured by its GDP alone, but by the dignity of its workers,
            the dreams of its youth, and the strength of its communities.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-gold rounded-full" />
            <span className="text-sm text-gold-light font-medium tracking-wide">Mukesh Jung Khadka</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-gold to-transparent rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
