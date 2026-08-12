'use client'

import SkillsVisual from '@/components/portfolio/SkillsVisual'
import type { PublicSkills, PublicUiCopy } from '@/lib/public-content'

const frameColors = ['rgba(201, 52, 46, 0.5)', 'rgba(201, 52, 46, 0.42)', 'rgba(201, 52, 46, 0.34)', 'rgba(201, 52, 46, 0.26)']

export default function Skills({ content, copy }: { content: PublicSkills; copy: PublicUiCopy['skills'] }) {
  return (
    <section id="skills" className="case-registry relative scroll-mt-16 py-20 sm:py-28">
      <div className="portfolio-container">
        <div className="case-registry__header">
          <div>
            <div className="field-label" aria-label={copy.eyebrow}>
              <span className="field-label__index">{copy.index}</span>
              <span className="field-label__name">{copy.eyebrow}</span>
            </div>
            <h2 className="case-section-title mt-5 max-w-2xl text-3xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-4xl">
              {copy.heading}
            </h2>
          </div>

          <div className="case-registry__controls" aria-label="Inventory status">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-[var(--gateway-red)]" />
            <span>{copy.readyLabel}</span>
            <span className="case-registry__count">{String(content.disciplines.length).padStart(2, '0')} / {String(content.disciplines.length).padStart(2, '0')} disciplines</span>
          </div>
        </div>

        <dl aria-label="System inventory metadata" className="case-meta mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-baseline gap-3">
            <dt className="gateway-mono text-[11px] uppercase tracking-[0.16em] text-[var(--gateway-muted)]">{copy.categoriesLabel}</dt>
            <dd className="text-sm font-semibold text-[var(--gateway-text)]">
              {String(content.disciplines.length).padStart(2, '0')}
            </dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="gateway-mono text-[11px] uppercase tracking-[0.16em] text-[var(--gateway-muted)]">{copy.toolsLabel}</dt>
            <dd className="text-sm font-semibold text-[var(--gateway-text)]">
              {String(content.toolbox.length).padStart(2, '0')}
            </dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="gateway-mono text-[11px] uppercase tracking-[0.16em] text-[var(--gateway-muted)]">{copy.statusLabel}</dt>
            <dd className="text-sm font-semibold text-[var(--gateway-red)]">{copy.statusValue}</dd>
          </div>
        </dl>

        <div className="case-grid mt-12">
          {content.disciplines.map((discipline, i) => (
            <article key={discipline.title} className="case-card h-full">
              <div
                className="case-card__visual case-visual--0"
                style={{ borderBottomColor: frameColors[i % frameColors.length] }}
              >
                <SkillsVisual index={i} />
              </div>
              <div className="case-card__body">
                <span className="case-index">{String(i + 1).padStart(2, '0')} / Discipline</span>
                <h3 className="noir-display">{discipline.title}</h3>
                <p>{discipline.description}</p>
                <span className="case-card__open">{copy.practiceLabel}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="case-toolbox mt-12">
          <div className="case-toolbox__header">
            <span className="case-toolbox__kicker">{copy.toolboxLabel}</span>
            <span className="case-toolbox__count">
              {String(content.toolbox.length).padStart(2, '0')} {copy.toolboxCountLabel}
            </span>
          </div>
          <div className="case-toolbox__items" aria-label="Toolbox technologies">
            {content.toolbox.map((tool, i) => (
              <span
                key={tool}
                className="case-toolbox__pill"
                style={{ animationDelay: `${(i % 6) * 0.4}s` }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
