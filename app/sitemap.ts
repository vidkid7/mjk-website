import { MetadataRoute } from 'next'

const routes = ['', 'blog']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mukeshjungkhadka.com.np'
  const lastModified = new Date()

  return routes.map((route, index) => ({
    url: route ? `${baseUrl}/${route}` : baseUrl,
    lastModified,
    changeFrequency: index === 0 || route === 'blog' ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : route === 'blog' ? 0.85 : 0.8,
  }))
}
