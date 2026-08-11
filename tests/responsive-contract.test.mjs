import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)

async function source(path) {
  return readFile(new URL(path, root), 'utf8')
}

test('responsive shell declares safe areas, phone breakpoints, and touch sizing', async () => {
  const css = await source('app/globals.css')
  assert.match(css, /env\(safe-area-inset-top/)
  assert.match(css, /@media\s*\(max-width:\s*767px\)/)
  assert.match(css, /(?:min-height|height):\s*44px/)
  assert.match(css, /overflow-x:\s*(?:clip|hidden)/)
})

test('mobile navigation locks page scroll while its full menu is open', async () => {
  const signalRail = await source('components/portfolio/SignalRail.tsx')
  const adminLayout = await source('app/admin/layout.tsx')
  assert.match(signalRail, /document\.body\.style\.overflow/)
  assert.match(signalRail, /signal-rail__menu-panel/)
  assert.match(adminLayout, /admin-mobile-overlay/)
})

test('public route shells remain present for responsive viewport coverage', async () => {
  for (const route of ['app/page.tsx', 'app/articles/page.tsx', 'app/contact/page.tsx', 'app/services/page.tsx']) {
    const content = await source(route)
    assert.match(content, /gateway-shell|public-route-shell|portfolio-page/, route)
  }
})
