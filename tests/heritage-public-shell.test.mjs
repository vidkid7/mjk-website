import assert from 'node:assert/strict'
import test from 'node:test'
import { stat, readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('generated heritage mark is wired into the shared public identity', async () => {
  const [navbar, layout, mark] = await Promise.all([
    read('components/portfolio/SignalRail.tsx'),
    read('app/layout.tsx'),
    stat(new URL('../public/heritage-mark-generated-v2.png', import.meta.url)),
  ])

  assert.ok(mark.size > 1000)
  assert.match(navbar, /heritage-mark-(?:generated-v2\.png|v2\.webp)/)
  assert.match(layout, /heritage-mark-generated-v2\.png/)
})

test('public editorial routes share the heritage shell and header', async () => {
  const [services, service] = await Promise.all([
    read('app/services/page.tsx'),
    read('app/services/[slug]/page.tsx'),
  ])

  for (const source of [services, service]) {
    assert.match(source, /public-route-shell/)
    assert.match(source, /SignalRail/)
  }
})

test('hero keeps the requested transparent Nepal visual anchors and animated flag', async () => {
  const [hero, content, everest, temple, buddha, profile, environment, flag] = await Promise.all([
    read('components/portfolio/Hero.tsx'),
    read('lib/portfolio-content.ts'),
    stat(new URL('../public/cultural/mount-everest-transparent.png', import.meta.url)),
    stat(new URL('../public/cultural/janaki-temple-transparent.png', import.meta.url)),
    stat(new URL('../public/cultural/buddha-transparent.png', import.meta.url)),
    stat(new URL('../public/cultural/buddha-profile-left.png', import.meta.url)),
    stat(new URL('../public/cultural/janaki-everest-water-environment.png', import.meta.url)),
    stat(new URL('../public/cultural/nepal-flag-transparent.png', import.meta.url)),
  ])

  assert.match(hero, /nepal-flag-transparent\.png/)
  assert.match(hero, /janaki-everest-water-environment\.png/)
  assert.match(hero, /buddha-profile-left\.png/)
  assert.doesNotMatch(hero, /nepal-flag-hero-bg-optimized\.mp4/)
  assert.doesNotMatch(hero, /gateway-metrics/)
  assert.doesNotMatch(hero, /useScroll|useTransform/)
  assert.match(content, /mount-everest\.jpg/)
  assert.match(content, /janaki-temple\.jpg/)
  assert.match(content, /buddha\.jpg/)
  assert.match(hero, /loading="eager"/)
  for (const asset of [everest, temple, buddha, profile, environment, flag]) assert.ok(asset.size > 1000)
})

test('hero role line stays readable across the cultural plate', async () => {
  const css = await read('app/globals.css')

  assert.match(css, /\.gateway-shell \.gateway-role\s*\{[\s\S]*background:/)
  assert.match(css, /\.gateway-shell \.gateway-role\s*\{[\s\S]*color:\s*var\(--gateway-text\)/)
  assert.match(css, /\.gateway-shell \.gateway-hero__heritage-person\s*\{[\s\S]*grayscale\(0\)/)
})

test('about profile uses the supplied transparent portrait cutout', async () => {
  const [about, cutout] = await Promise.all([
    read('components/portfolio/About.tsx'),
    stat(new URL('../public/cultural/mukesh-about-cutout.png', import.meta.url)),
  ])

  assert.match(about, /content\.portrait/)
  assert.ok(cutout.size > 1000)
})
