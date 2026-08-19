import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('Nepali name translation covers full and animated name fragments', async () => {
  const source = await read('lib/i18n-content.ts')

  for (const phrase of ['Mukesh Khadka', 'MUKESH KHADKA', 'Mukesh', 'Khadka', 'MUKESH', 'KHADKA']) {
    assert.match(source, new RegExp(`['"]${phrase}['"]`), `missing name translation key: ${phrase}`)
  }
})

test('client homepage chrome localizes the visible name', async () => {
  const [loader, rail] = await Promise.all([
    read('components/portfolio/LoadingScreen.tsx'),
    read('components/portfolio/SignalRail.tsx'),
  ])

  for (const source of [loader, rail]) {
    assert.match(source, /useLanguage/)
    assert.match(source, /translateKnown/)
  }
})

test('server landing chrome uses the localized site name without a client hook', async () => {
  const source = await read('components/portfolio/PublicImprint.tsx')

  assert.doesNotMatch(source, /useLanguage|LanguageProvider/)
  assert.match(source, /publicSite\.name/)
})

test('hero animation keeps Nepali grapheme clusters together', async () => {
  const source = await read('components/portfolio/Hero.tsx')

  assert.match(source, /Intl\.Segmenter/)
  assert.doesNotMatch(source, /Array\.from\(text\)/)
})

test('loading animation keeps Nepali grapheme clusters together', async () => {
  const source = await read('components/portfolio/LoadingScreen.tsx')

  assert.match(source, /Intl\.Segmenter/)
  assert.doesNotMatch(source, /\.split\(['"]['"]\)/)
})

test('Nepali loading and homepage typography has Devanagari-specific font rules', async () => {
  const [layout, styles] = await Promise.all([
    read('app/layout.tsx'),
    read('app/globals.css'),
  ])

  assert.match(styles, /Noto\+Sans\+Devanagari/)
  assert.match(styles, /Noto\+Serif\+Devanagari/)
  assert.match(styles, /html\[lang=['"]ne['"]\][\s\S]*?\.gateway-loader/)
  assert.match(styles, /html\[lang=['"]ne['"]\][\s\S]*?\.gateway-title/)
  assert.match(styles, /text-transform:\s*none/)
})

test('Nepali server requests initialize the client provider before the loading screen paints', async () => {
  const [layout, provider] = await Promise.all([
    read('app/layout.tsx'),
    read('components/i18n/LanguageProvider.tsx'),
  ])

  assert.match(layout, /const requestLocale = getRequestLocale\(\)/)
  assert.match(layout, /LanguageProvider initialLocale=\{requestLocale\}/)
  assert.match(provider, /initialLocale\?:\s*Locale/)
  assert.match(provider, /useState<Locale>\(initialLocale\)/)
})

test('repeating hero typewriter keeps every Nepali grapheme intact on mobile', async () => {
  const styles = await read('app/globals.css')

  assert.doesNotMatch(styles, /\.gateway-title__typewriter-letter\s*\{[^}]*clip-path:\s*inset/s)
  assert.match(styles, /gateway-title-letter-typewriter[^;]*1 both/)
  assert.match(styles, /gateway-title-letter-loop[^;]*infinite/)
  assert.match(styles, /@media \(max-width: 767px\)\s*\{[\s\S]*?html\[lang=['"]ne['"]\] \.gateway-shell \.gateway-title[\s\S]*?max-width:\s*100%/)
  assert.match(styles, /html\[lang=['"]ne['"]\] \.gateway-shell \.gateway-title__front[\s\S]*?white-space:\s*nowrap/)
})

test('homepage exposes the authorized instrumental player and visible sound control', async () => {
  const [page, player] = await Promise.all([
    read('app/page.tsx'),
    read('components/portfolio/AmbientMusic.tsx'),
  ])

  assert.match(page, /AmbientMusic/)
  assert.match(player, /YritHjh4Isc/)
  assert.match(player, /autoplay=1/)
  assert.match(player, /aria-pressed/)
  assert.match(player, /unMute/)
})
