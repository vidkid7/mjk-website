import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LiquidBackdrop } from '@/components/ui/LiquidBackdrop'
import { getServicePage, servicePages } from '@/lib/service-pages'

const siteUrl = 'https://khadkamukesh.com.np'

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServicePage(params.slug)
  if (!service) return {}

  const url = `${siteUrl}/services/${service.slug}`
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title: service.title, description: service.description },
    twitter: { card: 'summary', title: service.title, description: service.description },
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServicePage(params.slug)
  if (!service) notFound()

  const url = `${siteUrl}/services/${service.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', '@id': `${url}#service`, name: service.name, description: service.description, url, provider: { '@id': `${siteUrl}/#mukesh-khadka` }, areaServed: { '@type': 'Country', name: 'Nepal' }, serviceType: service.shortName },
      { '@type': 'FAQPage', mainEntity: service.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` }, { '@type': 'ListItem', position: 3, name: service.shortName, item: url }] },
    ],
  }

  return (
    <main className="liquid-page public-editorial-light relative min-h-screen text-slate-900">
      <LiquidBackdrop variant="public" />
      <div className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <header className="sticky top-0 z-20 px-5 pt-4 sm:px-8"><div className="glass-panel mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-5 py-4 sm:px-6"><a href="/services" className="text-sm font-bold text-slate-600 transition hover:text-crimson">← All services</a><a href="/#contact" className="text-sm font-bold text-crimson transition hover:text-deep-crimson">Discuss a project</a></div></header>
        <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="glass-panel rounded-[2rem] p-7 sm:p-10"><nav aria-label="Breadcrumb" className="text-sm text-slate-500"><a href="/" className="hover:text-crimson">Home</a> <span aria-hidden="true">/</span> <a href="/services" className="hover:text-crimson">Services</a> <span aria-hidden="true">/</span> <span>{service.shortName}</span></nav>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.18em] text-crimson">Digital systems · Nepal</p>
          <h1 className="mt-4 max-w-3xl font-playfair text-4xl font-extrabold leading-tight tracking-tight text-[#071a35] sm:text-6xl">{service.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{service.intro}</p></div>
          <section className="glass-inset mt-8 rounded-3xl p-7 sm:p-9"><h2 className="font-playfair text-2xl font-bold text-[#071a35]">What this should help achieve</h2><ul className="mt-5 space-y-3 text-slate-700">{service.outcomes.map((outcome) => <li key={outcome} className="flex gap-3"><span className="font-bold text-crimson" aria-hidden="true">✓</span>{outcome}</li>)}</ul></section>
          <section className="mt-14"><h2 className="font-playfair text-3xl font-bold text-[#071a35]">A practical approach</h2><div className="mt-7 grid gap-5 sm:grid-cols-2">{service.process.map((step, index) => <section key={step.title} className="glass-panel rounded-3xl p-7"><p className="text-xs font-black tracking-[0.16em] text-crimson">0{index + 1}</p><h3 className="mt-3 text-xl font-bold text-[#071a35]">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.body}</p></section>)}</div></section>
          <section className="mt-14"><h2 className="font-playfair text-3xl font-bold text-[#071a35]">Common questions</h2><div className="mt-7 space-y-5">{service.faqs.map((faq) => <section key={faq.question} className="glass-inset rounded-3xl p-7"><h3 className="text-xl font-bold text-[#071a35]">{faq.question}</h3><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></section>)}</div></section>
          <aside className="admin-card mt-14 rounded-3xl p-8 text-white sm:p-10"><h2 className="font-playfair text-2xl font-bold">Start with the real workflow.</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">Share the goal, the people involved, and the process that needs to work better. That is the best foundation for a useful digital project.</p><a href="/#contact" className="glass-action mt-6 inline-flex rounded-full px-5 py-3 text-sm font-bold text-[#071a35] hover:text-crimson">Discuss your project</a></aside>
        </article>
      </div>
    </main>
  )
}
