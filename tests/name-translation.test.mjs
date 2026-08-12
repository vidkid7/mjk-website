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
