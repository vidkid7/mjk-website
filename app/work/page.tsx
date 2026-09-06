import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { workPages } from '@/lib/work-pages'

const siteUrl = 'https://khadkamukesh.com.np'
const title = 'Selected Digital Systems Work | Mukesh Khadka'
const description = 'Selected digital systems, workflow platforms, websites, and software project overviews from Mukesh Khadka in Nepal.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/work` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/work`,
    title,
    description,
    images: [{ url: '/hero-himalayan-peaks.jpg', width: 1920, height: 1149, alt: 'Himalayan landscape used on the Mukesh Khadka portfolio' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/hero-himalayan-peaks.jpg'] },
}

export default function WorkIndexPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/work#collection`,
        name: title,
        description,
        url: `${siteUrl}/work`,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: ['Software systems', 'Workflow platforms', 'Web development', 'Business automation'],
        inLanguage: 'en',
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/work#items`,
        itemListElement: workPages.map((work, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: work.title,
          url: `${siteUrl}/work/${work.slug}`,
        })),
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="text-sm font-bold text-slate-600 transition hover:text-emerald-700">← Mukesh Khadka</Link>
          <Link href="/#contact" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">Discuss a project</Link>
        </div>
      </header>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link href="/" className="hover:text-emerald-700">Home</Link><span aria-hidden="true"> / </span><span>Work</span></nav>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Selected systems · Nepal</p>
          <h1 className="mt-4 max-w-4xl font-playfair text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Digital systems built around the work people need to finish.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">A factual index of selected websites, software systems, data platforms, and workflow tools from Mukesh Khadka’s practice.</p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workPages.map((work) => (
              <article key={work.slug} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
                <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.16em] text-slate-400"><span>{work.category}</span><span>{work.year}</span></div>
                <h2 className="mt-6 font-playfair text-2xl font-bold leading-tight text-slate-950"><Link href={`/work/${work.slug}`} className="transition hover:text-emerald-700">{work.title}</Link></h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{work.description}</p>
                <Link href={`/work/${work.slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-emerald-700 transition hover:text-emerald-900">Read project overview <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>

          <aside className="mt-14 rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
            <h2 className="font-playfair text-2xl font-bold">Have a workflow that needs to move?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">Share the current process, the people involved, and the part that takes too long. That is enough to start a useful conversation.</p>
            <Link href="/#contact" className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400">Open a project channel</Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
