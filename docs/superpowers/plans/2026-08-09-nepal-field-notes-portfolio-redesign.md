# Nepal Field Notes Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing public Next.js portfolio into an original Nepal Field Notes experience with a technical-investigation visual language, evidence-style project archive, purposeful motion, and preserved public/admin behavior.

**Architecture:** Keep `app/page.tsx` as the composition root and keep portfolio data in `lib/portfolio-content.ts`. Refine the existing `components/portfolio` and `components/fx` units, add only small presentation primitives where they reduce duplication, and scope new visual rules under `.portfolio-page` so admin and non-portfolio routes are not affected.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Node.js built-in test runner.

## Global Constraints

- Preserve the existing Next.js application and current route families.
- Preserve `/admin`, admin authentication, content APIs, and existing data flows.
- Preserve current portfolio content, SEO intent, cultural identity, and Nepal-focused positioning.
- Avoid a first-pass Three.js/WebGL scene and avoid new runtime dependencies.
- Keep the public homepage usable without JavaScript-dependent navigation.
- Keep images local and use existing optimized assets where possible.
- All interactive project items need keyboard-equivalent states.
- Support `prefers-reduced-motion` by disabling continuous marquee, cursor effects, and large transforms.
- Verify no public route or admin route is accidentally affected by portfolio-scoped styles.

---

## File Map

### Presentation units to modify

- `components/portfolio/Navbar.tsx` — public navigation, active section status, mobile menu.
- `components/portfolio/Hero.tsx` — first-screen identity, status markers, portrait, stats.
- `components/portfolio/Projects.tsx` — field-file archive and project evidence presentation.
- `components/portfolio/About.tsx` — operator profile presentation.
- `components/portfolio/Skills.tsx` — system inventory presentation.
- `components/portfolio/Experience.tsx` — operational history timeline.
- `components/portfolio/Testimonials.tsx` — verified reports presentation.
- `components/portfolio/Culture.tsx` — origin coordinates / Nepal identity presentation.
- `components/portfolio/Contact.tsx` — project-channel call to action.
- `components/portfolio/Footer.tsx` — compact portfolio footer and public service links if present.
- `components/portfolio/Marquee.tsx` — toolbox strip behavior and reduced-motion fallback.
- `components/portfolio/SectionHeader.tsx` — shared numbered section label and heading treatment.
- `components/fx/CursorGlow.tsx` — keep cursor enhancement scoped and reduced-motion safe.
- `components/fx/Magnetic.tsx` — keep magnetic interaction keyboard-safe and motion-aware.
- `components/fx/ScrollProgress.tsx` — align progress indicator with the field-notes visual system.
- `components/fx/Atmosphere.tsx` — reduce decorative background noise and scope it to the portfolio page.

### Shared style and composition files to modify

- `app/page.tsx` — preserve section order and add any new presentation-only wrapper classes.
- `app/globals.css` — add scoped field-notes tokens, labels, grid/scanline details, focus states, and reduced-motion overrides.
- `tailwind.config.ts` — add only reusable portfolio-scoped tokens or utilities that cannot be expressed cleanly in CSS.
- `lib/portfolio-content.ts` — add presentation metadata only when a component cannot derive it from existing content; do not rewrite the supplied copy.

### Tests to add or modify

- Create `tests/field-notes-redesign.test.mjs` — structural contract tests for the new public presentation.
- Modify `tests/search-safety.test.mjs` only if existing assertions need to reflect preserved hero or public-route behavior.
- Run the existing `tests/liquid-design-contract.test.mjs` and `tests/platform-improvements.test.mjs` unchanged unless an assertion is proven stale.

---

## Task 1: Add the failing public redesign contract

**Files:**

- Create: `tests/field-notes-redesign.test.mjs`
- Test: `tests/field-notes-redesign.test.mjs`

**Interfaces:**

- Consumes: source text from `app/page.tsx`, `components/portfolio/*.tsx`, `app/globals.css`, and `lib/portfolio-content.ts`.
- Produces: executable contracts for the field-notes presentation that later tasks must satisfy.

- [ ] **Step 1: Write the failing tests**

Create a Node test file using the existing test style:

```js
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
```

- [ ] **Step 2: Run the new test to verify it fails**

Run:

```text
npm test -- --test-name-pattern="field-notes"
```

Expected: FAIL because the current presentation does not contain the new status labels, section language, and scoped field-notes styling contract.

- [ ] **Step 3: Commit the test contract**

```text
git add tests/field-notes-redesign.test.mjs
git commit -m "test: define field notes portfolio contract"
```

## Task 2: Add reusable field-notes presentation primitives

**Files:**

- Create: `components/portfolio/FieldLabel.tsx`
- Create: `components/portfolio/SignalPill.tsx`
- Modify: `components/portfolio/SectionHeader.tsx`
- Modify: `app/globals.css`
- Test: `tests/field-notes-redesign.test.mjs`

**Interfaces:**

- Consumes: plain string labels and existing section header props.
- Produces: `FieldLabel({ index, label, detail? })` and `SignalPill({ label, tone? })` presentation components used by hero, sections, and project files.

- [ ] **Step 1: Implement `FieldLabel`**

Create a server-safe presentational component:

```tsx
type FieldLabelProps = {
  index?: string
  label: string
  detail?: string
}

export default function FieldLabel({ index, label, detail }: FieldLabelProps) {
  return (
    <div className="field-label" aria-label={detail ? `${label}: ${detail}` : label}>
      {index && <span className="field-label__index">{index}</span>}
      <span className="field-label__name">{label}</span>
      {detail && <span className="field-label__detail">{detail}</span>}
    </div>
  )
}
```

- [ ] **Step 2: Implement `SignalPill`**

Create a small status component with a constrained tone union:

```tsx
type SignalPillProps = {
  label: string
  tone?: 'live' | 'warm' | 'quiet'
}

export default function SignalPill({ label, tone = 'live' }: SignalPillProps) {
  return (
    <span className={`signal-pill signal-pill--${tone}`}>
      <span className="signal-pill__dot" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}
```

- [ ] **Step 3: Update `SectionHeader` to compose `FieldLabel`**

Keep its existing public props and replace duplicated index/eyebrow markup with `FieldLabel`. Do not change heading level or supplied heading text.

- [ ] **Step 4: Add scoped CSS and focus states**

Add rules under `.portfolio-page` for `.field-label`, `.signal-pill`, and a shared keyboard focus style. The rules must not target bare `button`, `a`, or global headings.

- [ ] **Step 5: Run the contract test**

Run:

```text
npm test -- --test-name-pattern="field-notes"
```

Expected: the scoped-style portion passes; status/section assertions remain failing until Tasks 3–5 add the labels.

- [ ] **Step 6: Commit the primitives**

```text
git add components/portfolio/FieldLabel.tsx components/portfolio/SignalPill.tsx components/portfolio/SectionHeader.tsx app/globals.css
git commit -m "feat: add field notes presentation primitives"
```

## Task 3: Reframe navigation and hero as the opening signal

**Files:**

- Modify: `components/portfolio/Navbar.tsx`
- Modify: `components/portfolio/Hero.tsx`
- Modify: `components/portfolio/Marquee.tsx`
- Modify: `components/fx/CursorGlow.tsx`
- Modify: `components/fx/Magnetic.tsx`
- Test: `tests/field-notes-redesign.test.mjs`

**Interfaces:**

- Consumes: `pfMeta`, `pfHero`, `pfSkills.toolbox`, `SignalPill`, `FieldLabel`, and existing Framer Motion primitives.
- Produces: an accessible navigation and first screen containing `SYSTEM ONLINE`, `KATHMANDU / NEPAL`, and the existing hero headline/CTAs.

- [ ] **Step 1: Update the desktop navigation labels**

Keep the existing anchor targets and add field-notes language to visible metadata. Use labels that remain understandable: `About`, `Field Files`, `Skills`, `History`, `Contact`. Keep the `#work`, `#skills`, `#experience`, and `#contact` targets unchanged.

- [ ] **Step 2: Add hero status markers**

Use `SignalPill` for availability and add non-decorative metadata for location and system state. Keep `pfHero.headline`, `pfHero.subheadline`, the existing portrait asset, and both CTA hrefs unchanged.

- [ ] **Step 3: Make the toolbox strip motion-aware**

Keep the existing toolbox values. Add a visible static fallback when reduced motion is requested and ensure the animated track is not the only readable copy.

- [ ] **Step 4: Guard cursor and magnetic effects**

Use `useReducedMotion()` or the existing motion preference check so pointer-following and transform effects are disabled when reduced motion is requested. Keyboard focus must not depend on pointer movement.

- [ ] **Step 5: Verify the hero contract and local response**

Run:

```text
npm test -- --test-name-pattern="field-notes|hero"
Invoke-WebRequest -UseBasicParsing http://localhost:3000 -TimeoutSec 30 | Select-Object StatusCode
```

Expected: contract tests for hero language pass and the homepage returns `StatusCode : 200`.

- [ ] **Step 6: Commit the opening signal**

```text
git add components/portfolio/Navbar.tsx components/portfolio/Hero.tsx components/portfolio/Marquee.tsx components/fx/CursorGlow.tsx components/fx/Magnetic.tsx
git commit -m "feat: reframe portfolio opening as field notes signal"
```

## Task 4: Convert projects into the evidence archive

**Files:**

- Modify: `components/portfolio/Projects.tsx`
- Modify: `components/fx/TiltCard.tsx`
- Modify: `lib/portfolio-content.ts` only if a missing presentation field is required by existing project data.
- Test: `tests/field-notes-redesign.test.mjs`

**Interfaces:**

- Consumes: `pfProjects[]` with `title`, `category`, `year`, `description`, `outcome`, and `tags`.
- Produces: semantic project articles with visible category/year/title/outcome metadata and a keyboard-visible `VIEW FILE` or `VIEW PROJECT` action treatment.

- [ ] **Step 1: Define the project article structure**

Each project must render as an `article` containing:

```tsx
<article aria-labelledby={`project-${i}-title`}>
  <p>{project.category} · {project.year}</p>
  <h3 id={`project-${i}-title`}>{project.title}</h3>
  <p>{project.description}</p>
  <p>{project.outcome}</p>
  <ul aria-label="Technologies and capabilities">...</ul>
  <a href="#contact" aria-label={`Discuss ${project.title}`}>VIEW FILE</a>
</article>
```

Use the existing project content; do not invent project URLs or client claims. If there is no detail route, the action should point to `#contact` and communicate that it starts a conversation.

- [ ] **Step 2: Implement featured-file and archive layouts**

Keep the first project featured on desktop and stack all files on mobile. Use CSS grid/flex rather than absolute-positioned content so every title, outcome, and action remains in document flow.

- [ ] **Step 3: Add evidence metadata and focus-visible treatment**

Use `FieldLabel` or an equivalent scoped label row. Add `focus-visible` styles to the project action and card wrapper. Hover may reveal accent details, but the full text and action must remain visible to keyboard and touch users.

- [ ] **Step 4: Limit tilt behavior**

Keep `TiltCard` as an optional enhancement. It must be disabled for reduced motion and must not move the hit target away from the visible card.

- [ ] **Step 5: Run tests and check mobile overflow**

Run:

```text
npm test -- --test-name-pattern="field-notes"
```

Then inspect `http://localhost:3000/#work` at a narrow viewport and verify there is no horizontal scrollbar, clipped title, or inaccessible action.

- [ ] **Step 6: Commit the evidence archive**

```text
git add components/portfolio/Projects.tsx components/fx/TiltCard.tsx lib/portfolio-content.ts
git commit -m "feat: turn portfolio projects into evidence files"
```

## Task 5: Reframe supporting sections without rewriting the content

**Files:**

- Modify: `components/portfolio/About.tsx`
- Modify: `components/portfolio/Skills.tsx`
- Modify: `components/portfolio/Experience.tsx`
- Modify: `components/portfolio/Testimonials.tsx`
- Modify: `components/portfolio/Culture.tsx`
- Modify: `components/portfolio/Contact.tsx`
- Modify: `components/portfolio/Footer.tsx`
- Test: `tests/field-notes-redesign.test.mjs`

**Interfaces:**

- Consumes: existing `pfAbout`, `pfSkills`, `pfExperience`, `pfTestimonials`, `pfCulture`, `pfContact`, and current service/social link data.
- Produces: section headings and supporting metadata using the approved labels `Operator Profile`, `System Inventory`, `Operational History`, `Verified Reports`, `Origin Coordinates`, and `Project Channel`.

- [ ] **Step 1: Add the approved section labels**

Use `SectionHeader`/`FieldLabel` for the section names while preserving existing heading semantics and copy. Do not add second page-level headings.

- [ ] **Step 2: Add scannable metadata rails**

Present location, years, organizations served, categories, and dates as compact metadata rows. Keep descriptive paragraphs as normal readable text, not all-caps terminal copy.

- [ ] **Step 3: Convert experience to a vertical history timeline**

Keep every existing period, title, organization, and point. Use an ordered list or equivalent semantic structure with a visible connecting line and checkpoint marker.

- [ ] **Step 4: Present testimonials as verified reports**

Keep each quote, name, and role. Add a small report label or index without inventing logos, companies, or verification claims.

- [ ] **Step 5: Preserve and warm up the cultural section**

Keep the Nepal flag video/poster, cultural images, Nepalese wording, and captions. Use field-note coordinates as supporting labels only; do not let the technical treatment overpower this section.

- [ ] **Step 6: Make the contact channel explicit**

Keep email, phone, location, and social links copyable and visible. Use the existing `#contact` anchor and avoid requiring a modal or client-only interaction to reach contact details.

- [ ] **Step 7: Preserve footer crawl paths**

Retain all existing public service, blog, social, and legal/navigation links. If service links exist in the current footer, do not remove them while changing the visual treatment.

- [ ] **Step 8: Run the section contract and route tests**

Run:

```text
npm test -- --test-name-pattern="field-notes|search|service|public"
```

Expected: the new labels pass and existing search-safety/public-route assertions remain green.

- [ ] **Step 9: Commit the supporting sections**

```text
git add components/portfolio/About.tsx components/portfolio/Skills.tsx components/portfolio/Experience.tsx components/portfolio/Testimonials.tsx components/portfolio/Culture.tsx components/portfolio/Contact.tsx components/portfolio/Footer.tsx
git commit -m "feat: align portfolio sections with field notes narrative"
```

## Task 6: Implement the scoped visual system and motion rules

**Files:**

- Modify: `app/globals.css`
- Modify: `tailwind.config.ts` only for tokens reused in at least three portfolio components.
- Modify: `components/fx/Atmosphere.tsx`
- Modify: `components/fx/ScrollProgress.tsx`
- Test: `tests/field-notes-redesign.test.mjs`

**Interfaces:**

- Consumes: `.portfolio-page`, field-notes primitives, and existing animation classes.
- Produces: consistent navy/paper/gold/crimson visual tokens, evidence/grid/scanline details, visible focus states, and reduced-motion overrides scoped to the portfolio experience.

- [ ] **Step 1: Add scoped CSS variables**

Under `.portfolio-page`, define the field-notes visual variables using the existing palette:

```css
.portfolio-page {
  --field-ink: #071a35;
  --field-paper: #faf9f7;
  --field-gold: #f2bd4b;
  --field-crimson: #dc2626;
  --field-line: rgba(7, 26, 53, 0.14);
  --field-muted: #64748b;
}
```

Use these variables for new field-notes surfaces instead of changing global body or admin variables.

- [ ] **Step 2: Add grid, scanline, label, evidence, and focus styles**

Implement the classes referenced by `FieldLabel`, `SignalPill`, and the redesigned project cards. Keep pseudo-elements pointer-events disabled and keep decorative opacity low enough that body copy remains dominant.

- [ ] **Step 3: Add explicit reduced-motion rules**

Use a scoped media query:

```css
@media (prefers-reduced-motion: reduce) {
  .portfolio-page *,
  .portfolio-page *::before,
  .portfolio-page *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Where a component relies on JS motion, also use `useReducedMotion()` so pointer-following and transform state are not updated continuously.

- [ ] **Step 4: Scope atmosphere and progress effects**

Keep `Atmosphere` and `ScrollProgress` decorative and non-interactive. They must not create a new fixed layer above navigation or block clicks.

- [ ] **Step 5: Run contract and type/build checks**

Run:

```text
npm test
npm run build
```

Expected: all tests pass and Next.js production build completes without type or route errors.

- [ ] **Step 6: Commit the visual system**

```text
git add app/globals.css tailwind.config.ts components/fx/Atmosphere.tsx components/fx/ScrollProgress.tsx
git commit -m "feat: add scoped field notes visual system"
```

## Task 7: Verify composition, routes, accessibility, and responsive behavior

**Files:**

- Modify: `app/page.tsx` only if section wrappers or IDs need correction.
- Modify: `tests/field-notes-redesign.test.mjs` if a verified contract is missing.
- Test: `app/page.tsx`, public route responses, and built output.

**Interfaces:**

- Consumes: all redesigned portfolio components and the existing Next.js route tree.
- Produces: verified public homepage and unchanged public/admin route availability.

- [ ] **Step 1: Confirm section order and IDs**

Verify `app/page.tsx` keeps this order and anchor set:

```tsx
<PortfolioNavbar />
<PortfolioHero />
<Marquee items={pfSkills.toolbox} />
<About />
<Projects />
<Skills />
<Experience />
<Testimonials />
<Culture />
<Contact />
<Footer />
```

Verify the rendered sections retain `#about`, `#work`, `#skills`, `#experience`, and `#contact`.

- [ ] **Step 2: Run the complete test suite**

Run:

```text
npm test
```

Expected: all existing and new tests pass.

- [ ] **Step 3: Verify the homepage and public routes**

With the local server running, check:

```text
$routes = @('/', '/services', '/blog', '/sitemap.xml', '/robots.txt', '/feed.xml')
foreach ($route in $routes) {
  $response = Invoke-WebRequest -UseBasicParsing ("http://localhost:3000" + $route) -TimeoutSec 30
  Write-Output ("{0} {1}" -f $route, $response.StatusCode)
}
```

Expected: each route returns the status intended by the existing application, normally `200` for the public pages and machine-readable endpoints.

- [ ] **Step 4: Verify mobile and desktop behavior**

Inspect the running homepage at desktop width and a narrow mobile width. Confirm:

- no horizontal overflow;
- hero headline, portrait, and CTAs remain visible;
- project outcomes and actions are visible without hover;
- mobile navigation opens, closes, and restores focus predictably;
- focus rings are visible;
- cultural media does not push contact content off-screen.

- [ ] **Step 5: Verify reduced motion**

Use a browser or system setting with reduced motion enabled. Confirm there is no continuous marquee, cursor-following glow, large tilt transform, or infinite decorative pulse that remains active.

- [ ] **Step 6: Review the final diff against the approved spec**

Run:

```text
git diff origin/main...HEAD -- app/page.tsx app/globals.css components/portfolio components/fx lib/portfolio-content.ts tests/field-notes-redesign.test.mjs
```

Check that no admin/API/SEO files were changed by the redesign unless a test proves the change is necessary.

- [ ] **Step 7: Commit verification-only adjustments**

If verification finds a real defect, fix it and commit the focused change:

```text
git add app/page.tsx components/portfolio components/fx app/globals.css tests/field-notes-redesign.test.mjs
git commit -m "fix: verify field notes portfolio behavior"
```

## Self-Review Checklist

- Spec coverage: hero/status, project evidence archive, supporting section labels, visual tokens, motion, responsive layouts, preservation, accessibility, route checks, and optional immersive-mode boundary are all represented above.
- Completeness scan: every step contains concrete instructions and an explicit validation action.
- Type consistency: `FieldLabel({ index?: string; label: string; detail?: string })` and `SignalPill({ label: string; tone?: 'live' | 'warm' | 'quiet' })` are the only new shared interfaces, and all consuming tasks reference those names.
- Scope check: this is one public portfolio presentation subsystem; admin, API, SEO, and optional 3D work remain preservation or future-phase boundaries.
