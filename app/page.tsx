'use client'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Achievements from '@/components/sections/Achievements'
import ClientPortfolio from '@/components/sections/ClientPortfolio'
import Vision from '@/components/sections/Vision'
import Initiatives from '@/components/sections/Initiatives'
import Entrepreneurship from '@/components/sections/Entrepreneurship'
import YouthInspiration from '@/components/sections/YouthInspiration'
import Testimonials from '@/components/sections/Testimonials'
import Gallery from '@/components/sections/Gallery'
import News from '@/components/sections/News'
import Stats from '@/components/sections/Stats'
import Contact from '@/components/sections/Contact'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
import { LiquidBackdrop } from '@/components/ui/LiquidBackdrop'
import { useStoredData } from '@/lib/storage'

const defaultSettings = {
  visible_sections: {
    hero: true,
    about: true,
    achievements: true,
    portfolio: true,
    vision: true,
    initiatives: true,
    entrepreneurship: true,
    youth: true,
    testimonials: true,
    gallery: true,
    news: true,
    stats: true,
    contact: true,
  },
}

type SectionKey = keyof typeof defaultSettings.visible_sections

export default function Home() {
  const settings = useStoredData('settings', defaultSettings)
  const show = (section: SectionKey) => settings.visible_sections?.[section] ?? true

  return (
    <main id="main-content" className="liquid-page relative">
      <LiquidBackdrop />
      <Navbar />
      {show('hero') && <Hero />}
      <Marquee />
      {show('about') && <About />}
      {show('achievements') && <Achievements />}
      {show('portfolio') && <ClientPortfolio />}
      {show('vision') && <Vision />}
      {show('initiatives') && <Initiatives />}
      {show('entrepreneurship') && <Entrepreneurship />}
      {show('youth') && <YouthInspiration />}
      {show('testimonials') && <Testimonials />}
      {show('gallery') && <Gallery />}
      {show('news') && <News />}
      {show('stats') && <Stats />}
      {show('contact') && <Contact />}
      <FAQ />
      <Footer />
    </main>
  )
}
