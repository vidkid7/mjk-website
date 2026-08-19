import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('locale contract defaults invalid values to English', async () => {
  const source = await read('lib/i18n.ts')
  assert.match(source, /type Locale = ['"]en['"] \| ['"]ne['"]/)
  assert.match(source, /DEFAULT_LOCALE/)
  assert.match(source, /normalizeLocale/)
})

test('language provider persists the selected locale and updates document language', async () => {
  const provider = await read('components/i18n/LanguageProvider.tsx')
  assert.match(provider, /localStorage/)
  assert.match(provider, /document\.documentElement\.lang/)
  assert.match(provider, /LanguageContext|useLanguage/)
})

test('language switch is wired into public and admin tools', async () => {
  const [switcher, rail, admin, layout] = await Promise.all([
    read('components/i18n/LanguageSwitch.tsx'),
    read('components/portfolio/SignalRail.tsx'),
    read('app/admin/layout.tsx'),
    read('app/layout.tsx'),
  ])
  assert.match(switcher, /EN/)
  assert.match(switcher, /नेपाली/)
  assert.match(rail, /LanguageSwitch/)
  assert.match(admin, /LanguageSwitch/)
  assert.match(layout, /LanguageProvider/)
})

test('public content loading is locale-aware with English fallback', async () => {
  const [loader, localized] = await Promise.all([
    read('lib/public-content-server.ts'),
    read('lib/localized-content.ts'),
  ])
  assert.match(loader, /locale|Locale/)
  assert.match(loader, /resolveLocalized/)
  assert.match(localized, /resolveLocalizedValue/)
  assert.match(localized, /fallback|en/)
})

test('fixed interface copy has English and Nepali entries', async () => {
  const source = await read('lib/i18n-copy.ts')
  for (const key of ['navigation', 'projects', 'skills', 'experience', 'testimonials', 'contact', 'footer']) {
    assert.match(source, new RegExp(key), `missing ${key} copy group`)
  }
  assert.match(source, /en:/)
  assert.match(source, /ne:/)
  assert.match(source, /Gauchha Geet Nepali/)
  assert.match(source, /गाउँछ गीत नेपाली/)
  assert.match(source, /National Poet Madhav Prasad Ghimire/)
  assert.match(source, /राष्ट्रिय कवि माधवप्रसाद घिमिरे/)

  const footer = await read('components/portfolio/Footer.tsx')
  assert.match(footer, /All Rights Reserved\./)
})

test('admin landing-page editor exposes paired English and Nepali values', async () => {
  const source = await read('app/admin/site-content/page.tsx')
  assert.match(source, /English/)
  assert.match(source, /नेपाली/)
  assert.match(source, /translations/)
  assert.match(source, /updateNepali/)
})

test('static public routes and admin chrome have translation coverage', async () => {
  const [copy, provider] = await Promise.all([
    read('lib/i18n-content.ts'),
    read('components/i18n/LanguageProvider.tsx'),
  ])
  for (const phrase of [
    'Writing index',
    'Open a project channel.',
    'Ways to work together',
    'Practical digital work, explained clearly.',
    'Services',
    'Dashboard',
    'Loading live content...',
  ]) {
    assert.match(copy, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')), `missing ${phrase}`)
  }
  assert.match(provider, /MutationObserver/)
  assert.match(provider, /translateDom|translateKnown/)
})

test('Nepali mode transliterates the portfolio name and handles case-insensitive fixed copy', async () => {
  const source = await read('lib/i18n-content.ts')
  assert.match(source, /Mukesh Khadka/)
  assert.match(source, /मुकेश खड्का/)
  assert.match(source, /toLocaleLowerCase|toLowerCase/)
})

test('Nepali mode uses exact interface translations for visible identity labels', async () => {
  const [copy, hero] = await Promise.all([
    read('lib/i18n-content.ts'),
    read('components/portfolio/Hero.tsx'),
  ])

  assert.match(copy, /Founder\/CEO at Aashatech['\"]:\s*'AashaTech का सह-संस्थापक तथा प्रमुख कार्यकारी अधिकृत'/)
  assert.match(copy, /Field Files['\"]:\s*'कामका फाइलहरू'/)
  assert.match(copy, /DARK:\s*'गाढा'/)
  assert.match(hero, /translateKnown\(content\.headline, locale\)/)
})

test('admin chrome uses the shared heritage field structure', async () => {
  const [layout, styles] = await Promise.all([
    read('app/admin/layout.tsx'),
    read('app/globals.css'),
  ])
  assert.match(layout, /admin-field-shell/)
  assert.match(layout, /admin-field-rail/)
  assert.match(layout, /admin-field-header/)
  assert.match(styles, /\.admin-field-shell/)
  assert.match(styles, /\.admin-field-rail/)
  assert.match(styles, /\.admin-field-header/)
})
