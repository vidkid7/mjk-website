import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import PublicImprint from '@/components/portfolio/PublicImprint'
import SignalRail from '@/components/portfolio/SignalRail'
import ArticleContent from '@/components/articles/ArticleContent'
import CmsUnavailable from '@/components/portfolio/CmsUnavailable'
import { loadPublicContent, PublicContentError } from '@/lib/public-content-server'

const siteUrl = 'https://khadkamukesh.com.np'
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const content = await loadPublicContent()
    return content.articles.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let content
  try { content = await loadPublicContent() } catch { return {} }
  const article = content.articles.find((item) => item.slug === params.slug)
  if (!article) return {}

  const url = `${siteUrl}/articles/${article.slug}`
  const image = article.image || article.cover || '/hero-himalayan-peaks.jpg'

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
      images: [{ url: image, alt: article.caption || article.title }],
    },
    twitter: { card: 'summary_large_image', title: `${article.title} — Field Notes`, description: article.excerpt, images: [image] },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let content
  try {
    content = await loadPublicContent()
  } catch (error) {
    if (error instanceof PublicContentError) return <CmsUnavailable message={error.message} />
    throw error
  }
  const article = content.articles.find((item) => item.slug === params.slug)
  if (!article) notFound()

  const url = `${siteUrl}/articles/${article.slug}`
  const image = article.image || article.cover || '/hero-himalayan-peaks.jpg'
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.excerpt,
        image: [image],
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        datePublished: article.date,
        dateModified: article.date,
        articleSection: article.category,
        inLanguage: 'en',
        wordCount: article.body.trim().split(/\s+/).length,
        timeRequired: article.readMinutes ? `PT${article.readMinutes}M` : undefined,
        author: {
          '@type': 'Person',
          '@id': `${siteUrl}/#mukesh-khadka`,
          name: 'Mukesh Khadka',
          url: siteUrl,
        },
        publisher: { '@id': `${siteUrl}/#mukesh-khadka` },
        isPartOf: { '@id': `${siteUrl}/articles#collection` },
        keywords: article.tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Field Notes', item: `${siteUrl}/articles` },
          { '@type': 'ListItem', position: 3, name: article.title, item: url },
        ],
      },
    ],
  }

  return (
    <main className="public-route-shell gateway-shell relative min-h-screen">
      <SignalRail site={content.site} context="FIELD NOTE" detail="ARTICLE · WORKFLOW · CRAFT" />
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

          <ArticleContent initialSlug={params.slug} articles={content.articles} />
        </section>

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
      </div>
      <PublicImprint
        site={content.site}
        context="FIELD NOTE"
        tagline="The article closes with the studio imprint: same studio, same channels, same ledger."
      />
    </main>
  )
}
