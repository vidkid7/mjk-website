import { MetadataRoute } from 'next'

const routes = ['', '#services', '#products', '#projects', '#about', '#contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aashatech.com'
  const lastModified = new Date()

  return routes.map((route, index) => ({
    url: route ? `${baseUrl}/${route}` : baseUrl,
    lastModified,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.8,
  }))
}
