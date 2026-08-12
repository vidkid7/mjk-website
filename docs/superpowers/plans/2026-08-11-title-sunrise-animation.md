# MUKESH KHADKA Sunrise Title Entrance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate only the MUKESH KHADKA hero title upward from below the mountain and settle it at its existing responsive position.

**Architecture:** Keep the existing `motion.h1` as the animation boundary. Its initial state will use a lower percentage translation, reduced opacity, and soft blur; its final state will use the existing transform, full opacity, and no blur. Because the heritage environment already has a higher stacking context than the title, the mountain will visually cover the title while it is below the mountain edge without changing the final layout. Start the entrance after the existing 3.2-second loader and 0.55-second exit transition so it is visible.

**Tech Stack:** Next.js, React, Framer Motion, CSS, Node test runner.

## Global Constraints

- Animate the title as one visual group so the relationship between both name lines stays intact.
- Preserve the current desktop, tablet, and mobile final title geometry.
- Do not change the portrait, Buddha, mountain, copy, navigation, or CTA behavior.
- Respect `prefers-reduced-motion: reduce` by showing the title immediately at its final position with no animation.

---

### Task 1: Add the title entrance contract

**Files:**
- Modify: `C:/Users/A C E R/Downloads/m1/tests/responsive-contract.test.mjs`

**Interfaces:**
- Consumes: the existing `Hero.tsx` title markup and `app/globals.css` title styles.
- Produces: source-level assertions for the approved title entrance motion.

- [x] **Step 1: Write the failing test**

Add a test after the existing ember-title contract:

```js
test('hero title rises from behind the mountain and settles in place', async () => {
  const hero = await source('components/portfolio/Hero.tsx')
  const css = await source('app/globals.css')

  assert.match(hero, /gateway-title--ember[\s\S]*?initial=\{reduceMotion \? false : \{ opacity: 0, y: '110%', filter: 'blur\(0\.5rem\)' \}\}/)
  assert.match(hero, /gateway-title--ember[\s\S]*?animate=\{\{ opacity: 1, y: 0, filter: 'blur\(0rem\)' \}\}/)
  assert.match(hero, /gateway-title--ember[\s\S]*?duration: reduceMotion \? 0 : 1\.5/)
  assert.match(css, /\.gateway-title--ember\s*\{[\s\S]*?will-change:\s*transform, opacity, filter/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?\.gateway-title--ember[\s\S]*?will-change:\s*auto/)
})
```

- [x] **Step 2: Run the focused test to verify it fails**

Run:

```text
node --test tests/responsive-contract.test.mjs
```

Expected: the new title-entrance test fails because the title still uses `initial={false}` and the CSS contract does not declare `will-change`.

### Task 2: Implement the title-only sunrise entrance

**Files:**
- Modify: `C:/Users/A C E R/Downloads/m1/components/portfolio/Hero.tsx`
- Modify: `C:/Users/A C E R/Downloads/m1/app/globals.css`

**Interfaces:**
- Consumes: the existing `reduceMotion` boolean and `.gateway-title--ember` style block.
- Produces: an animated title whose final state is unchanged from the current layout.

- [x] **Step 1: Add the Framer Motion entrance state**

Replace the current title opening tag:

```tsx
<motion.h1 className="gateway-title gateway-title--ember noir-display" aria-label={content.headline} initial={false}>
```

with:

```tsx
<motion.h1
  className="gateway-title gateway-title--ember noir-display"
  aria-label={content.headline}
  initial={reduceMotion ? false : { opacity: 0, y: '110%', filter: 'blur(0.5rem)' }}
  animate={{ opacity: 1, y: 0, filter: 'blur(0rem)' }}
  transition={{ duration: reduceMotion ? 0 : 2.1, delay: reduceMotion ? 0 : 3.8, ease: [0.22, 1, 0.36, 1] }}
>
```

Leave the title children and final CSS geometry unchanged.

- [x] **Step 2: Add the animation performance and reduced-motion contract**

In `.gateway-title--ember`, add:

```css
  will-change: transform, opacity, filter;
```

In the existing `@media (prefers-reduced-motion: reduce)` block, add:

```css
  .gateway-title--ember {
    will-change: auto;
  }
```

- [x] **Step 3: Run the focused test to verify it passes**

Run:

```text
node --test tests/responsive-contract.test.mjs
```

Expected: all responsive contract tests pass.

### Task 3: Verify the live responsive result

**Files:**
- No source changes.

**Interfaces:**
- Consumes: the live `http://localhost:3001/` hero and the focused test suite.
- Produces: evidence that the title rises from below the mountain and returns to its current final position.

- [x] **Step 1: Verify the desktop final state**

Inspect the live hero after the entrance completes. Confirm the title has `transform` at its settled position, `opacity: 1`, and no blur, with the portrait and mountain unchanged.

- [x] **Step 2: Verify a narrow responsive state**

Use the live preview at a narrow viewport and confirm the title still settles at the existing responsive position without clipping the calls to action or changing the hero height.

- [x] **Step 3: Run the final focused test**

Run:

```text
node --test tests/responsive-contract.test.mjs
```

Expected: all tests pass with no new warnings or failures.
