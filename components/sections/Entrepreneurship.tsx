'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight, BarChart3, Building2, Code2, Database, Quote, Rocket, TrendingUp, Users, Zap } from 'lucide-react'
import { useState } from 'react'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { useStoredData } from '@/lib/storage'

const defaultBusinesses = [
  { iconName: 'Rocket', title: 'Discovery & Strategy', description: 'Clarify goals, users, workflows, content, technology requirements, and the minimum useful version before development starts.', stat: '01', statLabel: 'Plan first' },
  { iconName: 'Database', title: 'Design & Development', description: 'Build clean interfaces, databases, dashboards, APIs, admin panels, and responsive pages around the approved delivery plan.', stat: '02', statLabel: 'Build clearly' },
  { iconName: 'TrendingUp', title: 'Launch & Improvement', description: 'Deploy, test, train, collect feedback, and improve the system so it remains practical after the first launch.', stat: '03', statLabel: 'Improve often' },
]

const defaultStats = [
  { value: '33+', label: 'Projects Delivered', icon: Code2 },
  { value: '26+', label: 'Organizations Served', icon: Building2 },
  { value: '10+', label: 'Core Capabilities', icon: Zap },
]

const defaultData = {
  sectionTitle: 'Delivery Capability Built Around Real Workflows',
  sectionSubtitle: 'A practical process for software, websites, dashboards, records, automation, and digital product delivery.',
  businesses: defaultBusinesses,
  stats: defaultStats.map(({ value, label }) => ({ value, label })),
  quoteText: 'A useful digital system is not the one with the most features. It is the one that solves the real workflow clearly, reliably, and repeatedly.',
  quoteAttribution: 'Digital Delivery Principle',
}

const legacyCapabilityTerms = ['nepal tech ventures', 'hamro social enterprise', 'himalayan capital', 'nation', 'workers', 'youth', 'enterprise', 'jobs created']
function isLegacyCapability(content: typeof defaultData) {
  const haystack = `${content.sectionTitle} ${content.sectionSubtitle} ${content.quoteText} ${content.quoteAttribution} ${content.businesses?.map(item => `${item.title} ${item.description}`).join(' ')}`.toLowerCase()
  return legacyCapabilityTerms.some(term => haystack.includes(term))
}

const iconMap: Record<string, React.ComponentType<any>> = { Rocket, Users, TrendingUp, Database, Code2, BarChart3 }
const cardStyles = [
  { gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { gradient: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { gradient: 'from-amber-500 to-yellow-400', bg: 'bg-gold/10', color: 'text-gold-light' },
]
const statIcons = [Code2, Building2, Zap]

export default function Entrepreneurship() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const storedContent = useStoredData('entrepreneurship', defaultData)
  const content = isLegacyCapability(storedContent) ? defaultData : storedContent
  const businessCards = content.businesses.map((business, index) => ({ ...business, ...cardStyles[index % cardStyles.length], icon: iconMap[business.iconName] || Rocket }))

  return (
    <section id="capabilities" className="public-section public-section--dark relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"><DhakaPattern className="opacity-[0.04]" /><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" /><div className="absolute -right-24 top-12 h-52 w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent" /><div className="absolute -left-24 bottom-12 h-52 w-1/2 bg-gradient-to-r from-blue-500/20 to-transparent" /></div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-16 text-center">
          <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-200"><Rocket size={14} />Delivery Capability</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-playfair text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">{content.sectionTitle}</motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300/80 md:text-lg">{content.sectionSubtitle}</motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-16 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {content.stats.map((stat, i) => { const Icon = statIcons[i % statIcons.length]; return <div key={stat.label} className="glass-inset rounded-2xl p-4 text-center"><Icon size={18} className="mx-auto mb-2 text-emerald-300" /><div className="mb-1 text-2xl font-bold text-white md:text-3xl">{stat.value}</div><div className="text-xs font-semibold text-slate-300">{stat.label}</div></div> })}
        </motion.div>

        <div className="mb-16 grid gap-5 md:grid-cols-3">
          {businessCards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }} onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)} className="group relative">
              <motion.div whileHover={{ y: -8 }} className="glass-panel relative h-full overflow-hidden rounded-[1.75rem] p-6 md:p-8 transition hover:border-white/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]`} />
                <div className="relative mb-5 flex items-center justify-between"><div className={`flex h-12 w-12 items-center justify-center border border-white/10 ${card.bg}`}><card.icon className={card.color} size={22} /></div><div className="text-right"><div className={`bg-gradient-to-r ${card.gradient} bg-clip-text text-2xl font-black text-transparent`}>{card.stat}</div><div className="text-[10px] uppercase tracking-wider text-slate-500">{card.statLabel}</div></div></div>
                <h4 className="relative mb-2 text-lg font-black text-white">{card.title}</h4><p className="relative mb-4 text-sm leading-7 text-slate-400">{card.description}</p><div className="relative flex items-center gap-1.5 text-xs font-medium text-slate-500 transition group-hover:text-emerald-200"><span>Learn more</span><ArrowUpRight size={12} /></div>
                <motion.div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient}`} initial={{ scaleX: 0 }} animate={hoveredCard === i ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.3 }} style={{ transformOrigin: 'left' }} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel relative rounded-[1.75rem] p-6 text-center md:p-8">
          <div className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-emerald-300/20 bg-emerald-300/10"><Quote size={16} className="text-emerald-300" /></div>
          <blockquote className="mx-auto mb-6 max-w-3xl pt-2 font-playfair text-xl italic leading-relaxed text-slate-200 md:text-2xl lg:text-3xl">&ldquo;{content.quoteText}&rdquo;</blockquote>
          <span className="text-sm font-medium tracking-wide text-emerald-200">{content.quoteAttribution}</span>
        </motion.div>
      </div>
    </section>
  )
}
