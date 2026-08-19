import assert from 'node:assert/strict'
import test from 'node:test'
import { access, readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('Nepali typography is self-hosted by the Next build without changing English typography', async () => {
  const [layout, styles] = await Promise.all([
    read('app/layout.tsx'),
    read('app/globals.css'),
  ])

  assert.match(layout, /from ['"]next\/font\/google['"]/)
  assert.match(layout, /Noto_Sans_Devanagari/)
  assert.match(layout, /Noto_Serif_Devanagari/)
  assert.match(layout, /variable:\s*['"]--font-nepali-sans['"]|variable:\s*['"]--font-nepali-serif['"]/) 
  assert.match(styles, /--gateway-nepali-sans:\s*var\(--font-nepali-sans\)/)
  assert.match(styles, /--gateway-nepali-serif:\s*var\(--font-nepali-serif\)/)
  assert.doesNotMatch(styles, /fonts\.googleapis\.com\/css2\?family=.*Devanagari/)
  assert.match(styles, /html\[lang='ne'\] \.gateway-shell/) 
})

test('PWA registration and install affordance are wired into the app shell', async () => {
  const [layout, component, manifest, worker] = await Promise.all([
    read('app/layout.tsx'),
    read('components/ui/PwaInstallPrompt.tsx'),
    read('app/manifest.ts'),
    read('public/sw.js'),
  ])

  assert.match(layout, /PwaInstallPrompt/)
  assert.match(component, /navigator\.serviceWorker\.register\(['"]\/sw\.js['"]/) 
  assert.match(component, /beforeinstallprompt/)
  assert.match(component, /preventDefault\(\)/)
  assert.match(component, /deferredPrompt\.prompt\(\)/)
  assert.match(component, /appinstalled/)
  assert.match(manifest, /id:\s*['"]\//)
  assert.match(manifest, /scope:\s*['"]\//)
  assert.match(worker, /addEventListener\(['"]install['"]/) 
  assert.match(worker, /addEventListener\(['"]activate['"]/) 
  assert.match(worker, /addEventListener\(['"]fetch['"]/) 
  assert.match(worker, /event\.respondWith\(fetch\(event\.request\)\)/)
  assert.doesNotMatch(worker, /caches\.open\([^)]*api/i)
})

test('PWA worker source is present as a public asset', async () => {
  await access(new URL('../public/sw.js', import.meta.url))
})
