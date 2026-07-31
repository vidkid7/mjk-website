# Living Heritage Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and integrate a single photorealistic Living Heritage Panorama that combines the person, Mount Everest, Gautam Buddha, and Janaki Temple while preserving the animated Nepal flag and all existing hero behavior.

**Architecture:** Generate one wide master artwork from the four existing visual references, retain the generated source under `output/imagegen/`, and export an optimized WebP under `public/`. Replace the separate default static hero layers with the unified plate while retaining a conditional overlay for an administrator-supplied portrait and preserving the delayed desktop-only flag video.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, built-in image generation, WebP asset optimization, Node test runner.

## Global Constraints

- The person remains recognizable, natural, and the principal foreground subject.
- Everest, Janaki Temple, and Gautam Buddha must be recognizable, respectful, and integrated with believable depth.
- The artwork contains no text, logos, watermarks, rendered flag, fantasy peaks, invented religious symbols, or duplicate landmarks.
- Preserve the existing headline, label, body copy, calls to action, anchors, single H1, glass copy surface, and contrast.
- Preserve delayed desktop-only flag-video loading, mobile decoration exclusion, and reduced-motion behavior.
- Preserve administrator-managed hero content and a custom portrait overlay when the saved portrait differs from the default.
- Create versioned assets; do not overwrite existing source images.

---

## File Structure

- `output/imagegen/living-heritage-hero-source.png`: original generated wide master for future cropping.
- `public/living-heritage-hero-v2.webp`: optimized production hero image.
- `components/sections/Hero.tsx`: unified image integration and conditional custom portrait overlay.
- `tests/search-safety.test.mjs`: structural regression coverage for the new hero asset and preserved media behavior.

### Task 1: Generate and Optimize the Living Heritage Panorama

**Files:**
- Consume: `public/mk-removebg-preview.png`
- Consume: `public/hero-himalayan-peaks.jpg`
- Consume: `public/buddha-lotus-removebg.png`
- Consume: `public/janaki-temple-logo.png`
- Create: `output/imagegen/living-heritage-hero-source.png`
- Create: `public/living-heritage-hero-v2.webp`

**Interfaces:**
- Consumes: four local reference images, each explicitly assigned as identity, geographic, spiritual, or architectural reference.
- Produces: `/living-heritage-hero-v2.webp`, a wide artwork with a quiet left copy area and foreground subject on the right.

- [ ] **Step 1: Inspect all four references**

Open each source image at original detail and confirm the person's face, Everest ridge, Buddha pose, and Janaki Temple façade are suitable reference inputs.

- [ ] **Step 2: Generate the wide source**

Use the built-in image generator in compositing mode with this specification:

```text
Use case: compositing
Asset type: cinematic Nepal landing-page hero
Input images:
- Image 1: identity reference for the foreground person; preserve face and natural proportions
- Image 2: Mount Everest and Himalayan geography reference
- Image 3: Gautam Buddha pose and spiritual-presence reference
- Image 4: Janaki Temple architectural reference
Primary request: create one seamless photorealistic cinematic Living Heritage Panorama of Nepal
Scene/backdrop: Himalayan dawn with Everest centered in the distant background, atmospheric mist, and Janaki Temple at believable middle-ground scale
Subject: the referenced person as the principal foreground subject in the right third; Gautam Buddha as a calm, respectful, softly illuminated spiritual presence integrated behind or beside the person
Composition/framing: wide landscape hero; quiet pale left third for existing website copy; all key cultural subjects inside responsive crop-safe areas; lower scene fades naturally into navy and crimson page framing
Lighting/mood: dignified golden dawn, realistic depth, calm and hopeful
Color palette: Himalayan blue, stone white, deep navy, restrained crimson, warm gold
Constraints: preserve the person's identity; recognizable Everest, Buddha, and Janaki Temple; realistic scale; seamless photographic transitions; no hard collage edges
Avoid: text, logos, watermarks, flags, political imagery, crowds, fantasy peaks, generic palace architecture, deity halo, caricature, duplicate landmarks, distorted face, distorted hands
```

- [ ] **Step 3: Validate the generated source**

Reject the result if any required subject is missing or misrepresented, if the person's identity drifts, or if unwanted text, watermark, flag, duplicate landmark, facial distortion, or hard collage edge appears. If rejected, regenerate with a single corrective prompt that repeats every invariant.

- [ ] **Step 4: Save the source and export WebP**

Copy the accepted generated image to `output/imagegen/living-heritage-hero-source.png`, then export `public/living-heritage-hero-v2.webp` at a wide hero resolution with visually lossless quality and explicit intrinsic dimensions recorded for `Hero.tsx`.

- [ ] **Step 5: Verify the production asset**

Open `public/living-heritage-hero-v2.webp` at original detail and confirm it matches the accepted source without banding, crop damage, or unreadable architectural detail.

### Task 2: Add a Failing Hero Integration Contract

**Files:**
- Modify: `tests/search-safety.test.mjs`
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: the intended `/living-heritage-hero-v2.webp` integration contract.
- Produces: regression assertions for the unified default plate and conditional custom portrait.

- [ ] **Step 1: Add the failing test**

Add this test:

```js
test('the hero uses one unified living heritage plate while retaining a custom portrait override', async () => {
  const hero = await read('components/sections/Hero.tsx')
  assert.match(hero, /\/living-heritage-hero-v2\.webp/)
  assert.match(hero, /const customHeroImage =/)
  assert.doesNotMatch(hero, /src="\/hero-himalayan-peaks\.jpg"/)
  assert.doesNotMatch(hero, /src="\/buddha-lotus-removebg\.webp"/)
})
```

- [ ] **Step 2: Run the targeted test and verify failure**

Run:

```powershell
npm.cmd test -- --test-name-pattern "unified living heritage plate"
```

Expected: FAIL because `Hero.tsx` does not yet reference `/living-heritage-hero-v2.webp`.

### Task 3: Integrate the Unified Artwork

**Files:**
- Modify: `components/sections/Hero.tsx`
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: `/living-heritage-hero-v2.webp`.
- Produces: `customHeroImage: string | null` and one static default hero plate beneath the existing animated flag.

- [ ] **Step 1: Add the custom portrait decision**

Immediately after the `content` assignment, add:

```ts
const customHeroImage =
  content.hero_image && content.hero_image !== defaultHero.hero_image
    ? content.hero_image
    : null
```

- [ ] **Step 2: Replace the separate static cultural layers**

Remove the static Everest image, city/temple silhouette, Buddha image block, and unconditional default portrait. Add one unified image beneath the delayed flag video:

```tsx
<img
  src="/living-heritage-hero-v2.webp"
  alt=""
  aria-hidden="true"
  width={2048}
  height={1152}
  loading="eager"
  decoding="async"
  className="pointer-events-none absolute inset-0 z-[2] h-full w-full object-cover object-[64%_center] sm:object-[62%_center] lg:object-center"
  draggable={false}
/>
```

Use the accepted export's actual width and height if they differ from `2048 × 1152`.

- [ ] **Step 3: Preserve an administrator-supplied portrait**

Render the existing portrait element only when `customHeroImage` is non-null:

```tsx
{customHeroImage && (
  <img
    src={customHeroImage}
    alt="Mukesh Khadka"
    width={403}
    height={620}
    loading="eager"
    decoding="async"
    className="hero-portrait-static pointer-events-none absolute bottom-0 left-1/2 right-auto z-[14] h-[28%] w-auto max-w-none -translate-x-1/2 object-contain sm:left-auto sm:right-[8%] sm:h-[76%] sm:translate-x-0 md:right-[10%] md:h-[84%] lg:right-[12%] lg:h-[92%] xl:right-[14%]"
    draggable={false}
  />
)}
```

- [ ] **Step 4: Tune only the existing overlay gradients**

Keep the text panel unchanged. Adjust only overlay opacity or stops needed to maintain WCAG-readable copy and make the unified scene visible; retain the crimson/navy bottom framing.

- [ ] **Step 5: Run the targeted test**

Run:

```powershell
npm.cmd test -- --test-name-pattern "unified living heritage plate"
```

Expected: PASS.

- [ ] **Step 6: Commit the asset and integration**

```powershell
git add output/imagegen/living-heritage-hero-source.png public/living-heritage-hero-v2.webp components/sections/Hero.tsx tests/search-safety.test.mjs
git commit -m "feat: unify Nepal heritage hero artwork"
```

### Task 4: Verify Behavior, Layout, and Production Readiness

**Files:**
- Verify: `components/sections/Hero.tsx`
- Verify: `public/living-heritage-hero-v2.webp`
- Verify: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: the integrated hero and existing Next.js application.
- Produces: evidence that tests, build, local rendering, responsive crops, animation delay, and interaction behavior are correct.

- [ ] **Step 1: Run the full test suite**

Run:

```powershell
npm.cmd test
```

Expected: all tests pass.

- [ ] **Step 2: Run the production build**

Run:

```powershell
npm.cmd run build
```

Expected: build completes successfully with no TypeScript or Next.js errors.

- [ ] **Step 3: Verify the local endpoint**

Open `http://localhost:3000/` and confirm it returns successfully. If the active server is not using this worktree, start this worktree on an unused local port before visual verification.

- [ ] **Step 4: Inspect representative responsive crops**

Inspect at approximately `1440 × 900`, `1024 × 768`, `768 × 1024`, and `390 × 844`. Confirm the person's face is not cropped, Everest, Janaki Temple, and Buddha remain legible where space permits, copy stays readable, controls are unobstructed, and no horizontal overflow appears.

- [ ] **Step 5: Verify media behavior**

At desktop width, confirm the animated flag begins only after the existing delay. At mobile width, confirm the decorative flag video is not requested. With reduced motion enabled, confirm the animation is suppressed by the existing rules.

- [ ] **Step 6: Inspect final version control state**

Confirm only the planned files plus the pre-existing user-owned `package-lock.json` change are present, and do not include the unrelated lockfile change in the feature commit.
