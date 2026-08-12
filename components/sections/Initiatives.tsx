'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Database,
  FileText,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  MonitorSmartphone,
  Sparkles,
} from 'lucide-react'
import { initiativesData } from '@/lib/placeholder-data'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { useStoredData } from '@/lib/storage'

const defaultItems = initiativesData.map(item => ({ ...item, is_published: true }))
type InitiativeItem = typeof defaultItems[0]

const legacyInitiativeTerms = [
  'youth coding bootcamp', 'clean bagmati', 'women entrepreneur', 'free health camps',
  'solar street', 'scholarship', 'social work', 'environment', 'empowerment', 'health camp', 'riverbank'
]

function hasLegacyInitiatives(items: InitiativeItem[]) {
  return items.some(item => legacyInitiativeTerms.some(term => `${item.category} ${item.title} ${item.description} ${item.impact}`.toLowerCase().includes(term)))
}

const categoryConfig: Record<string, { color: string; bg: string; border: string; icon: React.ComponentType<any> }> = {
  GovTech: { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', icon: Landmark },
  'Data System': { color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-100', icon: Database },
  'Business System': { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: BarChart3 },
  Education: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', icon: GraduationCap },
  'Document System': { color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', icon: FileText },
  'Retail System': { color: 'text-crimson', bg: 'bg-crimson-50', border: 'border-crimson-100', icon: LayoutDashboard },
  Web: { color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-100', icon: MonitorSmartphone },
}

export default function Initiatives() {
  const storedItems = useStoredData('initiatives', defaultItems)
  const sourceItems = hasLegacyInitiatives(storedItems) ? defaultItems : storedItems
  const items = sourceItems.filter(item => item.is_published)

  return (
    <section id="initiatives" className="public-section public-section--light relative overflow-hidden px-4 py-24 md:py-32">
      <DhakaPattern className="opacity-[0.025]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-28 h-80 w-80 rounded-full bg-amber-100/80 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 bottom-16 h-96 w-96 rounded-full bg-emerald-100/80 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-700"
            >
              <Sparkles size={14} />
              Solutions in Action
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl"
            >
              Practical digital initiatives for institutions, businesses, and public-facing teams.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-md text-base leading-8 text-slate-600"
          >
            Each initiative represents a real category of work: government digitization, data systems, billing, school operations, records, POS, and mobile-ready business tools.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const cat = categoryConfig[item.category] || categoryConfig.Web
            const Icon = cat.icon
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="glass-panel group overflow-hidden rounded-[1.75rem] transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <Image src={item.photo} alt={item.title} fill sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.15)_32%,rgba(255,255,255,0.62)_100%)]" />
                  <div className="absolute left-4 top-4"><span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] ${cat.bg} ${cat.color} ${cat.border}`}><Icon size={13} />{item.category}</span></div>
                  <div className="absolute bottom-4 left-4 right-4"><h3 className="font-playfair text-2xl font-bold leading-tight text-slate-950 drop-shadow-sm">{item.title}</h3></div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="glass-inset mb-4 inline-flex rounded-full px-3 py-1 text-xs font-bold text-amber-700">{item.impact}</div>
                  <p className="text-sm leading-7 text-slate-500">{item.description}</p>
                  <a href="#contact" className="glass-action mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-600 group-hover:text-crimson">Discuss similar project <ArrowRight size={14} /></a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
