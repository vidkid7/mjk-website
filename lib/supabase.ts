import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface HeroContent {
  id: string
  label: string
  headline: string
  subheadline: string
  bio: string
  cta_primary_text: string
  cta_secondary_text: string
  hero_image_url: string
  stat_projects: number
  stat_lives: number
  stat_years: number
  stat_youth: number
  created_at: string
  updated_at: string
}

export interface AboutContent {
  id: string
  pill_text: string
  heading: string
  bio_paragraphs: string[]
  community_trust: number
  youth_engagement: number
  photo_url: string
  signature_url: string
  cv_url: string
  created_at: string
  updated_at: string
}

export interface VisionCard {
  id: string
  icon: string
  heading: string
  description: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface Initiative {
  id: string
  photo_url: string
  category: string
  title: string
  description: string
  impact: string
  is_published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface GalleryPhoto {
  id: string
  url: string
  caption: string
  category: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface NewsPost {
  id: string
  cover_url: string
  category: string
  title: string
  excerpt: string
  content: string
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  photo_url: string
  name: string
  role: string
  quote: string
  rating: number
  order_index: number
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  year: string
  title: string
  description: string
  icon: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface SiteStat {
  id: string
  label: string
  value: number
  suffix: string
  icon: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface VolunteerSubmission {
  id: string
  name: string
  email: string
  phone: string
  city: string
  help_type: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteSettings {
  id: string
  site_title: string
  meta_description: string
  phone: string
  email: string
  address: string
  linkedin_url: string
  facebook_url: string
  instagram_url: string
  youtube_url: string
  twitter_url: string
  tiktok_url: string
  logo_url: string
  updated_at: string
}
