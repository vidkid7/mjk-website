'use client'
import { motion } from 'framer-motion'
import { Hammer, Heart, MapPin, GraduationCap } from 'lucide-react'
import { Counter } from '@/components/ui/Counter'
import { statsData } from '@/lib/placeholder-data'

const statConfig = [
  { icon: Hammer, gradient: 'from-crimson to-crimson-dark', hoverShadow: 'hover:shadow-glow-crimson' },
  { icon: Heart, gradient: 'from-rose-500 to-pink-600', hoverShadow: 'hover:shadow-glow-crimson' },
  { icon: MapPin, gradient: 'from-blue-500 to-blue-700', hoverShadow: 'hover:shadow-glow-blue' },
  { icon: GraduationCap, gradient: 'from-gold to-gold-dark', hoverShadow: 'hover:shadow-glow-gold' },
]

export default function Stats() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-crimson/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-[100px]" />
      
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
        >
          {statsData.map((stat, i) => {
            const config = statConfig[i]
            const Icon = config.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`text-center group cursor-default glass rounded-2xl p-6 md:p-8 md:rounded-none md:border-x-0 md:border-y-0 md:bg-transparent md:backdrop-blur-0 ${
                  i < statConfig.length - 1 ? 'md:border-r md:border-r-white/10' : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mx-auto mb-4 ${config.hoverShadow} transition-shadow duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair mb-2 tracking-tight">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors duration-300">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
