# Database-Backed Public CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Connect every active public page and section to Supabase-managed content and expose the missing content controls in `/admin`.

**Architecture:** Keep the existing collection tables for structured homepage data, add `site_pages` for route-specific JSON content, and add stable article slugs to `news_posts`. A server-only public content loader will normalize database rows into the props consumed by the active portfolio components. The public app will not use localStorage or TypeScript starter content at runtime.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Supabase Postgres, Node built-in test runner, existing Tailwind/admin UI.

## Global Constraints

- Supabase is the source of truth for visitor-facing content.
- Service-role credentials remain server-only.
- Existing unrelated redesign changes must be preserved.
- Starter constants may be used only by the explicit seed script and tests, never by public runtime rendering.
- Draft news/articles and unpublished initiatives must never appear publicly.
- Admin saves must revalidate the affected public routes.

---

### Task 1: Define the active public CMS contract with failing tests

**Files:**
- Create: `tests/public-cms-contract.test.mjs`
- Create: `lib/public-content.ts`
- Modify: `lib/storage.ts`

**Interfaces:**
- `getPublicContent(): Promise<PublicContent>` returns normalized homepage, route, service, article, and contact data.
- `PublicContent` includes `hero`, `about`, `projects`, `skills`, `experience`, `testimonials`, `contact`, `services`, `articles`, and `site`.
- `useStoredData` is no longer used by active public components.

- [ ] Write tests that fail until active public components import `getPublicContent` or receive its typed props; assert no active public component imports `lib/portfolio-content`, `lib/service-pages`, or `lib/articles`.
- [ ] Run `node --test tests/public-cms-contract.test.mjs` and confirm the failure identifies the current hardcoded imports.
- [ ] Implement the public content types and normalization boundary without yet changing every consumer.
- [ ] Run the focused test and confirm the contract helper tests pass.

### Task 2: Add database storage for route-specific CMS content

**Files:**
- Modify: `lib/schema.sql`
- Modify: `supabase-schema.sql`
- Modify: `app/api/content/route.ts`
- Create: `supabase/migrations/20260810_public_cms.sql`

**Interfaces:**
- API key `pages` reads public `site_pages` records and admin reads all records.
- API key `services` reads published service records and admin reads drafts.
- `POST /api/content` accepts `{ key: 'pages' | 'services', data }` only for an authenticated admin.

- [ ] Add `site_pages(page_key TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW())`.
- [ ] Add `slug TEXT UNIQUE` and `read_minutes INT` to `news_posts` where absent, preserving existing rows.
- [ ] Add API read/write cases with validation for `pages`, `services`, and stable article slugs.
- [ ] Add published filtering for public service/article reads.
- [ ] Add `revalidatePath` calls for `/`, `/services`, `/articles`, `/contact`, and dynamic detail routes after admin saves.
- [ ] Run schema/API contract tests and confirm authenticated writes are protected.

### Task 3: Create the server-side public content loader

**Files:**
- Create: `lib/public-content-server.ts`
- Modify: `lib/public-content.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- `loadPublicContent(): Promise<PublicContent>` uses the server-only Supabase client and the API’s normalized shapes.
- Missing database configuration throws a descriptive `PublicContentError`; it does not fall back to starter copy.
- `resolvePublicSettings()` maps `site_settings` into metadata/contact values.

- [ ] Implement server-only Supabase access using `SUPABASE_SERVICE_ROLE_KEY` without exporting the client to client components.
- [ ] Normalize all existing tables and `site_pages` records into the public contract.
- [ ] Add a controlled CMS-unavailable state for local/deployment misconfiguration.
- [ ] Verify the loader type-checks with no database credentials present at build time.

### Task 4: Rewire the homepage sections to database props

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/portfolio/Hero.tsx`
- Modify: `components/portfolio/About.tsx`
- Modify: `components/portfolio/Projects.tsx`
- Modify: `components/portfolio/Skills.tsx`
- Modify: `components/portfolio/Experience.tsx`
- Modify: `components/portfolio/Testimonials.tsx`
- Modify: `components/portfolio/Contact.tsx`
- Modify: `components/portfolio/Footer.tsx`
- Modify: `components/portfolio/Marquee.tsx`

**Interfaces:**
- Each section receives only the normalized content it renders.
- Section visibility comes from `site_settings.visible_sections`.
- Presentation constants such as animation timings, icons, and CSS class names remain code-owned; copy, links, numbers, images, projects, skills, experience, testimonials, and contact values become data-owned.

- [ ] Add `loadPublicContent()` to the homepage server component.
- [ ] Pass props through the client boundaries and remove runtime imports from `lib/portfolio-content`.
- [ ] Render only enabled sections and remove hardcoded metrics/labels/links from the active components.
- [ ] Keep a single canonical social/contact/settings source for the homepage and `/contact`.
- [ ] Run the homepage static contract tests and TypeScript check.

### Task 5: Rewire services, articles, and contact routes

**Files:**
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/articles/page.tsx`
- Modify: `app/articles/[slug]/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `robots`/metadata files only if the CMS route list requires it.

**Interfaces:**
- Service pages use published database records and call `notFound()` for unknown/unpublished slugs.
- Articles use published `news_posts` rows and stable slugs.
- Contact route copy, channels, and metadata use the normalized settings/page record.
- Sitemap includes only published services/articles plus fixed public routes.

- [ ] Replace imports from `lib/service-pages`, `lib/articles`, and `lib/portfolio-content` with `loadPublicContent()`.
- [ ] Preserve canonical URLs, JSON-LD, breadcrumbs, and existing visual shell.
- [ ] Ensure drafts are absent from indexes and sitemap.
- [ ] Add route-level 200/404 contract coverage.

### Task 6: Add admin controls for all active public content

**Files:**
- Create: `app/admin/portfolio/page.tsx`
- Create: `app/admin/services/page.tsx`
- Modify: `app/admin/layout.tsx`
- Modify: `app/admin/news/page.tsx`
- Modify: `app/admin/settings/page.tsx`
- Modify: `components/admin/AdminDataNotice.tsx` if needed for CMS source status.

**Interfaces:**
- `/admin/portfolio` edits homepage labels, contact copy, route labels, and visible-section settings.
- `/admin/services` creates, edits, publishes, unpublishes, and deletes service records.
- `/admin/news` edits stable article slugs and publication state used by `/articles`.
- Every editor uses `useAdminContent`, authenticated API writes, revision history, and save feedback.

- [ ] Build form controls for the `pages` JSON contract with explicit fields, not an opaque JSON textarea.
- [ ] Add service CRUD controls matching the public service schema.
- [ ] Add slug editing with uniqueness validation and a safe generated slug for new articles.
- [ ] Add navigation links and preview links for every active public route.
- [ ] Verify a saved admin value is returned by the public loader contract.

### Task 7: Seed and migrate existing content into Supabase

**Files:**
- Create: `scripts/seed-public-cms.mjs`
- Create: `docs/superpowers/public-cms-migration.md`
- Modify: `package.json`

**Interfaces:**
- `npm run cms:seed -- --dry-run` prints planned inserts/updates without mutation.
- `npm run cms:seed -- --replace` explicitly replaces matching seed keys.
- The script requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and exits safely when absent.

- [ ] Convert current curated constants into seed records without importing them into public runtime.
- [ ] Seed existing hero/about/projects/skills/experience/testimonials/settings, services, and articles.
- [ ] Preserve existing database records by default; require `--replace` for overwrite.
- [ ] Document the one-time migration and verify counts after execution when credentials are supplied.

### Task 8: Full verification and handoff

**Files:**
- Modify: `tests/public-cms-contract.test.mjs`
- Modify: `tests/platform-improvements.test.mjs` only if the CMS route contract requires it.

- [ ] Run focused CMS tests.
- [ ] Run `npx.cmd tsc --noEmit`.
- [ ] Run `npm.cmd test` and separate new failures from pre-existing failures.
- [ ] Run `npm.cmd run build` in an isolated generated-output state.
- [ ] With Supabase configured, smoke-test `/`, `/services`, each service detail route, `/articles`, each article detail route, and `/contact`.
- [ ] Confirm no active public route imports runtime starter constants.
- [ ] Commit scoped implementation changes without staging unrelated worktree files.
