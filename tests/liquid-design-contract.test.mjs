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
  assert.match(home, /LiquidBackdrop/)
  assert.match(adminLayout, /admin-liquid-shell/)
  assert.match(globals, /--liquid-navy/)
  assert.match(globals, /prefers-reduced-motion/)
})
