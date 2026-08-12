import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('shared liquid design system is available to public and admin surfaces', async () => {
  const [backdrop, glassSurface, home, adminLayout, globals] = await Promise.all([
    read('components/ui/LiquidBackdrop.tsx'),
    read('components/ui/GlassSurface.tsx'),
    read('app/page.tsx'),
    read('app/admin/layout.tsx'),
    read('app/globals.css'),
  ])

  assert.match(backdrop, /LiquidBackdrop/)
  assert.match(glassSurface, /glass-panel/)
  assert.match(home, /portfolio-page/)
  assert.doesNotMatch(home, /<LiquidBackdrop(?:\s|\/?>)/)
  assert.match(adminLayout, /admin-liquid-shell/)
  assert.match(globals, /--liquid-navy/)
  assert.match(globals, /prefers-reduced-motion/)
  assert.match(globals, /\.admin-liquid-shell\s*\{[^}]*position:\s*relative/)
})

test('admin workspace keeps its liquid shell and scoped high-contrast controls', async () => {
  const [layout, login, dashboard, notice, upload, globals] = await Promise.all([
    read('app/admin/layout.tsx'),
    read('app/admin/login/page.tsx'),
    read('app/admin/page.tsx'),
    read('components/admin/AdminDataNotice.tsx'),
    read('components/admin/ImageUploadField.tsx'),
    read('app/globals.css'),
  ])

  assert.match(layout, /<LiquidBackdrop variant="admin"\s*\/>/)
  assert.match(layout, /aria-label="Close navigation"/)
  assert.match(layout, /admin-sidebar/)
  assert.match(layout, /admin-header/)
  assert.match(login, /admin-liquid-shell/)
  assert.match(login, /admin-login-card/)
  assert.match(dashboard, /admin-dashboard-hero/)
  assert.match(dashboard, /admin-card/)
  assert.match(notice, /admin-notice/)
  assert.match(upload, /admin-control/)
  assert.match(upload, /admin-upload-preview/)
  assert.match(globals, /\.admin-liquid-shell\s+\.admin-control/)
  assert.match(globals, /\.admin-liquid-shell\s+\.admin-control:focus/)
  assert.match(globals, /\.admin-liquid-shell\s+\.bg-white/)
})

test('admin management routes consume the shared liquid editor primitives', async () => {
  const routes = [
    'about', 'achievements', 'entrepreneurship', 'gallery', 'hero', 'initiatives', 'messages',
    'news', 'settings', 'stats', 'testimonials', 'vision', 'volunteers', 'youth',
  ]
  const sources = await Promise.all(routes.map((route) => read(`app/admin/${route}/page.tsx`)))

  sources.forEach((source, index) => {
    assert.match(source, /admin-card/, `${routes[index]} uses a dark admin card`)
    assert.match(source, /admin-control/, `${routes[index]} uses a shared admin control`)
  })

  ;['achievements', 'gallery', 'testimonials', 'vision'].forEach((route) => {
    const source = sources[routes.indexOf(route)]
    assert.match(source, /fixed inset-0[^"']*(?:bg-black\/70|bg-\[#[^\]]+\]\/)/, `${route} dialog has a dark overlay`)
    assert.match(source, /admin-card[^"']*max-w-/, `${route} dialog uses an admin card`)
  })
})

test('public homepage framing consumes the personal portfolio surfaces', async () => {
  const [home, navbar, hero, marquee, footer, heading] = await Promise.all([
    read('app/page.tsx'),
    read('components/sections/Navbar.tsx'),
    read('components/sections/Hero.tsx'),
    read('components/sections/Marquee.tsx'),
    read('components/sections/Footer.tsx'),
    read('components/ui/SectionHeading.tsx'),
  ])

  assert.match(home, /className="portfolio-page/)
  assert.match(home, /components\/portfolio/)
  assert.doesNotMatch(home, /LiquidBackdrop/)
  assert.doesNotMatch(home, /components\/sections/)
  assert.match(navbar, /glass-panel/)
  assert.match(navbar, /glass-action/)
  assert.match(navbar, /className="admin-card fixed inset-0/)
  assert.doesNotMatch(navbar, /className="glass glass-dark fixed inset-0/)
  assert.match(hero, /hero-name-3d/)
  assert.match(marquee, /bg-\[#f7f3eb\]/)
  assert.match(footer, /glass-panel/)
  assert.match(footer, /public-section--light/)
  assert.match(heading, /glass-inset/)
})

test('homepage composes the personal portfolio sections in order', async () => {
  const home = await read('app/page.tsx')
  const renderedSections = [
    'LoadingScreen', 'PortfolioNavbar', 'PortfolioHero', 'About', 'Projects', 'Skills', 'Experience',
    'Testimonials', 'Contact', 'Footer',
  ]
  const positions = renderedSections.map((component) => home.indexOf(`<${component}`))
  assert.ok(positions.every((position) => position >= 0), 'all portfolio sections must remain rendered')
  assert.deepEqual([...positions].sort((a, b) => a - b), positions)
})

test('dark public sections give explicit slate text a readable contrast treatment', async () => {
  const globals = await read('app/globals.css')
  const coveredTokens = [...globals.matchAll(/\.public-section--dark\s+\.text-slate-(\d+)/g)].map(([, token]) => token)
  assert.deepEqual(new Set(coveredTokens), new Set(['950', '900', '800', '700', '600', '500', '400', '300']))
  assert.match(globals, /\.public-section--dark\s+\.placeholder\\:text-slate-400::placeholder/)
  assert.match(globals, /\.public-section--dark\s+\.glass-action\s*\{[^}]*background:/)
})

test('public rendered sections do not depend on the dark SectionHeading branch', async () => {
  const home = await read('app/page.tsx')
  const sectionImports = new Map(
    [...home.matchAll(/import\s+(\w+)\s+from\s+'(@\/components\/sections\/[^']+)'/g)]
      .map(([, component, path]) => [component, `${path.replace('@/', '')}.tsx`])
  )
  const renderedSections = [...home.matchAll(/<([A-Z]\w*)\s*\/>/g)]
    .map(([, component]) => component)
    .filter((component) => sectionImports.has(component))
    .filter((component) => !['Navbar', 'Hero', 'Marquee', 'Footer'].includes(component))
  const sectionSources = await Promise.all(renderedSections.map((component) => read(sectionImports.get(component))))
  const darkHeadingSections = sectionSources
    .map((source, index) => ({ component: renderedSections[index], source }))
    .filter(({ source }) => /public-section--dark/.test(source) && /<SectionHeading\b/.test(source))

  assert.deepEqual(darkHeadingSections, [])
})

test('editorial service and blog routes retain their content contracts inside the heritage route shell', async () => {
  const [services, serviceDetail] = await Promise.all([
    read('app/services/page.tsx'),
    read('app/services/[slug]/page.tsx'),
  ])

  ;[services, serviceDetail].forEach((source) => {
    assert.match(source, /public-route-shell/)
    assert.match(source, /SignalRail/)
    assert.match(source, /relative z-10/)
  })

  ;[services, serviceDetail].forEach((source) => {
    assert.match(source, /signal-header|SignalRail/)
    assert.doesNotMatch(source, /<main className="[^"]*overflow-hidden/)
  })

  assert.match(services, /public-route-service-grid/)
  assert.match(serviceDetail, /generateStaticParams/)
  assert.match(serviceDetail, /'@type': 'Service'/)
  assert.match(serviceDetail, /'@type': 'FAQPage'/)
  assert.match(serviceDetail, /'@type': 'BreadcrumbList'/)
  assert.match(serviceDetail, /public-service-faq/)
  assert.match(serviceDetail, /public-route-cta/)
})

test('public editorial light shell remaps the public dark bands into light paper surfaces', async () => {
  const globals = await read('app/globals.css')

  assert.match(globals, /\.public-editorial-light\s*\{[^}]*linear-gradient/)
  assert.match(globals, /\.public-editorial-light\s+\.public-section--dark\s*\{[^}]*linear-gradient/)
  assert.match(globals, /\.public-editorial-light\s+\.glass-action\s*\{[^}]*background:/)
  assert.match(globals, /\.public-editorial-light\s+\.admin-card\s*\{[^}]*background:/)
})
