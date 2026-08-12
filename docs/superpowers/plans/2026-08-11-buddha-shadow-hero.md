# Buddha Shadow Hero Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive, low-contrast Buddha silhouette behind Mukesh's head in the homepage hero without replacing the existing Buddha figure or changing site data.

**Architecture:** Reuse the existing heritage Buddha asset as a second decorative image in `PortfolioHero`. CSS controls the layer order, grayscale/multiply shadow treatment, and breakpoint-specific sizing/positioning. The responsive contract test asserts the semantic layer and visual safeguards.

**Tech Stack:** Next.js, React, Framer Motion, native CSS, Node's built-in test runner.

## Global Constraints

- Preserve the existing `/cultural/buddha-profile-left.png` asset and current foreground Buddha placement.
- Do not modify Supabase, admin routes, content data, or unrelated hero layout behavior.
- Keep decorative imagery pointer-events-free and hidden from assistive technology.
- Keep Mukesh's portrait above the shadow and preserve reduced-motion behavior.

---

### Task 1: Add the failing responsive contract

**Files:**
- Modify: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Consumes: `components/portfolio/Hero.tsx` and `app/globals.css` source text.
- Produces: assertions for the `gateway-hero__heritage-buddha-shadow` layer, portrait stacking, and responsive shadow rules.

- [ ] **Step 1: Write the failing test**

Append this test to `tests/responsive-contract.test.mjs`:

```js
test('hero places a restrained Buddha shadow behind Mukesh across breakpoints', async () => {
  const css = await source('app/globals.css')
  const hero = await source('components/portfolio/Hero.tsx')
  assert.match(hero, /gateway-hero__heritage-buddha-shadow/)
  assert.match(css, /\.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?z-index:\s*2/)
  assert.match(css, /\.gateway-hero__heritage-person\s*\{[\s\S]*?z-index:\s*3/)
  assert.match(css, /\.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?mix-blend-mode:\s*multiply/)
  assert.match(css, /\.gateway-hero__heritage-buddha-shadow\s*\{[\s\S]*?filter:[^}]*grayscale/)
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.gateway-hero__heritage-buddha-shadow[\s\S]*?opacity:/)
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.gateway-hero__heritage-buddha-shadow[\s\S]*?transform:/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?\.gateway-hero__heritage-buddha-shadow[\s\S]*?animation:\s*none/)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/responsive-contract.test.mjs`

Expected: FAIL because the new shadow class and CSS rules do not exist yet.

- [ ] **Step 3: Commit the failing contract**

Run: `git add tests/responsive-contract.test.mjs && git commit -m "test: define Buddha shadow hero contract"`

### Task 2: Add the shadow layer and styling

**Files:**
- Modify: `components/portfolio/Hero.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `gateway-hero__heritage-figures`, `gateway-hero__heritage-buddha-profile`, and `gateway-hero__heritage-person` layers.
- Produces: a decorative `gateway-hero__heritage-buddha-shadow` image positioned behind the portrait.

- [ ] **Step 1: Add the shadow image before the portrait**

Inside the existing `gateway-hero__heritage-figures` motion wrapper, render:

```tsx
<img
  className="gateway-hero__heritage-buddha-shadow"
  src="/cultural/buddha-profile-left.png"
  alt=""
  aria-hidden="true"
/>
<img className="gateway-hero__heritage-buddha-profile" src="/cultural/buddha-profile-left.png" alt="" />
```

Keep the portrait image after both Buddha layers so it remains the top visual subject.

- [ ] **Step 2: Add the base shadow treatment**

Add a rule beside the existing heritage figure rules:

```css
.gateway-shell .gateway-hero__heritage-buddha-shadow {
  position: absolute;
  right: clamp(11%, 15vw, 18%);
  bottom: 22%;
  z-index: 2;
  width: clamp(14rem, 25vw, 24rem);
  height: auto;
  opacity: 0.2;
  pointer-events: none;
  object-fit: contain;
  object-position: center bottom;
  filter: grayscale(1) saturate(0) brightness(0.62) blur(0.12rem) drop-shadow(0 0.7rem 0.9rem rgba(4, 18, 33, 0.18));
  mix-blend-mode: multiply;
  transform: translate(0, 0) scale(1.04);
}

.gateway-shell .gateway-hero__heritage-person {
  position: relative;
  z-index: 3;
}
```

- [ ] **Step 3: Add tablet and mobile offsets**

Add breakpoint rules that keep the silhouette near the head without covering the face:

```css
@media (max-width: 1100px) {
  .gateway-shell .gateway-hero__heritage-buddha-shadow {
    right: 8%;
    bottom: 25%;
    width: clamp(12rem, 28vw, 18rem);
    opacity: 0.16;
  }
}

@media (max-width: 767px) {
  .gateway-shell .gateway-hero__heritage-buddha-shadow {
    right: 9%;
    bottom: 32%;
    width: clamp(9rem, 32vw, 13rem);
    opacity: 0.13;
    transform: translate(1.5rem, 0) scale(1.02);
  }
}
```

- [ ] **Step 4: Respect reduced motion**

Add the shadow selector to the existing reduced-motion block with `animation: none` and a stable transform so it does not introduce motion for those users.

- [ ] **Step 5: Run the focused test to verify it passes**

Run: `node --test tests/responsive-contract.test.mjs`

Expected: PASS, including the new Buddha shadow contract and all existing responsive contracts.

### Task 3: Verify the visual result and build

**Files:**
- No additional files.

**Interfaces:**
- Consumes: the completed hero layer and responsive contract.
- Produces: verified desktop/tablet/mobile rendering and a successful production build.

- [ ] **Step 1: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 2: Build the production bundle**

Run: `npm run build`

Expected: exit code 0; any existing non-blocking lint warnings are recorded rather than treated as a new failure.

- [ ] **Step 3: Inspect responsive computed styles**

Check widths 1440, 1024, and 430 and confirm:

- `.gateway-hero__heritage-buddha-shadow` exists and has opacity below 0.25.
- `.gateway-hero__heritage-person` has a higher stacking order than the shadow.
- No horizontal overflow is introduced.

- [ ] **Step 4: Commit the implementation**

Run: `git add components/portfolio/Hero.tsx app/globals.css && git commit -m "feat: add Buddha shadow behind hero portrait"`
