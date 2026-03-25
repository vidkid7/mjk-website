'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { heroData } from '@/lib/placeholder-data'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

export default function Hero() {
  return (
    <div id="home">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/mjk-hero.mp4"
        bgImageSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80"
        title="Forward Together"
        date="Leading Nepal"
        scrollToExpand="↓ Scroll to Explore"
        textBlend
      >
        {/* Hero content revealed after scroll expansion */}
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-crimson/15 to-gold/10 text-white/70 text-xs font-medium border border-white/10 backdrop-blur-sm">
              <Sparkles size={12} className="text-gold-light" />
              {heroData.label}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] mb-4 tracking-tight text-center"
          >
            Leading Nepal{' '}
            <span className="gradient-text-warm">Forward Together</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-white/50 font-medium tracking-wide uppercase mb-4 text-center"
          >
            {heroData.subheadline}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-center"
          >
            {heroData.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#vision"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-crimson to-crimson-dark text-white font-medium text-sm rounded-xl hover:shadow-glow-crimson transition-all duration-300"
            >
              Explore My Vision <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/70 font-medium text-sm rounded-xl hover:bg-white/5 hover:text-white hover:border-white/25 transition-all"
            >
              <Play size={14} className="text-gold-light" />
              Learn More
            </a>
          </motion.div>
        </div>
      </ScrollExpandMedia>
    </div>
  )
}
