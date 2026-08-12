import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('admin navigation exposes only editors used by the current site', async () => {
  const source = await read('app/admin/layout.tsx')

  for (const retiredRoute of ['/admin/entrepreneurship', '/admin/youth', '/admin/gallery']) {
    assert.doesNotMatch(source, new RegExp(retiredRoute.replaceAll('/', '\\/')), `retired route still visible: ${retiredRoute}`)
  }
})

test('admin dashboard and settings omit retired content controls', async () => {
  const [dashboard, settings, history] = await Promise.all([
    read('app/admin/page.tsx'),
    read('app/admin/settings/page.tsx'),
    read('app/admin/history/page.tsx'),
  ])

  assert.doesNotMatch(dashboard, /Gallery Photos|Upload Photos/)

  for (const source of [settings, history]) {
    assert.doesNotMatch(source, /entrepreneurship|youth|gallery/i)
  }
})
