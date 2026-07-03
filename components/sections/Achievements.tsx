'use client'
import { motion } from 'framer-motion'
import { Award, Code, Globe, Heart, Laptop, Rocket, ShieldCheck, Star, TreePine } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { achievementsData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

const iconMap: Record<string, React.ComponentType<any>> = {
  Rocket, TreePine, Award, Heart, Code, Laptop, ShieldCheck, Star, Globe
}

const iconColors: Record<string, { bg: string; text: string; dot: string }> = {
  Rocket: { bg: 'bg-blue-50 group-hover:bg-blue-100', text: 'text-blue-600', dot: 'border-blue-400' },
  TreePine: { bg: 'bg-emerald-50 group-hover:bg-emerald-100', text: 'text-emerald-600', dot: 'border-emerald-400' },
  Award: { bg: 'bg-amber-50 group-hover:bg-amber-100', text: 'text-amber-600', dot: 'border-amber-400' },
  Heart: { bg: 'bg-rose-50 group-hover:bg-rose-100', text: 'text-rose-600', dot: 'border-rose-400' },
  Code: { bg: 'bg-violet-50 group-hover:bg-violet-100', text: 'text-violet-600', dot: 'border-violet-400' },
  Laptop: { bg: 'bg-cyan-50 group-hover:bg-cyan-100', text: 'text-cyan-600', dot: 'border-cyan-400' },
  ShieldCheck: { bg: 'bg-emerald-50 group-hover:bg-emerald-100', text: 'text-emerald-600', dot: 'border-emerald-400' },
  Star: { bg: 'bg-gold-50 group-hover:bg-gold-50', text: 'text-gold-dark', dot: 'border-gold' },
  Globe: { bg: 'bg-slate-50 group-hover:bg-slate-100', text: 'text-slate-600', dot: 'border-slate-400' },
}

export default function Achievements() {
  const achievements = useStoredData('achievements', achievementsData)

  return (
    <section id="achievements" className="relative bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          pill="Delivery Process"
          heading="How a digital project moves from idea to launch"
          subheading="A simple, practical delivery path for websites, systems, dashboards, automation, and software products."
          accent="gold"
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-emerald-400/30 via-blue-500/30 to-gold/30 md:left-1/2 md:-translate-x-px" />

          {achievements.map((item, i) => {
            const Icon = iconMap[item.icon] || Award
            const colors = iconColors[item.icon] || iconColors.Award
            const isLeft = i % 2 === 0

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-8 pl-14 md:pl-0 ${isLeft ? 'md:pr-[54%]' : 'md:pl-[54%]'}`}
              >
                <div className={`absolute left-3.5 top-2 z-10 h-3.5 w-3.5 rounded-full border-2 bg-white md:left-1/2 md:-translate-x-1/2 ${colors.dot}`} />

                <div className={`absolute top-0 hidden md:flex ${isLeft ? 'right-0 md:left-[54%] md:right-auto md:pl-8' : 'left-0 md:right-[54%] md:left-auto md:justify-end md:pr-8'}`}>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-400">{item.year}</span>
                </div>

                <div className="group rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-200 hover:shadow-md">
                  <span className="mb-2 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-400 md:hidden">{item.year}</span>
                  <div className="flex items-start gap-3.5">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${colors.bg} transition-colors`}>
                      <Icon className={colors.text} size={18} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-[15px] font-bold text-slate-900">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
