import type { Metadata } from 'next'
import './globals.css'

const title = 'AashaTech | Software, Web & Mobile App Development in Nepal'
const description = 'AashaTech builds custom software, web applications, mobile apps, digital systems, and government-focused technology solutions from Kathmandu, Nepal.'

export const metadata: Metadata = {
  title,
  description,
  keywords: 'AashaTech, software company Nepal, web development Nepal, mobile app development Nepal, custom software, digital systems, UI UX, government software Nepal',
  metadataBase: new URL('https://www.aashatech.com'),
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    url: 'https://www.aashatech.com',
    siteName: 'AashaTech',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AashaTech - Digital Systems Partner' }],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#059669" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
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
