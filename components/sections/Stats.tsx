'use client'
import { motion } from 'framer-motion'
import { Hammer, Heart, MapPin, GraduationCap, Sparkles } from 'lucide-react'
import { Counter } from '@/components/ui/Counter'
import { statsData } from '@/lib/placeholder-data'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { useStoredData } from '@/lib/storage'

const statConfig = [
  { icon: Hammer, tone: 'crimson' },
  { icon: Heart, tone: 'rose' },
  { icon: MapPin, tone: 'blue' },
  { icon: GraduationCap, tone: 'gold' },
]

export default function Stats() {
  const stats = useStoredData('stats', statsData)

  return (
    <section className="public-section public-section--light relative overflow-hidden py-24 md:py-32">
      <DhakaPattern className="opacity-[0.03]" />
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
            <Sparkles size={12} />
            Delivery Snapshot
          </span>
          <h2 className="mt-5 font-playfair text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Practical outcomes, measured clearly.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => {
            const config = statConfig[i % statConfig.length]
            const Icon = config.icon
            const swatch =
              config.tone === 'crimson'
                ? 'bg-crimson-50 text-crimson border-crimson-100'
                : config.tone === 'rose'
                  ? 'bg-rose-50 text-rose-600 border-rose-100'
                  : config.tone === 'blue'
                    ? 'bg-blue-50 text-blue-600 border-blue-100'
                    : 'bg-amber-50 text-gold-dark border-amber-100'
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="glass-panel group cursor-default rounded-[1.5rem] p-6 text-center md:p-8"
              >
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border ${swatch}`}>
                  <Icon size={22} />
                </div>
                <div className="font-playfair text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
