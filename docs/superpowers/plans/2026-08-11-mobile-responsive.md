# Mobile-First Responsive Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the current Supabase-backed portfolio and admin panel usable from 320px phones through desktop while preserving the existing animated visual system and content source.

**Architecture:** Keep one responsive React tree and use CSS media queries, fluid sizing, safe-area variables, and a small number of touch-specific behavior changes. Public content continues to come from `loadPublicContent()` and existing admin APIs; this pass changes layout and interaction behavior only. Validation combines static responsive-contract tests, TypeScript/build checks, and browser viewport checks across all public routes.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind utility classes, `app/globals.css`, Framer Motion, existing Supabase CMS loader/API, Node test runner.

## Global Constraints

- Preserve the existing visual system: animated atmosphere, loading sequence, decorative heritage artwork, theme/color controls, editorial typography, card visuals, and interactive focus states.
- Do not change the content source, remove existing effects, touch the `nita-clinics` database, or revert to the older homepage.
- Use a fluid layout for 320–374px, 375–479px, 480–767px, 768–1023px, and 1024px+ widths.
- Keep touch controls at least 44px and add `env(safe-area-inset-*)` handling to fixed navigation, menus, and bottom-edge controls.
- Preserve existing `prefers-reduced-motion` behavior; do not reduce effects for ordinary mobile users.
- Do not introduce hardcoded public content; responsive changes must consume the current CMS-backed props.
- Each task must leave the project type-safe and independently testable.

---

### Task 1: Add responsive regression contracts

**Files:**
- Create: `tests/responsive-contract.test.mjs`
- Modify: none

**Interfaces:**
- Produces source-level contracts for the responsive shell, safe-area handling, touch targets, route coverage, and mobile menu behavior.

- [ ] **Step 1: Write the failing tests**

Add tests that read `app/globals.css`, `components/portfolio/SignalRail.tsx`, and the public route files. Assert that the implementation contains:

```js
assert.match(css, /env\(safe-area-inset-top\)/)
assert.match(css, /@media \(max-width: 767px\)/)
assert.match(css, /min-height:\s*44px|height:\s*44px/)
assert.match(signalRail, /document\.body\.style\.overflow/)
for (const route of ['app/page.tsx', 'app/articles/page.tsx', 'app/contact/page.tsx', 'app/services/page.tsx']) {
  assert.match(await source(route), /gateway-shell|public-route-shell|portfolio-page/)
}
```

Add a test that checks the existing public shell has `overflow-x: clip` or an equivalent explicit overflow rule and that the admin layout includes a mobile overlay/drawer.

- [ ] **Step 2: Run the new test and verify RED**

Run:

```powershell
node --test tests/responsive-contract.test.mjs
```

Expected: at least the safe-area, body-scroll-lock, and touch-target assertions fail before implementation.

- [ ] **Step 3: Commit the regression contract**

```powershell
git add tests/responsive-contract.test.mjs
git commit -m "test: define responsive portfolio contracts"
```

### Task 2: Establish responsive shell tokens and global constraints

**Files:**
- Modify: `app/globals.css` in the public gateway and responsive override sections
- Test: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Produces shared CSS variables and rules consumed by every public and admin route.

- [ ] **Step 1: Add the responsive token layer**

Add a focused block near the gateway responsive rules:

```css
:root {
  --viewport-safe-top: env(safe-area-inset-top, 0px);
  --viewport-safe-right: env(safe-area-inset-right, 0px);
  --viewport-safe-bottom: env(safe-area-inset-bottom, 0px);
  --viewport-safe-left: env(safe-area-inset-left, 0px);
  --portfolio-gutter: clamp(1rem, 4vw, 4rem);
  --portfolio-section-space: clamp(4rem, 9vw, 8rem);
}

html, body { max-width: 100%; overflow-x: clip; }
.portfolio-container, .public-route-main { width: min(100% - (2 * var(--portfolio-gutter)), 90rem); }
```

Use `box-sizing: border-box` for the responsive shell and add `overflow-wrap: anywhere` only to long contact/email values, not globally.

- [ ] **Step 2: Add phone, tablet, and safe-area rules**

At `max-width: 767px`, make section padding use `var(--portfolio-section-space)`, prevent fixed decorative layers from expanding the layout, and add safe-area padding to fixed navigation/menu surfaces. At `768px–1023px`, use two-column limits for metadata and editorial cards without forcing desktop widths.

- [ ] **Step 3: Run the contract and type checks**

```powershell
node --test tests/responsive-contract.test.mjs
npx tsc --noEmit --pretty false
```

Expected: the shell contract passes and TypeScript remains clean.

- [ ] **Step 4: Commit the shell layer**

```powershell
git add app/globals.css tests/responsive-contract.test.mjs
git commit -m "feat: add responsive shell tokens"
```

### Task 3: Make navigation and theme controls touch-safe

**Files:**
- Modify: `components/portfolio/SignalRail.tsx`
- Modify: `components/portfolio/Navbar.tsx`
- Modify: `app/globals.css`
- Test: `tests/responsive-contract.test.mjs`

**Interfaces:**
- `SignalRail` keeps its existing `navigation?: PublicUiCopy['navigation']` prop and existing desktop behavior.
- Mobile menu open/close state must lock document scrolling while open and restore the prior overflow value on close/unmount.

- [ ] **Step 1: Add a failing menu behavior assertion**

Assert that `SignalRail.tsx` contains an effect or handler that saves the prior `document.body.style.overflow`, sets it to `hidden` while the menu is open, and restores it during cleanup.

- [ ] **Step 2: Implement menu scroll locking**

Use a `useEffect` keyed by `open`:

```ts
useEffect(() => {
  if (!open) return
  const previous = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  return () => { document.body.style.overflow = previous }
}, [open])
```

Keep the full CMS-driven navigation list. Do not remove theme or color controls; make the mobile buttons at least 44px and keep the menu panel internally scrollable.

- [ ] **Step 3: Add responsive rail/menu CSS**

Make the fixed rail account for `var(--viewport-safe-top)`, make the panel height `min(100dvh - rail height, 48rem)`, add `overflow-y: auto`, and add bottom safe-area padding. Ensure menu links wrap and have a minimum 44px block size.

- [ ] **Step 4: Verify and commit**

```powershell
node --test tests/responsive-contract.test.mjs
npx tsc --noEmit --pretty false
git add components/portfolio/SignalRail.tsx components/portfolio/Navbar.tsx app/globals.css tests/responsive-contract.test.mjs
git commit -m "feat: make mobile navigation touch-safe"
```

### Task 4: Reflow the homepage hero and interactive sections

**Files:**
- Modify: `components/portfolio/Hero.tsx`
- Modify: `components/portfolio/About.tsx`
- Modify: `components/portfolio/Projects.tsx`
- Modify: `components/portfolio/Skills.tsx`
- Modify: `components/portfolio/Experience.tsx`
- Modify: `components/portfolio/Testimonials.tsx`
- Modify: `components/portfolio/Contact.tsx`
- Modify: `components/portfolio/Footer.tsx`
- Modify: `app/globals.css`
- Test: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Preserve all existing component props and CMS-backed values.
- Keep all artwork and animation nodes rendered; only change layout sizing, order, and interaction hit areas.

- [ ] **Step 1: Add responsive selectors for the hero/artwork**

At phone widths, stack hero copy before artwork, set headings with `clamp()`, make CTA groups one column or a wrapped row, use `minmax(0, 1fr)` for flexible children, and constrain decorative artwork with `max-width: 100%` and `pointer-events: none` where it is purely visual. Convert the metric row to two columns with wrapped labels.

- [ ] **Step 2: Reflow content sections**

Use single-column card grids below 640px, two columns only when the container can support them, `min-width: 0` on card content, and `overflow-wrap: anywhere` for long labels. Make project focus controls 44px square and keep the focus copy readable without horizontal scrolling.

- [ ] **Step 3: Reflow contact/footer actions**

Make contact actions and channel cards full-width on phones, wrap email/phone strings, and stack footer columns. Preserve all social links, service links, and CMS-driven copy.

- [ ] **Step 4: Run tests and build**

```powershell
node --test tests/*.test.mjs
npx tsc --noEmit --pretty false
npm run build
```

Expected: all tests pass, TypeScript exits 0, and the production build exits 0 with only the repository’s existing warnings.

- [ ] **Step 5: Commit homepage responsiveness**

```powershell
git add components/portfolio app/globals.css tests/responsive-contract.test.mjs
git commit -m "feat: reflow portfolio homepage for mobile"
```

### Task 5: Reflow public subroutes and editorial layouts

**Files:**
- Modify: `app/articles/page.tsx`
- Modify: `app/articles/[slug]/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/not-found.tsx`
- Modify: `components/portfolio/PublicImprint.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Keep all pages using `loadPublicContent()` and existing CMS values.
- Keep canonical URLs, JSON-LD, article/service links, and route-level metadata unchanged.

- [ ] **Step 1: Define mobile route layout rules**

Make route hero copy and signal panels stack below 768px, make route cards one column, allow article folios/ledgers to wrap, and convert any fixed editorial grids to `minmax(0, 1fr)`.

- [ ] **Step 2: Fix long-form article behavior**

Set article prose width to `100%` within its container, make code/pre blocks horizontally scrollable inside their own block, and prevent metadata/tag rows from forcing the page width.

- [ ] **Step 3: Fix service/contact detail behavior**

Make outcome/process/FAQ grids stack, preserve visual stamps and waves within viewport bounds, and make mail/phone CTA panels full width with safe-area bottom spacing.

- [ ] **Step 4: Verify public route responses and static contracts**

```powershell
node --test tests/public-cms-contract.test.mjs tests/responsive-contract.test.mjs
npx tsc --noEmit --pretty false
```

Then request `/`, `/articles`, one article detail route, `/services`, one service detail route, `/contact`, and a missing route from the local production server; expect 200 for valid routes and 404 for the missing route.

- [ ] **Step 5: Commit subroute responsiveness**

```powershell
git add app/articles app/contact app/services app/not-found.tsx components/portfolio/PublicImprint.tsx app/globals.css
git commit -m "feat: make public subroutes responsive"
```

### Task 6: Make the admin panel mobile usable

**Files:**
- Modify: `app/admin/layout.tsx`
- Modify: `app/admin/site-content/page.tsx`
- Modify: `app/admin/services/page.tsx`
- Modify: `app/admin/history/page.tsx`
- Modify: admin editor pages under `app/admin/*/page.tsx` where fixed grids/modal widths are found
- Modify: `app/globals.css`
- Test: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Keep admin authentication, API calls, Supabase data, and redirect behavior unchanged.

- [ ] **Step 1: Make the drawer and header safe-area aware**

Keep the existing sidebar drawer/overlay. Add safe-area padding, internal scroll, a 44px mobile menu button, and a header layout that wraps rather than collides with the page title and “View Website” link.

- [ ] **Step 2: Make forms, JSON editors, modals, and lists fit phones**

At `max-width: 767px`, make admin cards full width, collapse two-column form grids, constrain modal height to `100dvh` with internal scroll, and make long JSON fields scroll within the textarea rather than expanding the page.

- [ ] **Step 3: Verify admin protection and responsive contracts**

```powershell
node --test tests/responsive-contract.test.mjs tests/public-cms-contract.test.mjs
npx tsc --noEmit --pretty false
```

Request `/admin`, `/admin/site-content`, and `/admin/services` without a session; expect the existing redirect to `/admin/login`.

- [ ] **Step 4: Commit admin responsiveness**

```powershell
git add app/admin app/globals.css tests/responsive-contract.test.mjs
git commit -m "feat: optimize admin panel for mobile"
```

### Task 7: Run viewport verification and handoff

**Files:**
- Modify: only files required by failed viewport checks
- Test: `tests/responsive-contract.test.mjs`, all existing tests

**Interfaces:**
- No new CMS records, content changes, or database migrations.

- [ ] **Step 1: Start a clean production server**

```powershell
$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
if ($listener) { Stop-Process -Id $listener.OwningProcess -Force }
npm run build
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','start' -WorkingDirectory 'C:\Users\A C E R\Downloads\m1' -WindowStyle Hidden
```

- [ ] **Step 2: Check viewport matrix**

Use browser automation against all valid public routes at 320×568, 375×812, 390×844, 768×1024, 1024×768, and 1440×900. For each page, record `document.documentElement.scrollWidth` and `window.innerWidth`; they must match within a 1px tolerance. Open and close the mobile menu and confirm body scrolling is restored.

- [ ] **Step 3: Run final verification**

```powershell
node --test tests/*.test.mjs
npx tsc --noEmit --pretty false
npm run build
```

Expected: zero test failures, TypeScript exit code 0, and build exit code 0. Report existing non-blocking lint warnings separately.

- [ ] **Step 4: Review the diff and commit final corrections**

```powershell
git status --short
git diff --check
git add app/globals.css components/portfolio/SignalRail.tsx components/portfolio/Navbar.tsx components/portfolio/Hero.tsx components/portfolio/About.tsx components/portfolio/Projects.tsx components/portfolio/Skills.tsx components/portfolio/Experience.tsx components/portfolio/Testimonials.tsx components/portfolio/Contact.tsx components/portfolio/Footer.tsx components/portfolio/PublicImprint.tsx app/articles/page.tsx app/articles/[slug]/page.tsx app/contact/page.tsx app/services/page.tsx app/services/[slug]/page.tsx app/not-found.tsx app/admin/layout.tsx app/admin/site-content/page.tsx app/admin/services/page.tsx app/admin/history/page.tsx tests/responsive-contract.test.mjs
git commit -m "fix: finish responsive viewport verification"
```
