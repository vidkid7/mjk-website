'use client'
import { WavingNepalFlag } from '@/components/ui/NepalFlag'
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
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full scale-[0.88] object-contain object-center sm:scale-[0.92] lg:scale-[0.94]"
          draggable={false}
        />

        <div className="hero-nepal-flag pointer-events-none absolute left-[-8%] top-[9%] z-[5] hidden h-[72%] w-[34%] opacity-[0.22] mix-blend-multiply sm:block lg:left-[-3%] lg:top-[8%] lg:h-[78%] lg:w-[30%] lg:opacity-[0.3]">
          <WavingNepalFlag className="h-full w-full" />
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

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1680px] items-center justify-center px-5 pb-36 pt-12 sm:min-h-[calc(100svh-80px)] sm:px-8 sm:pb-32 md:pt-16 lg:min-h-[calc(100svh-88px)] lg:justify-start lg:px-[8%] lg:pb-36">
          <div className="relative z-30 -mt-[10vh] text-center sm:-mt-[12vh] lg:-mt-[16vh] lg:text-left">
            <h1 className="hero-name-3d font-playfair text-[3.25rem] font-black leading-[0.9] tracking-[-0.055em] min-[420px]:text-[4rem] sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6rem]">
              Mukesh Khadka
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}
