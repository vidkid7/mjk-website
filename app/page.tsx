'use client'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Vision from '@/components/sections/Vision'
import Initiatives from '@/components/sections/Initiatives'
import Entrepreneurship from '@/components/sections/Entrepreneurship'
import YouthInspiration from '@/components/sections/YouthInspiration'
import Gallery from '@/components/sections/Gallery'
import News from '@/components/sections/News'
import Stats from '@/components/sections/Stats'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Vision />
      <Initiatives />
      <Entrepreneurship />
      <YouthInspiration />
      <Gallery />
      <News />
      <Stats />
      <Contact />
      <Footer />
    </main>
  )
}
