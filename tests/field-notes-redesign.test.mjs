import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('the public portfolio exposes field-notes section language', async () => {
  const [hero, projects, about, skills, experience, contact] = await Promise.all([
    read('components/portfolio/Hero.tsx'),
    read('components/portfolio/Projects.tsx'),
    read('components/portfolio/About.tsx'),
    read('components/portfolio/Skills.tsx'),
    read('components/portfolio/Experience.tsx'),
    read('components/portfolio/Contact.tsx'),
  ])

  assert.match(hero, /SYSTEM ONLINE/)
  assert.match(hero, /KATHMANDU \/ NEPAL/)
  assert.match(projects, /Field Files|Evidence Archive/)
  assert.match(about, /Operator Profile/)
  assert.match(skills, /System Inventory/)
  assert.match(experience, /Operational History/)
  assert.match(contact, /Project Channel/)
})

test('project files expose outcomes and keyboard-safe actions', async () => {
  const projects = await read('components/portfolio/Projects.tsx')
  const content = await read('lib/portfolio-content.ts')

  assert.match(projects, /pfProjects\.map/)
  assert.match(projects, /VIEW FILE|VIEW PROJECT/)
  assert.match(projects, /focus-visible/)
  assert.match(content, /outcome:/)
})

test('field-notes styling is scoped and reduced motion is explicit', async () => {
  const css = await read('app/globals.css')

  assert.match(css, /\.portfolio-page/)
  assert.match(css, /prefers-reduced-motion/)
  assert.match(css, /field-notes|evidence|signal|scanline/i)
})
