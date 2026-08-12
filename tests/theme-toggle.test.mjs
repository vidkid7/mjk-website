import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('public portfolio defaults to light and exposes a persistent theme switch', async () => {
  const [layout, navbar, css] = await Promise.all([
    read('app/layout.tsx'),
    read('components/portfolio/SignalRail.tsx'),
    read('app/globals.css'),
  ])

  assert.match(layout, /mukesh-portfolio-theme/)
  assert.match(layout, /portfolioTheme/)
  assert.match(navbar, /portfolio-theme-toggle/)
  assert.match(navbar, /localStorage/)
  assert.match(navbar, /aria-label={`Switch to \$\{theme === 'light' \? 'dark' : 'light'\} theme`}/)
  assert.match(navbar, /theme === 'light' \? 'dark' : 'light'/)
  assert.match(css, /\.gateway-shell\[data-theme='dark'\]/)
  assert.match(css, /--gateway-bg:\s*#f[0-9a-f]{5}/i)
  assert.match(css, /\.gateway-shell:not\(\[data-theme='dark'\]\)/)
})
