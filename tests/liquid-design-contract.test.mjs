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

test('homepage section variants alternate in rendered order', async () => {
  const sectionFiles = [
    'components/ui/about-us-section.tsx',
    'components/sections/Achievements.tsx',
    'components/sections/ClientPortfolio.tsx',
    'components/sections/Vision.tsx',
    'components/sections/Initiatives.tsx',
    'components/sections/Entrepreneurship.tsx',
    'components/sections/YouthInspiration.tsx',
    'components/sections/Testimonials.tsx',
    'components/sections/Gallery.tsx',
    'components/sections/News.tsx',
    'components/sections/Stats.tsx',
    'components/sections/Contact.tsx',
    'components/sections/FAQ.tsx',
  ]
  const expected = ['light', 'dark', 'light', 'dark', 'light', 'dark', 'light', 'dark', 'light', 'dark', 'light', 'dark', 'light']
  const sources = await Promise.all(sectionFiles.map(read))
  const variants = sources.map((source, index) => {
    const match = source.match(/public-section--(light|dark)/)
    assert.ok(match, `${sectionFiles[index]} has a public-section variant`)
    return match[1]
  })

  assert.deepEqual(variants, expected)
})
