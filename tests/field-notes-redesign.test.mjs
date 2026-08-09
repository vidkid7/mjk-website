import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('the portfolio navigation and hero expose the opening field signal', async () => {
  const [navbar, hero, marquee, cursorGlow, magnetic] = await Promise.all([
    read('components/portfolio/Navbar.tsx'),
    read('components/portfolio/Hero.tsx'),
    read('components/portfolio/Marquee.tsx'),
    read('components/fx/CursorGlow.tsx'),
    read('components/fx/Magnetic.tsx'),
  ])

  assert.match(navbar, /label: 'About', href: '#about'/)
  assert.match(navbar, /label: 'Field Files', href: '#work'/)
  assert.match(navbar, /label: 'Skills', href: '#skills'/)
  assert.match(navbar, /label: 'History', href: '#experience'/)
  assert.match(navbar, /label: 'Contact', href: '#contact'/)
  assert.match(hero, /SYSTEM ONLINE/)
  assert.match(hero, /KATHMANDU \/ NEPAL/)
  assert.match(hero, /SignalPill/)
  assert.match(hero, /reduceMotion \? pfHero\.headline : <SplitWords/)
  assert.match(hero, /reduceMotion \? StaticTiltCard : TiltCard/)
  assert.match(navbar, /<noscript>/)
  assert.match(navbar, /md:hidden/)
  assert.match(marquee, /useReducedMotion/)
  assert.match(marquee, /motion-reduce:flex/)
  assert.match(cursorGlow, /useReducedMotion/)
  assert.match(magnetic, /useReducedMotion/)
  assert.match(magnetic, /\(pointer: fine\)/)
  assert.match(magnetic, /hasFinePointer/)
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

test('supporting portfolio sections retain their content in a field-notes frame', async () => {
  const [about, skills, experience, testimonials, culture, contact, footer] = await Promise.all([
    read('components/portfolio/About.tsx'),
    read('components/portfolio/Skills.tsx'),
    read('components/portfolio/Experience.tsx'),
    read('components/portfolio/Testimonials.tsx'),
    read('components/portfolio/Culture.tsx'),
    read('components/portfolio/Contact.tsx'),
    read('components/portfolio/Footer.tsx'),
  ])

  assert.match(about, /eyebrow="Operator Profile"/)
  assert.match(about, /aria-label="Operator metadata"/)
  assert.match(skills, /eyebrow="System Inventory"/)
  assert.match(skills, /aria-label="System inventory metadata"/)
  assert.match(experience, /eyebrow="Operational History"/)
  assert.match(experience, /<ol[\s\S]*pfExperience\.map[\s\S]*<\/ol>/)
  assert.match(experience, /checkpoint-marker/)
  assert.match(testimonials, /eyebrow="Verified Reports"/)
  assert.match(testimonials, /Report \{String\(i \+ 1\)\.padStart\(2, '0'\)\}/)
  assert.match(culture, /eyebrow="Origin Coordinates"/)
  assert.match(culture, /src=\{pfCulture\.flag\.video\}/)
  assert.match(culture, /poster=\{pfCulture\.flag\.poster\}/)
  assert.match(contact, /<FieldLabel index=\{pfContact\.index\} label="Project Channel"/)
  assert.match(contact, /id="contact"/)
  assert.match(contact, /select-text/)
  assert.match(footer, /\/blog/)
  assert.match(footer, /\/services\/custom-software-development-nepal/)
  assert.match(footer, /pfMeta\.socials\.map/)
})
