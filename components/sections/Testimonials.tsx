'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { testimonialsData } from '@/lib/placeholder-data'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % testimonialsData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % testimonialsData.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          pill="Testimonials"
          heading="What People Are Saying"
          subheading="Hear from the communities, entrepreneurs, and young leaders who have experienced the impact firsthand."
          accent="blue"
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Carousel */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 md:p-10 border border-slate-100 text-center shadow-sm"
              >
                <Quote size={28} className="text-crimson/20 mx-auto mb-4" />

                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>

                <blockquote className="font-playfair text-lg md:text-xl text-slate-700 italic leading-relaxed mb-6">
                  &ldquo;{testimonialsData[current].quote}&rdquo;
                </blockquote>

                <div className="flex justify-center mb-3">
                  <img
                    src={testimonialsData[current].photo}
                    alt={testimonialsData[current].name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-crimson/10 ring-offset-2"
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{testimonialsData[current].name}</div>
                  <div className="text-crimson/70 text-xs mt-0.5 font-medium">{testimonialsData[current].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-crimson hover:border-crimson/20 hover:bg-crimson-50 transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-gradient-to-r from-crimson to-gold w-6' : 'bg-slate-200 w-1.5 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-crimson hover:border-crimson/20 hover:bg-crimson-50 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
