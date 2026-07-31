'use client'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { galleryData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

const gallerySpans = [
  'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  'md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2',
  'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2',
  'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
]

export default function Gallery() {
  const photos = useStoredData('gallery', galleryData)
  const mediaItems = photos.map((photo, index) => ({
    id: Number(photo.id) || index + 1,
    type: 'image',
    title: photo.caption,
    desc: photo.category,
    url: photo.url,
    span: gallerySpans[index % gallerySpans.length],
  }))

  return (
    <section id="gallery" className="public-section public-section--light relative overflow-hidden py-24 md:py-32">
      <DhakaPattern className="opacity-[0.03]" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 mb-4">
              <Camera size={12} />
              Gallery
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            On The Ground
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto leading-7"
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
