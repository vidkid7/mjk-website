import { MetadataRoute } from 'next'
import { servicePages } from '@/lib/service-pages'
import { getArticles } from '@/lib/articles'

const siteUrl = 'https://khadkamukesh.com.np'
const siteLastModified = new Date('2026-07-29T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: siteLastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified: siteLastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/articles`, lastModified: siteLastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/contact`, lastModified: siteLastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...servicePages.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...getArticles().map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(`${article.date}T00:00:00.000Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ]
}
