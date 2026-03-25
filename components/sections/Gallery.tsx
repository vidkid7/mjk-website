'use client'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery'

const mediaItems = [
  {
    id: 1,
    type: 'image',
    title: 'Community Gathering',
    desc: 'Bringing Kathmandu together for a brighter future',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 2,
    type: 'image',
    title: 'Youth Leadership Summit',
    desc: 'Empowering the next generation of leaders',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
    span: 'md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 3,
    type: 'image',
    title: 'Coding Bootcamp',
    desc: 'Free tech education for youth across the valley',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 4,
    type: 'image',
    title: 'Campaign Rally',
    desc: 'Thousands united for change in Lalitpur',
    url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 5,
    type: 'image',
    title: 'Volunteer Clean-Up Drive',
    desc: 'Community-driven Bagmati river restoration',
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 6,
    type: 'image',
    title: 'Business Innovation Forum',
    desc: 'Connecting entrepreneurs with opportunity',
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 7,
    type: 'image',
    title: 'Youth Mentorship Program',
    desc: 'Guiding young minds toward success',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
              <Camera size={12} />
              Gallery
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            On The Ground
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Real moments from the field — community gatherings, youth events, and the work that matters.
          </motion.p>
        </div>

        {/* Bento Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <InteractiveBentoGallery
            mediaItems={mediaItems}
            title=""
            description=""
          />
        </motion.div>
      </div>
    </section>
  )
}
