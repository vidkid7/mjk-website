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
  assert.match(home, /<LiquidBackdrop(?:\s|\/?>)/)
  assert.match(adminLayout, /admin-liquid-shell/)
  assert.match(globals, /--liquid-navy/)
  assert.match(globals, /prefers-reduced-motion/)
  assert.match(globals, /\.admin-liquid-shell\s*\{[^}]*position:\s*relative/)
})

test('public homepage framing consumes the shared liquid surfaces', async () => {
  const [home, navbar, hero, marquee, footer, heading] = await Promise.all([
    read('app/page.tsx'),
    read('components/sections/Navbar.tsx'),
    read('components/sections/Hero.tsx'),
    read('components/sections/Marquee.tsx'),
    read('components/sections/Footer.tsx'),
    read('components/ui/SectionHeading.tsx'),
  ])

  assert.match(home, /liquid-page public-liquid-page relative overflow-hidden/)
  assert.match(home, /<LiquidBackdrop variant="public"/)
  assert.match(home, /relative z-10/)
  assert.match(navbar, /glass-panel/)
  assert.match(navbar, /glass-action/)
  assert.match(navbar, /className="admin-card fixed inset-0/)
  assert.doesNotMatch(navbar, /className="glass glass-dark fixed inset-0/)
  assert.match(hero, /glass-panel/)
  assert.match(marquee, /glass-panel/)
  assert.match(footer, /glass-panel/)
  assert.match(heading, /glass-inset/)
})

test('homepage section variants alternate in the page render order', async () => {
  const home = await read('app/page.tsx')
  const sectionImports = new Map(
    [...home.matchAll(/import\s+(\w+)\s+from\s+'(@\/components\/sections\/[^']+)'/g)]
      .map(([, component, path]) => [component, `${path.replace('@/', '')}.tsx`])
  )
  const renderedSections = [...home.matchAll(/<([A-Z]\w*)\s*\/>/g)]
    .map(([, component]) => component)
    .filter((component) => sectionImports.has(component))
    .filter((component) => !['Navbar', 'Hero', 'Marquee', 'Footer'].includes(component))

  assert.deepEqual(renderedSections, [
    'About', 'Achievements', 'ClientPortfolio', 'Vision', 'Initiatives', 'Entrepreneurship',
    'YouthInspiration', 'Testimonials', 'Gallery', 'News', 'Stats', 'Contact', 'FAQ',
  ])

  const findVariant = async (path, visited = new Set()) => {
    assert.ok(!visited.has(path), `component import cycle while resolving ${path}`)
    visited.add(path)
    const source = await read(path)
    const directVariant = source.match(/public-section--(light|dark)/)
    if (directVariant) return directVariant[1]
    const child = source.match(/import\s+(\w+)\s+from\s+'(@\/components\/ui\/[^']+)'/)
    assert.ok(child, `${path} resolves to a public-section root`)
    return findVariant(`${child[2].replace('@/', '')}.tsx`, visited)
  }

  const variants = await Promise.all(renderedSections.map((component) => findVariant(sectionImports.get(component))))
  variants.slice(1).forEach((variant, index) => {
    assert.notEqual(variant, variants[index], `${renderedSections[index]} and ${renderedSections[index + 1]} alternate`)
  })
})

test('dark public sections give explicit slate text a readable contrast treatment', async () => {
  const globals = await read('app/globals.css')
  const coveredTokens = [...globals.matchAll(/\.public-section--dark\s+\.text-slate-(\d+)/g)].map(([, token]) => token)
  assert.deepEqual(new Set(coveredTokens), new Set(['950', '900', '700', '600', '500', '400', '300']))
  assert.match(globals, /\.public-section--dark\s+\.placeholder\\:text-slate-400::placeholder/)
  assert.match(globals, /\.public-section--dark\s+\.glass-action\s*\{[^}]*background:/)
})
