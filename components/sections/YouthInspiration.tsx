'use client'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Quote, Flame, Star, Heart } from 'lucide-react'
import { useState } from 'react'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { useStoredData } from '@/lib/storage'

const defaultTestimonials = [
  {
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Aarav Poudel',
    role: 'Software Engineer',
    quote: 'Mukesh sir taught me that my background doesn\'t define my future. Today I\'m a software engineer at a Kathmandu startup. His belief in us changed everything.',
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
    name: 'Priya Maharjan',
    role: 'CS Scholarship Holder',
    quote: 'From a girl who couldn\'t afford college to a scholarship holder studying computer science — Mukesh dai\'s program gave me wings I didn\'t know I had.',
  },
  {
    photo: 'https://randomuser.me/api/portraits/men/28.jpg',
    name: 'Sagar Rai',
    role: 'Youth Leader',
    quote: 'The youth bootcamp wasn\'t just about coding. It taught us leadership, teamwork, and that we — the youth of Nepal — have the power to transform this nation.',
  },
]

const defaultData = {
  heading: 'If I Can, You Can',
  description: 'Every young Nepali has the potential to become a leader, an entrepreneur, a changemaker. Our mission is to unlock that potential and build a generation that will take Nepal to unprecedented heights.',
  testimonials: defaultTestimonials,
  ctaText: 'Join Our Youth Movement',
}

const testimonialStyles = [
  { gradient: 'from-blue-500 to-cyan-500', bgGlow: 'bg-blue-500/10', icon: Star },
  { gradient: 'from-violet to-purple-500', bgGlow: 'bg-violet/10', icon: Heart },
  { gradient: 'from-emerald to-teal-500', bgGlow: 'bg-emerald/10', icon: Flame },
]

export default function YouthInspiration() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const content = useStoredData('youth', defaultData)
  const headingParts = content.heading.split(',')
  const testimonials = content.testimonials.map((testimonial, index) => ({
    ...testimonial,
    ...testimonialStyles[index % testimonialStyles.length],
  }))

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <DhakaPattern className="opacity-[0.03]" />
        <div className="absolute right-0 top-20 h-40 w-1/3 bg-gradient-to-l from-crimson/10 to-transparent" />
        <div className="absolute bottom-20 left-0 h-40 w-1/3 bg-gradient-to-r from-[#003893]/10 to-transparent" />
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
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase bg-crimson-50 text-crimson border border-crimson-100 mb-5">
              <Flame size={12} />
              For The Youth
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl md:text-4xl lg:text-6xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight"
          >
            {headingParts[0]}
            {headingParts[1] ? ', ' : ' '}
            <span className="relative inline-block">
              <span className="gradient-text-warm">{headingParts.slice(1).join(',').trim()}</span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-crimson to-gold rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-8"
          >
            {content.description}
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative bg-white rounded-lg p-7 text-left border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 h-full overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-x-0 top-0 h-1 ${t.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Quote icon with gradient */}
                  <div className={`w-10 h-10 bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <Quote size={16} className="text-white" />
                </div>

                {/* Quote text */}
                <p className="relative text-slate-600 text-[15px] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="relative flex items-center gap-3.5 pt-5 border-t border-slate-100">
                  <div className="relative">
                    <img
                      src={t.photo}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                    />
                    <motion.div
                      className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-br ${t.gradient} border-2 border-white flex items-center justify-center`}
                      animate={activeCard === i ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.6, repeat: activeCard === i ? Infinity : 0, repeatDelay: 1 }}
                    >
                      <t.icon size={8} className="text-white" />
                    </motion.div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                    <span className="text-slate-400 text-xs">{t.role}</span>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${t.gradient}`}
                  initial={{ scaleX: 0 }}
                  animate={activeCard === i ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.a
            href="#support"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-crimson text-white font-bold uppercase tracking-[0.12em] text-xs shadow-lg hover:bg-crimson-dark hover:shadow-xl hover:shadow-crimson/20 transition-all duration-300"
          >
            <Sparkles size={16} />
            {content.ctaText}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
