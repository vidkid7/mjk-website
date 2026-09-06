import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Clock, Bookmark, Hash, ImageIcon } from 'lucide-react'
import SignalRail from '@/components/portfolio/SignalRail'
import PublicImprint from '@/components/portfolio/PublicImprint'
import CmsUnavailable from '@/components/portfolio/CmsUnavailable'
import { loadPublicContent, PublicContentError } from '@/lib/public-content-server'

const siteUrl = 'https://khadkamukesh.com.np'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Field Notes — Articles on Software, Workflow & Nepal',
  description:
    'Curated field notes on workflow design, public-sector software, Nepali context, and the craft of building systems that quietly keep working.',
  alternates: { canonical: `${siteUrl}/articles` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/articles`,
    title: 'Field Notes — Articles on Software, Workflow & Nepal',
    description: 'Curated field notes on workflow design, public-sector software, Nepali context, and the craft of building systems that quietly keep working.',
    images: [{ url: '/hero-himalayan-peaks.jpg', width: 1920, height: 1149, alt: 'Himalayan landscape used on the Mukesh Khadka portfolio' }],
  },
  twitter: { card: 'summary_large_image', title: 'Field Notes — Articles on Software, Workflow & Nepal', description: 'Curated field notes on workflow design, public-sector software, Nepali context, and the craft of building systems that quietly keep working.', images: ['/hero-himalayan-peaks.jpg'] },
}

const featuredCopy = {
  eyebrow: 'Field notes',
  lede:
    'Short, careful writing about software, workflow, and the small decisions that make systems quietly keep working. Updated when there is something worth saying.',
}

export default async function ArticlesPage() {
  let content
  try {
    content = await loadPublicContent()
  } catch (error) {
    if (error instanceof PublicContentError) return <CmsUnavailable message={error.message} />
    throw error
  }
  const articles = content.articles
  const categories = Array.from(new Set(articles.map((article) => article.category)))
  const totalWords = articles.reduce((sum, article) => sum + article.body.split(/\s+/).length + article.excerpt.split(/\s+/).length + article.title.split(/\s+/).length, 0)
  const [feature, ...rest] = articles
  const featureIndex = feature ? articles.findIndex((a) => a.slug === feature.slug) : -1
  const previousArticle = featureIndex < articles.length - 1 ? articles[featureIndex + 1] : null
  const nextArticle = featureIndex > 0 ? articles[featureIndex - 1] : null

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/articles#collection`,
        name: 'Field Notes',
        url: `${siteUrl}/articles`,
        description: featuredCopy.lede,
        isPartOf: { '@id': `${siteUrl}/#website` },
        inLanguage: 'en',
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/articles#items`,
        itemListElement: articles.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: article.title,
          url: `${siteUrl}/articles/${article.slug}`,
        })),
      },
    ],
  }

  const categoryColors: Record<string, string> = {
    'Field notes': 'rgba(201, 52, 46, 0.5)',
    Practice: 'rgba(176, 61, 47, 0.5)',
    Craft: 'rgba(74, 45, 35, 0.5)',
    Context: 'rgba(53, 43, 76, 0.5)',
  }

  return (
    <main className="public-route-shell gateway-shell relative min-h-screen">
      <SignalRail
        site={content.site}
        context="FIELD NOTES"
        detail="ARTICLES · WORKFLOW · CRAFT"
      />
      <div className="public-route-content relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="public-route-main public-route-hero public-route-articles-hero">
          <div className="public-route-hero__copy">
            <div className="public-route-filed-index">
              <span>04</span>
              <span>Writing index</span>
              <i />
            </div>
            <p className="public-route-kicker">{featuredCopy.eyebrow}</p>
            <h1>Notes from the work, written carefully.</h1>
            <p className="public-route-lede">{featuredCopy.lede}</p>
            <div className="public-route-hero__links">
              <a href="#latest">
                Read the latest note <ArrowDown className="inline h-4 w-4" aria-hidden="true" />
              </a>
              <a href="/#contact">
                Subscribe by email <ArrowUpRight className="inline h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <aside
            className="public-route-hero__signal public-route-edition"
            aria-label="Articles index summary"
          >
            <span className="public-route-edition__marks" aria-hidden="true">
              <i className="public-route-edition__mark public-route-edition__mark--tl" />
              <i className="public-route-edition__mark public-route-edition__mark--tr" />
              <i className="public-route-edition__mark public-route-edition__mark--bl" />
              <i className="public-route-edition__mark public-route-edition__mark--br" />
            </span>

            <header className="public-route-edition__head">
              <span className="public-route-edition__masthead">
                <span className="public-route-edition__volume">VOL · IV</span>
                <span className="public-route-edition__live" aria-hidden="true">
                  <span className="public-route-edition__pulse">
                    <span className="public-route-edition__pulse-dot" />
                    <span className="public-route-edition__pulse-ring" />
                  </span>
                  IN PRINT
                </span>
              </span>
              <span className="public-route-edition__season">NPL · SUMMER ’26</span>
            </header>

            <svg
              className="public-route-edition__wave"
              viewBox="0 0 320 36"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="articles-hero-wave" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--route-accent)" stopOpacity="0.12" />
                  <stop offset="40%" stopColor="var(--route-accent)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--route-accent)" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <g
                fill="none"
                stroke="url(#articles-hero-wave)"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <path d="M0 18 L8 18 M14 12 L18 24 M24 6 L28 30 M34 16 L38 20 M44 10 L48 26 M54 14 L58 22 M64 8 L68 28 M74 13 L78 23 M84 17 L88 19 M94 11 L98 25 M104 15 L108 21 M114 8 L118 28 M124 13 L128 23 M134 16 L138 20 M144 10 L148 26 M154 12 L158 24 M164 6 L168 30 M174 14 L178 22 M184 10 L188 26 M194 16 L198 20 M204 8 L208 28 M214 13 L218 23 M224 17 L228 19 M234 11 L238 25 M244 15 L248 21 M254 8 L258 28 M264 13 L268 23 M274 16 L278 20 M284 10 L288 26 M294 12 L298 24 M304 6 L308 30 M314 14 L318 22" />
              </g>
            </svg>

            <strong className="public-route-edition__lede">
              {articles.length} on record<br />
              {categories.length} threads open.
            </strong>

            <ul className="public-route-edition__list" role="list">
              {articles.slice(0, 3).map((article, i) => (
                <li key={article.slug} className="public-route-edition__entry">
                  <a href={`/articles/${article.slug}`} className="public-route-edition__link">
                    <span className="public-route-edition__entry-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="public-route-edition__entry-body">
                      <span className="public-route-edition__entry-cat">{article.category}</span>
                      <span className="public-route-edition__entry-title">{article.title}</span>
                    </span>
                    <span className="public-route-edition__entry-time">
                      {article.readMinutes}M
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <footer className="public-route-edition__foot">
              <span>
                {String(articles.length).padStart(2, '0')} <small>entries filed</small>
              </span>
              <span>
                {String(categories.length).padStart(2, '0')} <small>threads</small>
              </span>
              <span>
                NP <small>primary base</small>
              </span>
            </footer>
          </aside>
        </section>

        {feature ? (
          <section
            id="latest"
            className="public-route-main public-route-section"
            aria-labelledby="feature-title"
          >
            <div className="public-route-section-heading">
              <div>
                <span className="public-route-kicker">FRONT PAGE / FEATURED</span>
                <h2 id="feature-title">The note worth reading first.</h2>
              </div>
              <p>
                Each piece starts with a real workflow, a real constraint, or a real decision that
                came up while building software in Nepal. This is the most recent one.
              </p>
            </div>

            <article className="field-feature field-feature--spread">
              <div className="field-feature__folio" aria-label="Edition folio">
                <span className="field-feature__folio-volume">VOL · IV</span>
                <span className="field-feature__folio-rule" aria-hidden="true" />
                <span className="field-feature__folio-page">
                  FOLIO · 01 / {String(articles.length).padStart(2, '0')}
                </span>
                <span className="field-feature__folio-rule" aria-hidden="true" />
                <span className="field-feature__folio-section">FRONT PAGE</span>
              </div>

              <div
                className="field-feature__progress"
                role="progressbar"
                aria-label="Reading progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={18}
              >
                <span className="field-feature__progress-label">READING POSITION</span>
                <span className="field-feature__progress-track">
                  <span className="field-feature__progress-fill" style={{ width: '18%' }} />
                </span>
                <span className="field-feature__progress-percent">18%</span>
              </div>

              <header className="field-feature__head">
                <div className="field-feature__meta">
                  <span className="field-feature__corner" aria-hidden="true" />
                  <span className="field-feature__index">FEATURE · 01 / {String(articles.length).padStart(2, '0')}</span>
                  <span className="field-feature__category">{feature.category}</span>
                </div>
                <div className="field-feature__head-meta">
                  <span className="field-feature__byline">
                    <span className="field-feature__byline-mark" aria-hidden="true">
                      MK
                    </span>
                    <span className="field-feature__byline-text">
                      <strong>FILED BY</strong>
                      <small>Mukesh Khadka</small>
                    </span>
                  </span>
                  <span className="field-feature__date">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDate(feature.date)}
                  </span>
                  <span className="field-feature__read">{feature.readMinutes} MIN READ</span>
                </div>
              </header>

              <div className="field-feature__body">
                <div className="field-feature__lead">
                  <span className="field-feature__lead-tag" aria-hidden="true">
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>FEATURED</span>
                  </span>
                  <h3 className="field-feature__title">{feature.title}</h3>
                  <p className="field-feature__excerpt">{feature.excerpt}</p>
                </div>

                <figure className="field-feature__image-box" aria-label={feature.caption}>
                  <span className="field-feature__image-box-rule" aria-hidden="true" />
                  <span className="field-feature__image-box-corner field-feature__image-box-corner--tl" aria-hidden="true" />
                  <span className="field-feature__image-box-corner field-feature__image-box-corner--tr" aria-hidden="true" />
                  <span className="field-feature__image-box-corner field-feature__image-box-corner--bl" aria-hidden="true" />
                  <span className="field-feature__image-box-corner field-feature__image-box-corner--br" aria-hidden="true" />
                  <span className="field-feature__image-box-tag" aria-hidden="true">
                    <ImageIcon className="h-3 w-3" />
                    FIELD PLATE · {String(featureIndex + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={feature.image}
                    alt={feature.caption}
                    width={1600}
                    height={900}
                    className="field-feature__image"
                    loading="lazy"
                  />
                  <figcaption className="field-feature__image-caption">
                    <span className="field-feature__image-caption-label">CAPTION</span>
                    <span className="field-feature__image-caption-text">{feature.caption}</span>
                  </figcaption>
                </figure>

                <div className="field-feature__content">
                  {feature.body.split('\n\n').map((paragraph, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'field-feature__paragraph field-feature__paragraph--lead'
                          : 'field-feature__paragraph'
                      }
                    >
                      <span className="field-feature__paragraph-num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="field-feature__paragraph-text">{paragraph}</span>
                    </p>
                  ))}

                  <aside className="field-feature__pullquote" aria-label="Key takeaway">
                    <span className="field-feature__pullquote-mark" aria-hidden="true">
                      ❝
                    </span>
                    <p>
                      The job is to remove the friction without losing the people who run the work.
                    </p>
                    <span className="field-feature__pullquote-cite">
                      — the editor, marginalia
                    </span>
                  </aside>
                </div>

                <aside className="field-feature__sidebar" aria-label="Article metadata">
                  <header className="field-feature__sidebar-head">
                    <span className="field-feature__sidebar-key">FILED UNDER</span>
                  </header>

                  <ul className="field-feature__tags field-feature__tags--sidebar" aria-label="Tags">
                    {feature.tags.map((tag, idx) => (
                      <li key={tag} className="field-feature__tag-row">
                        <span
                          className="field-feature__tag-line"
                          style={{ ['--thread-len' as string]: `${20 + idx * 8}%` }}
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
                      <dd>{wordCount(feature.body)}</dd>
                    </div>
                    <div>
                      <dt>Read</dt>
                      <dd>
                        {feature.readMinutes}
                        <small>min</small>
                      </dd>
                    </div>
                    <div>
                      <dt>Filed</dt>
                      <dd>{formatDate(feature.date)}</dd>
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

                  <div className="field-feature__sidebar-marginalia">
                    <span className="field-feature__sidebar-key">MARGINALIA</span>
                    <ul className="field-feature__marginalia-list">
                      <li>
                        <span className="field-feature__marginalia-marker">¶ 01</span>
                        <span className="field-feature__marginalia-text">
                          Begins with the smallest dependable piece.
                        </span>
                      </li>
                      <li>
                        <span className="field-feature__marginalia-marker">¶ 02</span>
                        <span className="field-feature__marginalia-text">
                          Walk the workflow with the people who run it.
                        </span>
                      </li>
                      <li>
                        <span className="field-feature__marginalia-marker">¶ 03</span>
                        <span className="field-feature__marginalia-text">
                          The interface reads like the workflow it replaced.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="field-feature__sidebar-divider" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="field-feature__sidebar-signoff">
                    <span className="field-feature__sidebar-signoff-label">SIGN-OFF</span>
                    <span className="field-feature__sidebar-signoff-mark">
                      MK · KHADKA
                    </span>
                  </div>
                </aside>

                <footer className="field-feature__foot">
                  <span className="field-feature__endmark" aria-hidden="true">
                    ❦ ¶
                  </span>
                  <span className="field-feature__signoff">
                    Filed {formatDate(feature.date)} · {feature.readMinutes} min · {wordCount(feature.body)} words
                  </span>
                </footer>
              </div>

              <nav className="field-feature__nav field-feature__nav--creative" aria-label="Article navigation">
                <span className="field-feature__nav-key">ADJACENT NOTES</span>
                <span className="field-feature__nav-rule" aria-hidden="true" />
                <span className="field-feature__nav-meta">
                  {String(featureIndex + 1).padStart(2, '0')} OF {String(articles.length).padStart(2, '0')}
                </span>
                <div className="field-feature__nav-grid">
                  {previousArticle ? (
                    <Link
                      href={`/articles/${previousArticle.slug}`}
                      className="field-feature__nav-card field-feature__nav-card--prev"
                    >
                      <span className="field-feature__nav-card-tag">
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        PREVIOUS · {String(featureIndex + 2).padStart(2, '0')}
                      </span>
                      <span className="field-feature__nav-card-meta">{previousArticle.category}</span>
                      <span className="field-feature__nav-card-title">{previousArticle.title}</span>
                      <span className="field-feature__nav-card-foot">
                        {formatDate(previousArticle.date)} · {previousArticle.readMinutes} MIN READ
                      </span>
                    </Link>
                  ) : (
                    <span className="field-feature__nav-card field-feature__nav-card--empty">
                      <span className="field-feature__nav-card-tag">EARLIEST ON RECORD</span>
                      <span className="field-feature__nav-card-title">You are reading the oldest note.</span>
                    </span>
                  )}
                  {nextArticle ? (
                    <Link
                      href={`/articles/${nextArticle.slug}`}
                      className="field-feature__nav-card field-feature__nav-card--next"
                    >
                      <span className="field-feature__nav-card-tag">
                        NEXT · {String(featureIndex).padStart(2, '0')}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="field-feature__nav-card-meta">{nextArticle.category}</span>
                      <span className="field-feature__nav-card-title">{nextArticle.title}</span>
                      <span className="field-feature__nav-card-foot">
                        {formatDate(nextArticle.date)} · {nextArticle.readMinutes} MIN READ
                      </span>
                    </Link>
                  ) : (
                    <span className="field-feature__nav-card field-feature__nav-card--empty">
                      <span className="field-feature__nav-card-tag">LATEST ON RECORD</span>
                      <span className="field-feature__nav-card-title">You are reading the most recent note.</span>
                    </span>
                  )}
                </div>
                <div className="field-feature__nav-back">
                  <Link
                    href={`/articles/${feature.slug}`}
                    className="field-feature__nav-back-link"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    Open the full note in its own page
                  </Link>
                </div>
              </nav>
            </article>
          </section>
        ) : null}

        <section
          className="public-route-main public-route-section public-route-filed-index"
          aria-labelledby="index-title"
        >
          <div className="public-route-section-heading">
            <div>
              <span className="public-route-kicker">THE INDEX / FIELD FILES</span>
              <h2 id="index-title">The full writing index.</h2>
            </div>
            <p>
              Every entry is a short note. The longest piece in this index reads in five minutes.
              The shortest, in three. Sorted newest first.
            </p>
          </div>

          <header className="public-route-filed-index__ledger" aria-label="Index summary">
            <span className="public-route-filed-index__ledger-key">FILED INDEX</span>
            <span className="public-route-filed-index__ledger-rule" aria-hidden="true" />
            <span className="public-route-filed-index__ledger-stat">
              <strong>{String(articles.length).padStart(2, '0')}</strong>
              <small>entries filed</small>
            </span>
            <span className="public-route-filed-index__ledger-stat">
              <strong>{String(categories.length).padStart(2, '0')}</strong>
              <small>categories</small>
            </span>
            <span className="public-route-filed-index__ledger-stat">
              <strong>
                {articles.reduce((sum, a) => sum + a.readMinutes, 0)}
                <small>M</small>
              </strong>
              <small>total read</small>
            </span>
            <span className="public-route-filed-index__ledger-stat public-route-filed-index__ledger-stat--live">
              <span className="public-route-filed-index__ledger-dot" aria-hidden="true" />
              <strong>LIVE</strong>
              <small>updating</small>
            </span>
          </header>

          <div className="public-route-filed-index__timeline" aria-label="Archive timeline">
            <div className="public-route-filed-index__timeline-head">
              <span className="public-route-filed-index__timeline-key">ARCHIVE TIMELINE</span>
              <span className="public-route-filed-index__timeline-meta">
                <strong>FEB → JUL · 2026</strong>
                <span>{articles.length} entries · 6 month arc</span>
              </span>
            </div>
            <svg
              className="public-route-filed-index__timeline-svg"
              viewBox="0 0 600 80"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="timeline-gradient"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--route-accent)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--route-accent)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--route-accent)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Timeline axis */}
              <line
                x1="0"
                y1="40"
                x2="600"
                y2="40"
                stroke="var(--route-line)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              {/* Article nodes */}
              {articles.slice().reverse().map((article, i, arr) => {
                const x = (i / Math.max(arr.length - 1, 1)) * 600
                const minLen = 60
                const maxLen = 200
                const range = maxLen - minLen
                const normalized = (article.body.length - minLen) / range
                const radius = 4 + Math.max(0, Math.min(1, normalized)) * 6
                return (
                  <g key={article.slug}>
                    <circle
                      cx={x}
                      cy={40}
                      r={radius + 4}
                      fill="var(--route-accent)"
                      opacity="0.15"
                    />
                    <circle
                      cx={x}
                      cy={40}
                      r={radius}
                      fill="var(--route-accent)"
                      stroke="var(--route-surface, #fffaf2)"
                      strokeWidth="2"
                    />
                  </g>
                )
              })}
              {/* Connector line on top of axis */}
              <path
                d={
                  'M0 40 ' +
                  articles
                    .slice()
                    .reverse()
                    .map((_a, i, arr) => `L${((i / Math.max(arr.length - 1, 1)) * 600).toFixed(2)} 40`)
                    .join(' ')
                }
                fill="none"
                stroke="url(#timeline-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="public-route-filed-index__timeline-labels" aria-hidden="true">
              <span className="public-route-filed-index__timeline-label public-route-filed-index__timeline-label--start">
                FEB · 2026
              </span>
              <span className="public-route-filed-index__timeline-label public-route-filed-index__timeline-label--mid">
                APR
              </span>
              <span className="public-route-filed-index__timeline-label public-route-filed-index__timeline-label--end">
                JUL · 2026
              </span>
            </div>
          </div>

          <ol className="field-index" role="list">
            {articles.map((article, index) => (
              <li
                key={article.slug}
                className="field-index__item"
                style={{ ['--index-accent' as string]: categoryColors[article.category] ?? 'rgba(201, 52, 46, 0.5)' }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="field-card"
                  aria-label={`Read ${article.title}`}
                >
                  <span className="field-card__corner" aria-hidden="true" />
                  <header className="field-card__head">
                    <span className="field-card__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="field-card__divider" aria-hidden="true" />
                    <span className="field-card__category">{article.category}</span>
                    <span className="field-card__status" aria-hidden="true">
                      <span /> FILED
                    </span>
                    <span className="field-card__date">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {formatDate(article.date)}
                    </span>
                  </header>
                  <div className="field-card__image-box">
                    <img
                      src={article.image}
                      alt={article.caption}
                      width={1600}
                      height={900}
                      className="field-card__image"
                      loading="lazy"
                    />
                    <span className="field-card__image-rule" aria-hidden="true" />
                  </div>
                  <h3 className="field-card__title">{article.title}</h3>
                  <p className="field-card__excerpt">{article.excerpt}</p>
                  <footer className="field-card__foot">
                    <ul className="field-card__tags" aria-label="Tags">
                      {article.tags.slice(0, 3).map((tag) => (
                        <li key={tag}>
                          <Hash className="h-3 w-3" aria-hidden="true" />
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="field-card__read">{article.readMinutes} min</span>
                    <span className="field-card__open" aria-hidden="true">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </footer>
                </Link>
              </li>
            ))}
          </ol>

          <footer className="public-route-filed-index__end" aria-hidden="true">
            <span className="public-route-filed-index__end-mark">❦ ¶</span>
            <span className="public-route-filed-index__end-text">
              END OF FILED INDEX · {articles.length} OF {articles.length} ON RECORD
            </span>
            <span className="public-route-filed-index__end-mark">❦ ¶</span>
          </footer>
        </section>

        <section
          className="public-route-main public-route-section public-route-glance"
          aria-labelledby="stats-title"
        >
          <div className="public-route-section-heading">
            <div>
              <span className="public-route-kicker">AT A GLANCE / INDEX FACTS</span>
              <h2 id="stats-title">A small library of careful notes.</h2>
            </div>
            <p>
              The notes do not arrive on a schedule. They arrive when something is worth writing
              down. Until then, here are the numbers that hold the index together.
            </p>
          </div>

          <header className="public-route-glance__ledger" aria-label="Glance summary">
            <span className="public-route-glance__ledger-key">INDEX · AT A GLANCE</span>
            <span className="public-route-glance__ledger-rule" aria-hidden="true" />
            <span className="public-route-glance__ledger-stat">
              <strong>{String(articles.length).padStart(2, '0')}</strong>
              <small>entries</small>
            </span>
            <span className="public-route-glance__ledger-divider" aria-hidden="true">·</span>
            <span className="public-route-glance__ledger-stat">
              <strong>{String(categories.length).padStart(2, '0')}</strong>
              <small>categories</small>
            </span>
            <span className="public-route-glance__ledger-divider" aria-hidden="true">·</span>
            <span className="public-route-glance__ledger-stat">
              <strong>
                {articles.reduce((sum, a) => sum + a.readMinutes, 0)}
                <small>M</small>
              </strong>
              <small>total read</small>
            </span>
            <span className="public-route-glance__ledger-rule" aria-hidden="true" />
            <span className="public-route-glance__ledger-live" aria-hidden="true">
              <span /> LIVE
            </span>
          </header>

          <div className="public-route-glance-grid">
            <article className="public-route-glance-tile public-route-glance-tile--entries">
              <span className="public-route-glance-tile__marks" aria-hidden="true">
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--tl" />
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--br" />
              </span>

              <header className="public-route-glance-tile__head">
                <span className="public-route-glance-tile__num">F · 01</span>
                <span className="public-route-glance-tile__kicker">ENTRIES · ON RECORD</span>
              </header>

              <div className="public-route-glance-tile__rule" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span className="public-route-glance-tile__value">
                {String(articles.length).padStart(2, '0')}
              </span>
              <span className="public-route-glance-tile__label">notes filed</span>

              <div className="public-route-glance-tile__chart" aria-hidden="true">
                {categories.map((cat) => {
                  const count = articles.filter((a) => a.category === cat).length
                  const maxCount = Math.max(
                    ...categories.map((c) => articles.filter((a) => a.category === c).length)
                  )
                  const width = maxCount > 0 ? (count / maxCount) * 100 : 0
                  return (
                    <div key={cat} className="public-route-glance-tile__chart-row">
                      <span className="public-route-glance-tile__chart-cat">{cat}</span>
                      <span className="public-route-glance-tile__chart-bar">
                        <span
                          className="public-route-glance-tile__chart-fill"
                          style={{ width: `${width}%` }}
                        />
                      </span>
                      <span className="public-route-glance-tile__chart-count">{count}</span>
                    </div>
                  )
                })}
              </div>

              <footer className="public-route-glance-tile__foot">
                <span className="public-route-glance-tile__live" aria-hidden="true">
                  <span /> {articles[0] ? formatDate(articles[0].date) : '—'}
                </span>
              </footer>
            </article>

            <article className="public-route-glance-tile public-route-glance-tile--threads">
              <span className="public-route-glance-tile__marks" aria-hidden="true">
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--tl" />
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--br" />
              </span>

              <header className="public-route-glance-tile__head">
                <span className="public-route-glance-tile__num">F · 02</span>
                <span className="public-route-glance-tile__kicker">THREADS · OPEN</span>
              </header>

              <div className="public-route-glance-tile__rule" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span className="public-route-glance-tile__value">
                {String(categories.length).padStart(2, '0')}
              </span>
              <span className="public-route-glance-tile__label">categories live</span>

              <ul className="public-route-glance-tile__threads" role="list">
                {categories.map((cat) => (
                  <li key={cat}>
                    <span className="public-route-glance-tile__thread-dot" aria-hidden="true" />
                    <span className="public-route-glance-tile__thread-name">{cat}</span>
                  </li>
                ))}
              </ul>

              <footer className="public-route-glance-tile__foot">
                <span className="public-route-glance-tile__live" aria-hidden="true">
                  <span /> UPDATED
                </span>
              </footer>
            </article>

            <article className="public-route-glance-tile public-route-glance-tile--words">
              <span className="public-route-glance-tile__marks" aria-hidden="true">
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--tl" />
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--br" />
              </span>

              <header className="public-route-glance-tile__head">
                <span className="public-route-glance-tile__num">F · 03</span>
                <span className="public-route-glance-tile__kicker">WORDS · ACROSS ALL</span>
              </header>

              <div className="public-route-glance-tile__rule" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span className="public-route-glance-tile__value">
                {totalWords.toLocaleString()}
              </span>
              <span className="public-route-glance-tile__label">
                {articles.length > 0
                  ? `${Math.round(totalWords / articles.length)} avg per note`
                  : 'avg per note'}
              </span>

              <svg
                className="public-route-glance-tile__spark"
                viewBox="0 0 100 32"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="glance-spark-gradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="var(--route-accent)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--route-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={
                    'M0 24 ' +
                    articles
                      .slice()
                      .reverse()
                      .map((a, i, arr) => {
                        const x = (i / Math.max(arr.length - 1, 1)) * 100
                        const minLen = 60
                        const maxLen = 200
                        const range = maxLen - minLen
                        const normalized = (a.body.length - minLen) / range
                        const y = 30 - Math.max(0, Math.min(1, normalized)) * 26
                        return `L${x.toFixed(2)} ${y.toFixed(2)}`
                      })
                      .join(' ')
                  }
                  fill="url(#glance-spark-gradient)"
                />
                <path
                  d={
                    'M0 24 ' +
                    articles
                      .slice()
                      .reverse()
                      .map((a, i, arr) => {
                        const x = (i / Math.max(arr.length - 1, 1)) * 100
                        const minLen = 60
                        const maxLen = 200
                        const range = maxLen - minLen
                        const normalized = (a.body.length - minLen) / range
                        const y = 30 - Math.max(0, Math.min(1, normalized)) * 26
                        return `L${x.toFixed(2)} ${y.toFixed(2)}`
                      })
                      .join(' ')
                  }
                  fill="none"
                  stroke="var(--route-accent)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <footer className="public-route-glance-tile__foot">
                <span className="public-route-glance-tile__live" aria-hidden="true">
                  <span /> TRENDING
                </span>
              </footer>
            </article>

            <article className="public-route-glance-tile public-route-glance-tile--latest">
              <span className="public-route-glance-tile__marks" aria-hidden="true">
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--tl" />
                <i className="public-route-glance-tile__mark public-route-glance-tile__mark--br" />
              </span>

              <header className="public-route-glance-tile__head">
                <span className="public-route-glance-tile__num">F · 04</span>
                <span className="public-route-glance-tile__kicker">LATEST · FILED</span>
              </header>

              <div className="public-route-glance-tile__rule" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span className="public-route-glance-tile__value">
                {articles[0]?.readMinutes ?? 0}
                <small>M</small>
              </span>
              <span className="public-route-glance-tile__label">
                {articles[0] ? formatDate(articles[0].date) : '—'}
              </span>

              <div className="public-route-glance-tile__latest" aria-label="Latest entry">
                <span className="public-route-glance-tile__latest-tag">
                  {articles[0]?.category ?? ''}
                </span>
                <span className="public-route-glance-tile__latest-title">
                  {articles[0]?.title ?? ''}
                </span>
              </div>

              <footer className="public-route-glance-tile__foot">
                <span className="public-route-glance-tile__live" aria-hidden="true">
                  <span /> MOST RECENT
                </span>
              </footer>
            </article>
          </div>

          <footer className="public-route-glance__end" aria-label="Archive health">
            <span className="public-route-glance__end-key">ARCHIVE HEALTH</span>
            <span className="public-route-glance__end-meter" aria-hidden="true">
              <span className="public-route-glance__end-fill" style={{ width: '92%' }} />
            </span>
            <span className="public-route-glance__end-value">
              <strong>92%</strong>
              <small>on schedule</small>
            </span>
          </footer>
        </section>

<section
          className="public-route-main public-route-cta public-route-broadcast"
          aria-labelledby="articles-cta-title"
        >
          <span className="public-route-broadcast__marks" aria-hidden="true">
            <i className="public-route-broadcast__mark public-route-broadcast__mark--tl" />
            <i className="public-route-broadcast__mark public-route-broadcast__mark--tr" />
            <i className="public-route-broadcast__mark public-route-broadcast__mark--bl" />
            <i className="public-route-broadcast__mark public-route-broadcast__mark--br" />
          </span>

          <svg
            className="public-route-broadcast__wave"
            viewBox="0 0 600 50"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="broadcast-wave-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <g
              fill="none"
              stroke="url(#broadcast-wave-gradient)"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <path d="M0 25 L8 25 M14 18 L18 32 M24 12 L28 38 M34 20 L38 30 M44 14 L48 36 M54 22 L58 28 M64 10 L68 40 M74 19 L78 31 M84 23 L88 27 M94 13 L98 37 M104 21 L108 29 M114 12 L118 38 M124 19 L128 31 M134 22 L138 28 M144 14 L148 36 M154 18 L158 32 M164 8 L168 42 M174 20 L178 30 M184 14 L188 36 M194 22 L198 28 M204 10 L208 40 M214 19 L218 31 M224 23 L228 27 M234 13 L238 37 M244 21 L248 29 M254 12 L258 38 M264 19 L268 31 M274 22 L278 28 M284 14 L288 36 M294 18 L298 32 M304 8 L308 42 M314 20 L318 30 M324 14 L328 36 M334 22 L338 28 M344 10 L348 40 M354 19 L358 31 M364 23 L368 27 M374 13 L378 37 M384 21 L388 29 M394 12 L398 38 M404 19 L408 31 M414 22 L418 28 M424 14 L428 36 M434 18 L438 32 M444 8 L448 42 M454 20 L458 30 M464 14 L468 36 M474 22 L478 28 M484 10 L488 40 M494 19 L498 31 M504 23 L508 27 M514 13 L518 37 M524 21 L528 29 M534 12 L538 38 M544 19 L548 31 M554 22 L558 28 M564 14 L568 36 M574 18 L578 32 M584 8 L588 42 M594 20 L598 30" />
            </g>
          </svg>

          <header className="public-route-broadcast__head">
            <span className="public-route-broadcast__channel" aria-hidden="true">
              <span className="public-route-broadcast__pulse">
                <span className="public-route-broadcast__pulse-dot" />
                <span className="public-route-broadcast__pulse-ring" />
              </span>
              BROADCAST · FIELD NOTES
            </span>
            <span className="public-route-broadcast__cadence">ON DEMAND · NO SCHEDULE</span>
          </header>

          <div className="public-route-broadcast__copy">
            <span className="public-route-kicker public-route-kicker--inverse">
              RECEIVE THE NEXT ONE FIRST
            </span>
            <h2 id="articles-cta-title">No newsletter. Just a short email when there is one.</h2>
            <p>
              The notes do not arrive on a schedule. They arrive when something is worth writing
              down. If that sounds useful, the easiest way is the project channel below.
            </p>
          </div>

          <div className="public-route-broadcast__cadence-grid" aria-label="Subscription details">
            <div className="public-route-broadcast__cadence-item">
              <span className="public-route-broadcast__cadence-key">FREQUENCY</span>
              <span className="public-route-broadcast__cadence-value">
                As it comes
                <i />
              </span>
            </div>
            <div className="public-route-broadcast__cadence-item">
              <span className="public-route-broadcast__cadence-key">DURATION</span>
              <span className="public-route-broadcast__cadence-value">
                ~5 min
                <i />
              </span>
            </div>
            <div className="public-route-broadcast__cadence-item">
              <span className="public-route-broadcast__cadence-key">FORMAT</span>
              <span className="public-route-broadcast__cadence-value">
                Short note
                <i />
              </span>
            </div>
            <div className="public-route-broadcast__cadence-item">
              <span className="public-route-broadcast__cadence-key">FROM</span>
              <span className="public-route-broadcast__cadence-value">
                Kathmandu
                <i />
              </span>
            </div>
          </div>

          <div className="public-route-broadcast__actions" aria-label="Subscription actions">
            <a
              href={`mailto:${content.site.email}?subject=Field%20notes%20subscription`}
              className="public-route-broadcast__action public-route-broadcast__action--primary"
            >
              <span className="public-route-broadcast__action-tag">EMAIL · SUBSCRIBE</span>
              <span className="public-route-broadcast__action-label">Send a note</span>
              <span className="public-route-broadcast__action-meta">
                {content.site.email}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <a
              href="#latest"
              className="public-route-broadcast__action public-route-broadcast__action--secondary"
            >
              <span className="public-route-broadcast__action-tag">FIRST · READ LATEST</span>
              <span className="public-route-broadcast__action-label">See what one looks like</span>
              <span className="public-route-broadcast__action-meta">
                5 min read
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>

          <footer className="public-route-broadcast__foot" aria-label="Recent dispatches">
            <span className="public-route-broadcast__foot-key">RECENT DISPATCHES</span>
            <ol className="public-route-broadcast__dispatch-list">
              {articles.slice(0, 3).map((article, i) => (
                <li key={article.slug}>
                  <span className="public-route-broadcast__dispatch-num">
                    {String(articles.length - i).padStart(2, '0')}
                  </span>
                  <span className="public-route-broadcast__dispatch-date">
                    {formatDate(article.date)}
                  </span>
                  <span className="public-route-broadcast__dispatch-cat">
                    {article.category}
                  </span>
                </li>
              ))}
            </ol>
          </footer>
        </section>
      </div>
      <PublicImprint site={content.site} context="FIELD NOTES" tagline={content.site.tagline} />
    </main>
  )
}

function formatDate(iso: string): string {
  try {
    const date = new Date(`${iso}T00:00:00Z`)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length
}
