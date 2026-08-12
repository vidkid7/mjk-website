# Fully Admin-Directed CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the current redesigned public site fully Supabase-backed and editable through the admin panel without runtime hardcoded content blocks.

**Architecture:** Keep the existing current gateway/tech-noir visual design. Store page-level metadata and reusable UI copy in `site_pages`, keep collection content in the existing normalized tables, expose both through the validated `/api/content` route, and add admin editors for every `site_pages` record consumed by public routes. Public components receive CMS content through `loadPublicContent`; fixed layout labels become CMS fields with safe empty fallbacks only for unavailable content.

**Tech Stack:** Next.js 14 App Router, TypeScript, React, Supabase/Postgres, existing `/api/content` service-role boundary, Node test runner, Next production build.

## Global Constraints

- Preserve the current redesigned gateway/tech-noir public visual design.
- Do not modify the existing `nita-clinics` database.
- Do not expose Supabase credentials or raw secrets.
- Keep public reads server-side through `loadPublicContent` and keep admin writes behind `isAdminRequest`.
- Existing article, portrait, and seeded content must remain intact unless a field is explicitly migrated.
- No public page may import starter content modules as its runtime source.
- Every new production behavior must have a failing test before implementation.

---

### Task 1: Define and test complete CMS coverage

**Files:**
- Create: `tests/admin-directed-cms.test.mjs`
- Modify: `tests/public-cms-contract.test.mjs`

**Interfaces:**
- The coverage test will require public records for `site_profile`, `site_hero`, `site_about`, `site_contact`, `site_ui`, and `site_services`.
- The test will require matching admin routes or an admin pages editor for each page record.
- The test will reject current public component literals for headings, contact copy, footer navigation, and service links.

- [ ] **Step 1: Write failing coverage assertions**

```js
test('current public loader exposes every admin-directed page record', async () => {
  const server = await source('lib/public-content-server.ts')
  for (const key of ['profile', 'heroCopy', 'aboutCopy', 'contactCopy', 'uiCopy', 'services']) {
    assert.match(server, new RegExp(`pageData\\(pages, ['"]${key}['"]\\)`), `missing ${key}`)
  }
})

test('admin navigation exposes editors for every public page record', async () => {
  const layout = await source('app/admin/layout.tsx')
  for (const href of ['/admin/site-content', '/admin/services']) {
    assert.match(layout, new RegExp(href.replace('/', '\\/')), `missing ${href}`)
  }
})

test('public components do not own editable copy', async () => {
  const files = await Promise.all([
    source('components/portfolio/Projects.tsx'),
    source('components/portfolio/Skills.tsx'),
    source('components/portfolio/Experience.tsx'),
    source('components/portfolio/Contact.tsx'),
    source('components/portfolio/Footer.tsx'),
  ])
  for (const content of files) {
    assert.doesNotMatch(content, /Systems built for the work|What I can help you with|Inbound channels are open|Studio live/)
  }
})
```

- [ ] **Step 2: Run the targeted test and verify it fails for missing records/editors/literals**

Run: `node --test tests/admin-directed-cms.test.mjs`

Expected: FAIL because the new page records, admin editor, and component props do not exist yet.

### Task 2: Add typed page-level CMS records and API support

**Files:**
- Modify: `lib/public-content.ts`
- Modify: `lib/public-content-server.ts`
- Modify: `app/api/content/route.ts`
- Modify: `supabase/migrations/20260810_public_cms.sql`

**Interfaces:**
- `site_pages.page_key` values: `profile`, `heroCopy`, `aboutCopy`, `contactCopy`, `uiCopy`, `services`.
- `uiCopy` owns reusable labels for navigation, project/skills/experience/testimonial/contact/footer sections.
- `services` remains an array of typed service records and is read through the same server loader.

- [ ] **Step 1: Add a migration comment/constraint and a typed page-key union**
- [ ] **Step 2: Add `pageData` reads for all six page records**
- [ ] **Step 3: Map all values into `PublicContent` with no starter-module fallback**
- [ ] **Step 4: Extend API validation so pages can be read and written only by authenticated admin requests**
- [ ] **Step 5: Run typecheck and the targeted test; verify the test still fails only on missing admin UI/component props**

### Task 3: Build the missing admin editors

**Files:**
- Create: `app/admin/site-content/page.tsx`
- Create: `app/admin/services/page.tsx`
- Create: `components/admin/PageContentEditor.tsx`
- Modify: `app/admin/layout.tsx`
- Modify: `app/admin/history/page.tsx`

**Interfaces:**
- `PageContentEditor` accepts `{ pageKey: string; title: string; schema: FieldSchema[]; initialData: Record<string, unknown> }` and persists through `saveData('pages', ...)` or the existing `/api/content` page action.
- The site-content editor manages `profile`, `heroCopy`, `aboutCopy`, `contactCopy`, and `uiCopy` in one authenticated admin screen.
- The services editor manages the `services.items` array with add/edit/delete/reorder and publish status.

- [ ] **Step 1: Add failing UI/source assertions for the two admin routes and page keys**
- [ ] **Step 2: Implement the shared editor with validation, save state, and error state**
- [ ] **Step 3: Add the site-content admin route and fields for all public metadata/copy**
- [ ] **Step 4: Add the services admin route and service-item editor**
- [ ] **Step 5: Add both resources to history coverage**
- [ ] **Step 6: Run admin-directed tests and verify they pass**

### Task 4: Refactor the current redesigned public site to consume CMS copy

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/portfolio/Navbar.tsx`
- Modify: `components/portfolio/Projects.tsx`
- Modify: `components/portfolio/Skills.tsx`
- Modify: `components/portfolio/Experience.tsx`
- Modify: `components/portfolio/Testimonials.tsx`
- Modify: `components/portfolio/Contact.tsx`
- Modify: `components/portfolio/Footer.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/articles/page.tsx`
- Modify: `app/articles/[slug]/page.tsx`

**Interfaces:**
- Each component receives its editable labels/copy through `PublicContent`; visual structure and animations remain unchanged.
- Navigation and service links come from `content.site` and `content.services`, not local arrays.
- Contact-panel, footer, article route, and service route copy come from `uiCopy`/route content records.

- [ ] **Step 1: Write failing assertions for removed component-owned copy**
- [ ] **Step 2: Add props and render the CMS fields in the current visual components**
- [ ] **Step 3: Replace local navigation/service arrays with loader data**
- [ ] **Step 4: Replace route-level editable prose with CMS page fields while preserving structural labels that are not content**
- [ ] **Step 5: Run targeted tests and verify no current public route imports starter content modules**

### Task 5: Seed and migrate the current content safely

**Files:**
- Modify: `scripts/seed-original-cms.cjs`
- Create: `scripts/seed-admin-directed-cms.test.cjs` only if seed-shape verification needs a standalone test

**Interfaces:**
- Seed only the new `mjk-portfolio-cms` project ref.
- Preserve the existing 11 articles and portrait asset paths.
- Seed page records with the current intended content and all UI-copy fields required by the public loader.

- [ ] **Step 1: Add seed-shape assertions for all six page records**
- [ ] **Step 2: Run the assertions and verify failure before adding the new records**
- [ ] **Step 3: Extend the seed utility transactionally**
- [ ] **Step 4: Run the seed and verify page keys, article count, image paths, and service count through `/api/content`**

### Task 6: Verify public/admin behavior and close the implementation

**Files:**
- Modify: `tests/public-cms-contract.test.mjs` if needed for final coverage
- Modify: `docs/superpowers/plans/2026-08-11-admin-directed-cms.md` to mark completed steps

- [ ] **Step 1: Run `npx tsc --noEmit --pretty false`**
- [ ] **Step 2: Run `node --test tests/public-cms-contract.test.mjs tests/admin-directed-cms.test.mjs`**
- [ ] **Step 3: Run `npm run build` and confirm exit code 0**
- [ ] **Step 4: Restart the local production server**
- [ ] **Step 5: Verify public 200 responses for `/`, `/articles`, `/services`, `/contact`, and an article slug**
- [ ] **Step 6: Verify admin routes return the authenticated admin shell and API writes remain protected**
- [ ] **Step 7: Report any remaining structural hardcoded strings separately from editable content**
