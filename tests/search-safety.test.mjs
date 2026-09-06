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

test('the hero uses the unified cultural plate without a second animated flag layer', async () => {
  const hero = await read('components/portfolio/Hero.tsx')
  assert.doesNotMatch(hero, /<video|nepal-flag-hero-bg-optimized\.mp4|nepal-flag-user-v1\.webm/)
  assert.match(hero, /janaki-everest-water-environment\.png/)
  assert.doesNotMatch(hero, /WavingNepalFlag/)
})

test('the hero image reaches the top of the viewport behind the navbar', async () => {
  const hero = await read('components/sections/Hero.tsx')

  assert.match(hero, /min-h-\[100svh\]/)
  assert.doesNotMatch(hero, /pt-\[72px\]/)
  assert.doesNotMatch(hero, /pt-\[80px\]/)
  assert.doesNotMatch(hero, /pt-\[88px\]/)
})

test('the hero uses one unified living heritage plate while retaining a custom portrait override', async () => {
  const hero = await read('components/sections/Hero.tsx')
  assert.match(hero, /\/living-heritage-hero-v2\.webp/)
  assert.match(hero, /object-cover/)
  assert.doesNotMatch(hero, /scale-\[0\.88\]/)
  assert.match(hero, /const customHeroImage =/)
  assert.doesNotMatch(hero, /src="\/hero-himalayan-peaks\.jpg"/)
  assert.doesNotMatch(hero, /src="\/buddha-lotus-removebg\.webp"/)
})

test('the hero presents a balanced personal portfolio introduction', async () => {
  const [hero, content] = await Promise.all([
    read('components/portfolio/Hero.tsx'),
    read('lib/portfolio-content.ts'),
  ])
  assert.match(content, /I'm Mukesh Khadka/)
  assert.match(content, /Software that feels like it always belonged\./)
  assert.match(content, /href: '#work'/)
  assert.match(content, /href: '#contact'/)
  assert.match(hero, /<motion\.h1/)
  assert.doesNotMatch(hero, /<h2/)
})

test('the hero headline is visible before JavaScript hydration', async () => {
  const hero = await read('components/sections/Hero.tsx')
  assert.doesNotMatch(hero, /<motion\.h1/)
  assert.doesNotMatch(hero, /initial=\{\{ opacity/)
})

test('the animated hero heading keeps its accessible label from rendering twice', async () => {
  const hero = await read('components/portfolio/Hero.tsx')

  assert.match(hero, /aria-label=\{headline\}/)
  assert.doesNotMatch(hero, /className="sr-only">\{headline\}<\/span>/)
})

test('public pages defer non-critical CMS refreshes until the first view settles', async () => {
  const storage = await read('lib/storage.ts')
  assert.match(storage, /const PUBLIC_REMOTE_DELAY_MS = 6000/)
  assert.match(storage, /window\.location\.pathname\.startsWith\('\/admin'\)/)
})

test('the hero keeps the original portrait and unified cultural environment', async () => {
  const hero = await read('components/portfolio/Hero.tsx')
  assert.match(hero, /janaki-everest-water-environment\.png/)
  assert.match(hero, /buddha-profile-left\.png/)
})

test('the deferred about image uses a compact WebP asset', async () => {
  const about = await read('components/sections/About.tsx')
  assert.match(about, /\/mukk-removebg-preview\.webp/)
})

test('navigation uses one combined Mukesh Khadka heritage logo asset', async () => {
  const [navbar, footer] = await Promise.all([
    read('components/sections/Navbar.tsx'),
    read('components/sections/Footer.tsx'),
  ])

  assert.match(navbar, /\/mukesh-heritage-logo-v2\.webp/)
  assert.doesNotMatch(navbar, /<span[^>]*>\s*Mukesh Khadka\s*<\/span>/)
  assert.doesNotMatch(navbar, /Digital Systems/)
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

test('the editorial field notes use the four supplied portrait assets', async () => {
  const story = await read('components/sections/PortraitStory.tsx')

  for (const asset of ['mukesh-temple.jpg', 'mukesh-workspace.jpg', 'mukesh-garden.jpg', 'mukesh-sky.jpg']) {
    assert.match(story, new RegExp(`/assets/portraits/${asset}`))
  }
})

test('selected work has stable crawlable hub and detail routes', async () => {
  const [workData, workIndex, workDetail, sitemap, projects] = await Promise.all([
    read('lib/work-pages.ts'),
    read('app/work/page.tsx'),
    read('app/work/[slug]/page.tsx'),
    read('app/sitemap.ts'),
    read('components/portfolio/Projects.tsx'),
  ])

  assert.match(workData, /export const workPages/)
  assert.match(workIndex, /'@type': 'CollectionPage'/)
  assert.match(workDetail, /generateStaticParams/)
  assert.match(workDetail, /'@type': 'CreativeWork'/)
  assert.match(workDetail, /'@type': 'BreadcrumbList'/)
  assert.match(sitemap, /import \{ workPages \} from '@\/lib\/work-pages'/)
  assert.match(sitemap, /url: `\$\{siteUrl\}\/work`/)
  assert.match(sitemap, /\.\.\.workPages\.map/)
  assert.match(projects, /\/work\/\$\{getWorkPageByTitle\(item\.title\)\?\.slug\}/)
})

test('the production article feed uses the same slugs as article routes', async () => {
  const feed = await read('app/feed.xml/route.ts')

  assert.match(feed, /getArticles\(\)/)
  assert.match(feed, /\/articles\/\$\{article\.slug\}/)
  assert.match(feed, /application\/rss\+xml/)
})

test('public metadata uses profile schema without publishing hidden FAQ markup', async () => {
  const layout = await read('app/layout.tsx')

  assert.match(layout, /'@type': 'ProfilePage'/)
  assert.match(layout, /max-image-preview/)
  assert.doesNotMatch(layout, /'@type': 'FAQPage'/)
})
