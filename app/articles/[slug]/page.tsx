import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Clock, Hash } from 'lucide-react'
import { notFound } from 'next/navigation'
import PublicImprint from '@/components/portfolio/PublicImprint'
import SignalRail from '@/components/portfolio/SignalRail'
import { getArticle, getArticleSlugs } from '@/lib/articles'

const siteUrl = 'https://khadkamukesh.com.np'

export function generateStaticParams(): Array<{ slug: string }> {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug)
  if (!article) return {}

  const url = `${siteUrl}/articles/${article.slug}`

  return {
    title: `${article.title} — Field Notes`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: ['Mukesh Khadka'],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const url = `${siteUrl}/articles/${article.slug}`
  const paragraphs = article.body.split('\n\n')
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Mukesh Khadka',
      url: siteUrl,
      jobTitle: 'Founder & Independent Software Consultant',
      worksFor: {
        '@type': 'Organization',
        name: 'Aasha Tech Pvt. Ltd.',
        url: 'https://aashatech.com/',
      },
    },
    publisher: {
      '@type': 'Person',
      name: 'Mukesh Khadka',
      url: siteUrl,
    },
    keywords: article.tags.join(', '),
  }

  return (
    <main className="public-route-shell gateway-shell relative min-h-screen">
      <SignalRail context="FIELD NOTE" detail="ARTICLE · WORKFLOW · CRAFT" />
      <div className="public-route-content relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="public-route-main public-route-section public-route-article-detail">
          <a href="/articles" className="public-route-article-back">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Field Notes
          </a>

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

          <footer className="public-route-article-footer">
            <p>
              Working through a real workflow or operational problem?{' '}
              <a href="/#contact">Open a project channel.</a>
            </p>
            <p>
              Professional context:{' '}
              <a href="https://aashatech.com/">Aasha Tech</a>
              {' · '}
              <a href="https://khadkamukesh.com.np/">Portfolio</a>
              {' · '}
              <a href="https://www.facebook.com/Nepali.man.67">Public profile</a>
              <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
            </p>
          </footer>
        </section>
      </div>
      <PublicImprint
        context="FIELD NOTE"
        tagline="The article closes with the studio imprint: same studio, same channels, same ledger."
      />
    </main>
  )
}

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
