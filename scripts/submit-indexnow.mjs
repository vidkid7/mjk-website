const siteUrl = (process.env.SITE_URL || 'https://mukeshjungkhadka.com.np').replace(/\/$/, '')
const key = process.env.INDEXNOW_KEY || '9f2d4c8e7a1b6d3f0e5c2a9b8d7f6e1c'
const urls = [`${siteUrl}/`, `${siteUrl}/blog`]

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
