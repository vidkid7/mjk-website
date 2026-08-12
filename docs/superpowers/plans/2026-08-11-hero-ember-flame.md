# Hero Ember-Flame Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained red/gold ember-flame animation around the existing `MUKESH KHADKA` hero title without changing content, images, data, or responsive composition.

**Architecture:** Reuse the existing `gateway-title` markup and dust/wave timing. Add one decorative title effect hook in `components/portfolio/Hero.tsx`, then implement the aura, ignition, ember drift, responsive scale, and reduced-motion fallback in `app/globals.css`. Keep all decoration aria-hidden, pointer-events-free, and clipped by the existing hero.

**Tech Stack:** Next.js 14, React, TypeScript, CSS keyframes, Node.js built-in test runner, Playwright verification.

## Global Constraints

- Presentation-only change: no CMS content, Supabase data, routes, images, or admin behavior changes.
- Preserve the existing title text, two-layer layout, desktop no-wrap behavior, and mobile responsive rules.
- Use CSS and existing title markup rather than introducing a new image asset or a continuously running canvas effect.
- `@media (prefers-reduced-motion: reduce)` disables ember movement and leaves only a quiet static accent.
- Decorative elements remain `aria-hidden` and `pointer-events: none`.
- No JavaScript timers, layout reads, or new runtime dependencies.
- Verify at 320px, 430px, 768px, 1024px, 1183px, 1280px, and 1440px with no horizontal overflow.

---

### Task 1: Add a failing ember-animation contract

**Files:**
- Modify: `C:\Users\A C E R\Downloads\m1\tests\responsive-contract.test.mjs`

**Interfaces:**
- Consumes: the current `.gateway-title`, `.gateway-title__dust`, and reduced-motion CSS contract.
- Produces: explicit assertions for `.gateway-title--ember`, `.gateway-title__ember-aura`, `.gateway-title__ember-field`, `gateway-title-ember-ignite`, `gateway-title-ember-drift`, and reduced-motion fallback rules.

- [ ] **Step 1: Write the failing test**

Add this test after the existing desktop headline test:

```js
test('hero title exposes a responsive ember flame treatment with reduced-motion fallback', async () => {
  const css = await source('app/globals.css')
  const hero = await source('components/portfolio/Hero.tsx')
  assert.match(hero, /gateway-title--ember/)
  assert.match(hero, /gateway-title__ember-aura/)
  assert.match(hero, /gateway-title__ember-field/)
  assert.match(css, /@keyframes gateway-title-ember-ignite/)
  assert.match(css, /@keyframes gateway-title-ember-drift/)
  assert.match(css, /gateway-title--ember\s*\{[^}]*overflow:\s*visible/)
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*?gateway-title__ember-field[\s\S]*?animation:\s*none/)
})
```

- [ ] **Step 2: Run the contract to verify it fails**

Run:

```powershell
node --test tests/responsive-contract.test.mjs
```

Expected: the existing six/seven tests pass, and the new test fails because the ember hook and keyframes do not yet exist.

### Task 2: Implement the title ember treatment

**Files:**
- Modify: `C:\Users\A C E R\Downloads\m1\components\portfolio\Hero.tsx`
- Modify: `C:\Users\A C E R\Downloads\m1\app\globals.css`

**Interfaces:**
- Consumes: the title's existing `DustWord` layers and animation timing.
- Produces: a decorative `.gateway-title--ember` title with `.gateway-title__ember-aura` and `.gateway-title__ember-field` children.

- [ ] **Step 1: Add the decorative title hooks**

Change the existing title opening element in `Hero.tsx` from:

```tsx
<motion.h1 className="gateway-title noir-display" aria-label={content.headline} initial={false}>
```

to:

```tsx
<motion.h1 className="gateway-title gateway-title--ember noir-display" aria-label={content.headline} initial={false}>
  <span aria-hidden="true" className="gateway-title__ember-aura" />
  <span aria-hidden="true" className="gateway-title__ember-field">
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
  </span>
```

Keep the existing `DustWord` children immediately after these decorative spans and close the new field before the existing `</motion.h1>` closing tag.

- [ ] **Step 2: Add the minimal CSS effect**

Immediately after the existing `.gateway-title > span:last-child` rule, add the following CSS:

```css
.gateway-title--ember {
  overflow: visible;
  isolation: isolate;
}

.gateway-title--ember .gateway-title__ember-aura,
.gateway-title--ember .gateway-title__ember-field {
  position: absolute;
  pointer-events: none;
}

.gateway-title--ember .gateway-title__ember-aura {
  inset: 16% -7% 5%;
  z-index: 0;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 48% 78%, rgba(231, 53, 46, 0.3), transparent 47%),
    radial-gradient(ellipse at 54% 84%, rgba(242, 189, 75, 0.22), transparent 38%);
  filter: blur(1.25rem);
  opacity: 0;
  transform: scale(0.84, 0.66);
  animation: gateway-title-ember-ignite 1.9s ease-in-out 5.05s infinite;
}

.gateway-title--ember .gateway-title__ember-field {
  inset: 45% 4% 0;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  opacity: 1;
}

.gateway-title--ember .gateway-title__ember-field i {
  display: block;
  width: clamp(0.16rem, 0.35vw, 0.34rem);
  height: clamp(1rem, 2.8vw, 2.7rem);
  border-radius: 80% 20% 65% 35%;
  background: linear-gradient(180deg, rgba(242, 189, 75, 0.92), rgba(231, 53, 46, 0.08));
  filter: blur(0.08rem);
  transform-origin: 50% 100%;
  animation: gateway-title-ember-drift 2.4s ease-in-out 5.25s infinite alternate;
}

.gateway-title--ember .gateway-title__ember-field i:nth-child(2n) {
  height: clamp(0.7rem, 2vw, 1.9rem);
  animation-delay: 5.55s;
}

.gateway-title--ember .gateway-title__ember-field i:nth-child(3n) {
  height: clamp(1.25rem, 3.4vw, 3.2rem);
  animation-delay: 5.85s;
}

@keyframes gateway-title-ember-ignite {
  0%, 100% { opacity: 0.08; transform: scale(0.84, 0.66); }
  28% { opacity: 0.72; transform: scale(1.04, 0.88); }
  55% { opacity: 0.26; transform: scale(0.96, 0.76); }
}

@keyframes gateway-title-ember-drift {
  0% { opacity: 0.16; transform: rotate(-8deg) scaleY(0.72) translateY(0.15rem); }
  48% { opacity: 0.72; transform: rotate(6deg) scaleY(1.05) translateY(-0.25rem); }
  100% { opacity: 0.24; transform: rotate(-3deg) scaleY(0.84) translateY(0.05rem); }
}
```

- [ ] **Step 3: Add responsive and reduced-motion rules**

Add these rules inside the existing mobile and reduced-motion sections:

```css
@media (max-width: 767px) {
  .gateway-title--ember .gateway-title__ember-aura {
    inset: 28% -12% 4%;
    filter: blur(0.8rem);
  }

  .gateway-title--ember .gateway-title__ember-field {
    inset-inline: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gateway-title--ember .gateway-title__ember-aura {
    opacity: 0.14;
    animation: none;
    transform: none;
  }

  .gateway-title--ember .gateway-title__ember-field,
  .gateway-title--ember .gateway-title__ember-field i {
    opacity: 0;
    animation: none;
  }
}
```

- [ ] **Step 4: Run tests and typecheck**

Run:

```powershell
node --test tests/responsive-contract.test.mjs
npx tsc --noEmit --pretty false
```

Expected: all responsive contract tests pass and TypeScript exits with code 0.

### Task 3: Build and verify the rendered animation

**Files:**
- Verify only: `C:\Users\A C E R\Downloads\m1\app\globals.css`
- Verify only: `C:\Users\A C E R\Downloads\m1\components\portfolio\Hero.tsx`

**Interfaces:**
- Consumes: the compiled title ember hooks and keyframes from Task 2.
- Produces: a production build and responsive visual evidence.

- [ ] **Step 1: Build and restart localhost**

Stop the existing listener on port 3000, run `npm run build`, then start `npm run start -- -p 3000`. The build must exit 0; existing unrelated `<img>` and hook lint warnings may remain.

- [ ] **Step 2: Verify geometry and animation state with Playwright**

At widths 320, 430, 768, 1024, 1183, 1280, and 1440, assert:

```js
document.documentElement.scrollWidth <= innerWidth + 1
document.querySelector('.gateway-title--ember')
document.querySelector('.gateway-title__ember-aura')
document.querySelector('.gateway-title__ember-field')
```

At 1183px and 1440px, both title layers must have one distinct character-top row. At reduced motion, the ember field must have `animation-name: none`.

- [ ] **Step 3: Verify the HTTP route**

Run:

```powershell
$status=(Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/' -TimeoutSec 30).StatusCode
Write-Output "HTTP $status"
```

Expected: `HTTP 200`.
