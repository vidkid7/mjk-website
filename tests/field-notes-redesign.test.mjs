import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('the portfolio navigation and hero expose the opening field signal', async () => {
  const [navbar, signalRail, hero, marquee, cursorGlow, magnetic] = await Promise.all([
    read('components/portfolio/Navbar.tsx'),
    read('components/portfolio/SignalRail.tsx'),
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
  assert.match(hero, /SignalPill/)
  assert.match(hero, /buddha-profile-left\.png/)
  assert.doesNotMatch(hero, /gateway-manifesto|gateway-description|SplitWords/)
  assert.doesNotMatch(hero, /useScroll|useTransform/)
  assert.match(navbar, /<noscript>/)
  assert.match(signalRail, /md:hidden/)
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

  assert.match(projects, /projects\.map/)
  assert.match(projects, /focus-visible/)
  assert.match(content, /outcome:/)
})

test('field-notes styling is scoped and reduced motion is explicit', async () => {
  const [css, atmosphere, scrollProgress] = await Promise.all([
    read('app/globals.css'),
    read('components/fx/Atmosphere.tsx'),
    read('components/fx/ScrollProgress.tsx'),
  ])

  assert.match(css, /\.portfolio-page\s*\{[\s\S]*--field-ink:\s*#071a35/)
  assert.match(css, /--field-paper:\s*#faf9f7/)
  assert.match(css, /--field-gold:\s*#f2bd4b/)
  assert.match(css, /--field-crimson:\s*#dc2626/)
  assert.match(css, /\.portfolio-page\s+\.field-(?:grid|scanlines|evidence)/)
  assert.match(css, /\.portfolio-page\s+:is\(a, button, input, textarea, select\):focus-visible/)
  assert.match(css, /\.portfolio-page \*,[\s\S]*animation-duration:\s*0\.01ms !important/)
  assert.match(css, /\.portfolio-page\s+\.portfolio-atmosphere[\s\S]*pointer-events:\s*none/)
  assert.match(css, /\.portfolio-page\s+\.portfolio-scroll-progress[\s\S]*z-index:\s*40/)
  assert.match(atmosphere, /portfolio-atmosphere/)
  assert.match(atmosphere, /aria-hidden="true"/)
  assert.match(scrollProgress, /portfolio-scroll-progress/)
  assert.match(scrollProgress, /aria-hidden="true"/)
})

test('supporting portfolio sections retain their content in a field-notes frame', async () => {
  const [about, skills, experience, testimonials, contact, footer] = await Promise.all([
    read('components/portfolio/About.tsx'),
    read('components/portfolio/Skills.tsx'),
    read('components/portfolio/Experience.tsx'),
    read('components/portfolio/Testimonials.tsx'),
    read('components/portfolio/Contact.tsx'),
    read('components/portfolio/Footer.tsx'),
  ])

  assert.match(about, /about-dossier__meta/)
  assert.match(skills, /case-registry/)
  assert.match(experience, /<ol[\s\S]*experience\.map[\s\S]*<\/ol>/)
  assert.match(experience, /experience-dossier__entry/)
  assert.match(experience, /experience-entry__title/)
  assert.match(testimonials, /testimonials-feed__list/)
  assert.match(testimonials, /reportCode\(i\)/)
  assert.match(contact, /id="contact"/)
  assert.match(contact, /contact-panel/)
  assert.match(contact, /contact-channel/)
  assert.match(footer, /serviceLinks/)
  assert.match(footer, /site\.socials\.map/)
})
