'use client'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpenText, CheckCircle2, Code2, Lightbulb, Quote, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { useStoredData } from '@/lib/storage'

const defaultTestimonials = [
  {
    photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300',
    name: 'Software Architecture',
    role: 'System Planning',
    quote: 'Good software starts with structure. Architecture helps teams understand how features, data, security, and future changes fit together.',
  },
  {
    photo: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300',
    name: 'User Experience',
    role: 'Product Design',
    quote: 'A useful system must be easy to understand. Clear interfaces improve adoption, trust, speed, and the value users get from the product.',
  },
  {
    photo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300',
    name: 'Development Roadmap',
    role: 'Delivery Planning',
    quote: 'A roadmap keeps everyone aligned on priorities, phases, responsibilities, and the expected progress of a software product.',
  },
]

const defaultData = {
  heading: 'Knowledge, Insights & Digital Thinking',
  description: 'A practical space for ideas about software, user experience, automation, websites, systems, and technology planning for organizations that want to improve digitally.',
  testimonials: defaultTestimonials,
  ctaText: 'Read Blog Posts',
}

const cardStyles = [
  { gradient: 'from-blue-500 to-cyan-500', icon: Code2 },
  { gradient: 'from-violet to-purple-500', icon: Lightbulb },
  { gradient: 'from-emerald to-teal-500', icon: BookOpenText },
]

export default function YouthInspiration() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const content = useStoredData('youth', defaultData)
  const cards = content.testimonials.map((testimonial, index) => ({
    ...testimonial,
    ...cardStyles[index % cardStyles.length],
  }))

  return (
    <section id="insights" className="relative overflow-hidden bg-white px-4 py-24 md:py-32">
      <DhakaPattern className="opacity-[0.025]" />
      <div className="absolute right-0 top-20 h-40 w-1/3 bg-gradient-to-l from-emerald-100/80 to-transparent" />
      <div className="absolute bottom-20 left-0 h-40 w-1/3 bg-gradient-to-r from-blue-100/80 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-700"
          >
            <Sparkles size={14} />
            Insights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-playfair text-3xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl"
          >
            {content.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg"
          >
            {content.description}
          </motion.p>
        </div>

        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.gradient}`} />
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                  <Icon size={20} />
                </div>
                <Quote className="absolute right-6 top-6 h-8 w-8 text-slate-100" />
                <h3 className="text-xl font-black text-slate-950">{card.name}</h3>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-400">{card.role}</p>
                <p className="mt-5 text-sm leading-7 text-slate-600">{card.quote}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400 transition group-hover:text-emerald-700">
                  <CheckCircle2 size={14} />
                  Practical insight
                </div>
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient}`}
                  initial={{ scaleX: 0 }}
                  animate={activeCard === i ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-center"
        >
          <a href="/blog" className="group inline-flex items-center gap-2.5 rounded-full bg-slate-950 px-8 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700">
            <Sparkles size={16} />
            {content.ctaText}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
