'use client'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Code2,
  Database,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { visionCards } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

const iconMap: Record<string, React.ComponentType<any>> = {
  MonitorSmartphone,
  Workflow,
  Database,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Code2,
}

export default function Vision() {
  const cards = useStoredData('vision', visionCards)

  return (
    <section id="vision" className="relative overflow-hidden bg-white px-4 py-24 md:py-32">
      <DhakaPattern className="opacity-[0.025]" />
      <div className="absolute left-0 top-16 h-80 w-80 rounded-full bg-emerald-100/80 blur-3xl" />
      <div className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-blue-100/80 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              <Sparkles size={14} />
              Digital Vision
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-playfair text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Technology should make organizations faster, clearer, and easier to manage.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base leading-8 text-slate-600 md:text-lg"
          >
            Inspired by AashaTech's digital-systems approach, this vision focuses on professional websites, custom software, mobile-ready platforms, organized records, automation, and measurable outcomes for organizations in Nepal.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Code2
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10"
              >
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-emerald-100 transition group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950">{card.heading}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{card.description}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
