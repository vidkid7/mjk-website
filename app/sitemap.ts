import { MetadataRoute } from 'next'

const routes = ['', '#about', '#vision', '#initiatives', '#client-portfolio', '#insights', '#news', '#contact', 'blog']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mukeshjungkhadka.com.np'
  const lastModified = new Date()

  return routes.map((route, index) => ({
    url: route.startsWith('#') ? `${baseUrl}/${route}` : route ? `${baseUrl}/${route}` : baseUrl,
    lastModified,
    changeFrequency: index === 0 || route === 'blog' ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : route === 'blog' ? 0.85 : 0.8,
  }))
}
