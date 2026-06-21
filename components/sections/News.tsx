'use client'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { NewsCards } from '@/components/ui/news-cards'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { newsData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

const defaultPosts = newsData.map(post => ({ ...post, is_published: true, content: post.excerpt }))

export default function News() {
  const posts = useStoredData('news', defaultPosts)
  const newsCards = posts
    .filter(post => post.is_published)
    .map(post => ({
      id: post.id,
      title: post.title,
      category: post.category,
      subcategory: 'Community Update',
      timeAgo: post.date,
      location: 'Kathmandu',
      image: post.cover,
      content: (post.content || post.excerpt).split(/\n\s*\n/).filter(Boolean),
    }))

  return (
    <section id="news" className="relative overflow-hidden py-24 md:py-32 bg-white">
      <DhakaPattern className="opacity-[0.03]" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 border border-crimson-100 bg-crimson-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-crimson mb-4">
              <Sparkles size={12} />
              Latest Updates
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Latest News & Updates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto leading-7"
          >
            Stay informed about our movement, achievements, and upcoming events.
          </motion.p>
        </div>

        {/* News Cards */}
        <NewsCards newsCards={newsCards} />
      </div>
    </section>
  )
}
