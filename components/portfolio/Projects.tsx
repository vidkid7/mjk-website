'use client'

import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import CaseVisual from '@/components/portfolio/CaseVisual'
import Reveal from '@/components/portfolio/Reveal'
import SectionHeader from '@/components/portfolio/SectionHeader'
import type { PublicProject, PublicUiCopy } from '@/lib/public-content'
import { getWorkPageByTitle } from '@/lib/work-pages'

type ProjectView = 'grid' | 'focus'

export default function Projects({ projects, copy }: { projects: PublicProject[]; copy: PublicUiCopy['projects'] }) {
  const [view, setView] = useState<ProjectView>('grid')
  const [selected, setSelected] = useState(0)
  const project = projects[selected]

  return (
    <section id="work" className="case-registry relative scroll-mt-16 py-20 sm:py-28">
      <div className="portfolio-container">
        <div className="case-registry__header">
          <Reveal>
            <SectionHeader index={copy.index} eyebrow={copy.eyebrow} heading={copy.heading} />
          </Reveal>
          <Reveal delay={80}>
            <div className="case-registry__controls case-switcher" aria-label="Project view">
              <span>{copy.viewLabel}</span>
              <button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')} className={view === 'grid' ? 'is-active' : ''}>{copy.gridLabel}</button>
              <button type="button" aria-pressed={view === 'focus'} onClick={() => setView('focus')} className={view === 'focus' ? 'is-active' : ''}>{copy.focusLabel}</button>
            </div>
          </Reveal>
        </div>

        {view === 'focus' ? (
          <div className="case-focus">
            <div className={`case-focus__visual case-visual--${selected}`}>
              <CaseVisual index={selected} />
            </div>
            <div className="case-focus__copy">
              <span className="case-index">FILE {String(selected + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              <h3 className="noir-display">{project?.title}</h3>
              <p>{project?.description}</p>
              <p className="case-outcome"><span>RESULT / </span>{project?.outcome}</p>
              <ul>{project?.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <a href="#contact" className="case-open-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">
                {copy.discussLabel} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">VIEW PROJECT</span>
              </a>
              <div className="case-focus__pager">
                <button type="button" aria-label="Previous project" disabled={!projects.length} onClick={() => setSelected((selected - 1 + projects.length) % projects.length)}><ChevronLeft /></button>
                <span>{String(selected + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                <button type="button" aria-label="Next project" disabled={!projects.length} onClick={() => setSelected((selected + 1) % projects.length)}><ChevronRight /></button>
              </div>
            </div>
          </div>
        ) : (
          <div className="case-grid">
            {projects.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 70} y={18}>
                <article className={`case-card ${selected === i ? 'is-selected' : ''}`}>
                  <button type="button" className={`case-card__visual case-visual--${i}`} onClick={() => { setSelected(i); setView('focus') }} aria-label={`Open ${item.title}`}>
                    <CaseVisual index={i} />
                  </button>
                  <div className="case-card__body">
                    <span className="case-index">0{i + 1} / {item.category}</span>
                    <h3 className="noir-display">{item.title}</h3>
                    <p>{item.outcome}</p>
                    {getWorkPageByTitle(item.title) && <a href={`/work/${getWorkPageByTitle(item.title)?.slug}`} className="case-card__open" aria-label={`Read the ${item.title} project overview`}>
                      Read project overview <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>}
                    <button type="button" onClick={() => { setSelected(i); setView('focus') }} className="case-card__open">
                      {copy.openLabel} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">VIEW FILE</span>
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <div className="case-registry__footer">
          <span>{projects.length} {copy.footerPrimary}</span>
          <span>{copy.footerSecondary}</span>
        </div>
      </div>
    </section>
  )
}
