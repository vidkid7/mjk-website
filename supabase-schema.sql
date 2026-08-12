-- ============================================================
-- MJK Digital Portfolio — Supabase Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Hero Content
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL DEFAULT 'Digital Systems & Software Portfolio',
  headline TEXT NOT NULL DEFAULT 'Building Practical\nDigital Solutions',
  subheadline TEXT NOT NULL DEFAULT 'Software Systems • Web Platforms • Digital Transformation',
  bio TEXT,
  cta_primary_text TEXT DEFAULT 'Explore The Work',
  cta_secondary_text TEXT DEFAULT 'About Mukesh',
  hero_image_url TEXT,
  stat_projects INT DEFAULT 33,
  stat_lives INT DEFAULT 26,
  stat_years INT DEFAULT 7,
  stat_youth INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About Content
CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pill_text TEXT DEFAULT 'About Mukesh',
  heading TEXT DEFAULT 'A practical digital systems builder focused on useful results',
  bio_paragraph_1 TEXT,
  bio_paragraph_2 TEXT,
  bio_paragraph_3 TEXT,
  bio_paragraph_4 TEXT,
  community_trust INT DEFAULT 96,
  youth_engagement INT DEFAULT 92,
  photo_url TEXT,
  signature_url TEXT,
  cv_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- CMS Content Revision History
-- Every admin content save creates a JSON snapshot. The public client never
-- accesses this table; it is exposed only through the authenticated API.
CREATE TABLE IF NOT EXISTS content_revisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS content_revisions_key_created_at_idx
  ON content_revisions (content_key, created_at DESC);


-- Vision Cards
CREATE TABLE IF NOT EXISTS vision_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'MonitorSmartphone',
  heading TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

  testimonials, achievements, site_stats, volunteer_submissions, contact_messages, site_settings, content_revisions
CREATE TABLE IF NOT EXISTS initiatives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT,
  category TEXT NOT NULL DEFAULT 'Web',
  title TEXT NOT NULL,
  description TEXT,
  impact TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Photos
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'Work',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cover_url TEXT,
  category TEXT DEFAULT 'Software',
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Delivery Process Timeline
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Award',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Stats / Counters
CREATE TABLE IF NOT EXISTS site_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value INT DEFAULT 0,
  suffix TEXT DEFAULT '+',
  icon TEXT DEFAULT '📊',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead Submissions
CREATE TABLE IF NOT EXISTS volunteer_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  help_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title TEXT DEFAULT 'Mukesh Khadka | Digital Systems Portfolio',
  meta_description TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  linkedin_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  twitter_url TEXT,
  tiktok_url TEXT,
  logo_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE vision_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- All reads and writes are performed by validated server API routes.
-- Keep direct Supabase browser roles away from both content and submissions.
REVOKE ALL ON TABLE hero_content, about_content, vision_cards, initiatives, gallery_photos, news_posts,
  testimonials, achievements, site_stats, volunteer_submissions, contact_messages, site_settings
  FROM anon, authenticated;

-- ============================================================
-- Seed initial data
-- ============================================================
INSERT INTO site_settings (
  site_title,
  meta_description,
  phone,
  email,
  address,
  linkedin_url,
  facebook_url,
  instagram_url,
  twitter_url
)
VALUES (
  'Mukesh Khadka | Digital Systems & Software Portfolio',
  'Digital portfolio of Mukesh Khadka — practical software systems, web platforms, automation, UX thinking, and digital transformation work.',
  '+977 985-1241656',
  'khadkamukesh423@gmail.com',
  'Kathmandu, Bagmati Province, Nepal',
  'https://www.linkedin.com/in/mukesh-khadka-960401324/',
  'https://www.facebook.com/Nepali.man.67',
  'https://www.instagram.com/khadka3546?utm_source=qr',
  'https://x.com/khadkamukesh422?s=11'
) ON CONFLICT DO NOTHING;

-- ============================================================
-- Active public portfolio CMS extensions
-- ============================================================

CREATE TABLE IF NOT EXISTS site_pages (
  page_key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE initiatives ADD COLUMN IF NOT EXISTS year TEXT;
ALTER TABLE initiatives ADD COLUMN IF NOT EXISTS tags JSONB NOT NULL DEFAULT '[]'::JSONB;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS org TEXT;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS points JSONB NOT NULL DEFAULT '[]'::JSONB;
ALTER TABLE news_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE news_posts ADD COLUMN IF NOT EXISTS read_minutes INT NOT NULL DEFAULT 5;
ALTER TABLE news_posts ADD COLUMN IF NOT EXISTS tags JSONB NOT NULL DEFAULT '[]'::JSONB;

CREATE UNIQUE INDEX IF NOT EXISTS news_posts_slug_unique_idx
  ON news_posts (slug)
  WHERE slug IS NOT NULL;

ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE site_pages FROM anon, authenticated;
