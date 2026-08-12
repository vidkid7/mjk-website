'use client'
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

  return (
    <div id="home" className="relative isolate">
      <section className="relative min-h-[100svh] overflow-hidden bg-[#fbf8f2] text-[#12375f]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(255,255,255,0.52)_42%,rgba(255,255,255,0.78)_68%,rgba(255,255,255,0.98)),radial-gradient(circle_at_55%_21%,rgba(245,214,173,0.2),transparent_30%),linear-gradient(180deg,#fffdfa_0%,#f4efe7_43%,#fbf8f2_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,0.8),rgba(255,255,255,0.12)_48%,rgba(255,255,255,0.28)_76%,rgba(255,255,255,0.88)),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.1)_72%,rgba(255,255,255,0.82)_100%)]" />
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

        <div className="pointer-events-none absolute left-[-12%] top-[4%] z-[5] h-[88%] w-[42%] overflow-hidden opacity-[0.62] mix-blend-multiply [mask-image:linear-gradient(90deg,black_0%,black_78%,transparent_100%)] sm:w-[38%] lg:block xl:w-[34%]">
          <video
            className="hero-flag-video h-full w-full object-cover object-left"
            src="/nepal-flag-user-v1.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-[3px] bg-crimson" />
        <div className="pointer-events-none absolute bottom-[3px] left-0 z-[12] h-[3px] w-[68%] bg-[#082d58]" />

        <div className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.28)_43%,transparent_72%)] sm:w-[76%] lg:w-[64%]" />

        <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1680px] items-end justify-center px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:justify-start lg:px-[7%] lg:pb-14 lg:pt-32">
          <div className="relative z-30 max-w-[42rem] text-center lg:text-left">
            <h1 className="hero-name-3d font-playfair text-[3.1rem] font-black leading-[0.92] tracking-[-0.05em] min-[420px]:text-[3.65rem] sm:text-[4.4rem] md:text-[5rem] lg:text-[4.9rem] xl:text-[5.5rem]">
              Mukesh Khadka
            </h1>
            <p className="mt-3 font-playfair text-xl font-bold text-[#12375f] drop-shadow-md sm:text-2xl lg:text-3xl">
              Building digital systems with purpose.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-700 drop-shadow-md sm:text-base lg:mx-0">
              I create practical software, develop meaningful ventures, and use technology to deliver lasting value for organizations and communities.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#client-portfolio" className="rounded-full bg-crimson px-5 py-3 text-sm font-bold text-white shadow-lg shadow-crimson/25 transition hover:-translate-y-0.5 hover:bg-[#b81428]">
                View Portfolio
              </a>
              <a href="#contact" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-slate-50">
                Start a Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
