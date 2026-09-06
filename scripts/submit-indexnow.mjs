const siteUrl = (process.env.SITE_URL || 'https://khadkamukesh.com.np').replace(/\/$/, '')
const key = process.env.INDEXNOW_KEY || '9f2d4c8e7a1b6d3f0e5c2a9b8d7f6e1c'

const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`)
if (!sitemapResponse.ok) {
  throw new Error(`Could not read sitemap: ${sitemapResponse.status} ${await sitemapResponse.text()}`)
}

const sitemap = await sitemapResponse.text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
if (!urls.length) throw new Error('Sitemap did not contain any URLs')

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList: urls,
  }),
})

if (!response.ok) {
  throw new Error(`IndexNow submission failed: ${response.status} ${await response.text()}`)
}

console.log(`Submitted ${urls.length} URLs to IndexNow for ${siteUrl}`)
