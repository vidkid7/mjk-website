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
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden py-4 border-y border-slate-700/50">
      <div className="flex animate-marquee whitespace-nowrap">
        {renderItems.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 mx-6 sm:mx-8">
            <item.icon size={15} className={item.color} />
            <span className="text-sm font-medium tracking-widest uppercase text-slate-300">
              {item.text}
            </span>
            <span className="text-gold/60 mx-3">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
