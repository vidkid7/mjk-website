'use client'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Leaf, HeartHandshake, HeartPulse, Building, Sparkles } from 'lucide-react'
import { FlippingCard } from '@/components/ui/flipping-card'
import { initiativesData } from '@/lib/placeholder-data'
import { DhakaPattern } from '@/components/ui/NepalFlag'

const categoryConfig: Record<string, { color: string; bg: string; border: string; icon: React.ComponentType<any> }> = {
  Education: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: BookOpen },
  Environment: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200/60', icon: Leaf },
  Empowerment: { color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', icon: HeartHandshake },
  Health: { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', icon: HeartPulse },
  Infrastructure: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200/60', icon: Building },
}

function CardFront({ item }: { item: typeof initiativesData[0] }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md">
      <img
        src={item.photo}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="font-playfair text-base font-bold text-white drop-shadow-md leading-snug">
          {item.title}
        </h3>
      </div>
    </div>
  )
}

function CardBack({ item }: { item: typeof initiativesData[0] }) {
  const cat = categoryConfig[item.category] || categoryConfig.Education
  const CatIcon = cat.icon
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-5 text-center">
      <div className={`w-12 h-12 ${cat.bg} flex items-center justify-center mb-4 border ${cat.border}`}>
        <CatIcon size={22} className={cat.color} />
      </div>
      <h3 className="font-playfair text-base font-bold text-slate-900 mb-2">
        {item.title}
      </h3>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 mb-3">
        <span className="text-xs font-semibold text-amber-600">✨ {item.impact}</span>
      </div>
      <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4">
        {item.description}
      </p>
      <a href="#" className="inline-flex items-center gap-1.5 bg-crimson text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] hover:bg-crimson-dark transition-colors">
        Learn More <ArrowRight size={12} />
      </a>
    </div>
  )
}

export default function Initiatives() {
  return (
    <section id="initiatives" className="relative overflow-hidden py-24 md:py-32 bg-[#fbfaf7]">
      <DhakaPattern className="opacity-[0.035]" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">
              <Sparkles size={12} />
              Social Work
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Initiatives That Changed Lives
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto leading-7"
          >
            Real projects. Real impact. Hover on any card to discover the difference each initiative has made across Nepal.
          </motion.p>
        </div>

        {/* Flipping Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {initiativesData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-[340px]"
            >
              <FlippingCard
                width={340}
                height={360}
                frontContent={<CardFront item={item} />}
                backContent={<CardBack item={item} />}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
