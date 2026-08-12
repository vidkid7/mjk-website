import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('portfolio opens as an interface-first gateway and case registry', async () => {
  const [home, hero, navbar, projects, css] = await Promise.all([
    read('app/page.tsx'),
    read('components/portfolio/Hero.tsx'),
    read('components/portfolio/Navbar.tsx'),
    read('components/portfolio/Projects.tsx'),
    read('app/globals.css'),
  ])

  assert.match(home, /portfolio-page[^\n]*tech-noir-shell/)
  assert.match(hero, /gateway-hero/)
  assert.match(hero, /noir-display/)
  assert.match(hero, /gateway-title/)
  assert.match(navbar, /signal-rail/)
  assert.match(projects, /case-registry/)
  assert.match(projects, /case-switcher/)
  assert.doesNotMatch(`${hero}\n${projects}`, /EVIDENCE BOARD|PREUVE #|CLIQUER POUR DÉCRYPTER|SUBJECT PROFILE/)
  assert.match(css, /--noir-display:/)
  assert.match(css, /\.tech-noir-shell/)
  assert.match(css, /\.noir-evidence-card/)
})

test('tech-noir treatment removes the warm portfolio surface language', async () => {
  const [hero, projects, about, css] = await Promise.all([
    read('components/portfolio/Hero.tsx'),
    read('components/portfolio/Projects.tsx'),
    read('components/portfolio/About.tsx'),
    read('app/globals.css'),
  ])

  assert.doesNotMatch(hero, /rounded-t-\[999px\]|bg-gradient-to-r from-ember-500 to-rose-500/)
  assert.doesNotMatch(projects, /rounded-3xl border border-ink\/10 bg-white\/60/)
  assert.doesNotMatch(about, /rounded-t-\[12rem\]/)
  assert.match(css, /background:\s*#080808/)
  assert.match(css, /font-family:\s*var\(--noir-display\)/)
})
