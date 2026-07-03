'use client'
import AboutMukeshSection from '@/components/ui/about-us-section'
import { aboutData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

const defaultAbout = {
  pill: aboutData.pill,
  heading: aboutData.heading,
  paragraphs: aboutData.paragraphs.join('\n\n'),
  community_trust: aboutData.community_trust,
  youth_engagement: aboutData.youth_engagement,
  photo: '/mukk-removebg-preview.png',
}

const legacyAboutTerms = ['community leader', 'youth champion', 'son of nepal', 'public service', 'kathmandu valley', 'people from all walks', 'prosperous nepal']
function isLegacyAbout(content: typeof defaultAbout) {
  return legacyAboutTerms.some(term => `${content.pill} ${content.heading} ${content.paragraphs}`.toLowerCase().includes(term))
}

export default function About() {
  const storedContent = useStoredData('about', defaultAbout)
  const content = isLegacyAbout(storedContent) ? defaultAbout : storedContent

  return <AboutMukeshSection content={content} />
}
