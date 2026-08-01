"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Code2,
  Database,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react"
import { DhakaPattern } from "@/components/ui/NepalFlag"

interface AboutContent {
  pill: string
  heading: string
  paragraphs: string
  community_trust: number
  youth_engagement: number
  photo: string
}

const fallbackContent: AboutContent = {
  pill: "About Mukesh",
  heading: "A practical digital systems builder focused on useful results",
  paragraphs:
    "Mukesh Khadka focuses on building and presenting digital solutions that help organizations work more clearly, serve people faster, and manage information with less manual effort.\n\nThe approach is simple: understand the user, design a useful system, and deliver technology that makes daily work easier.",
  community_trust: 96,
  youth_engagement: 92,
  photo: "/mukk-removebg-preview.png",
}

const qualities = [
  {
    icon: MonitorSmartphone,
    title: "Digital Product Thinking",
    description: "Plans websites, systems, dashboards, and digital products around real users, clear content, and practical workflows.",
  },
  {
    icon: Workflow,
    title: "Workflow-First Approach",
    description: "Focuses on reducing manual work through structured forms, reports, approvals, and role-based digital processes.",
  },
  {
    icon: Code2,
    title: "Software Delivery Focus",
    description: "Works toward clean implementation, maintainable features, responsive interfaces, and systems that can grow over time.",
  },
  {
    icon: Database,
    title: "Data & Records Clarity",
    description: "Supports organized records, searchable information, dashboards, and better decision-ready data for organizations.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Operations",
    description: "Prioritizes access control, handover, training, support, and long-term usability after the launch phase.",
  },
  {
    icon: BarChart3,
    title: "Growth-Oriented Presentation",
    description: "Combines technology, design, and clear communication so organizations look professional and convert better online.",
  },
]

export default function AboutMukeshSection({ content = fallbackContent }: { content?: AboutContent }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.16 })
  const paragraphs = content.paragraphs
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section id="about" ref={sectionRef} className="public-section public-section--light relative overflow-hidden px-4 py-20 text-[#202e44] md:py-28">
      <DhakaPattern className="opacity-[0.025]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

      <motion.div
        className="container relative z-10 mx-auto max-w-6xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="mb-10 flex items-center gap-4 border-t border-[#12375f]/15 pt-5 text-[11px] font-black uppercase tracking-[0.28em] text-[#12375f]/60">
          <span className="text-crimson">01</span>
          <span>About the practice</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#12375f]/15" />
          <span className="hidden tracking-[0.18em] sm:inline">Kathmandu · Nepal</span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
          <motion.div variants={itemVariants} className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-amber-400/20 blur-2xl" />
            <div className="glass-panel relative overflow-hidden rounded-[1.25rem] p-4 md:p-5">
              <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-slate-100 via-white to-emerald-50">
                <img
                  src={content.photo || "/mukk-removebg-preview.png"}
                  alt="Mukesh Khadka"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                <span>Systems · Stories · Service</span>
                <span className="text-crimson">Portfolio / 01</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <StatCard label="Delivery Focus" value={content.community_trust} />
                <StatCard label="Client Clarity" value={content.youth_engagement} />
              </div>
            </div>
          </motion.div>

          <div>
            <motion.span variants={itemVariants} className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              <Zap className="h-4 w-4" />
              {content.pill}
            </motion.span>
            <motion.h2 variants={itemVariants} className="max-w-3xl font-playfair text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {content.heading}
            </motion.h2>
            <motion.div variants={itemVariants} className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 grid gap-4 sm:grid-cols-2">
              {qualities.map((quality) => {
                const Icon = quality.icon
                return (
                  <div key={quality.title} className="glass-panel rounded-2xl p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/10 md:p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-black text-slate-950">{quality.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{quality.description}</p>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="glass-panel mt-14 rounded-2xl border-[#12375f]/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-amber-700">
                <Layers3 className="h-4 w-4" />
                Practical technology direction
              </div>
              <h3 className="font-playfair text-2xl font-extrabold text-slate-950 md:text-3xl">Focused on systems that people can actually use.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">Inspired by AashaTech-style digital delivery: clear services, custom software, mobile-ready platforms, useful products, and project outcomes that support real organizations.</p>
            </div>
            <a href="#vision" className="glass-action inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-slate-900">
              View digital vision <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass-inset rounded-2xl p-4 text-center">
      <div className="font-playfair text-3xl font-black text-emerald-700">{value}%</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</div>
    </div>
  )
}
