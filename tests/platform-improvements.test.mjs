import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('remote images are optimized through explicit remote patterns', async () => {
  const config = await read('next.config.js')

  assert.match(config, /remotePatterns/)
  assert.match(config, /hostname: 'images\.unsplash\.com'/)
  assert.match(config, /hostname: '\*\*\.supabase\.co'/)
  assert.doesNotMatch(config, /unoptimized:\s*true/)
})

test('public content reads have a shared cache policy while admin reads do not', async () => {
  const contentRoute = await read('app/api/content/route.ts')
  const storage = await read('lib/storage.ts')

  assert.match(contentRoute, /s-maxage=60, stale-while-revalidate=300/)
  assert.match(contentRoute, /response\.headers\.set\('Cache-Control', 'no-store'\)/)
  assert.doesNotMatch(storage, /fetch\(`\/api\/content\?key=\$\{key\}`, \{ cache: 'no-store' \}\)/)
})

test('non-production robots block crawlers and production publishes the sitemap', async () => {
  const robots = await read('app/robots.ts')

  assert.match(robots, /isProduction/)
  assert.match(robots, /\{ userAgent: '\*', disallow: '\/' \}/)
  assert.match(robots, /sitemap: `\$\{siteUrl\}\/sitemap\.xml`/)
})

test('the blog provides an auto-discoverable RSS feed', async () => {
  const [feed, layout] = await Promise.all([
    read('app/feed.xml/route.ts'),
    read('app/layout.tsx'),
  ])

  assert.match(feed, /application\/rss\+xml/)
  assert.match(feed, /blogPosts/)
  assert.match(layout, /href="\/feed\.xml"/)
})

test('admin login protects against repeated password attempts', async () => {
  const [auth, login] = await Promise.all([
    read('lib/admin-auth.ts'),
    read('app/api/admin/login/route.ts'),
  ])

  assert.match(auth, /LOGIN_MAX_ATTEMPTS = 5/)
  assert.match(auth, /checkLoginRateLimit/)
  assert.match(login, /status: 429/)
  assert.match(login, /Retry-After/)
})

test('admin authentication uses short-lived access tokens and rotating refresh tokens', async () => {
  const [token, auth, refresh, migration, client] = await Promise.all([
    read('lib/admin-token.ts'),
    read('lib/admin-auth.ts'),
    read('app/api/admin/refresh/route.ts'),
    read('supabase/migrations/20260817_admin_refresh_tokens.sql'),
    read('lib/admin-client.ts'),
  ])

  assert.match(token, /ADMIN_ACCESS_SECONDS = 15 \* 60/)
  assert.match(token, /typ: 'access'/)
  assert.match(token, /iss: 'mjk-admin'/)
  assert.match(token, /verifyAdminAccessToken/)
  assert.match(auth, /REFRESH_SECONDS = 30 \* 24 \* 60 \* 60/)
  assert.match(auth, /token_hash/)
  assert.match(auth, /replaced_by_hash/)
  assert.match(auth, /revokeRefreshFamily/)
  assert.match(auth, /rotateAdminSession/)
  assert.match(refresh, /export async function POST/)
  assert.match(refresh, /rotateAdminSession/)
  assert.match(migration, /CREATE TABLE IF NOT EXISTS admin_refresh_tokens/)
  assert.match(migration, /ENABLE ROW LEVEL SECURITY/)
  assert.match(client, /refreshInFlight/)
  assert.match(client, /\/api\/admin\/refresh/)
})

test('CMS saves are backed by revision history and a restore control', async () => {
  const [schema, contentRoute, historyPage] = await Promise.all([
    read('supabase-schema.sql'),
    read('app/api/content/route.ts'),
    read('app/admin/history/page.tsx'),
  ])

  assert.match(schema, /CREATE TABLE IF NOT EXISTS content_revisions/)
  assert.match(contentRoute, /saveContentRevision/)
  assert.match(contentRoute, /body\.action === 'restore'/)
  assert.match(historyPage, /Content history/)
  assert.match(historyPage, /revisionId/)
})
