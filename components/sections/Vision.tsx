'use client'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import VisionCarousel from '@/components/ui/feature-carousel'
import { DhakaPattern } from '@/components/ui/NepalFlag'

export default function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden py-24 md:py-32 bg-white">
      <DhakaPattern className="opacity-[0.035]" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 border border-gold/20 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark mb-4">
              <Sparkles size={12} />
              Our Vision
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            A Brighter Kathmandu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto leading-7"
          >
            Six pillars of transformation that will reshape our city and uplift every citizen for generations to come.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <VisionCarousel />
        </motion.div>
      </div>
    </section>
  )
}
