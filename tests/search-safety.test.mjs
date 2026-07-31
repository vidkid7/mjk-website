import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('admin routes are explicitly excluded from search results', async () => {
  const [adminHead, config] = await Promise.all([
    read('app/admin/head.tsx'),
    read('next.config.js'),
  ])

  assert.match(adminHead, /noindex,nofollow,noarchive/)
  assert.match(config, /source:\s*'\/admin\/:path\*'/)
  assert.match(config, /X-Robots-Tag/)
})

test('the public blog does not link search visitors to the admin area', async () => {
  const blogPage = await read('app/blog/page.tsx')
  assert.doesNotMatch(blogPage, /href="\/admin\/news"/)
})

test('the hero postpones decorative video loading until after initial render', async () => {
  const hero = await read('components/sections/Hero.tsx')
  assert.match(hero, /setPlayVideo\(true\)/)
  assert.match(hero, /src=\{playVideo \? '\/nepal-flag-hero-bg-optimized\.mp4' : undefined\}/)
})

test('the hero uses one unified living heritage plate while retaining a custom portrait override', async () => {
  const hero = await read('components/sections/Hero.tsx')
  assert.match(hero, /\/living-heritage-hero-v2\.webp/)
  assert.match(hero, /const customHeroImage =/)
  assert.doesNotMatch(hero, /src="\/hero-himalayan-peaks\.jpg"/)
  assert.doesNotMatch(hero, /src="\/buddha-lotus-removebg\.webp"/)
})

test('the hero headline is visible before JavaScript hydration', async () => {
  const hero = await read('components/sections/Hero.tsx')
  assert.doesNotMatch(hero, /<motion\.h1/)
  assert.doesNotMatch(hero, /initial=\{\{ opacity/)
})

test('public pages defer non-critical CMS refreshes until the first view settles', async () => {
  const storage = await read('lib/storage.ts')
  assert.match(storage, /const PUBLIC_REMOTE_DELAY_MS = 6000/)
  assert.match(storage, /window\.location\.pathname\.startsWith\('\/admin'\)/)
})

test('mobile visitors do not download desktop-only hero decorations', async () => {
  const hero = await read('components/sections/Hero.tsx')
  assert.match(hero, /hidden[^\"]*lg:block/)
  assert.match(hero, /matchMedia\('\(min-width: 1024px\)'\)/)
})

test('the deferred about image uses a compact WebP asset', async () => {
  const about = await read('components/sections/About.tsx')
  assert.match(about, /\/mukk-removebg-preview\.webp/)
})

test('navigation uses the smaller WebP logo asset', async () => {
  const [navbar, footer] = await Promise.all([
    read('components/sections/Navbar.tsx'),
    read('components/sections/Footer.tsx'),
  ])

  assert.match(navbar, /\/janaki-temple-logo\.webp/)
  assert.match(footer, /\/janaki-temple-logo\.webp/)
})

test('service landing pages are included in the sitemap for crawling', async () => {
  const sitemap = await read('app/sitemap.ts')

  assert.match(sitemap, /import \{ servicePages \} from '@\/lib\/service-pages'/)
  assert.match(sitemap, /url: `\$\{siteUrl\}\/services`/)
  assert.match(sitemap, /\.\.\.servicePages\.map/)
})

test('service pages publish canonical service and FAQ structured data', async () => {
  const page = await read('app/services/[slug]/page.tsx')

  assert.match(page, /generateStaticParams/)
  assert.match(page, /'@type': 'Service'/)
  assert.match(page, /'@type': 'FAQPage'/)
  assert.match(page, /'@type': 'BreadcrumbList'/)
  assert.match(page, /alternates: \{ canonical: url \}/)
})

test('the footer gives crawlers descriptive links to public service pages', async () => {
  const footer = await read('components/sections/Footer.tsx')

  assert.match(footer, /href: '\/services\/web-development-nepal'/)
  assert.match(footer, /href: '\/services\/custom-software-development-nepal'/)
  assert.match(footer, /href: '\/services\/business-automation-nepal'/)
})

test('the homepage gallery does not add a second page-level heading', async () => {
  const gallery = await read('components/ui/interactive-bento-gallery.tsx')

  assert.doesNotMatch(gallery, /<motion\.h1/)
  assert.match(gallery, /<motion\.h2/)
})
