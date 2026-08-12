import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('homepage uses the interface-first gateway and case registry structure', async () => {
  const [home, hero, navbar, projects, css] = await Promise.all([
    read('app/page.tsx'),
    read('components/portfolio/Hero.tsx'),
    read('components/portfolio/Navbar.tsx'),
    read('components/portfolio/Projects.tsx'),
    read('app/globals.css'),
  ])

  assert.match(home, /gateway-shell/)
  assert.match(hero, /gateway-title/)
  assert.doesNotMatch(hero, /gateway-overlay|gateway-footer-row/)
  assert.match(navbar, /signal-rail/)
  assert.match(projects, /case-registry/)
  assert.match(projects, /case-switcher/)
  assert.match(projects, /aria-label="Project view"/)
  assert.match(css, /\.gateway-shell/)
  assert.match(css, /\.case-registry/)
  assert.match(css, /\.signal-rail/)
})

test('portfolio copy is original and does not reuse reference phrasing', async () => {
  const [hero, projects, content] = await Promise.all([
    read('components/portfolio/Hero.tsx'),
    read('components/portfolio/Projects.tsx'),
    read('lib/portfolio-content.ts'),
  ])
  const source = `${hero}\n${projects}\n${content}`

  assert.doesNotMatch(source, /EVIDENCE BOARD|PREUVE #|CLIQUER POUR DÉCRYPTER|SUBJECT PROFILE/)
  assert.match(content, /I turn slow, manual work into calm, dependable systems\./)
  assert.match(hero, /gateway-title/)
})
