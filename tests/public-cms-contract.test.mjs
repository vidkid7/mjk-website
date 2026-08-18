import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)

async function source(path) {
  return readFile(new URL(path, root), 'utf8')
}

const activePublicFiles = [
  'app/page.tsx',
  'app/services/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/articles/page.tsx',
  'app/articles/[slug]/page.tsx',
  'app/contact/page.tsx',
]

test('active public routes use the public CMS loader instead of starter constants', async () => {
  const contents = await Promise.all(activePublicFiles.map(source))
  for (const [index, content] of contents.entries()) {
    assert.match(content, /public-content-server|loadPublicContent|useStoredData|api\/content/)
    assert.doesNotMatch(content, /@\/lib\/(portfolio-content|service-pages|articles)/, activePublicFiles[index])
  }
})

test('the public CMS contract exposes every active content family', async () => {
  const content = await source('lib/public-content.ts')
  for (const key of ['hero', 'about', 'projects', 'skills', 'experience', 'testimonials', 'contact', 'services', 'articles', 'site']) {
    assert.match(content, new RegExp(`\\b${key}\\b`), `missing ${key}`)
  }
})

test('database schema and API expose route-specific pages and service records', async () => {
  const [schema, api, adminLayout] = await Promise.all([
    source('supabase-schema.sql'),
    source('app/api/content/route.ts'),
    source('app/admin/layout.tsx'),
  ])
  assert.match(schema, /site_pages/)
  assert.match(schema, /slug TEXT/)
  assert.match(schema, /news_posts_slug_unique_idx/)
  assert.match(api, /'pages'/)
  assert.match(api, /'services'/)
  assert.match(adminLayout, /\/admin\/hero/)
  assert.match(adminLayout, /\/admin\/initiatives/)
})

test('public CMS validates legacy Supabase JWT time claims before querying', async () => {
  const [loader, validator] = await Promise.all([
    source('lib/public-content-server.ts'),
    source('lib/supabase-server-key.ts'),
  ])
  assert.match(loader, /validateSupabaseServerKey\(key\)/)
  for (const claim of ['iat', 'nbf', 'exp']) assert.match(validator, new RegExp(claim))
  assert.match(validator, /issued in the future/)
})

test('public footers credit the official instrumental source', async () => {
  const [footer, imprint] = await Promise.all([
    source('components/portfolio/Footer.tsx'),
    source('components/portfolio/PublicImprint.tsx'),
  ])
  for (const content of [footer, imprint]) {
    assert.match(content, /Gauchha Geet Nepali/)
    assert.match(content, /Music Nepal/)
    assert.match(content, /youtube\.com\/watch\?v=3MFZT_vReQQ/)
  }
})
