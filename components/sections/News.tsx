'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
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
      subcategory: 'Insight',
      timeAgo: post.date,
      location: 'Digital Portfolio',
      image: post.cover,
      content: (post.content || post.excerpt).split(/\n\s*\n/).filter(Boolean),
    }))

  return (
    <section id="news" className="relative overflow-hidden bg-white py-24 md:py-32">
      <DhakaPattern className="opacity-[0.025]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
              <Sparkles size={12} />
              Blog
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 font-playfair text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
          >
            Latest Blog Posts & Digital Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl leading-7 text-slate-500"
          >
            Articles about software systems, UX, digital planning, websites, automation, and project delivery.
          </motion.p>
        </div>

        <NewsCards newsCards={newsCards} />

        <div className="mt-10 text-center">
          <a href="/blog" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
            View all blog posts <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
