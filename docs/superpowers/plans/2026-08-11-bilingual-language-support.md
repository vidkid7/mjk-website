# Bilingual English/Nepali Language Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an instant, persistent English/Nepali switch to the existing public portfolio and admin CMS, with complete translations and bilingual editing while preserving the current design and content structure.

**Architecture:** Keep English database fields backward compatible and add locale-aware translation overlays. A shared client provider controls the selected locale across public and admin surfaces, while a typed catalog owns fixed interface labels and the server loader resolves CMS content with Nepali fallback to English.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Supabase/PostgreSQL JSONB, Framer Motion, Node’s built-in test runner, existing admin API routes.

## Global Constraints

- English remains the default locale.
- The only new visible control is a compact `EN / नेपाली` switch in the existing public and admin header tool areas.
- Do not add or remove public sections, cards, promotional copy, images, animations, routes, or design treatments.
- Keep names, URLs, emails, social handles, technology names, dates, metrics, and assets unchanged.
- Missing or malformed Nepali values fall back to the existing English value.
- Preserve unrelated user changes already present in the worktree; never reset or clean them.
- Do not expose credentials, raw passwords, or private admin data.
- Run focused tests after each task and the full test suite before live verification.

---

### Task 1: Locale contract and shared provider

**Files:**
- Create: `lib/i18n.ts`
- Create: `components/i18n/LanguageProvider.tsx`
- Create: `components/i18n/LanguageSwitch.tsx`
- Modify: `app/layout.tsx`
- Test: `tests/bilingual-language.test.mjs`

**Interfaces:**
- `lib/i18n.ts` exports `type Locale = 'en' | 'ne'`, `DEFAULT_LOCALE`, `LANGUAGE_STORAGE_KEY`, and `normalizeLocale(value: unknown): Locale`.
- `LanguageProvider` accepts `{ children: React.ReactNode }` and provides `{ locale: Locale; setLocale: (locale: Locale) => void }` through `useLanguage()`.
- `LanguageSwitch` renders the compact existing-tool control and calls `setLocale` without changing route or scroll state.

- [ ] **Step 1: Write the failing contract tests**

Add assertions to `tests/bilingual-language.test.mjs` that read the new files and verify:

```js
test('locale contract defaults invalid values to English', async () => {
  const source = await read('lib/i18n.ts')
  assert.match(source, /type Locale = ['"]en['"] \| ['"]ne['"]/)
  assert.match(source, /DEFAULT_LOCALE[^=]*= ['"]en['"]|DEFAULT_LOCALE[^:]*: Locale/)
  assert.match(source, /normalizeLocale/)
})

test('language provider persists the selected locale and updates document language', async () => {
  const provider = await read('components/i18n/LanguageProvider.tsx')
  assert.match(provider, /localStorage/)
  assert.match(provider, /document\.documentElement\.lang/)
  assert.match(provider, /LanguageContext|useLanguage/)
})
```

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: FAIL because the locale files and implementation do not exist yet.

- [ ] **Step 3: Implement the locale contract and provider**

Implement the smallest working contract:

```ts
export type Locale = 'en' | 'ne'
export const DEFAULT_LOCALE: Locale = 'en'
export const LANGUAGE_STORAGE_KEY = 'mukesh-portfolio-language'

export function normalizeLocale(value: unknown): Locale {
  return value === 'ne' ? 'ne' : DEFAULT_LOCALE
}
```

The provider must initialize with English, restore only `en` or `ne` after hydration, write the same storage key, and update `document.documentElement.lang` on every locale change. Add the provider at the shared app boundary without changing existing theme or color providers.

- [ ] **Step 4: Add the compact switch to the existing tool areas**

Render `LanguageSwitch` inside the current public header tools in `components/portfolio/SignalRail.tsx` and the current admin header tools in `app/admin/layout.tsx`. Use existing classes or a narrowly scoped class; do not create a new header row or section. Provide `aria-label`, `aria-pressed`, and visible `EN`/`नेपाली` labels.

- [ ] **Step 5: Run the focused test and verify it passes**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: PASS for the locale contract/provider assertions.

---

### Task 2: Typed fixed-copy translation catalog

**Files:**
- Create: `lib/i18n-copy.ts`
- Modify: `components/portfolio/SignalRail.tsx`
- Modify: `components/portfolio/Navbar.tsx`
- Modify: `components/portfolio/Hero.tsx`
- Modify: `components/portfolio/About.tsx`
- Modify: `components/portfolio/Projects.tsx`
- Modify: `components/portfolio/Skills.tsx`
- Modify: `components/portfolio/Experience.tsx`
- Modify: `components/portfolio/Testimonials.tsx`
- Modify: `components/portfolio/Contact.tsx`
- Modify: `components/portfolio/Footer.tsx`
- Modify: `components/portfolio/LoadingScreen.tsx`
- Modify: `components/portfolio/CmsUnavailable.tsx`
- Modify: `app/not-found.tsx`
- Modify: `app/error.tsx`
- Modify: `tests/bilingual-language.test.mjs`

**Interfaces:**
- `i18n-copy.ts` exports a typed `fixedCopy: Record<Locale, ...>` object and a `copyFor(locale)` helper.
- Components read fixed labels through `useLanguage()` and `copyFor(locale)`; CMS content remains supplied through existing props.

- [ ] **Step 1: Add failing coverage for fixed-copy ownership**

Extend the test to require both locale entries and key UI groups:

```js
test('fixed interface copy has English and Nepali entries', async () => {
  const source = await read('lib/i18n-copy.ts')
  for (const key of ['navigation', 'hero', 'projects', 'skills', 'experience', 'testimonials', 'contact', 'footer', 'errors']) {
    assert.match(source, new RegExp(`${key}`), `missing ${key} copy group`)
  }
  assert.match(source, /ne:/)
  assert.match(source, /en:/)
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: FAIL because the catalog does not exist.

- [ ] **Step 3: Implement the complete catalog and wire components**

Create English values matching the current visible strings exactly and their Nepali equivalents. Replace only fixed JSX literals; do not alter headings, section order, layout classes, image composition, animation timing, or existing CMS prop names. Keep accessibility labels and status text in the catalog so no fixed visible or screen-reader copy remains English-only.

- [ ] **Step 4: Run focused regression tests**

Run: `node --test tests/bilingual-language.test.mjs tests/field-notes-redesign.test.mjs tests/interface-reconstruction.test.mjs`

Expected: PASS, with existing English contract assertions still satisfied.

---

### Task 3: Backward-compatible localized content storage and loader

**Files:**
- Create: `lib/localized-content.ts`
- Modify: `lib/public-content.ts`
- Modify: `lib/public-content-server.ts`
- Modify: `lib/schema.sql`
- Modify: `supabase-schema.sql`
- Modify: `lib/storage.ts`
- Modify: `tests/bilingual-language.test.mjs`
- Create: `supabase/migrations/20260811_add_content_translations.sql`

**Interfaces:**
- `lib/localized-content.ts` exports `type Locale`, `LocalizedTranslations`, `resolveLocalizedValue`, `resolveLocalizedArray`, and `isLocalizedValue`.
- `loadPublicContent(locale?: Locale)` returns the current `PublicContent` structure with selected locale values.
- Existing English API payloads remain valid when `locale` is omitted.

- [ ] **Step 1: Write failing normalization and fallback tests**

Add tests covering plain strings, valid Nepali overlays, missing Nepali values, malformed values, and array items keyed by stable IDs/slugs:

```js
test('localized resolver prefers Nepali and falls back to English', async () => {
  const source = await read('lib/localized-content.ts')
  assert.match(source, /resolveLocalizedValue/)
  assert.match(source, /fallback|en/)
  assert.match(source, /ne/)
})

test('public loader accepts the current unlocalized shape', async () => {
  const source = await read('lib/public-content-server.ts')
  assert.match(source, /loadPublicContent/)
  assert.match(source, /locale|resolveLocalized/)
})
```

- [ ] **Step 2: Run the tests and verify expected failure**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: FAIL because localized helpers and locale-aware loading are not implemented.

- [ ] **Step 3: Add the translation overlay migration**

Add nullable/default-empty JSONB translation storage to the existing content tables and page records without renaming or deleting English fields. The migration must be idempotent and cover every public text source used by the loader: hero content, about content, vision cards, initiatives, achievements, testimonials, site stats, site settings, news posts, and `site_pages` data.

- [ ] **Step 4: Implement normalization and loader selection**

Resolve each field with the active locale, preserve non-translatable values, and treat invalid translation JSON as absent. Normalize nested arrays by ID or slug. Keep the existing `PublicContent` object shape so visual components do not need a structural redesign.

- [ ] **Step 5: Run the focused loader tests**

Run: `node --test tests/bilingual-language.test.mjs tests/public-cms-contract.test.mjs tests/admin-directed-cms.test.mjs`

Expected: PASS with English compatibility preserved.

---

### Task 4: Public page locale wiring and complete content translations

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/articles/page.tsx`
- Modify: `app/articles/[slug]/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `lib/portfolio-content.ts`
- Modify: `lib/articles.ts`
- Modify: `lib/service-pages.ts`
- Modify: `tests/bilingual-language.test.mjs`

**Interfaces:**
- Every public route consumes the shared locale and renders the same existing component tree.
- Static and CMS copy use the same `Locale` type and fallback helper.
- Metadata retains the current English defaults and exposes localized Nepali values where available.

- [ ] **Step 1: Add failing route coverage**

Require the public route files to consume the locale/provider and assert that the current route set remains present:

```js
test('public routes use the shared language state', async () => {
  for (const path of ['app/page.tsx', 'app/articles/page.tsx', 'app/articles/[slug]/page.tsx', 'app/services/page.tsx', 'app/services/[slug]/page.tsx', 'app/contact/page.tsx']) {
    const source = await read(path)
    assert.match(source, /locale|Language|useLanguage/, `${path} has no locale wiring`)
  }
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: FAIL for routes that have not yet been wired.

- [ ] **Step 3: Wire the provider and localized content**

Keep the current server/client boundaries intact. Use the selected locale for fixed copy and localized CMS content. Do not introduce `/en` or `/ne` routes, query parameters, duplicate sections, or new visible messaging. Add the complete approved Nepali translations for every current public content record, including article and service bodies, questions, answers, labels, and metadata.

- [ ] **Step 4: Verify responsive text behavior**

Add only scoped CSS adjustments if Nepali wrapping causes an actual overflow at existing breakpoints. Preserve the current typography scale, spacing, colors, z-index relationships, hero composition, Buddha placement, and animations.

- [ ] **Step 5: Run public route and responsive tests**

Run: `node --test tests/bilingual-language.test.mjs tests/responsive-contract.test.mjs tests/heritage-public-shell.test.mjs tests/field-notes-articles.test.mjs`

Expected: PASS with existing English and responsive contracts unchanged.

---

### Task 5: Bilingual admin editors and save routes

**Files:**
- Modify: `app/admin/layout.tsx`
- Modify: `app/admin/site-content/page.tsx`
- Modify: `app/admin/hero/page.tsx`
- Modify: `app/admin/about/page.tsx`
- Modify: `app/admin/services/page.tsx`
- Modify: `app/admin/achievements/page.tsx`
- Modify: `app/admin/vision/page.tsx`
- Modify: `app/admin/initiatives/page.tsx`
- Modify: `app/admin/entrepreneurship/page.tsx`
- Modify: `app/admin/testimonials/page.tsx`
- Modify: `app/admin/news/page.tsx`
- Modify: `app/admin/settings/page.tsx`
- Modify: `app/api/content/route.ts`
- Modify: `lib/admin-data.ts`
- Modify: `lib/storage.ts`
- Modify: `tests/bilingual-language.test.mjs`

**Interfaces:**
- Existing admin forms retain their current resource names and save endpoints.
- Locale-aware form values use `{ en: string, ne: string }` for text fields and equivalent keyed structures for arrays.
- A save request includes the selected locale or a complete paired value; saving Nepali cannot overwrite English.

- [ ] **Step 1: Add failing admin contract tests**

Add assertions for the language switch, paired inputs, locale-aware API validation, and revision preservation:

```js
test('admin content editors expose both language values', async () => {
  const source = await read('app/admin/site-content/page.tsx')
  assert.match(source, /English|en/i)
  assert.match(source, /Nepali|नेपाली|ne/i)
  assert.match(source, /translations|locale/i)
})

test('content saves preserve both locale values', async () => {
  const source = await read('app/api/content/route.ts')
  assert.match(source, /translations|locale/i)
  assert.match(source, /revision|content_revisions/i)
})
```

- [ ] **Step 2: Run the test and verify expected failure**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: FAIL because current editors and save routes are English-only.

- [ ] **Step 3: Implement bilingual field helpers**

Create a small reusable admin field helper that displays the current English and Nepali values in the existing card and grid structures. Keep current field ordering and existing controls for URLs, numbers, assets, and non-translatable values. Apply the same helper to nested arrays using stable IDs/slugs.

- [ ] **Step 4: Update save and revision handling**

Validate localized payloads server-side, merge only the requested locale, preserve the other locale, and write the complete bilingual snapshot to `content_revisions`. Reject invalid locale values and malformed localized structures with the existing error response style.

- [ ] **Step 5: Translate admin interface copy**

Use the fixed catalog for sidebar labels, page headings, action labels, navigation controls, validation messages, and save errors. Do not create new admin routes or redesign the dashboard.

- [ ] **Step 6: Run admin tests**

Run: `node --test tests/bilingual-language.test.mjs tests/admin-directed-cms.test.mjs tests/public-cms-contract.test.mjs`

Expected: PASS with existing authorization and content-resource contracts intact.

---

### Task 6: Seed current Nepali translations and complete catalog audit

**Files:**
- Create: `scripts/seed-nepali-translations.cjs`
- Modify: `scripts/seed-original-cms.cjs`
- Modify: `lib/i18n-copy.ts`
- Modify: `tests/bilingual-language.test.mjs`

- [ ] **Step 1: Add a translation completeness test**

Test that every fixed-copy key has both locales and that each current public content group has a Nepali entry or explicit fallback-safe value. The test must report the exact missing key path.

- [ ] **Step 2: Run the test and verify it fails for unseeded content**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: FAIL listing missing Nepali content paths.

- [ ] **Step 3: Add the complete Nepali translation seed**

Translate the current published English copy into natural Nepali without adding new claims, changing names/metrics, or shortening/removing existing content. Seed fixed interface copy, profile/hero/about/contact content, projects, skills, experience, testimonials, services, articles, metadata, and admin UI labels. The script must be idempotent and use existing authenticated server-side storage patterns.

- [ ] **Step 4: Run the completeness test**

Run: `node --test tests/bilingual-language.test.mjs`

Expected: PASS with no missing translation paths.

---

### Task 7: Full verification and live responsive audit

**Files:**
- Modify only files required by failing verification checks.
- Test: `tests/bilingual-language.test.mjs` and the full existing test suite.

- [ ] **Step 1: Run all automated tests**

Run: `npm test`

Expected: all existing and bilingual tests pass with no unexpected failures.

- [ ] **Step 2: Run the production build checks**

Run: `npm run build`

Expected: the Next.js build completes successfully without TypeScript, route, or metadata errors.

- [ ] **Step 3: Verify the running server**

Use the existing `http://localhost:3001/` server and inspect desktop and 430px mobile views. Confirm:

```text
English default -> switch to नेपाली -> all existing visible copy changes
नेपाली -> refresh -> नेपाली remains selected
missing translation -> English fallback appears without blank UI
homepage -> articles -> services -> contact -> 404 keep the current route/layout
admin -> switch language -> editor shows paired values -> save one locale only
```

- [ ] **Step 4: Check visual invariants**

Confirm the existing hero composition, Buddha/mountain/Mukesh stacking, title animation, navigation spacing, section order, mobile menu, theme/color controls, and responsive overflow remain unchanged except for translated text wrapping.

- [ ] **Step 5: Report exact verification evidence**

Record the test counts, build result, routes checked, viewport sizes, and any fallback values observed. Do not claim full translation coverage without the completeness test and live route checks.
