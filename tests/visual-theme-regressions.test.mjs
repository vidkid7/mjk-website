import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('light mode remaps legacy portfolio tokens and keeps the hero metadata-free', async () => {
  const css = await read('app/globals.css')

  assert.match(css, /:root:not\(\[data-portfolio-theme='dark'\]\)\s+\.gateway-shell\s+\[class~='text-night-50'\]/)
  assert.match(css, /:root:not\(\[data-portfolio-theme='dark'\]\)\s+\.gateway-shell\s+\[class~='text-night-300'\]/)
  assert.match(css, /:root:not\(\[data-portfolio-theme='dark'\]\)\s+\.gateway-shell\s+\[class~='bg-night-900\/60'\]/)
  assert.match(css, /\.gateway-composition\s*\{[\s\S]*min-height: clamp\(27rem, calc\(100svh - 16rem\), 40rem\)/)
})

test('theme changes update the browser chrome color', async () => {
  const navbar = await read('components/portfolio/SignalRail.tsx')

  assert.match(navbar, /meta\[name='theme-color'\]/)
  assert.match(navbar, /#080808/)
  assert.match(navbar, /#FAF5ED/)
})
