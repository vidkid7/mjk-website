import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts'

const siteUrl = 'https://khadkamukesh.com.np'
const siteLastModified = new Date('2026-07-29T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: siteLastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: siteLastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
