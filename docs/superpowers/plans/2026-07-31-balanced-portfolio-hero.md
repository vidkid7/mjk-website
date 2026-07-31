# Balanced Portfolio Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing cultural hero into a balanced technology, entrepreneurship, and Nepal portfolio introduction while showing more of the full-window artwork and moving the animated flag toward the far-left edge.

**Architecture:** Keep the work inside the existing `Hero` client component and its source-contract tests. Reuse the current optimized panorama, transparent WebM flag, stored hero-image override, responsive breakpoints, and anchor destinations; add only semantic portfolio copy, localized readability gradients, and slimmer bottom accents.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, Tailwind CSS, Node test runner.

## Global Constraints

- Keep the generated Mount Everest, Gautam Buddha, Janaki Temple, and Mukesh Khadka panorama.
- Keep `/nepal-flag-user-v1.webm` desktop-only and delayed by the existing `matchMedia('(min-width: 1024px)')` gate.
- Use exactly one page-level `h1`, containing `Mukesh Khadka`.
- Add no third-party fonts, libraries, media, routes, database changes, or deployment changes.
- Link `View Portfolio` to `#client-portfolio` and `Start a Project` to `#contact`.
- Preserve reduced-motion behavior and prevent horizontal overflow.
- Do not stage or commit unrelated changes already present on `main`.

## File Structure

- `components/sections/Hero.tsx`: owns the hero artwork, responsive portfolio copy, actions, flag placement, and bottom accents.
- `tests/search-safety.test.mjs`: owns source-level hero contracts for semantic headings, copy, actions, desktop-only media, and full-window presentation.

---

### Task 1: Add the balanced portfolio hero contract and implementation

**Files:**
- Modify: `tests/search-safety.test.mjs`
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: existing `useStoredData('hero', defaultHero)`, `customHeroImage`, `/living-heritage-hero-v2.webp`, and `/nepal-flag-user-v1.webm`.
- Produces: one semantic `h1`, two in-page CTA anchors, a desktop-only flag at `-left-[8%]`, and a full-height hero with slim bottom accents.

- [ ] **Step 1: Replace the outdated copy-box contract with a portfolio-content contract**

Add these assertions to the existing hero test:

```js
test('the hero presents a balanced personal portfolio introduction', async () => {
  const hero = await read('components/sections/Hero.tsx')

  assert.match(hero, /TECHNOLOGY • ENTREPRENEURSHIP • NEPAL/)
  assert.match(hero, /Building digital systems with purpose\./)
  assert.match(hero, /I create practical software, develop meaningful ventures/)
  assert.match(hero, /href="#client-portfolio"/)
  assert.match(hero, /href="#contact"/)
  assert.match(hero, /<h1[^>]*>\s*Mukesh Khadka\s*<\/h1>/)
  assert.doesNotMatch(hero, /<h2/)
})
```

Extend the existing image and flag contracts:

```js
assert.match(hero, /-left-\[8%\]/)
assert.match(hero, /h-\[3px\]/)
assert.doesNotMatch(hero, /sm:h-32/)
```

- [ ] **Step 2: Run the focused test and verify the new contract fails**

Run:

```powershell
node --test tests/search-safety.test.mjs
```

Expected: FAIL because the eyebrow, positioning statement, CTA anchors, `-left-[8%]`, and `h-[3px]` accent do not exist yet.

- [ ] **Step 3: Implement the portfolio copy and actions**

In `components/sections/Hero.tsx`, replace the current text-only inner content with:

```tsx
<div className="relative z-30 max-w-[42rem] text-center lg:text-left">
  <p className="mb-3 text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-white/90 drop-shadow-md sm:text-xs sm:tracking-[0.3em]">
    TECHNOLOGY • ENTREPRENEURSHIP • NEPAL
  </p>
  <h1 className="hero-name-3d font-playfair text-[3.1rem] font-black leading-[0.92] tracking-[-0.05em] min-[420px]:text-[3.65rem] sm:text-[4.4rem] md:text-[5rem] lg:text-[4.9rem] xl:text-[5.5rem]">
    Mukesh Khadka
  </h1>
  <p className="mt-3 font-playfair text-xl font-bold text-white drop-shadow-md sm:text-2xl lg:text-3xl">
    Building digital systems with purpose.
  </p>
  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/88 drop-shadow-md sm:text-base lg:mx-0">
    I create practical software, develop meaningful ventures, and use technology to deliver lasting value for organizations and communities.
  </p>
  <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
    <a href="#client-portfolio" className="rounded-full bg-crimson px-5 py-3 text-sm font-bold text-white shadow-lg shadow-crimson/25 transition hover:-translate-y-0.5 hover:bg-[#b81428]">
      View Portfolio
    </a>
    <a href="#contact" className="rounded-full border border-white/60 bg-white/14 px-5 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/24">
      Start a Project
    </a>
  </div>
</div>
```

Add a localized readability layer immediately before the content container:

```tsx
<div className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-full bg-[linear-gradient(90deg,rgba(4,25,51,0.68)_0%,rgba(4,25,51,0.28)_43%,transparent_72%)] sm:w-[76%] lg:w-[64%]" />
```

- [ ] **Step 4: Move the flag left and expose the panorama through the bottom edge**

Change the flag wrapper to:

```tsx
<div className="pointer-events-none absolute -left-[8%] top-[6%] z-[5] hidden h-[78%] w-[36%] overflow-hidden opacity-[0.32] mix-blend-multiply [mask-image:linear-gradient(90deg,black_0%,black_74%,transparent_100%)] lg:block xl:w-[33%]">
```

Replace the two large bottom shapes with:

```tsx
<div className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-[3px] bg-crimson" />
<div className="pointer-events-none absolute bottom-[3px] left-0 z-[12] h-[3px] w-[68%] bg-[#082d58]" />
```

Position the content low enough to feel editorial while preserving the new text:

```tsx
<div className="relative z-20 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1680px] items-end justify-center px-5 pb-12 sm:min-h-[calc(100svh-80px)] sm:px-8 sm:pb-16 lg:min-h-[calc(100svh-88px)] lg:justify-start lg:px-[7%] lg:pb-14">
```

- [ ] **Step 5: Run the focused contract tests**

Run:

```powershell
node --test tests/search-safety.test.mjs
```

Expected: all tests in `search-safety.test.mjs` PASS.

- [ ] **Step 6: Commit only the hero and its contract**

Run:

```powershell
git add components/sections/Hero.tsx tests/search-safety.test.mjs
git commit -m "feat: add balanced portfolio hero"
```

Expected: a commit containing exactly two files. Existing unrelated working-tree changes remain unstaged.

---

### Task 2: Validate the merged homepage at production fidelity

**Files:**
- Verify: `components/sections/Hero.tsx`
- Verify: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: the Task 1 hero implementation and existing Next.js production server.
- Produces: evidence that the responsive hero, media gate, build, and live port 3012 work without regressions.

- [ ] **Step 1: Run the complete test suite**

Run:

```powershell
npm.cmd test
```

Expected: all liquid-design, platform-improvement, and search-safety tests PASS.

- [ ] **Step 2: Build the production application**

Run:

```powershell
npm.cmd run build
```

Expected: Next.js reports `Compiled successfully`, type checking succeeds, and all static pages generate.

- [ ] **Step 3: Restart only the server listening on port 3012**

Resolve the listener with `Get-NetTCPConnection -LocalPort 3012 -State Listen`, confirm its command line belongs to this workspace, stop that exact process, and start:

```powershell
npm.cmd run start -- -p 3012
```

Expected: `Invoke-WebRequest http://localhost:3012/` returns HTTP 200 and the listener command line points to `C:\Users\A C E R\Downloads\m1`.

- [ ] **Step 4: Verify the desktop hero in the in-app browser**

At `http://localhost:3012/`, verify:

```js
({
  heading: document.querySelector('h1')?.textContent?.trim(),
  flag: document.querySelector('video')?.getAttribute('src'),
  videoReadyState: document.querySelector('video')?.readyState,
  scrollWidth: document.documentElement.scrollWidth,
  width: innerWidth
})
```

Expected:

```js
{
  heading: 'Mukesh Khadka',
  flag: '/nepal-flag-user-v1.webm',
  videoReadyState: 4,
  scrollWidth: 1181,
  width: 1186
}
```

Also confirm visually that the flag pole is close to the left edge, the panorama reaches the bottom accent, the copy remains readable, and no text covers the portrait or Buddha.

- [ ] **Step 5: Verify mobile behavior**

At a mobile viewport, confirm there is no video source, both CTA anchors remain visible without horizontal overflow, the name is the only `h1`, and the panorama remains full-bleed.

- [ ] **Step 6: Leave the verified port 3012 tab open**

Finalize the in-app browser session with the verified `http://localhost:3012/` tab marked as deliverable.
