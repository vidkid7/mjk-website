import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mukesh Jung Khadka | Mayor Candidate — Moving Forward Together',
  description: 'Official website of Mukesh Jung Khadka — Entrepreneur, Social Worker, Youth Inspirator, and Mayor Candidate for Kathmandu. सँगै अगाडि बढौं — Moving Forward Together.',
  keywords: 'Mukesh Jung Khadka, MJK, Nepal, Mayor, Kathmandu, Youth, Social Worker, Entrepreneur',
  metadataBase: new URL('https://mukeshjungkhadka.com.np'),
  openGraph: {
    title: 'Mukesh Jung Khadka | Moving Forward Together',
    description: 'Entrepreneur. Social Worker. Youth Champion. Mayor Candidate for Kathmandu.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mukeshjungkhadka.com.np',
    siteName: 'Mukesh Jung Khadka',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mukesh Jung Khadka - Moving Forward Together' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mukesh Jung Khadka | Moving Forward Together',
    description: 'Entrepreneur. Social Worker. Youth Champion. Mayor Candidate for Kathmandu.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
