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

test('mobile homepage hero keeps both calls visible beside a smaller centered cultural plate', async () => {
  const css = await source('app/globals.css')
  assert.match(css, /\.gateway-hero-ctas[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)/)
  assert.match(css, /\.gateway-hero__heritage-environment[\s\S]*?height:\s*72%/)
  assert.match(css, /\.gateway-hero__heritage-environment[\s\S]*?translate:\s*-50%\s+0/)
  assert.match(css, /\.gateway-shell \.gateway-hero__heritage-flag[\s\S]*?top:\s*10rem\s*!important[\s\S]*?width:\s*124%\s*!important/)
  assert.match(css, /\.gateway-hero__heritage-figures[\s\S]*?right:\s*-14%[\s\S]*?height:\s*62%/)
  assert.match(css, /\.gateway-title[\s\S]*?font-size:\s*clamp\(2\.9rem,\s*16vw/)
})

test('mobile homepage fills the viewport, hides the toolbox marquee, and enlarges the Buddha', async () => {
  const css = await source('app/globals.css')
  const page = await source('app/page.tsx')
  assert.match(page, /gateway-toolbox-marquee/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-hero\s*\{[\s\S]*?min-height:\s*100svh/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-hero-ctas[\s\S]*?margin:\s*auto\s+auto\s+1\.25rem/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-profile[\s\S]*?height:\s*50%[\s\S]*?translate:\s*6rem\s+0/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-person[\s\S]*?translate:\s*2rem\s+0/)
  assert.match(css, /@media \(max-width: 360px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-person[\s\S]*?translate:\s*4rem\s+0[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-profile[\s\S]*?translate:\s*13rem\s+0/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-toolbox-marquee\s*\{[\s\S]*?display:\s*none/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-copy\s*\{[\s\S]*?z-index:\s*2/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-flag[\s\S]*?top:\s*10rem\s*!important[\s\S]*?width:\s*124%\s*!important/)
})

test('responsive hero headline exposes a dust gather and restrained air-wave animation', async () => {
  const css = await source('app/globals.css')
  const hero = await source('components/portfolio/Hero.tsx')
  assert.match(hero, /gateway-title__dust/)
  assert.match(hero, /gateway-title__dust-wave/)
  assert.match(css, /@keyframes gateway-title-dust-gather/)
  assert.match(css, /@keyframes gateway-title-air-wave/)
  assert.match(css, /--dust-x/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?gateway-title__dust/)
})

test('laptop and desktop hero headline keeps each name layer on one line', async () => {
  const css = await source('app/globals.css')
  assert.match(css, /@media \(min-width: 768px\)[\s\S]*?\.gateway-title__front\s*,\s*\.gateway-title__back\s*\{[^}]*white-space:\s*nowrap/)
})

test('hero title exposes a responsive ember flame treatment with reduced-motion fallback', async () => {
  const css = await source('app/globals.css')
  const hero = await source('components/portfolio/Hero.tsx')
  assert.match(hero, /gateway-title--ember/)
  assert.match(hero, /gateway-title__ember-aura/)
  assert.match(hero, /gateway-title__ember-field/)
  assert.match(css, /@keyframes gateway-title-ember-ignite/)
  assert.match(css, /@keyframes gateway-title-ember-drift/)
  assert.match(css, /gateway-title--ember\s*\{[^}]*overflow:\s*visible/)
  assert.match(css, /\.gateway-title--ember \.gateway-title__ember-aura\s*\{[^}]*z-index:\s*0/)
  assert.match(css, /\.gateway-title--ember \.gateway-title__ember-field\s*\{[^}]*z-index:\s*1/)
  assert.match(css, /\.gateway-title--ember \.gateway-title__ember-field\s*\{[^}]*opacity:\s*1/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?gateway-title__ember-field[\s\S]*?animation:\s*none/)
})

test('hero title rises from behind the mountain and settles in place', async () => {
  const hero = await source('components/portfolio/Hero.tsx')
  const css = await source('app/globals.css')

  assert.match(hero, /gateway-title--ember[\s\S]*?initial=\{reduceMotion \? false : \{ opacity: 0, y: '110%', filter: 'blur\(0\.5rem\)' \}\}/)
  assert.match(hero, /gateway-title--ember[\s\S]*?animate=\{\{ opacity: 1, y: 0, filter: 'blur\(0rem\)' \}\}/)
  assert.match(hero, /gateway-title--ember[\s\S]*?duration: reduceMotion \? 0 : 2\.1/)
  assert.match(hero, /gateway-title--ember[\s\S]*?delay: reduceMotion \? 0 : 3\.8/)
  assert.match(css, /\.gateway-title--ember\s*\{[\s\S]*?will-change:\s*transform, opacity, filter/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?\.gateway-title--ember[\s\S]*?will-change:\s*auto/)
})

test('hero places a restrained Buddha shadow behind Mukesh across breakpoints', async () => {
  const css = await source('app/globals.css')
  const hero = await source('components/portfolio/Hero.tsx')
  assert.match(hero, /gateway-hero__heritage-buddha-shadow/)
  assert.match(css, /\.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?z-index:\s*2/)
  assert.match(css, /\.gateway-hero__heritage-person\s*\{[\s\S]*?z-index:\s*3/)
    assert.match(css, /\.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?mix-blend-mode:\s*normal/)
    assert.match(css, /\.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?opacity:\s*1/)
    assert.match(css, /\.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?filter:[^}]*saturate[^}]*contrast\(/)
    assert.match(css, /clip-path:\s*inset\(0 0 32% 0\)/)
    assert.match(css, /\.gateway-hero__heritage-shadow-layer\s*\{[\s\S]*?z-index:\s*2/)
    assert.match(css, /\.gateway-hero__heritage-environment\s*\{[\s\S]*?z-index:\s*3/)
    assert.match(css, /\.gateway-hero__heritage-figures\s*\{[\s\S]*?z-index:\s*4/)
  assert.match(css, /\.gateway-title--ember\s*\{[\s\S]*?z-index:\s*4/)
  assert.match(css, /\.gateway-hero__heritage\s*\{[^}]*z-index:\s*5/)
  assert.doesNotMatch(hero, /gateway-hero__heritage-buddha-profile/)
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.gateway-hero__heritage-buddha-shadow[\s\S]*?opacity:/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-hero__heritage-buddha-shadow\s*\{[^}]*opacity:\s*1/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-hero__heritage-buddha-shadow\s*\{[^}]*right:\s*8%/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-hero__heritage-buddha-shadow[\s\S]*?transform:/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-hero__heritage-shadow-layer\s*\{[^}]*z-index:\s*2/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?\.gateway-hero__heritage-buddha-shadow[\s\S]*?animation:\s*none/)
})

test('laptop Buddha shadow keeps its head visible and readable', async () => {
  const css = await source('app/globals.css')
  const hero = await source('components/portfolio/Hero.tsx')

  assert.match(hero, /gateway-hero__heritage-shadow-layer[\s\S]*?animate=\{\{ opacity: 1, y: 0 \}\}/)
  assert.match(css, /\.gateway-hero__heritage\s*\{[\s\S]*?overflow:\s*visible/)
  assert.match(css, /\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?top:\s*clamp\(-2\.5rem/)
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?top:\s*clamp\(-1rem[\s\S]*?opacity:\s*0\.92/)
})

test('hero title repeats a typewriter reveal for both name layers', async () => {
  const css = await source('app/globals.css')
  const hero = await source('components/portfolio/Hero.tsx')

  assert.match(hero, /gateway-title__front gateway-title__typewriter/)
  assert.match(hero, /gateway-title__back gateway-title__typewriter/)
  assert.match(hero, /gateway-title__typewriter-letter/)
  assert.match(hero, /--type-delay/)
  assert.match(css, /@keyframes gateway-title-letter-typewriter/)
  assert.match(css, /\.gateway-title__typewriter-letter\s*\{[\s\S]*?animation:[^;]*gateway-title-letter-typewriter/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?gateway-title__typewriter[\s\S]*?animation:\s*none/)
})

test('hero keeps the flag above mountains and Buddha behind mountains on mobile', async () => {
  const css = await source('app/globals.css')

  assert.match(css, /\.gateway-shell \.gateway-hero__heritage-flag\s*\{[\s\S]*?z-index:\s*2\s*!important/)
  assert.match(css, /\.gateway-hero__heritage-environment\s*\{[\s\S]*?z-index:\s*3/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-shadow-layer\s*\{[^}]*z-index:\s*2/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[^}]*right:\s*8%/)
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[^}]*top:/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[^}]*top:/)
})

test('hero anchors the flag ridge cut, high Buddha head, and mirrored portrait across responsive views', async () => {
  const css = await source('app/globals.css')

  assert.match(css, /\.gateway-shell \.gateway-hero__heritage-flag\s*\{[\s\S]*?clip-path:\s*inset\(0 0 [^)]*\)/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-flag\s*\{[\s\S]*?top:\s*7rem\s*!important/)
  assert.match(css, /\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?top:\s*clamp\(-2\.5rem/)
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?top:/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?top:/)
  assert.match(css, /\.gateway-shell \.gateway-hero__heritage-person\s*\{[\s\S]*?transform:\s*scaleX\(-1\)/)
  assert.match(css, /\.gateway-shell \.gateway-stage\s*\{[^}]*z-index:\s*6/)
})

test('tablet hero keeps the flag and Buddha visibly tucked into the ridge', async () => {
  const css = await source('app/globals.css')

  assert.match(css, /@media \(min-width: 768px\) and \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-flag\s*\{[\s\S]*?top:\s*clamp\(0rem, 14vh, 9rem\)\s*!important[\s\S]*?bottom:\s*auto\s*!important/)
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?width:\s*clamp\(19rem, 54vw, 28rem\)/)
})

test('tablet hero puts title behind Buddha, shifts portrait left, and raises the flag', async () => {
  const css = await source('app/globals.css')

  assert.match(css, /@media \(min-width: 768px\) and \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-stage\s*\{[^}]*z-index:\s*auto/)
  assert.match(css, /@media \(min-width: 768px\) and \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-title--ember\s*\{[^}]*z-index:\s*1/)
  assert.match(css, /@media \(min-width: 768px\) and \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-person\s*\{[\s\S]*?translateX\(-6vw\)\s+scaleX\(-1\)/)
  assert.match(css, /@media \(min-width: 768px\) and \(max-width: 1100px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-flag\s*\{[\s\S]*?top:\s*clamp\(0rem, 8vh, 5rem\)\s*!important/)
})

test('large laptop hero separates title behind Buddha and rebalances cultural anchors', async () => {
  const css = await source('app/globals.css')

  assert.match(css, /@media \(min-width: 1101px\) and \(max-height: 1000px\)[\s\S]*?\.gateway-shell \.gateway-stage\s*\{[^}]*z-index:\s*auto/)
  assert.match(css, /@media \(min-width: 1101px\) and \(max-height: 1000px\)[\s\S]*?\.gateway-shell \.gateway-title--ember\s*\{[^}]*z-index:\s*1/)
  assert.match(css, /@media \(min-width: 1101px\) and \(max-height: 1000px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-person\s*\{[\s\S]*?translateX\(-5vw\)\s+scaleX\(-1\)/)
  assert.match(css, /@media \(min-width: 1101px\) and \(max-height: 1000px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?top:\s*clamp\(0\.5rem, 2vh, 1\.25rem\)[\s\S]*?right:\s*clamp\(11rem, 20vw, 19rem\)/)
  assert.match(css, /@media \(min-width: 1101px\) and \(max-height: 1000px\)[\s\S]*?\.gateway-shell \.gateway-hero__heritage-flag\s*\{[\s\S]*?top:\s*clamp\(2rem, 6vh, 4rem\)\s*!important/)
})

test('browser branding exposes a dedicated square icon', async () => {
  const layout = await source('app/layout.tsx')
  const icon = await source('app/icon.svg')

  assert.match(layout, /href="\/icon\.svg"/)
  assert.match(icon, /viewBox="0 0 64 64"/)
  assert.match(icon, /<title>Mukesh Khadka<\/title>/)
  assert.match(layout, /suppressHydrationWarning/)
})

test('narrow phone atmosphere cannot expand the document width', async () => {
  const css = await source('app/globals.css')

  assert.match(css, /\.portfolio-page \.portfolio-atmosphere\s*\{[\s\S]*?contain:\s*paint/)
  assert.match(css, /\.portfolio-page\s*\{[^}]*overflow-x:\s*clip/)
  assert.match(css, /\.gateway-hero__heritage\s*\{[\s\S]*?contain:\s*layout/)
  assert.match(css, /\.gateway-shell \.testimonials-feed__list\s*\{[^}]*?min-width:\s*0/)
  assert.match(css, /\.gateway-shell \.testimonial-card\s*\{[^}]*?width:\s*100%[^}]*?min-width:\s*0/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-shell \.testimonial-card__header\s*\{[\s\S]*?grid-template-areas:/)
})

test('profile availability identifies AashaTech and links to its site', async () => {
  const portfolio = await source('lib/portfolio-content.ts')
  const adminStarter = await source('app/admin/site-content/page.tsx')
  assert.match(portfolio, /availability:\s*'CEO at AashaTech'/)
  assert.match(portfolio, /availabilityHref:\s*'https:\/\/aashatech\.com\/'/)
  assert.match(adminStarter, /availability:\s*'CEO at AashaTech'/)
  assert.match(adminStarter, /availabilityHref:\s*'https:\/\/aashatech\.com\/'/)
})
