import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import './globals.css'

const defaultTitle = 'Mukesh Jung Khadka | Community Leader — Moving Forward Together'
const defaultDescription = 'Official website of Mukesh Jung Khadka — Entrepreneur, Social Worker, Youth Inspirator, and Community Leader for Kathmandu. सँगै अगाडि बढौं — Moving Forward Together.'

async function readMetadataSettings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null

  const client = createClient(url, key, { auth: { persistSession: false } })
  const { data } = await client
    .from('site_settings')
    .select('site_title,meta_description')
    .not('site_title', 'like', '__cms__%')
    .limit(1)
    .maybeSingle()
  return data
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await readMetadataSettings()
  const title = settings?.site_title || defaultTitle
  const description = settings?.meta_description || defaultDescription

  return {
  title,
  description,
  keywords: 'Mukesh Jung Khadka, MJK, Nepal, Kathmandu, Youth, Social Worker, Entrepreneur, Community Leader',
  metadataBase: new URL('https://mukeshjungkhadka.com.np'),
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    url: 'https://mukeshjungkhadka.com.np',
    siteName: 'Mukesh Jung Khadka',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mukesh Jung Khadka - Moving Forward Together' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/mk-removebg-preview.webp" as="image" />
        <link rel="preload" href="/nepal-flag-hero-poster.jpg" as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased bg-white text-slate-800">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-crimson focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
