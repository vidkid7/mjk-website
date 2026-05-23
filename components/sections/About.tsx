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

export default function About() {
  const content = useStoredData('about', defaultAbout)

  return <AboutMukeshSection content={content} />
}
