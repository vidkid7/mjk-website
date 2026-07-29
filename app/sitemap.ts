import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts'
import { servicePages } from '@/lib/service-pages'

const siteUrl = 'https://khadkamukesh.com.np'
const siteLastModified = new Date('2026-07-29T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: siteLastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified: siteLastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: siteLastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...servicePages.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
