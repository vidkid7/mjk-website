'use client'

import { Landmark, Mountain, Sparkles } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { pfCulture } from '@/lib/portfolio-content'

type HeritageStage = {
  key: string
  label: string
  title: string
  body: string
  icon: typeof Mountain
}

const stages: HeritageStage[] = [
  {
    key: 'flag',
    label: '01 / THE FLAG',
    title: 'A signal that starts with home.',
    body: 'The Nepali flag opens the journey: distinctive, direct, and impossible to mistake. It is the first visual cue for work that should have a clear point of view.',
    icon: Sparkles,
  },
  {
    key: 'everest',
    label: '02 / SAGARMĀTHĀ',
    title: 'Build with a longer horizon.',
    body: 'Everest brings scale and patience into the frame. Good systems are not only made to launch; they are made to keep carrying useful work as the view gets wider.',
    icon: Mountain,
  },
  {
    key: 'janaki',
    label: '03 / JANAKPUR',
    title: 'Respect the detail inside the whole.',
    body: 'Janaki Mandir represents the craft of the detail: the small decisions, local context, and human routines that turn a polished interface into something people can rely on.',
    icon: Landmark,
  },
  {
    key: 'buddha',
    label: '04 / LUMBINI',
    title: 'Make the experience feel calm.',
    body: 'The Buddha closes the sequence with stillness. Clarity is not decoration; it is the feeling a good product leaves with the people using it every day.',
    icon: Sparkles,
  },
]

function HeritageStageCard({ stage }: { stage: HeritageStage }) {
  const Icon = stage.icon

  return (
    <article className={`gateway-heritage-journey__stage gateway-heritage-journey__stage--${stage.key}`}>
      <div className="gateway-heritage-journey__stage-label"><Icon className="h-4 w-4" aria-hidden="true" /><span>{stage.label}</span></div>
      <h3>{stage.title}</h3>
      <p>{stage.body}</p>
    </article>
  )
}

export default function HeritageRail() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <section className="gateway-heritage-journey" aria-labelledby="heritage-journey-title">
      <div className="portfolio-container gateway-heritage-journey__track">
        <div className="gateway-heritage-journey__visual-column">
          <div className="gateway-heritage-journey__visual">
            <div className="gateway-heritage-journey__visual-inner">
              <video src={pfCulture.flag.video} poster={pfCulture.flag.poster} autoPlay={!reduceMotion} muted loop playsInline preload="metadata" aria-hidden="true" />
              <div className="gateway-heritage-journey__wash" />
              <div className="gateway-heritage-journey__image gateway-heritage-journey__image--everest"><img src="/cultural/mount-everest-transparent.png" alt="Mount Everest in the Nepal origin sequence" loading="lazy" decoding="async" /></div>
              <div className="gateway-heritage-journey__image gateway-heritage-journey__image--janaki"><img src="/cultural/janaki-temple-transparent.png" alt="Janaki Mandir in Janakpur" loading="lazy" decoding="async" /></div>
              <div className="gateway-heritage-journey__image gateway-heritage-journey__image--buddha"><img src="/cultural/buddha-transparent.png" alt="Gautama Buddha from the Lumbini origin sequence" loading="lazy" decoding="async" /></div>
              <div className="gateway-heritage-journey__visual-grid" aria-hidden="true" />
              <div className="gateway-heritage-journey__visual-caption"><span>ORIGIN SIGNAL / NEPAL</span><strong>Flag → mountain → detail → stillness</strong></div>
            </div>
          </div>
          <div className="gateway-heritage-journey__progress" aria-hidden="true"><span /></div>
        </div>

        <div className="gateway-heritage-journey__copy">
          <div className="gateway-heritage-journey__intro">
            <span className="gateway-kicker">ROOTED IN NEPAL / ONE CONTINUOUS PLATE</span>
            <h2 id="heritage-journey-title">The place I come from is part of how I build.</h2>
            <p>Four anchors, one continuous point of view: bold enough to be remembered, detailed enough to be trusted, and calm enough to live with.</p>
          </div>
          <div className="gateway-heritage-journey__stages">
            {stages.map((stage) => <HeritageStageCard key={stage.key} stage={stage} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
