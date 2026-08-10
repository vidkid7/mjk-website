import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

const requiredSlugs = [
  'building-software-for-the-way-nepal-works',
  'the-work-after-the-launch',
  'from-janakpur-to-kathmandu',
  'why-aasha-tech-focuses-on-useful-systems',
  'the-quiet-discipline-behind-a-growing-software-practice',
]

test('the approved public-profile article series is represented in the article source', async () => {
  const articles = await read('lib/articles.ts')

  for (const slug of requiredSlugs) assert.match(articles, new RegExp(`slug:\\s*'${slug}'`))
  assert.match(articles, /Aasha Tech Pvt\. Ltd\./)
  assert.match(articles, /University of Sunderland/)
  assert.match(articles, /Janakpur/)
  assert.doesNotMatch(articles, /July 4, 1993|Married since|2\.4K followers|282 following/)
})

test('article detail pages and sitemap are wired to article slugs', async () => {
  const [detailRoute, sitemap] = await Promise.all([
    read('app/articles/[slug]/page.tsx'),
    read('app/sitemap.ts'),
  ])

  assert.match(detailRoute, /generateStaticParams/)
  assert.match(detailRoute, /generateMetadata/)
  assert.match(detailRoute, /notFound\(\)/)
  assert.match(detailRoute, /BlogPosting|Article/)
  assert.match(sitemap, /getArticles\(\)/)
  assert.match(sitemap, /article\.slug/)
})

test('article detail pages contain the approved provenance and content boundaries', async () => {
  const detailRoute = await read('app/articles/[slug]/page.tsx')

  assert.match(detailRoute, /Mukesh Khadka/)
  assert.match(detailRoute, /Aasha Tech/)
  assert.match(detailRoute, /khadkamukesh\.com\.np/)
  assert.doesNotMatch(detailRoute, /July 4, 1993|Married since|follower|following|missing-child|9707795284/)
})
