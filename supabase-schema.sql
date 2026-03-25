-- ============================================================
-- MJK Political Portfolio — Supabase Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Hero Content
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '🇳🇵 Mayor Candidate — Kathmandu Metropolitan City',
  headline TEXT NOT NULL DEFAULT 'Leading Nepal\nForward Together',
  subheadline TEXT NOT NULL DEFAULT 'Entrepreneur. Social Worker. Youth Champion. Mayor Candidate.',
  bio TEXT,
  cta_primary_text TEXT DEFAULT 'Explore My Vision',
  cta_secondary_text TEXT DEFAULT 'Watch My Story',
  hero_image_url TEXT,
  stat_projects INT DEFAULT 50,
  stat_lives INT DEFAULT 100000,
  stat_years INT DEFAULT 15,
  stat_youth INT DEFAULT 5000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About Content
CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pill_text TEXT DEFAULT 'About Mukesh',
  heading TEXT DEFAULT 'A Son of Nepal, Built for Service',
  bio_paragraph_1 TEXT,
  bio_paragraph_2 TEXT,
  bio_paragraph_3 TEXT,
  bio_paragraph_4 TEXT,
  community_trust INT DEFAULT 94,
  youth_engagement INT DEFAULT 88,
  photo_url TEXT,
  signature_url TEXT,
  cv_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vision Cards
CREATE TABLE IF NOT EXISTS vision_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'Building2',
  heading TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initiatives / Social Work
CREATE TABLE IF NOT EXISTS initiatives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT,
  category TEXT NOT NULL DEFAULT 'Education',
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
  category TEXT DEFAULT 'Community',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Posts
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cover_url TEXT,
  category TEXT DEFAULT 'Campaign',
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

-- Achievements Timeline
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

-- Volunteer Submissions
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
  site_title TEXT DEFAULT 'Mukesh Jung Khadka | Mayor Candidate',
  meta_description TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
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

-- Enable RLS on all tables
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

-- Public read access for published content
CREATE POLICY "Public read hero_content" ON hero_content FOR SELECT TO anon USING (true);
CREATE POLICY "Public read about_content" ON about_content FOR SELECT TO anon USING (true);
CREATE POLICY "Public read vision_cards" ON vision_cards FOR SELECT TO anon USING (true);
CREATE POLICY "Public read initiatives" ON initiatives FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Public read gallery_photos" ON gallery_photos FOR SELECT TO anon USING (true);
CREATE POLICY "Public read news_posts" ON news_posts FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT TO anon USING (true);
CREATE POLICY "Public read achievements" ON achievements FOR SELECT TO anon USING (true);
CREATE POLICY "Public read site_stats" ON site_stats FOR SELECT TO anon USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT TO anon USING (true);

-- Public insert for contact/volunteer forms
CREATE POLICY "Public insert volunteer_submissions" ON volunteer_submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT TO anon WITH CHECK (true);

-- Authenticated admin full access
CREATE POLICY "Admin full access hero_content" ON hero_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access about_content" ON about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access vision_cards" ON vision_cards FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access initiatives" ON initiatives FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access gallery_photos" ON gallery_photos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access news_posts" ON news_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access achievements" ON achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_stats" ON site_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access volunteer_submissions" ON volunteer_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contact_messages" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- Seed initial data
-- ============================================================
INSERT INTO site_settings (site_title, meta_description, phone, email, address)
VALUES (
  'Mukesh Jung Khadka | Mayor Candidate — Moving Forward Together',
  'Official website of Mukesh Jung Khadka — Entrepreneur, Social Worker, Youth Inspirator, and Mayor Candidate for Kathmandu.',
  '+977 01-4XXXXXX',
  'contact@mukeshjungkhadka.com.np',
  'Ward No. 10, Kathmandu Metropolitan City, Bagmati Province, Nepal'
) ON CONFLICT DO NOTHING;
