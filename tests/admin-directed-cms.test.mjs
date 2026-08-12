import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)

async function source(path) {
  return readFile(new URL(path, root), 'utf8')
}

test('current public loader reads every editable page record', async () => {
  const content = await source('lib/public-content-server.ts')
  for (const key of ['profile', 'heroCopy', 'aboutCopy', 'contactCopy', 'uiCopy', 'services']) {
    assert.match(content, new RegExp(`pageData\\(pages, ['"]${key}['"]\\)`), `missing ${key}`)
  }
})

test('admin navigation exposes editors for every page-level public record', async () => {
  const content = await source('app/admin/layout.tsx')
  assert.match(content, /\/admin\/site-content/)
  assert.match(content, /\/admin\/services/)
})

test('editable landing-page copy is not owned by public components', async () => {
  const files = await Promise.all([
    source('components/portfolio/Projects.tsx'),
    source('components/portfolio/Skills.tsx'),
    source('components/portfolio/Experience.tsx'),
    source('components/portfolio/Contact.tsx'),
    source('components/portfolio/Footer.tsx'),
  ])
  for (const content of files) {
    assert.doesNotMatch(content, /Systems built for the work|What I can help you with|Inbound channels are open|Studio live/)
  }
})
