'use client'

import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Hash, ImageIcon } from 'lucide-react'
import type { PublicArticle } from '@/lib/public-content'

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return iso

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length
}

export default function ArticleContent({ initialSlug, articles }: { initialSlug: string; articles: PublicArticle[] }) {
  const router = useRouter()
  const params = useParams()
  const slug = (params?.slug as string) || initialSlug

  // On initial server render the slug matches the URL param. On client nav
  // (router.push) the params update and we re-derive the article in place,
  // keeping the page shell intact.
  const article = articles.find((item) => item.slug === slug)
  if (!article) return null

  const currentIndex = articles.findIndex((item) => item.slug === article.slug)
  const previous = { article: articles[currentIndex + 1], index: currentIndex + 1 }
  const next = { article: articles[currentIndex - 1], index: currentIndex - 1 }
  const paragraphs = article.body.split('\n\n')
  const total = articles.length

  const navigateTo = (targetSlug: string) => {
    // SPA-style navigation: push the new slug. Next.js client-side router
    // updates params and ArticleContent re-derives the article in place,
    // preserving the shell (SignalRail, PublicImprint) across article changes.
    router.push(`/articles/${targetSlug}`)
  }

  const NavCard = ({
    label,
    href,
    category,
    title,
    date,
    readMinutes,
    direction,
  }: {
    label: string
    href: string
    category: string
    title: string
    date: string
    readMinutes: number
    direction: 'prev' | 'next'
  }) => (
    <button
      type="button"
      onClick={() => navigateTo(href.split('/articles/')[1])}
      className={`field-feature__nav-card field-feature__nav-card--${direction}`}
    >
      <span className="field-feature__nav-card-tag">
        {direction === 'prev' ? (
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        ) : null}
        {label}
        {direction === 'next' ? (
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        ) : null}
      </span>
      <span className="field-feature__nav-card-meta">{category}</span>
      <span className="field-feature__nav-card-title">{title}</span>
      <span className="field-feature__nav-card-foot">
        {formatDate(date)} · {readMinutes} MIN READ
      </span>
    </button>
  )

  return (
    <>
      <article className="field-feature field-feature--spread">
        <div className="field-feature__folio" aria-label="Article folio">
          <span className="field-feature__folio-volume">FIELD NOTES</span>
          <span className="field-feature__folio-rule" aria-hidden="true" />
          <span className="field-feature__folio-page">ARTICLE · {article.category.toUpperCase()}</span>
          <span className="field-feature__folio-rule" aria-hidden="true" />
          <span className="field-feature__folio-section">ON FILE</span>
        </div>

        <header className="field-feature__head">
          <div className="field-feature__meta">
            <span className="field-feature__corner" aria-hidden="true" />
            <span className="field-feature__index">FIELD NOTE · {article.slug}</span>
            <span className="field-feature__category">{article.category}</span>
          </div>
          <div className="field-feature__head-meta">
            <span className="field-feature__byline">
              <span className="field-feature__byline-mark" aria-hidden="true">MK</span>
              <span className="field-feature__byline-text">
                <strong>FILED BY</strong>
                <small>Mukesh Khadka</small>
              </span>
            </span>
            <span className="field-feature__date">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(article.date)}
            </span>
            <span className="field-feature__read">{article.readMinutes} MIN READ</span>
          </div>
        </header>

        <div className="field-feature__body">
          <div className="field-feature__lead">
            <span className="field-feature__lead-tag">FIELD NOTE</span>
            <h1 className="field-feature__title">{article.title}</h1>
            <p className="field-feature__excerpt">{article.excerpt}</p>
          </div>

          <figure className="field-feature__image-box" aria-label={article.caption || article.title}>
            <span className="field-feature__image-box-rule" aria-hidden="true" />
            <span className="field-feature__image-box-corner field-feature__image-box-corner--tl" aria-hidden="true" />
            <span className="field-feature__image-box-corner field-feature__image-box-corner--tr" aria-hidden="true" />
            <span className="field-feature__image-box-corner field-feature__image-box-corner--bl" aria-hidden="true" />
            <span className="field-feature__image-box-corner field-feature__image-box-corner--br" aria-hidden="true" />
            <span className="field-feature__image-box-tag" aria-hidden="true">
              <ImageIcon className="h-3 w-3" />
              FIELD PLATE · {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <img
              src={article.image || article.cover || ''}
              alt={article.caption || article.title}
              width={1600}
              height={900}
              className="field-feature__image"
              loading="lazy"
            />
            <figcaption className="field-feature__image-caption">
              <span className="field-feature__image-caption-label">CAPTION</span>
              <span className="field-feature__image-caption-text">{article.caption || article.title}</span>
            </figcaption>
          </figure>

          <div className="field-feature__content">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'field-feature__paragraph field-feature__paragraph--lead'
                    : 'field-feature__paragraph'
                }
              >
                <span className="field-feature__paragraph-num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="field-feature__paragraph-text">{paragraph}</span>
              </p>
            ))}
          </div>

          <aside className="field-feature__sidebar" aria-label="Article metadata">
            <header className="field-feature__sidebar-head">
              <span className="field-feature__sidebar-key">FILED UNDER</span>
            </header>

            <ul className="field-feature__tags field-feature__tags--sidebar" aria-label="Tags">
              {article.tags.map((tag, index) => (
                <li key={tag} className="field-feature__tag-row">
                  <span
                    className="field-feature__tag-line"
                    style={{ ['--thread-len' as string]: `${20 + index * 8}%` }}
                    aria-hidden="true"
                  />
                  <span className="field-feature__tag-content">
                    <Hash className="h-3 w-3" aria-hidden="true" />
                    {tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="field-feature__sidebar-divider" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <dl className="field-feature__sidebar-stats">
              <div>
                <dt>Words</dt>
                <dd>{wordCount(article.body)}</dd>
              </div>
              <div>
                <dt>Read</dt>
                <dd>
                  {article.readMinutes}
                  <small>min</small>
                </dd>
              </div>
              <div>
                <dt>Filed</dt>
                <dd>{formatDate(article.date)}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span /> ON FILE
                </dd>
              </div>
            </dl>

            <div className="field-feature__sidebar-divider" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="field-feature__sidebar-signoff">
              <span className="field-feature__sidebar-signoff-label">SOURCE</span>
              <span className="field-feature__sidebar-signoff-mark">PUBLIC FIELD NOTES</span>
            </div>
          </aside>

          <footer className="field-feature__foot">
            <span className="field-feature__endmark" aria-hidden="true">
              ❦ ¶
            </span>
            <span className="field-feature__signoff">
              Filed {formatDate(article.date)} · {article.readMinutes} min · {wordCount(article.body)} words
            </span>
          </footer>
        </div>
      </article>

      <nav className="field-feature__nav field-feature__nav--creative" aria-label="Article navigation">
        <div className="field-feature__nav-head">
          <span className="field-feature__nav-key">ADJACENT NOTES</span>
          <span className="field-feature__nav-rule" aria-hidden="true" />
          <span className="field-feature__nav-meta">
            {String(currentIndex + 1).padStart(2, '0')} OF {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="field-feature__nav-grid">
          {previous.article ? (
            <NavCard
              label={`PREVIOUS · ${String(previous.index ?? currentIndex + 2).padStart(2, '0')}`}
              href={`/articles/${previous.article.slug}`}
              category={previous.article.category}
              title={previous.article.title}
              date={previous.article.date}
              readMinutes={previous.article.readMinutes}
              direction="prev"
            />
          ) : (
            <span className="field-feature__nav-card field-feature__nav-card--empty">
              <span className="field-feature__nav-card-tag">EARLIEST ON RECORD</span>
              <span className="field-feature__nav-card-title">You are reading the oldest note.</span>
            </span>
          )}

          {next.article ? (
            <NavCard
              label={`NEXT · ${String(currentIndex).padStart(2, '0')}`}
              href={`/articles/${next.article.slug}`}
              category={next.article.category}
              title={next.article.title}
              date={next.article.date}
              readMinutes={next.article.readMinutes}
              direction="next"
            />
          ) : (
            <span className="field-feature__nav-card field-feature__nav-card--empty">
              <span className="field-feature__nav-card-tag">LATEST ON RECORD</span>
              <span className="field-feature__nav-card-title">You are reading the most recent note.</span>
            </span>
          )}
        </div>

        <div className="field-feature__nav-back">
          <a href="/articles" className="field-feature__nav-back-link">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            Return to the writing index
          </a>
        </div>

        <svg
          className="field-feature__nav-wave"
          viewBox="0 0 600 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="nav-wave-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--article-red)" stopOpacity="0.05" />
              <stop offset="50%" stopColor="var(--article-red)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--article-red)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="nav-wave-fg" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--route-accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--route-accent)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--route-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#nav-wave-gradient)"
            strokeWidth="1.3"
            strokeLinecap="round"
          >
            <path d="M0 40 L8 40 M14 34 L18 46 M24 28 L28 48 M34 36 L38 40 M44 30 L48 44 M54 38 L58 40 M64 28 L68 42 M74 36 L78 40 M84 28 L88 42 M94 32 L98 40 M104 26 L108 44 M114 34 L118 40 M124 28 L128 42 M134 30 L138 40 M144 26 L148 44 M154 30 L158 42 M164 26 L168 44 M174 30 L178 42 M184 28 L188 40 M194 26 L198 44 M204 30 L208 42 M214 26 L218 44 M224 28 L228 42 M234 30 L238 40 M244 26 L248 44 M254 30 L258 42 M264 26 L268 44 M274 30 L278 42 M284 28 L288 40 M294 26 L298 44 M304 30 L308 42 M314 26 L318 44 M324 28 L328 40 M334 30 L338 42 M344 26 L348 44 M354 30 L358 42 M364 26 L368 44 M374 30 L378 42 M384 28 L388 40 M394 26 L398 44 M404 30 L408 42 M414 26 L418 44 M424 28 L428 42 M434 30 L438 40 M444 26 L448 44 M454 30 L458 42 M464 26 L468 44 M474 28 L478 42 M484 26 L488 44 M494 30 L498 42 M504 26 L508 44 M514 28 L518 42 M524 26 L528 44 M534 28 L538 42 M544 26 L548 44 M554 28 L558 42 M564 26 L568 44 M574 28 L578 42 M584 26 L588 44 M594 28 L598 42" />
          </g>
        </svg>
      </nav>
    </>
  )
}
