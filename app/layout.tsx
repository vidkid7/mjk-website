import type { Metadata } from 'next'
import './globals.css'

const title = 'Mukesh Khadka | Digital Systems & Software Portfolio'
const description = 'Digital portfolio of Mukesh Khadka — practical software systems, web platforms, automation, UX thinking, and digital transformation work.'
const siteUrl = 'https://mukeshjungkhadka.com.np'
const sameAs = [
  'https://www.linkedin.com/in/mukesh-khadka-960401324/',
  'https://www.facebook.com/Nepali.man.67',
  'https://www.instagram.com/khadka3546',
  'https://x.com/khadkamukesh422',
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#mukesh-khadka`,
      name: 'Mukesh Khadka',
      url: siteUrl,
      image: `${siteUrl}/mk-removebg-preview.webp`,
      jobTitle: 'Digital Systems and Software Specialist',
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
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#professional-service`,
      name: 'Mukesh Khadka Digital Systems',
      url: siteUrl,
      provider: { '@id': `${siteUrl}/#mukesh-khadka` },
      areaServed: [
        { '@type': 'Country', name: 'Nepal' },
        { '@type': 'City', name: 'Kathmandu' },
      ],
      serviceType: [
        'Website development',
        'Custom software development',
        'ERP and CRM systems',
        'Business process automation',
        'UI/UX design',
        'Mobile app solutions',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does Mukesh Khadka provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mukesh Khadka provides website development, custom software systems, ERP and CRM platforms, business automation, UI/UX design, mobile app solutions, and file or billing systems.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who does Mukesh Khadka work with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'He works with businesses, institutions, municipalities, schools, and growth-focused teams that need practical digital products and operational systems.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Mukesh Khadka based?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mukesh Khadka is based in Kathmandu, Bagmati Province, Nepal, and can work with teams locally and remotely.',
          },
        },
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
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#059669" />
        <link rel="icon" type="image/webp" href="/mk-removebg-preview.webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="/mk-removebg-preview.webp" />
        {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
        {bingVerification && <meta name="msvalidate.01" content={bingVerification} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="antialiased bg-white text-slate-800">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
