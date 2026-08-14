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

function normalizeHeroLabel(label: string) {
  const normalized = label.trim().toLowerCase().replace(/\s+/g, ' ')
  return normalized.includes('ceo at aashatech') ? 'Founder/CEO' : label
}

export default function Hero() {
  const storedContent = useStoredData('hero', defaultHero)
  const content = isLegacyHero(storedContent) ? defaultHero : storedContent
  const displayLabel = normalizeHeroLabel(content.label)
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
          src="/hero-himalayan-peaks.jpg"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1149}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute left-[28%] top-0 z-[1] hidden h-[70%] w-[88rem] max-w-none -translate-x-1/2 object-cover object-[center_46%] opacity-[0.44] mix-blend-multiply lg:block lg:left-[50%] lg:h-[78%] lg:w-[120rem]"
          style={{
            filter: 'brightness(1.22) contrast(0.94) saturate(0.86)',
            WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 74%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, black 0%, black 74%, transparent 100%)',
          }}
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

        <div className="pointer-events-none absolute inset-x-0 bottom-[7%] z-[2] h-[44%] opacity-[0.42]">
          <svg viewBox="0 0 1600 500" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="cityMist" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#8aa2b8" stopOpacity=".05" />
                <stop offset=".58" stopColor="#8aa2b8" stopOpacity=".28" />
                <stop offset="1" stopColor="#12375f" stopOpacity=".16" />
              </linearGradient>
            </defs>
            <path d="M0 360c190-68 310-82 488-52 202 34 362-6 524-56 203-62 368-44 588 38v210H0V360Z" fill="url(#cityMist)" />
            <g fill="#274867" opacity=".28">
              <path d="M770 282h90v118h-90zM790 246h50v36h-50zM806 210h18v36h-18z" />
              <path d="M744 282l71-48 72 48H744zM752 326l64-38 64 38H752z" />
              <path d="M1030 310h78v94h-78zM1046 280h46v30h-46zM1015 310l54-38 54 38H1015zM1022 346l47-28 47 28H1022z" />
              <path d="M1148 336h88v70h-88zM1166 306h52v30h-52zM1130 336l62-42 62 42H1130z" />
              <path d="M1244 350h70v56h-70zM1320 330h92v76h-92zM1430 342h76v64h-76z" />
            </g>
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-34%] top-[12%] z-[8] hidden h-[44vh] w-[72vw] max-w-[320px] lg:block lg:right-[-10%] lg:top-[7%] lg:h-[74vh] lg:max-w-[600px]"
        >
          <img
            src="/buddha-lotus-removebg.webp"
            alt=""
            width={377}
            height={661}
            loading="lazy"
            decoding="async"
            className="relative h-full w-full object-contain object-right-bottom opacity-[0.1] mix-blend-multiply sm:opacity-[0.11] md:opacity-[0.14] lg:opacity-[0.2]"
            style={{
              filter:
                'grayscale(1) contrast(0.96) brightness(1.12)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.7) 20%, black 70%, rgba(0,0,0,0.62) 100%)',
              maskImage:
                'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.7) 20%, black 70%, rgba(0,0,0,0.62) 100%)',
            }}
            draggable={false}
          />
        </div>

        <img
          src={content.hero_image || '/mk-removebg-preview.webp'}
          alt="Mukesh Khadka"
          width={403}
          height={620}
          loading="eager"
          decoding="async"
          className="hero-portrait-static pointer-events-none absolute bottom-0 left-1/2 right-auto z-[14] h-[28%] w-auto max-w-none -translate-x-1/2 object-contain sm:left-auto sm:right-[8%] sm:h-[76%] sm:translate-x-0 md:right-[10%] md:h-[84%] lg:right-[12%] lg:h-[92%] xl:right-[14%]"
          draggable={false}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-24 bg-crimson [clip-path:polygon(68%_68%,100%_42%,100%_100%,0_100%,0_100%)] sm:h-32 lg:h-32" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[13] h-24 bg-[#082d58] [clip-path:ellipse(82%_68%_at_37%_104%)] sm:h-32 lg:h-32" />

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1680px] items-start px-5 pb-44 pt-8 sm:min-h-[calc(100svh-80px)] sm:items-center sm:px-8 sm:pb-32 md:pt-12 lg:min-h-[calc(100svh-88px)] lg:px-12 lg:pb-36">
          <div className="relative z-30 mx-auto max-w-[30rem] text-center sm:mx-0 sm:max-w-[35rem] sm:text-left lg:ml-[12%] lg:max-w-[34rem] xl:ml-[14%]">
            <div className="mb-3 inline-flex sm:mb-5">
              <span className="inline-flex items-center gap-2 rounded-md border border-[#12375f]/18 bg-white/80 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#12375f] shadow-sm shadow-slate-900/5 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.28em]">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson sm:h-3 sm:w-3" />
                {displayLabel}
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
                className="inline-flex items-center gap-2 rounded-md border border-[#12375f]/45 bg-white/50 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#12375f] backdrop-blur-sm transition-all hover:border-crimson hover:text-crimson sm:gap-3 sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
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
