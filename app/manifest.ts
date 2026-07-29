import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mukesh Khadka | Digital Systems & Software Portfolio',
    short_name: 'Mukesh Khadka',
    description: 'Digital systems, software, websites, automation, and UX work by Mukesh Khadka in Nepal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    icons: [{ src: '/mk-removebg-preview.webp', sizes: '512x512', type: 'image/webp' }],
  }
}
