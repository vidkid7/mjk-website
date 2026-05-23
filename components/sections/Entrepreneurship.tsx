'use client'
import { motion } from 'framer-motion'
import { Rocket, Users, TrendingUp, Quote, Briefcase, ArrowUpRight, Building2, Zap } from 'lucide-react'
import { useState } from 'react'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { useStoredData } from '@/lib/storage'

const defaultBusinesses = [
  {
    iconName: 'Rocket',
    title: 'Nepal Tech Ventures',
    description: 'A technology startup incubator that has launched 20+ companies and created 500+ jobs in the tech sector.',
    stat: '20+',
    statLabel: 'Companies Launched',
  },
  {
    iconName: 'Users',
    title: 'Hamro Social Enterprise',
    description: 'A social enterprise providing fair-trade market access to rural artisans across 8 districts of Nepal.',
    stat: '8',
    statLabel: 'Districts Reached',
  },
  {
    iconName: 'TrendingUp',
    title: 'Himalayan Capital Partners',
    description: 'An impact investment fund focused on sustainable businesses that empower local communities.',
    stat: '1K+',
    statLabel: 'Jobs Created',
  },
]

const defaultStats = [
  { value: '1,000+', label: 'Jobs Created', icon: Briefcase },
  { value: '20+', label: 'Companies Built', icon: Building2 },
  { value: '8', label: 'Districts Served', icon: Zap },
]

const defaultData = {
  sectionTitle: "Building Nepal's Future Through Enterprise",
  sectionSubtitle: 'From startups to social enterprises, creating sustainable prosperity and empowering communities across Nepal.',
  businesses: defaultBusinesses,
  stats: defaultStats.map(({ value, label }) => ({ value, label })),
  quoteText: "A nation's wealth is not measured by its GDP alone, but by the dignity of its workers, the dreams of its youth, and the strength of its communities.",
  quoteAttribution: 'Mukesh Jung Khadka',
}

const iconMap: Record<string, React.ComponentType<any>> = { Rocket, Users, TrendingUp }
const cardStyles = [
  { gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { gradient: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { gradient: 'from-amber-500 to-yellow-400', bg: 'bg-gold/10', color: 'text-gold-light' },
]
const statIcons = [Briefcase, Building2, Zap]

export default function Entrepreneurship() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const content = useStoredData('entrepreneurship', defaultData)
  const titleParts = content.sectionTitle.split('Through')
  const businessCards = content.businesses.map((business, index) => ({
    ...business,
    ...cardStyles[index % cardStyles.length],
    icon: iconMap[business.iconName] || Rocket,
  }))

  return (
    <section className="relative py-24 md:py-32 bg-[#071224] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <DhakaPattern className="opacity-[0.06]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute -right-24 top-12 h-52 w-1/2 bg-gradient-to-l from-crimson/20 to-transparent" />
        <div className="absolute -left-24 bottom-12 h-52 w-1/2 bg-gradient-to-r from-[#003893]/20 to-transparent" />
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold-light text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
              <Rocket size={12} />
              Entrepreneurship
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight"
          >
            {titleParts[0].trim()}
            {titleParts[1] && (
              <>
                <br />
                <span className="bg-gradient-to-r from-gold via-gold-light to-amber-400 bg-clip-text text-transparent">
                  Through{titleParts.slice(1).join('Through')}
                </span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300/80 max-w-2xl mx-auto text-base md:text-lg leading-8"
          >
            {content.sectionSubtitle}
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
          {content.stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length]
            return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-center p-4 md:p-5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
            >
              <Icon size={18} className="text-gold/60 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
            )
          })}
        </motion.div>

        {/* Business Cards - Interactive */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {businessCards.map((biz, i) => (
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
                className="relative rounded-lg p-6 border border-white/10 bg-white/[0.055] backdrop-blur-sm overflow-hidden h-full transition-colors duration-300 hover:border-white/20"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${biz.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

                {/* Top row: icon + stat */}
                <div className="relative flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 ${biz.bg} flex items-center justify-center border border-white/10`}>
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
                  {biz.description}
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
          className="relative rounded-lg p-8 md:p-10 border border-white/10 bg-white/[0.055] backdrop-blur-sm text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold/10 flex items-center justify-center border border-gold/20">
            <Quote size={16} className="text-gold" />
          </div>
          <blockquote className="font-playfair text-xl md:text-2xl lg:text-3xl text-slate-200 italic leading-relaxed max-w-3xl mx-auto mb-6 pt-2">
            &ldquo;{content.quoteText}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-gold rounded-full" />
            <span className="text-sm text-gold-light font-medium tracking-wide">{content.quoteAttribution}</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-gold to-transparent rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
