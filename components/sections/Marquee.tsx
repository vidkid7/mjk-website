'use client'
import { Rocket, Heart, Code, Building2, Globe, Users, Lightbulb, Zap } from 'lucide-react'

const items = [
  { text: 'ENTREPRENEUR', icon: Rocket, color: 'text-crimson-light' },
  { text: 'SOCIAL WORKER', icon: Heart, color: 'text-rose-400' },
  { text: 'YOUTH LEADER', icon: Users, color: 'text-blue-400' },
  { text: 'MAYOR CANDIDATE', icon: Building2, color: 'text-gold-light' },
  { text: 'VISIONARY', icon: Lightbulb, color: 'text-amber-400' },
  { text: 'CHANGE MAKER', icon: Zap, color: 'text-emerald-light' },
  { text: 'COMMUNITY BUILDER', icon: Globe, color: 'text-violet-light' },
  { text: 'DIGITAL NEPAL', icon: Code, color: 'text-cyan-400' },
]

export default function Marquee() {
  const renderItems = [...items, ...items, ...items, ...items]
  return (
    <div className="relative z-30 overflow-hidden border-t-2 border-crimson/70 border-b border-white/10 bg-gradient-to-r from-[#071224] via-[#102642] to-[#071224] py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.35)]">
      <div className="flex animate-marquee whitespace-nowrap">
        {renderItems.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 mx-6 sm:mx-8">
            <item.icon size={15} className={item.color} />
            <span className="text-sm font-bold tracking-widest uppercase text-slate-200">
              {item.text}
            </span>
            <span className="text-crimson/80 mx-3">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
