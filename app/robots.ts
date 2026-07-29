import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/admin/' },
    ],
    sitemap: 'https://mjk-website-vidkids-projects-93622fab.vercel.app/sitemap.xml',
    host: 'https://mjk-website-vidkids-projects-93622fab.vercel.app',
  }
}
