import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getArticle } from '@/lib/articles'
import { getServicePage } from '@/lib/service-pages'
import { getWorkPage, workPages } from '@/lib/work-pages'

const siteUrl = 'https://khadkamukesh.com.np'

export function generateStaticParams() {
  return workPages.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const work = getWorkPage(params.slug)
  if (!work) return {}

  const url = `${siteUrl}/work/${work.slug}`
  return {
    title: `${work.title} | Mukesh Khadka`,
    description: work.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${work.title} | Mukesh Khadka`,
      description: work.description,
      images: [{ url: '/hero-himalayan-peaks.jpg', width: 1920, height: 1149, alt: `${work.title} project overview` }],
    },
    twitter: { card: 'summary_large_image', title: `${work.title} | Mukesh Khadka`, description: work.description, images: ['/hero-himalayan-peaks.jpg'] },
  }
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = getWorkPage(params.slug)
  if (!work) notFound()

  const service = getServicePage(work.serviceSlug)
  const article = getArticle(work.articleSlug)
  const url = `${siteUrl}/work/${work.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: work.title,
        description: work.description,
        url,
        creator: { '@id': `${siteUrl}/#mukesh-khadka` },
        about: work.focus,
        dateCreated: work.year,
        inLanguage: 'en',
        isPartOf: { '@id': `${siteUrl}/work#collection` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${siteUrl}/work` },
          { '@type': 'ListItem', position: 3, name: work.title, item: url },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700"><ArrowLeft size={16} /> All project overviews</Link>
          <Link href="/#contact" className="text-sm font-bold text-emerald-700 transition hover:text-emerald-900">Start a project</Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link href="/" className="hover:text-emerald-700">Home</Link><span aria-hidden="true"> / </span><Link href="/work" className="hover:text-emerald-700">Work</Link><span aria-hidden="true"> / </span><span>{work.category}</span></nav>
        <p className="mt-12 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">{work.category} · {work.year}</p>
        <h1 className="mt-5 max-w-3xl font-playfair text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">{work.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{work.description}</p>

        <section className="mt-12 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-7 sm:p-9" aria-labelledby="outcome-title">
          <h2 id="outcome-title" className="font-playfair text-2xl font-bold text-emerald-950">What this system is designed to make easier</h2>
          <p className="mt-4 leading-8 text-slate-700">{work.outcome}</p>
        </section>

        <section className="mt-14" aria-labelledby="focus-title">
          <h2 id="focus-title" className="font-playfair text-3xl font-bold text-slate-950">What this work focuses on</h2>
          <ul className="mt-7 grid gap-4 sm:grid-cols-3">
            {work.focus.map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700"><span className="mb-3 block text-emerald-700" aria-hidden="true">✓</span>{item}</li>)}
          </ul>
        </section>

        <section className="mt-14 grid gap-5 sm:grid-cols-2" aria-label="Related resources">
          {service && <Link href={`/services/${service.slug}`} className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:border-emerald-300 hover:shadow-lg"><span className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Related service</span><h2 className="mt-3 font-playfair text-2xl font-bold">{service.shortName}</h2><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">Explore the service <ArrowUpRight size={16} aria-hidden="true" /></span></Link>}
          {article && <Link href={`/articles/${article.slug}`} className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:border-emerald-300 hover:shadow-lg"><span className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Related field note</span><h2 className="mt-3 font-playfair text-2xl font-bold">{article.title}</h2><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">Read the field note <ArrowUpRight size={16} aria-hidden="true" /></span></Link>}
        </section>

        <aside className="mt-14 rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
          <h2 className="font-playfair text-2xl font-bold">Planning a similar digital system?</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">Share the workflow, the people involved, and the part that needs to work better. We can shape the next useful step from there.</p>
          <Link href="/#contact" className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400">Open a project channel</Link>
        </aside>
      </article>
    </main>
  )
}
