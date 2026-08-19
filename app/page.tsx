import PortfolioNavbar from '@/components/portfolio/Navbar'
import PortfolioHero from '@/components/portfolio/Hero'
import Marquee from '@/components/portfolio/Marquee'
import About from '@/components/portfolio/About'
import Projects from '@/components/portfolio/Projects'
import Skills from '@/components/portfolio/Skills'
import Experience from '@/components/portfolio/Experience'
import Testimonials from '@/components/portfolio/Testimonials'
import Contact from '@/components/portfolio/Contact'
import Footer from '@/components/portfolio/Footer'
import LoadingScreen from '@/components/portfolio/LoadingScreen'
import Atmosphere from '@/components/fx/Atmosphere'
import CursorGlow from '@/components/fx/CursorGlow'
import CmsUnavailable from '@/components/portfolio/CmsUnavailable'
import AmbientMusic from '@/components/portfolio/AmbientMusic'
import { loadPublicContent, PublicContentError } from '@/lib/public-content-server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let content
  try {
    content = await loadPublicContent()
  } catch (error) {
    if (error instanceof PublicContentError) return <CmsUnavailable message={error.message} />
    throw error
  }

  const visible = content.site.visibleSections
  return (
    <main id="main-content" className="portfolio-page tech-noir-shell gateway-shell relative min-h-screen">
      <LoadingScreen />
      <AmbientMusic />
      <Atmosphere />
      <CursorGlow />
      <div className="relative z-10">
        <PortfolioNavbar site={content.site} navigation={content.ui.navigation} />
        {visible.hero !== false && <PortfolioHero content={content.hero} site={content.site} />}
        {visible.skills !== false && <div className="gateway-toolbox-marquee border-y border-ink/10 bg-ink/[0.02]"><Marquee items={content.skills.toolbox} /></div>}
        {visible.about !== false && <About content={content.about} site={content.site} />}
        {visible.portfolio !== false && <Projects projects={content.projects} copy={content.ui.projects} />}
        {visible.skills !== false && <Skills content={content.skills} copy={content.ui.skills} />}
        {visible.achievements !== false && <Experience experience={content.experience} copy={content.ui.experience} />}
        {visible.testimonials !== false && <Testimonials testimonials={content.testimonials} copy={content.ui.testimonials} />}
        {visible.contact !== false && <Contact content={content.contact} copy={content.ui.contact} />}
        <Footer site={content.site} services={content.services} copy={content.ui.footer} />
      </div>
    </main>
  )
}
