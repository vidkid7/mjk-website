'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, Globe, Play } from 'lucide-react'
import { heroData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

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
  const storedContent = useStoredData('hero', defaultHero)
  const content = isLegacyHero(storedContent) ? defaultHero : storedContent
  const customHeroImage =
    content.hero_image && content.hero_image !== defaultHero.hero_image
      ? content.hero_image
      : null
  const headlineParts = content.headline.replace(/\\n/g, '\n').split('\n').filter(Boolean)
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    const timer = window.setTimeout(() => setPlayVideo(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div id="home" className="relative isolate pt-[72px] sm:pt-[80px] lg:pt-[88px]">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#f7f9fc] text-[#12375f] sm:min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-88px)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.28)_43%,rgba(255,255,255,0.62)_70%,rgba(255,255,255,0.94)),radial-gradient(circle_at_55%_21%,rgba(245,214,173,0.32),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#edf5fb_43%,#f7f9fc_100%)]" />

        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,0.91),rgba(255,255,255,0.2)_46%,rgba(255,255,255,0.54)_72%,rgba(255,255,255,0.94)),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.54)_74%,rgba(255,255,255,0.95))]" />
        <img
          src="/living-heritage-hero-v2.webp"
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          loading="eager"
          decoding="async"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full object-cover object-[64%_center] sm:object-[62%_center] lg:object-center"
          draggable={false}
        />

        <video
          className="hero-flag-video pointer-events-none absolute -left-[12rem] top-[-1rem] z-[4] hidden h-[72%] w-[58rem] max-w-none object-cover object-left opacity-[0.58] mix-blend-multiply brightness-[1.24] saturate-[1.34] contrast-[1.02] lg:block lg:-left-[6rem] lg:top-[-1.2rem] lg:h-[80%] lg:w-[79rem]"
          src={playVideo ? '/nepal-flag-hero-bg-optimized.mp4' : undefined}
          poster={playVideo ? '/nepal-flag-hero-poster.jpg' : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden="true"
          style={{
            WebkitMaskImage:
              'linear-gradient(90deg, black 0%, black 38%, rgba(0,0,0,0.48) 50%, transparent 69%)',
            maskImage:
              'linear-gradient(90deg, black 0%, black 38%, rgba(0,0,0,0.48) 50%, transparent 69%)',
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[6] bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.62)_35%,rgba(255,255,255,0.2)_66%,rgba(255,255,255,0.72)),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.12)_46%,rgba(255,255,255,0.72)_100%)]" />

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

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1680px] items-start px-5 pb-44 pt-8 sm:min-h-[calc(100svh-80px)] sm:items-center sm:px-8 sm:pb-32 md:pt-12 lg:min-h-[calc(100svh-88px)] lg:px-12 lg:pb-36">
          <div className="relative z-30 mx-auto max-w-[30rem] rounded-2xl border border-white/80 bg-white/[0.92] px-4 py-5 text-center shadow-xl shadow-[#071a35]/10 backdrop-blur-md sm:mx-0 sm:max-w-[35rem] sm:px-6 sm:py-7 sm:text-left lg:ml-[12%] lg:max-w-[34rem] lg:bg-white/[0.82] lg:px-8 lg:py-9 xl:ml-[14%] glass-panel">
            <div className="mb-3 inline-flex sm:mb-5">
              <span className="glass-inset inline-flex items-center gap-2 rounded-md border border-[#12375f]/18 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#12375f] shadow-sm shadow-slate-900/5 sm:gap-3 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.28em]">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson sm:h-3 sm:w-3" />
                {content.label}
              </span>
            </div>

            <h1 className="font-playfair text-[3rem] font-extrabold leading-[0.95] tracking-tight text-[#12375f] min-[420px]:text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[5rem]">
              {headlineParts[0] || 'Digital'}
              <span className="block text-crimson">{headlineParts.slice(1).join(' ') || 'Solutions'}</span>
            </h1>

            <p className="mt-4 max-w-xl text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#12375f]/78 sm:mt-5 sm:text-[13px] sm:tracking-[0.27em]">
              {content.subheadline}
            </p>
            <div className="mx-auto mt-2.5 h-0.5 w-14 bg-crimson sm:mx-0" />

            <p className="mx-auto mt-3 max-w-[31rem] text-[13px] leading-6 text-[#12375f]/82 sm:mx-0 sm:mt-4 sm:text-sm sm:leading-7 md:text-[15px] md:leading-7">
              {content.bio}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6 sm:gap-4 md:justify-start">
              <a
                href="#vision"
                className="group inline-flex items-center gap-2 rounded-md bg-crimson px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white shadow-xl shadow-crimson/20 transition-all duration-300 hover:bg-crimson-dark sm:gap-3 sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
              >
                {content.cta_primary} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#about"
                className="glass-action inline-flex items-center gap-2 rounded-md border border-[#12375f]/45 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#12375f] transition-all hover:border-crimson hover:text-crimson sm:gap-3 sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
              >
                <Play size={15} className="text-crimson" />
                {content.cta_secondary}
              </a>
            </div>

            <div className="mt-6 hidden items-center gap-3 text-left text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#12375f]/78 sm:inline-flex">
              <Globe size={16} className="text-crimson" />
              Building Digital Solutions for Nepal
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
