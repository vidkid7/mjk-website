-- Supabase Database Schema for MJK Digital Portfolio Website
-- Run this in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== HERO CONTENT =====
CREATE TABLE hero_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ===== ABOUT CONTENT =====
CREATE TABLE about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pill_text TEXT DEFAULT 'About Mukesh',
  heading TEXT DEFAULT 'A practical digital systems builder focused on useful results',
  bio_paragraphs JSONB DEFAULT '[]'::JSONB,
  community_trust INT DEFAULT 96,
  youth_engagement INT DEFAULT 92,
  photo_url TEXT,
  signature_url TEXT,
  cv_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== VISION CARDS =====
CREATE TABLE vision_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  heading TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SOLUTIONS =====
CREATE TABLE initiatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  photo_url TEXT,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  impact TEXT,
  is_published BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== GALLERY PHOTOS =====
CREATE TABLE gallery_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'Work',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== BLOG POSTS =====
CREATE TABLE news_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cover_url TEXT,
  category TEXT DEFAULT 'Software',
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== TESTIMONIALS =====
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  photo_url TEXT,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== DELIVERY PROCESS =====
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Award',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SITE STATS =====
CREATE TABLE site_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value INT NOT NULL DEFAULT 0,
  suffix TEXT DEFAULT '+',
  icon TEXT DEFAULT '📊',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== LEAD SUBMISSIONS =====
CREATE TABLE volunteer_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  help_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== CONTACT MESSAGES =====
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SITE SETTINGS =====
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ===== ROW LEVEL SECURITY =====
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

REVOKE ALL ON TABLE hero_content, about_content, vision_cards, initiatives, gallery_photos, news_posts,
  testimonials, achievements, site_stats, volunteer_submissions, contact_messages, site_settings
  FROM anon, authenticated;

-- ===== UPDATED_AT TRIGGER =====
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hero_timestamp BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_about_timestamp BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_vision_timestamp BEFORE UPDATE ON vision_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_initiatives_timestamp BEFORE UPDATE ON initiatives FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_gallery_timestamp BEFORE UPDATE ON gallery_photos FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_news_timestamp BEFORE UPDATE ON news_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_testimonials_timestamp BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_achievements_timestamp BEFORE UPDATE ON achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_stats_timestamp BEFORE UPDATE ON site_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_settings_timestamp BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ===== STORAGE BUCKET =====
-- Create a storage bucket for uploads (run in Supabase dashboard or API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);
