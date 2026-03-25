'use client'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { NewsCards } from '@/components/ui/news-cards'

export default function News() {
  return (
    <section id="news" className="relative py-24 md:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson/10 text-crimson text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={12} />
              Latest Updates
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Latest From The Campaign
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Stay informed about our movement, achievements, and upcoming events.
          </motion.p>
        </div>

        {/* News Cards */}
        <NewsCards />
      </div>
    </section>
  )
}
