'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Code2,
  Database,
  FileText,
  Globe2,
  Landmark,
  LayoutDashboard,
  MonitorSmartphone,
  Palette,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DhakaPattern } from '@/components/ui/NepalFlag'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

const aashaTechUrl = 'https://aashatech.com/'

const portfolioItems = [
  {
    title: 'Digital Sifaris & Darta Chalani System',
    category: 'Government / Institutional Projects',
    description:
      'A centralized local-government system for recommendation letters, registration workflows, and official document tracking.',
    icon: Landmark,
    tone: 'crimson',
  },
  {
    title: 'Agriculture Survey Management System',
    category: 'Web Applications',
    description:
      'A structured survey platform built to collect, manage, and analyze agriculture-related field information efficiently.',
    icon: Globe2,
    tone: 'emerald',
  },
  {
    title: 'School Management System',
    category: 'ERP / CRM Systems',
    description:
      'A digital school operations system designed to simplify academic records, administration, and daily workflows.',
    icon: Building2,
    tone: 'blue',
  },
  {
    title: 'Inventory & POS System',
    category: 'Business Automation',
    description:
      'A business-ready solution for product inventory, billing, sales tracking, and point-of-sale operations.',
    icon: LayoutDashboard,
    tone: 'gold',
  },
  {
    title: 'Scholarship Management System',
    category: 'Custom Software Solutions',
    description:
      'A workflow-focused system that helps organizations manage scholarship applications, tracking, and review processes.',
    icon: Database,
    tone: 'violet',
  },
  {
    title: 'Website & Mobile App Delivery',
    category: 'Website Development',
    description:
      'Modern websites, mobile-first interfaces, and custom digital products created for businesses and institutions.',
    icon: MonitorSmartphone,
    tone: 'cyan',
  },
]

const servicePillars = [
  { label: 'Website Development', icon: Code2 },
  { label: 'Mobile App Solutions', icon: Smartphone },
  { label: 'ERP / CRM Systems', icon: Database },
  { label: 'UI/UX Design', icon: Palette },
  { label: 'Business Automation', icon: Workflow },
  { label: 'File & Billing Systems', icon: FileText },
]

const proofPoints = [
  { value: '33', label: 'Projects Delivered' },
  { value: '27+', label: 'Happy Clients' },
  { value: '10+', label: 'Team Strength' },
]

const trustedBy = [
  'Home Ministry, SinghaDurbar',
  'Pokhara University',
  'Khaptad National Park',
  'Malangwa Municipality',
  'Lalbandi Municipality',
  'Antarik Rajaswo Karyalaya',
]

const toneClasses: Record<string, { icon: string; bg: string; badge: string; border: string; glow: string }> = {
  crimson: {
    icon: 'text-crimson',
    bg: 'bg-crimson-50',
    badge: 'bg-crimson-50 text-crimson border-crimson-100',
    border: 'group-hover:border-crimson/20',
    glow: 'group-hover:shadow-glow-crimson',
  },
  emerald: {
    icon: 'text-emerald-600',
    bg: 'bg-emerald-50',
    badge: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
    border: 'group-hover:border-emerald-200',
    glow: 'group-hover:shadow-glow-blue',
  },
  blue: {
    icon: 'text-blue-600',
    bg: 'bg-blue-50',
    badge: 'bg-blue-50 text-blue-700 border-blue-100',
    border: 'group-hover:border-blue-200',
    glow: 'group-hover:shadow-glow-blue',
  },
  gold: {
    icon: 'text-gold-dark',
    bg: 'bg-gold-50',
    badge: 'bg-gold-50 text-gold-dark border-amber-200',
    border: 'group-hover:border-amber-200',
    glow: 'group-hover:shadow-glow-gold',
  },
  violet: {
    icon: 'text-violet-600',
    bg: 'bg-violet-50',
    badge: 'bg-violet-50 text-violet-600 border-violet-100',
    border: 'group-hover:border-violet-200',
    glow: 'group-hover:shadow-glow-blue',
  },
  cyan: {
    icon: 'text-cyan-600',
    bg: 'bg-cyan-50',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    border: 'group-hover:border-cyan-200',
    glow: 'group-hover:shadow-glow-blue',
  },
}

export default function ClientPortfolio() {
  return (
    <section id="client-portfolio" className="public-section public-section--light relative overflow-hidden py-24 md:py-32">
      <DhakaPattern className="opacity-[0.025]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-crimson/5 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          pill="Our Work"
          heading="Our Client Portfolio & Completed Works"
          subheading="A showcase of digital solutions, websites, systems, and technology projects delivered with quality, strategy, and innovation."
          accent="gold"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {proofPoints.map((point) => (
            <motion.div
              key={point.label}
              variants={staggerItem}
              className="glass-inset rounded-2xl p-4 text-center"
            >
              <div className="font-playfair text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                {point.value}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{point.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {portfolioItems.map((item) => {
            const Icon = item.icon
            const tone = toneClasses[item.tone] || toneClasses.crimson

            return (
              <motion.article
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`glass-panel group relative overflow-hidden rounded-[1.75rem] p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${tone.border} ${tone.glow}`}
              >
                <a
                  href={aashaTechUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title} on AashaTech`}
                  className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2"
                >
                  <span className="sr-only">View {item.title} on AashaTech</span>
                </a>
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-slate-100/70 transition-transform duration-300 group-hover:scale-125" />
                <div className="relative flex items-start justify-between gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${tone.bg} flex items-center justify-center border border-white shadow-sm`}>
                    <Icon size={21} className={tone.icon} />
                  </div>
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${tone.badge}`}>
                    {item.category}
                  </span>
                </div>

                <div className="relative">
                  <h3 className="font-playfair text-xl font-bold text-slate-900 leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-500 mb-6">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 group-hover:text-crimson transition-colors">
                    <BadgeCheck size={15} />
                    View on AashaTech
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...fadeInUp.transition, delay: 0.15 }}
          className="glass-panel mt-12 rounded-[1.75rem] p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-gold-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark mb-4">
                <Sparkles size={13} />
                Capabilities
              </div>
              <h3 className="font-playfair text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Built for institutions, businesses, and growth-focused teams.
              </h3>
              <p className="text-sm md:text-base leading-7 text-slate-500">
                From municipal digital systems to business software, the work highlights practical technology that improves operations, presentation, and service delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:w-[420px]">
              {servicePillars.map((service) => {
                const Icon = service.icon
                return (
                  <div key={service.label} className="glass-inset flex items-center gap-3 rounded-2xl p-4">
                    <span className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-crimson">
                      <Icon size={16} />
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{service.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-7 pt-7 border-t border-slate-200/70">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Selected client exposure</p>
            <div className="flex flex-wrap gap-2.5">
              {trustedBy.map((client) => (
                <span key={client} className="glass-inset rounded-full px-3.5 py-2 text-xs font-medium text-slate-500">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fffdf8_0%,#f4efe4_48%,#fff4ea_100%)] p-6 shadow-sm md:p-8"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_75%_50%,rgba(245,158,11,0.14),transparent_45%)]" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Start with strategy</p>
              <h3 className="font-playfair text-2xl font-extrabold text-slate-950 md:text-3xl">
                Want to build something similar for your business?
              </h3>
            </div>
            <a
              href={aashaTechUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-gold-50 hover:text-crimson"
            >
              Start Your Project <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
