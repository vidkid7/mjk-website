import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mukesh Khadka | Digital Systems & Software Portfolio',
    short_name: 'Mukesh Khadka',
    id: '/',
    description: 'Digital systems, software, websites, automation, and UX work by Mukesh Khadka in Nepal.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    icons: [
      { src: '/heritage-mark-generated-v2.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/heritage-mark-generated-v2.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
