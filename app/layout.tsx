import type { Metadata } from 'next'
import { Noto_Sans_Devanagari, Noto_Serif_Devanagari } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/i18n/LanguageProvider'
import PwaInstallPrompt from '@/components/ui/PwaInstallPrompt'
import { getRequestLocale } from '@/lib/i18n-server'

const nepaliSans = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-nepali-sans',
})

const nepaliSerif = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-nepali-serif',
})

const title = 'Mukesh Khadka — Software Developer & Entrepreneur in Nepal'
const description = 'Personal portfolio of Mukesh Khadka — software developer and entrepreneur from Kathmandu, Nepal, building practical websites, custom systems, and workflow automation.'
const siteUrl = 'https://khadkamukesh.com.np'
const sameAs = [
  'https://www.linkedin.com/in/mukesh-khadka-960401324/',
  'https://www.facebook.com/Nepali.man.67',
  'https://www.instagram.com/khadka3546',
  'https://x.com/khadkamukesh422',
]

const themeBootstrapScript = `
  try {
    const stored = localStorage.getItem('mukesh-portfolio-theme')
    document.documentElement.dataset.portfolioTheme = stored === 'dark' ? 'dark' : 'light'
    const storedColor = localStorage.getItem('mukesh-portfolio-color')
    const safeColor = ['red','orange','blue','green','navy'].includes(storedColor) ? storedColor : 'red'
    document.documentElement.dataset.portfolioColor = safeColor
    document.querySelector('.gateway-shell')?.setAttribute('data-portfolio-color', safeColor)
  } catch {}
`

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#mukesh-khadka`,
      name: 'Mukesh Khadka',
      url: siteUrl,
      image: `${siteUrl}/mk-removebg-preview.webp`,
      jobTitle: 'Software Developer and Entrepreneur',
      description,
      email: 'mailto:khadkamukesh423@gmail.com',
      telephone: '+977 985-1241656',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati Province',
        addressCountry: 'NP',
      },
      sameAs,
      knowsAbout: [
        'Website development',
        'Custom software systems',
        'ERP and CRM systems',
        'Business automation',
        'UI/UX design',
        'Digital transformation in Nepal',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mukesh Khadka Digital Portfolio',
      description,
      publisher: { '@id': `${siteUrl}/#mukesh-khadka` },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: siteUrl,
      name: title,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#mukesh-khadka` },
      mainEntity: { '@id': `${siteUrl}/#mukesh-khadka` },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#professional-service`,
      name: 'Mukesh Khadka Digital Systems',
      url: siteUrl,
      provider: { '@id': `${siteUrl}/#mukesh-khadka` },
      areaServed: [
        { '@type': 'Country', name: 'Nepal' },
        { '@type': 'City', name: 'Kathmandu' },
      ],
      availableLanguage: ['English', 'Nepali'],
      email: 'khadkamukesh423@gmail.com',
      telephone: '+977 985-1241656',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati Province',
        addressCountry: 'NP',
      },
      serviceType: [
        'Website development',
        'Custom software development',
        'ERP and CRM systems',
        'Business process automation',
        'UI/UX design',
        'Mobile app solutions',
      ],
    },
  ],
}

export const metadata: Metadata = {
  title,
  description,
  keywords: 'Mukesh Khadka, digital portfolio Nepal, software systems, web development Nepal, custom software, automation, UI UX, digital transformation',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  authors: [{ name: 'Mukesh Khadka', url: siteUrl }],
  creator: 'Mukesh Khadka',
  publisher: 'Mukesh Khadka',
  category: 'technology',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/heritage-mark-generated-v2.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/heritage-mark-generated-v2.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Mukesh Khadka Digital Portfolio',
    images: [{ url: '/hero-himalayan-peaks.jpg', width: 1920, height: 1149, alt: 'Himalayan digital systems portfolio backdrop for Mukesh Khadka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/hero-himalayan-peaks.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
  const requestLocale = getRequestLocale()

  return (
    <html lang={requestLocale} className={`scroll-smooth ${nepaliSans.variable} ${nepaliSerif.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#FAF5ED" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="alternate icon" type="image/png" href="/heritage-mark-generated-v2.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/heritage-mark-generated-v2.png" />
        <link rel="alternate" type="application/rss+xml" title="Mukesh Khadka Field Notes" href="/feed.xml" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
        {bingVerification && <meta name="msvalidate.01" content={bingVerification} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="antialiased bg-white text-slate-800">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white">
          Skip to main content
        </a>
        <LanguageProvider initialLocale={requestLocale}>
          <PwaInstallPrompt />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
