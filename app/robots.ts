import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/admin/' },
    ],
    sitemap: 'https://mukeshjungkhadka.com.np/sitemap.xml',
    host: 'https://mukeshjungkhadka.com.np',
  }
}
