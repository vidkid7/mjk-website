import type { Metadata } from 'next'
import SignalRail from '@/components/portfolio/SignalRail'
import PublicImprint from '@/components/portfolio/PublicImprint'
import CmsUnavailable from '@/components/portfolio/CmsUnavailable'
import { loadPublicContent, PublicContentError } from '@/lib/public-content-server'

export const dynamic = 'force-dynamic'

const siteUrl = 'https://khadkamukesh.com.np'
const title = 'Digital Services in Nepal | Web, Software & Automation'
const description = 'Explore practical web development, custom software development, and business automation services from Mukesh Khadka in Nepal.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/services` },
    openGraph: { type: 'website', url: `${siteUrl}/services`, title, description, images: [{ url: '/hero-himalayan-peaks.jpg', width: 1920, height: 1149, alt: 'Himalayan landscape used on the Mukesh Khadka portfolio' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/hero-himalayan-peaks.jpg'] },
  }
}

export default async function ServicesPage() {
  let content
  try {
    content = await loadPublicContent()
  } catch (error) {
    if (error instanceof PublicContentError) return <CmsUnavailable message={error.message} />
    throw error
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/services#collection`,
        name: title,
        description,
        url: `${siteUrl}/services`,
        isPartOf: { '@id': `${siteUrl}/#website` },
        inLanguage: 'en',
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/services#items`,
        itemListElement: content.services.map((service, index) => ({
          '@type': 'ListItem', position: index + 1, name: service.name, url: `${siteUrl}/services/${service.slug}`,
        })),
      },
    ],
  }

  return (
    <main className="public-route-shell gateway-shell relative min-h-screen">
      <SignalRail site={content.site} context="SERVICE INDEX" detail="WEB / SOFTWARE / AUTOMATION" />
      <div className="public-route-content relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <section className="public-route-main public-route-hero">
          <div className="public-route-hero__copy">
            <div className="public-route-index"><span>03</span><span>Ways to work together</span><i /></div>
            <p className="public-route-kicker">Digital systems · Nepal</p>
            <h1>Practical digital work, explained clearly.</h1>
            <p className="public-route-lede">Websites, internal tools, and automation designed around the real work people need to finish. Start with the friction, then build the smallest dependable system that removes it.</p>
            <div className="public-route-hero__links"><a href="/work">See selected systems <span>↗</span></a><a href="/#contact">Open a project channel <span>↓</span></a></div>
          </div>
          <aside className="public-route-hero__signal" aria-label="Service index summary">
            <span className="public-route-signal-label">FIELD NOTES / 03</span>
            <strong>Clearer operations<br />through useful software.</strong>
            <div className="public-route-signal-grid"><span>{String(content.services.length).padStart(2, '0')} <small>service tracks</small></span><span>NP <small>primary base</small></span><span>∞ <small>practical scope</small></span></div>
          </aside>
        </section>

        <section className="public-route-main public-route-section" aria-labelledby="service-list-title">
          <div className="public-route-section-heading"><div><span className="public-route-kicker">THE WORK / SERVICE FILES</span><h2 id="service-list-title">Choose the part of the workflow that needs to move.</h2></div><p>Every engagement can begin with a conversation, a rough process map, or the thing that currently takes too long.</p></div>
          <div className="public-route-service-grid">
            {content.services.map((service, index) => (
              <a key={service.slug} href={`/services/${service.slug}`} className="public-route-card public-route-service-card">
                <div className="public-route-card__top"><span>0{index + 1}</span><span>OPEN FILE ↗</span></div>
                <h3>{service.shortName}</h3>
                <p>{service.description}</p>
                <span className="public-route-card__footer">Explore service <b>→</b></span>
              </a>
            ))}
          </div>
        </section>

        <section className="public-route-main public-route-cta" aria-labelledby="service-work-title">
          <div><span className="public-route-kicker">SELECTED SYSTEMS</span><h2 id="service-work-title">See the work behind the approach.</h2><p>Browse project overviews for digital records, data, billing, retail, education, and document workflows.</p></div>
          <a href="/work" className="public-route-cta__button">Browse project overviews <span>↗</span></a>
        </section>

        <section className="public-route-main public-route-cta" aria-labelledby="service-cta-title">
          <div><span className="public-route-kicker">GOOD WORK STARTS WITH A BETTER QUESTION</span><h2 id="service-cta-title">Bring the messy version first.</h2><p>You do not need a perfect brief. Share what is slow, repeated, unclear, or expensive to maintain, and we can shape the next useful step.</p></div>
          <a href={`mailto:${content.site.email}?subject=Digital%20systems%20project`} className="public-route-cta__button">Start an email <span>↗</span></a>
        </section>
      </div>
      <PublicImprint site={content.site} context="SERVICES INDEX" tagline={content.site.tagline} />
    </main>
  )
}
