'use client'
import { heroData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'
import { useEffect, useState } from 'react'

const defaultHero = {
  label: heroData.label,
  headline: heroData.headline.replace('\n', '\\n'),
  subheadline: heroData.subheadline,
  bio: heroData.bio,
  cta_primary: heroData.cta_primary,
  cta_secondary: heroData.cta_secondary,
  hero_image: '/mk-removebg-preview.webp',
  stat_projects: heroData.stats[0].value,
  stat_lives: heroData.stats[1].value,
  stat_years: heroData.stats[2].value,
  stat_youth: heroData.stats[3].value,
}

const legacyHeroTerms = [
  'community leader', 'youth champion', 'social worker', 'entrepreneur.', 'leading nepal',
  'moving forward', 'for nepal', 'kathmandu metropolitan', 'public service', 'vote', 'campaign'
]

function isLegacyHero(content: typeof defaultHero) {
  const haystack = `${content.label} ${content.headline} ${content.subheadline} ${content.bio} ${content.cta_primary} ${content.cta_secondary}`.toLowerCase()
  return legacyHeroTerms.some(term => haystack.includes(term))
}

export default function Hero() {
  const [playVideo, setPlayVideo] = useState(false)
  const storedContent = useStoredData('hero', defaultHero)
  const content = isLegacyHero(storedContent) ? defaultHero : storedContent
  const customHeroImage =
    content.hero_image && content.hero_image !== defaultHero.hero_image
      ? content.hero_image
      : null

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const timer = window.setTimeout(() => setPlayVideo(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div id="home" className="relative isolate pt-[72px] sm:pt-[80px] lg:pt-[88px]">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#f7f9fc] text-[#12375f] sm:min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-88px)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.28)_43%,rgba(255,255,255,0.62)_70%,rgba(255,255,255,0.94)),radial-gradient(circle_at_55%_21%,rgba(245,214,173,0.32),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#edf5fb_43%,#f7f9fc_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,0.82),rgba(255,255,255,0.18)_48%,rgba(255,255,255,0.46)_76%,rgba(255,255,255,0.88)),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.38)_72%,rgba(255,255,255,0.92)_100%)]" />
        <img
          src="/living-heritage-hero-v2.webp"
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          loading="eager"
          decoding="async"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full object-cover object-center"
          draggable={false}
        />

        <div className="pointer-events-none absolute -left-[2%] top-[7%] z-[5] hidden h-[72%] w-[34%] overflow-hidden opacity-[0.34] mix-blend-multiply [mask-image:linear-gradient(90deg,black_0%,black_72%,transparent_100%)] lg:block xl:w-[31%]">
          <video
            className="hero-flag-video h-full w-full object-cover object-left"
            src={playVideo ? '/nepal-flag-user-v1.webm' : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
        </div>

        {customHeroImage && (
          <img
            src={customHeroImage}
            alt="Mukesh Khadka"
            width={403}
            height={620}
            loading="eager"
            decoding="async"
            className="hero-portrait-static pointer-events-none absolute bottom-0 left-1/2 right-auto z-[14] h-[28%] w-auto max-w-none -translate-x-1/2 object-contain sm:left-auto sm:right-[8%] sm:h-[76%] sm:translate-x-0 md:right-[10%] md:h-[84%] lg:right-[12%] lg:h-[92%] xl:right-[14%]"
            draggable={false}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-24 bg-crimson [clip-path:polygon(68%_68%,100%_42%,100%_100%,0_100%,0_100%)] sm:h-32 lg:h-32" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[13] h-24 bg-[#082d58] [clip-path:ellipse(82%_68%_at_37%_104%)] sm:h-32 lg:h-32" />

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1680px] items-end justify-center px-5 pb-[20vh] sm:min-h-[calc(100svh-80px)] sm:px-8 sm:pb-[18vh] lg:min-h-[calc(100svh-88px)] lg:justify-start lg:px-[7%] lg:pb-[19vh]">
          <div className="relative z-30 text-center lg:text-left">
            <h1 className="hero-name-3d font-playfair text-[3.1rem] font-black leading-[0.92] tracking-[-0.05em] min-[420px]:text-[3.65rem] sm:text-[4.4rem] md:text-[5rem] lg:text-[4.9rem] xl:text-[5.5rem]">
              Mukesh Khadka
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}
