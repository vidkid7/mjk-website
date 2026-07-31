'use client'
import { BarChart3, Building2, Code, Database, Globe, Layers3, MonitorSmartphone, Zap } from 'lucide-react'

const items = [
  { text: 'CUSTOM SOFTWARE', icon: Code, color: 'text-emerald-300' },
  { text: 'WEB DEVELOPMENT', icon: MonitorSmartphone, color: 'text-cyan-300' },
  { text: 'DIGITAL SYSTEMS', icon: Database, color: 'text-blue-300' },
  { text: 'UI/UX DESIGN', icon: Layers3, color: 'text-amber-300' },
  { text: 'WORKFLOW AUTOMATION', icon: Zap, color: 'text-violet-300' },
  { text: 'BUSINESS TOOLS', icon: Building2, color: 'text-rose-300' },
  { text: 'DATA & REPORTING', icon: BarChart3, color: 'text-lime-300' },
  { text: 'DIGITAL NEPAL', icon: Globe, color: 'text-sky-300' },
]

export default function Marquee() {
  const renderItems = [...items, ...items, ...items, ...items]
  return (
    <div className="glass-panel relative z-30 overflow-hidden border-x-0 border-white/15 !bg-[#071a35]/[0.88] py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.25)]">
      <div className="flex animate-marquee whitespace-nowrap">
        {renderItems.map((item, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-2.5 sm:mx-8">
            <item.icon size={15} className={item.color} />
            <span className="text-sm font-bold uppercase tracking-widest text-slate-200">
              {item.text}
            </span>
            <span className="mx-3 text-gold/80">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
