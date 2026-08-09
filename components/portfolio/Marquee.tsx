'use client'
import { useReducedMotion } from 'framer-motion'

export default function Marquee({ items }: { items: string[] }) {
  const reduceMotion = useReducedMotion()
  const doubled = [...items, ...items]

  return (
    <div className="group/marquee relative overflow-hidden py-5" aria-label="Toolbox technologies">
      <ul className="hidden flex-wrap items-center gap-x-8 gap-y-3 motion-reduce:flex">
        {items.map((item) => (
          <li key={item} className="font-fraunces text-2xl font-semibold text-night-200/70">
            {item}
          </li>
        ))}
      </ul>
      <div className={`marquee-fade flex w-max items-center motion-reduce:hidden [animation-play-state:running] group-hover/marquee:[animation-play-state:paused] ${reduceMotion ? '' : 'animate-marquee'}`}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap pr-10">
            <span className="font-fraunces text-2xl font-semibold text-night-200/70 transition-colors duration-300 hover:text-ember-600">
              {item}
            </span>
            <span className="pl-10 text-lg text-ember-500 drop-shadow-[0_0_8px_rgba(196,102,31,0.45)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
