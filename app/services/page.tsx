import type { Metadata } from 'next'
import { servicePages } from '@/lib/service-pages'

const siteUrl = 'https://khadkamukesh.com.np'

export const metadata: Metadata = {
  title: 'Digital Services | Web, Software, and Automation',
  description: 'Explore practical web development, custom software development, and business automation services from Mukesh Khadka.',
  alternates: { canonical: `${siteUrl}/services` },
}

export default function ServicesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Digital Services',
    url: `${siteUrl}/services`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: servicePages.map((service, index) => ({
        '@type': 'ListItem', position: index + 1, name: service.name, url: `${siteUrl}/services/${service.slug}`,
      })),
    },
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-5 py-14 text-slate-900 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-bold text-emerald-700 hover:text-emerald-900">← Mukesh Khadka</a>
        <p className="mt-12 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Digital services</p>
        <h1 className="mt-4 max-w-3xl font-playfair text-4xl font-extrabold tracking-tight sm:text-6xl">Practical digital work, explained clearly.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Explore focused pages on web development, custom software systems, and workflow automation. Each explains the questions, process, and outcomes that matter before a project begins.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {servicePages.map((service) => <a key={service.slug} href={`/services/${service.slug}`} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"><h2 className="font-playfair text-2xl font-bold">{service.shortName}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p><span className="mt-6 inline-block text-sm font-bold text-emerald-700">Explore service →</span></a>)}
        </div>
      </div>
    </main>
  )
}
