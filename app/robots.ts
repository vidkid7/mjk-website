import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khadkamukesh.com.np'

// Development and staging origins should never be indexed. Production exposes
// the canonical sitemap and permits the public site.
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production' && !siteUrl.includes('localhost')

  if (!isProduction) {
    return {
      rules: [
        { userAgent: '*', disallow: '/' },
      ],
    }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/admin/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
