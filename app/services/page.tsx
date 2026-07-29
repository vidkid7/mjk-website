import type { Metadata } from 'next'
import { LiquidBackdrop } from '@/components/ui/LiquidBackdrop'
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
    <main className="liquid-page relative min-h-screen overflow-hidden text-slate-900">
      <LiquidBackdrop variant="public" />
      <div className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <header className="sticky top-0 z-20 px-5 pt-4 sm:px-8">
          <div className="glass-panel mx-auto flex max-w-5xl items-center rounded-2xl px-5 py-4 sm:px-6">
            <a href="/" className="text-sm font-bold text-[#0b2b55] transition hover:text-crimson">← Mukesh Khadka</a>
          </div>
        </header>
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-crimson">Digital services</p>
          <h1 className="mt-4 max-w-3xl font-playfair text-4xl font-extrabold tracking-tight text-[#071a35] sm:text-6xl">Practical digital work, explained clearly.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Explore focused pages on web development, custom software systems, and workflow automation. Each explains the questions, process, and outcomes that matter before a project begins.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {servicePages.map((service) => <a key={service.slug} href={`/services/${service.slug}`} className="glass-panel rounded-3xl p-7 transition hover:-translate-y-1 hover:border-gold/70 hover:shadow-xl hover:shadow-[#071a35]/15"><h2 className="font-playfair text-2xl font-bold text-[#071a35]">{service.shortName}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p><span className="mt-6 inline-block text-sm font-bold text-crimson">Explore service →</span></a>)}
          </div>
        </div>
      </div>
    </main>
  )
}
