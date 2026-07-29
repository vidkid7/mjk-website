# Prismatic Heritage Liquid-Glass Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign every public, editorial, fallback, and admin page as an accessible Prismatic Heritage liquid-glass experience, retaining all content, routes, data contracts, and SEO.

**Architecture:** A small shared component layer will render ambient decorative light and provide semantic glass-surface classes. Global CSS will contain the visual tokens, responsive behavior, form controls, and reduced-motion fallback. Existing route components retain their data hooks and business logic and adopt the shared visual primitives.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS 3, Framer Motion, Lucide React, Node built-in test runner.

## Global constraints

- Preserve every existing route, copy string, media URL, metadata export, JSON-LD object, Supabase/storage contract, and API contract.
- Preserve the Nepal-inspired crimson, navy, and gold palette; Inter remains the UI typeface and Playfair Display the display typeface.
- Preserve heading hierarchy, labels, keyboard interaction, focus indication, and `prefers-reduced-motion` support.
- Do not add dependencies or external image services.
- Keep delayed/lazy hero-media behavior required by `tests/search-safety.test.mjs` intact.

## Files and responsibilities

- `components/ui/LiquidBackdrop.tsx`: decorative, non-interactive public/admin ambient layers.
- `components/ui/GlassSurface.tsx`: names glass variants without affecting content/data behavior.
- `app/globals.css`: visual tokens, surface classes, responsive rules, animation controls, and scoped admin controls.
- `tests/liquid-design-contract.test.mjs`: static regression checks for the shared visual system.
- `components/sections/*.tsx` and referenced `components/ui/*.tsx`: homepage system adoption.
- `app/services/**/*.tsx` and `app/blog/**/*.tsx`: editorial public route adoption.
- `app/admin/**/*.tsx` and `components/admin/*.tsx`: dense dark-glass management workspace adoption.
- `app/error.tsx` and `app/not-found.tsx`: shared fallback composition.

## Task 1: Lock the visual-system contract with a failing test

**Files:** Create `tests/liquid-design-contract.test.mjs`.

**Consumes:** the files introduced by later tasks. **Produces:** regression coverage for public/admin roots and reduced-motion tokens.

- [ ] Add a Node test using `node:test`, `node:assert/strict`, and `readFile` with these assertions: `components/ui/LiquidBackdrop.tsx` contains `LiquidBackdrop`; `components/ui/GlassSurface.tsx` contains `glass-panel`; `app/page.tsx` imports/uses `LiquidBackdrop`; `app/admin/layout.tsx` contains `admin-liquid-shell`; and `app/globals.css` includes `--liquid-navy` and `prefers-reduced-motion`.
- [ ] Run `node --test tests/liquid-design-contract.test.mjs`; expect failure before Tasks 2–6.
- [ ] Keep the assertions unchanged while implementing; run `npm.cmd test` after Task 6 and expect the new test plus existing search-safety tests to pass.
- [ ] Commit with `git add tests/liquid-design-contract.test.mjs` then `git commit -m "test: cover shared liquid design system"`.

## Task 2: Build shared liquid and glass primitives

**Files:** Create `components/ui/LiquidBackdrop.tsx` and `components/ui/GlassSurface.tsx`; modify `app/globals.css` and `tailwind.config.ts`.

**Consumes:** `cn` from `lib/utils.ts`. **Produces:** `LiquidBackdrop({ variant?: 'public' | 'admin', className?: string })`; `glassSurfaceClass(variant, className?)`; CSS classes `liquid-page`, `liquid-backdrop`, `glass-panel`, `glass-inset`, `glass-action`, `admin-liquid-shell`, `admin-card`, and `admin-control`.

- [ ] Implement `LiquidBackdrop` as an `aria-hidden` wrapper containing crimson, gold, and blue blob spans plus a grain span. Each layer must be `pointer-events-none`; variants must differ only through modifier classes.
- [ ] Implement `GlassSurface.tsx` as a typed record mapping `panel`, `inset`, `action`, and `dark` to named CSS classes. Do not create a wrapper that changes semantic markup.
- [ ] Add tokens: `--liquid-navy: #071a35`, `--liquid-navy-deep: #020b1b`, `--liquid-crimson: #dc2626`, `--liquid-gold: #f2bd4b`, `--liquid-text: #112846`, `--glass-light`, `--glass-dark`, and `--glass-shadow`.
- [ ] Implement light/dark panels with translucent backgrounds, borders, box shadows, and `backdrop-filter`; include fallbacks that retain contrast where blur is unsupported.
- [ ] Define slow blob drift only under normal motion and, within the existing reduced-motion media query, stop `liquid-blob` animation and hide the grain. Retain all existing flag/video reduced-motion selectors.
- [ ] Add semantic `liquid` color aliases in `tailwind.config.ts`; retain existing color keys because the current components still consume them.
- [ ] Run `node --test tests/liquid-design-contract.test.mjs`; expect only root-integration assertions to fail. Commit as `feat: add prismatic glass design primitives`.

## Task 3: Redesign the homepage frame and shared public components

**Files:** Modify `app/page.tsx`, `components/sections/Navbar.tsx`, `Hero.tsx`, `Marquee.tsx`, `Footer.tsx`, and `components/ui/SectionHeading.tsx`.

**Consumes:** Task 2 primitives. **Produces:** a public `liquid-page` root with an ambient background and coherent navigation, hero, heading, ticker, and footer treatments.

- [ ] In `app/page.tsx`, import `LiquidBackdrop`; wrap the existing main content in `className="liquid-page public-liquid-page relative overflow-hidden"`, render `<LiquidBackdrop variant="public" />`, and place the existing section sequence in a `relative z-10` wrapper. Preserve every `show('section')` condition and ordering.
- [ ] Convert fixed navigation to a readable frosted glass panel and the mobile drawer to a dark glass panel. Preserve its current section detection, WebP logo, link targets, state, and animations. Convert the primary CTA to `glass-action` and use crimson/gold hover states rather than emerald.
- [ ] Keep all hero media, IDs, headline markup, CTA targets, lazy/delayed video logic, and `hidden lg:block` behavior exactly as current tests require. Add a high-contrast glass copy surface at larger widths and a compact mobile surface; no hero copy may become hidden behind decoration.
- [ ] Restyle marquee, section tags/rules, and footer/newsletter as shared glass surfaces. Keep footer links, social destinations, localStorage newsletter behavior, and logo path unchanged.
- [ ] Run `node --test tests/search-safety.test.mjs tests/liquid-design-contract.test.mjs`; expect pass. Commit as `feat: restyle shared public framing`.

## Task 4: Apply the system to every homepage section and interactive card

**Files:** Modify all files in `components/sections/` except the Task 3 files, plus `components/ui/about-us-section.tsx`, `feature-carousel.tsx`, `interactive-bento-gallery.tsx`, `news-cards.tsx`, `flipping-card.tsx`, and `Button.tsx`.

**Consumes:** Task 2 class names. **Produces:** the existing homepage content with alternating public light/dark liquid compositions, readable glass cards, and unified buttons.

- [ ] Keep every current section ID, semantic element, `useStoredData` call, animation prop, image alt text, lazy-loading rule, map key, contact submit handler, and carousel/gallery control.
- [ ] Add a `public-section` wrapper to each section root and alternate `public-section--light` / `public-section--dark` variants to prevent a flat page. Decorative gradients must remain non-interactive and aria-hidden.
- [ ] Replace opaque informational cards with `glass-panel rounded-[1.75rem] p-6 md:p-8`; use `glass-inset rounded-2xl p-4` for nested statistics, captions, and quotes; use `glass-action` for primary actions. Do not rewrite any stored content.
- [ ] Keep image and card interactions accessible and preserve existing H1/H2 choices; in particular, the gallery must remain H2-only to keep the single homepage H1 guarantee.
- [ ] At 390px, 768px, and 1440px verify navigation anchors, card readability, gallery behavior, contact controls, and no horizontal overflow. Run `npm.cmd test`. Commit as `feat: apply liquid glass to homepage sections`.

## Task 5: Redesign service and blog public routes without SEO changes

**Files:** Modify `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/blog/page.tsx`, and `app/blog/[slug]/page.tsx`.

**Consumes:** Task 2 primitives and existing service/blog data APIs. **Produces:** editorial liquid-glass listing and article pages with their current metadata and structured data intact.

- [ ] Wrap every current route main in `liquid-page`, add `<LiquidBackdrop variant="public" />`, and render existing content inside a relative z-index wrapper. Turn route headers into sticky glass panels while retaining every current destination.
- [ ] Service listings use glass cards; detail pages use a glass hero, inset outcome/FAQ blocks, process cards, and a dark glass CTA. Keep `generateStaticParams`, `generateMetadata`, canonical values, and `Service`, `FAQPage`, and `BreadcrumbList` objects functionally identical.
- [ ] Blog listings use glass post cards and date/category chips; detail pages use a framed cover image, gold-tinted takeaway inset, readable long-form typography, and a dark CTA. Keep legacy-content filtering, image lazy loading, canonical metadata, and all JSON-LD fields unchanged.
- [ ] Run `npm.cmd test`; load `/services`, each service slug, `/blog`, and each blog slug. Expect HTTP 200 without hydration errors. Commit as `feat: restyle editorial service and blog pages`.

## Task 6: Create the admin liquid workspace and shared controls

**Files:** Modify `app/admin/layout.tsx`, `app/admin/login/page.tsx`, `app/admin/page.tsx`, `components/admin/AdminDataNotice.tsx`, `components/admin/ImageUploadField.tsx`, and `app/globals.css`.

**Consumes:** Task 2 primitives, existing auth/upload endpoints, and existing sidebar logic. **Produces:** a dense dark-glass admin workspace with reusable cards, controls, notices, and upload state.

- [ ] Wrap the existing admin layout in `admin-liquid-shell` and `<LiquidBackdrop variant="admin" />`. Keep collapsed/mobile state, logout request, route-title lookup, active sidebar links, and login no-sidebar branch intact. Give the mobile overlay an explicit accessible close action.
- [ ] Define `.admin-card` as translucent navy with a white-alpha border and `.admin-control` as a scoped high-contrast input/select/textarea style. Scope all control selectors to `.admin-liquid-shell` so public forms are unchanged.
- [ ] Convert dashboard hero, overview cards, quick actions, message blocks, notices, login form, upload field/button/preview/error, and header/sidebar to named admin surfaces. Preserve all `useAdminContent`, refresh, input, and upload request behavior.
- [ ] Verify `/admin/login` client validation, authenticated/local `/admin`, sidebar collapse, mobile drawer, logout path, refresh, and image picker. Run the design-contract test and expect it to pass. Commit as `feat: create glass admin workspace shell`.

## Task 7: Apply admin styling to every management page and modal

**Files:** Modify `app/admin/about/page.tsx`, `achievements/page.tsx`, `entrepreneurship/page.tsx`, `gallery/page.tsx`, `hero/page.tsx`, `initiatives/page.tsx`, `messages/page.tsx`, `news/page.tsx`, `settings/page.tsx`, `stats/page.tsx`, `testimonials/page.tsx`, `vision/page.tsx`, `volunteers/page.tsx`, and `youth/page.tsx`.

**Consumes:** Task 6 styles. **Produces:** consistent editors, collections, data cards, dialogs, controls, and action hierarchy without changes to save/delete/publish logic.

- [ ] Convert every outer editor/collection card to `admin-card rounded-2xl p-5 md:p-7`; convert inputs, selects, and textareas to `admin-control`; use `glass-action` for save/create and a transparent bordered secondary action for cancel.
- [ ] Convert rows, cards, status chips, and icon actions to the dark glass system. Preserve keys, state setters, count text, edit/delete/publish handlers, and responsive overflow for data tables.
- [ ] Retain all modal state transitions. Use an accessible dark overlay and `admin-card` dialog; distinguish destructive actions with crimson treatment. Test every dialog at 390px.
- [ ] Manually verify unsaved field editing, modal cancellation, open/close behavior, image picking, publish toggle, messages display, and settings input. No styling change may introduce a new request or storage schema.
- [ ] Run `npm.cmd run build`; expect no TypeScript error. Commit as `feat: apply liquid glass to admin management pages`.

## Task 8: Finish fallback routes and verify the complete redesign

**Files:** Modify `app/error.tsx` and `app/not-found.tsx`; update `tests/liquid-design-contract.test.mjs` only if an assertion needs to reflect the completed source names.

**Consumes:** Task 2 primitives and existing error/reset/link behavior. **Produces:** coherent fallback pages that preserve retry and navigation behavior.

- [ ] Wrap each fallback in `liquid-page`, add `<LiquidBackdrop variant="public" />`, and place the existing icon/copy/actions in `glass-panel glass-panel--dark`. Preserve `reset()`, all copy, and all current link destinations.
- [ ] Run `npm.cmd test` and `npm.cmd run build`; both must pass.
- [ ] Inspect desktop and 390px views for `/`, `/services`, a service detail, `/blog`, a blog detail, `/admin/login`, `/admin`, `/admin/news`, `/admin/gallery`, and `/not-a-route`. Confirm no horizontal overflow, readable contrast, visible keyboard focus, reduced motion, functioning navigation, and no browser-console errors.
- [ ] Commit only redesign files with `git commit -m "feat: complete prismatic heritage redesign"`; confirm pre-existing untracked `output/` and `tmp/` remain untouched.
