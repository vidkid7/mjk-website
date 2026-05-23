'use client'
import { motion } from 'framer-motion'
import { Rocket, TreePine, Award, Heart, Code, Laptop, ShieldCheck, Flag, Star, Globe } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { achievementsData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

const iconMap: Record<string, React.ComponentType<any>> = {
  Rocket, TreePine, Award, Heart, Code, Laptop, ShieldCheck, Flag, Star, Globe
}

const iconColors: Record<string, { bg: string; text: string; dot: string }> = {
  Rocket: { bg: 'bg-blue-50 group-hover:bg-blue-100', text: 'text-blue-600', dot: 'border-blue-400' },
  TreePine: { bg: 'bg-emerald-50 group-hover:bg-emerald-100', text: 'text-emerald-600', dot: 'border-emerald-400' },
  Award: { bg: 'bg-amber-50 group-hover:bg-amber-100', text: 'text-amber-600', dot: 'border-amber-400' },
  Heart: { bg: 'bg-rose-50 group-hover:bg-rose-100', text: 'text-rose-600', dot: 'border-rose-400' },
  Code: { bg: 'bg-violet-50 group-hover:bg-violet-100', text: 'text-violet-600', dot: 'border-violet-400' },
  Laptop: { bg: 'bg-cyan-50 group-hover:bg-cyan-100', text: 'text-cyan-600', dot: 'border-cyan-400' },
  ShieldCheck: { bg: 'bg-crimson-50 group-hover:bg-crimson-100', text: 'text-crimson', dot: 'border-crimson' },
  Flag: { bg: 'bg-gold-50 group-hover:bg-gold-50', text: 'text-gold-dark', dot: 'border-gold' },
}

export default function Achievements() {
  const achievements = useStoredData('achievements', achievementsData)

  return (
    <section id="achievements" className="relative py-24 md:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          pill="Journey"
          heading="Milestones of Service"
          subheading="A timeline of dedication, impact, and unwavering commitment to the people of Nepal."
          accent="gold"
        />

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center Line — gradient */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-gradient-to-b from-crimson/30 via-blue-500/30 to-gold/30" />

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
                className={`relative mb-8 pl-14 md:pl-0 ${
                  isLeft ? 'md:pr-[54%]' : 'md:pl-[54%]'
                }`}
              >
                {/* Timeline Dot — colored */}
                <div className={`absolute left-3.5 md:left-1/2 top-2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 ${colors.dot} z-10`} />

                {/* Year Badge */}
                <div className={`hidden md:flex absolute top-0 ${
                  isLeft ? 'right-0 md:left-[54%] md:right-auto md:pl-8' : 'left-0 md:right-[54%] md:left-auto md:pr-8 md:justify-end'
                }`}>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.year}
                  </span>
                </div>

                {/* Card */}
                <div className="group bg-white rounded-xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200">
                  <span className="md:hidden inline-block text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md mb-2">
                    {item.year}
                  </span>
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 transition-colors`}>
                      <Icon className={colors.text} size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 text-[15px] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
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
