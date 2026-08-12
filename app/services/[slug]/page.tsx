import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SignalRail from '@/components/portfolio/SignalRail'
import PublicImprint from '@/components/portfolio/PublicImprint'
import { loadPublicContent } from '@/lib/public-content-server'

export const dynamic = 'force-dynamic'
const siteUrl = 'https://khadkamukesh.com.np'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  try {
    const content = await loadPublicContent()
    return content.services.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const content = await loadPublicContent()
    const service = content.services.find((item) => item.slug === params.slug)
    if (!service) return {}
    const url = `${siteUrl}/services/${service.slug}`
    return {
      title: service.title,
      description: service.description,
      alternates: { canonical: url },
      openGraph: { type: 'website', url, title: service.title, description: service.description },
      twitter: { card: 'summary', title: service.title, description: service.description },
    }
  } catch {
    return {}
  }
}

export default async function ServicePage({ params }: Params) {
  const content = await loadPublicContent()
  const service = content.services.find((item) => item.slug === params.slug)
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
    <main className="public-route-shell gateway-shell relative min-h-screen">
      <SignalRail site={content.site} context="SERVICE FILE" detail={`${service.shortName.toUpperCase()} / NEPAL`} />
      <div className="public-route-content relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <article className="public-route-main public-service-page">
          <nav aria-label="Breadcrumb" className="public-route-breadcrumb"><a href="/">Home</a><span>/</span><a href="/services">Services</a><span>/</span><strong>{service.shortName}</strong></nav>
          <section className="public-service-hero"><div><span className="public-route-kicker">SERVICE FILE / {service.shortName}</span><h1>{service.name}</h1><p>{service.intro}</p></div><div className="public-service-hero__stamp"><span>MK / 03</span><strong>BUILD<br />USEFUL</strong><small>NEPAL · REMOTE</small></div></section>
          <section className="public-service-outcomes" aria-labelledby="outcomes-title"><div className="public-route-section-heading"><div><span className="public-route-kicker">THE TARGET</span><h2>What this should make easier.</h2></div></div><ul>{service.outcomes.map((outcome) => <li key={outcome}><span>✓</span>{outcome}</li>)}</ul></section>
          <section className="public-service-process" aria-labelledby="process-title"><div className="public-route-section-heading"><div><span className="public-route-kicker">THE METHOD</span><h2>A practical approach.</h2></div><p>Clear checkpoints keep the work useful, understandable, and connected to the people who will rely on it.</p></div><div className="public-service-process__grid">{service.process.map((step, index) => <div key={step.title} className="public-route-card public-service-step"><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></section>
          <section className="public-service-faq" aria-labelledby="faq-title"><div className="public-route-section-heading"><div><span className="public-route-kicker">OPEN QUESTIONS</span><h2>Before we start.</h2></div></div><div className="public-service-faq__list">{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></section>
          <aside className="public-route-cta public-service-cta"><div><span className="public-route-kicker">NEXT SIGNAL</span><h2>Start with the real workflow.</h2><p>Share the goal, the people involved, and the process that needs to work better.</p></div><a href={`mailto:${content.site.email}?subject=${encodeURIComponent(service.shortName)}%20project`} className="public-route-cta__button">Discuss your project <span>↗</span></a></aside>
        </article>
      </div>
      <PublicImprint site={content.site} context="SERVICE FILE" tagline={content.site.tagline} />
    </main>
  )
}
