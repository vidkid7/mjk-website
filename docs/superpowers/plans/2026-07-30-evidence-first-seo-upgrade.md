# Evidence-First SEO Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make existing project proof crawlable through static work pages, strengthen contextual linking and service content, and improve homepage image delivery without introducing unsupported claims.

**Architecture:** Store the six existing portfolio entries in a shared `workPages` data module. Build a static work hub and static work detail routes from that module, then use the same slugs to render related work links in service and blog detail templates. Preserve the current App Router metadata pattern and sitemap generation from shared source data.

**Tech Stack:** Next.js 14 App Router, TypeScript, React, Node test runner, Next metadata routes, Tailwind CSS, existing `lucide-react` icons.

## Global Constraints

- Use only facts already represented in the current portfolio source; do not add invented metrics, client quotes, technical stacks, or delivery claims.
- Keep existing public routes, metadata, storage fallbacks, admin behavior, and schema types intact.
- Add no dependencies.
- Use `apply_patch` for manual edits.
- Do not create commits unless the user explicitly requests one.

---

### Task 1: Specify crawlable work content in tests

**Files:**
- Modify: `tests/search-safety.test.mjs`
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: Future `lib/work-pages.ts`, `app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/sitemap.ts`, `components/sections/ClientPortfolio.tsx`.
- Produces: Source-level regression checks for work route discovery, schema, and portfolio linking.

- [ ] **Step 1: Write failing tests**

```js
test('work pages are included in the sitemap for crawling', async () => {
  const sitemap = await read('app/sitemap.ts')

  assert.match(sitemap, /import \{ workPages \} from '@\/lib\/work-pages'/)
  assert.match(sitemap, /url: `\$\{siteUrl\}\/work`/)
  assert.match(sitemap, /\.\.\.workPages\.map/)
})

test('portfolio cards link to internal work pages', async () => {
  const portfolio = await read('components/sections/ClientPortfolio.tsx')

  assert.match(portfolio, /href=\{`\/work\/\$\{item\.slug\}`\}/)
  assert.doesNotMatch(portfolio, /const aashaTechUrl/)
})

test('work details publish canonical CreativeWork and breadcrumb schema', async () => {
  const workPage = await read('app/work/[slug]/page.tsx')

  assert.match(workPage, /generateStaticParams/)
  assert.match(workPage, /'@type': 'CreativeWork'/)
  assert.match(workPage, /'@type': 'BreadcrumbList'/)
  assert.match(workPage, /alternates: \{ canonical: url \}/)
})

test('service and blog details surface related resources', async () => {
  const [servicePage, blogPostPage] = await Promise.all([
    read('app/services/[slug]/page.tsx'),
    read('app/blog/[slug]/page.tsx'),
  ])

  assert.match(servicePage, /Related work/)
  assert.match(blogPostPage, /Related resources/)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- --test-name-pattern="work pages|portfolio cards|work details|related resources"`

Expected: four failing tests because the work data module, routes, and related-resource markup do not exist.

### Task 2: Add the shared work-page data model

**Files:**
- Create: `lib/work-pages.ts`
- Modify: `components/sections/ClientPortfolio.tsx`
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Produces: `WorkPage`, `workPages`, and `getWorkPage(slug)`.
- Consumes: Existing six portfolio titles, categories, and descriptions.

- [ ] **Step 1: Create a minimal work data module**

```ts
export type WorkPage = {
  slug: string
  title: string
  category: string
  description: string
  focus: string[]
  serviceSlug: string
  blogSlug: string
}

export const workPages: WorkPage[] = [
  {
    slug: 'digital-sifaris-darta-chalani-system',
    title: 'Digital Sifaris & Darta Chalani System',
    category: 'Government / Institutional Projects',
    description: 'A centralized local-government system for recommendation letters, registration workflows, and official document tracking.',
    focus: ['Recommendation-letter workflows', 'Registration and document tracking', 'Clearer institutional records'],
    serviceSlug: 'custom-software-development-nepal',
    blogSlug: 'software-architecture-for-reliable-systems',
  },
]

export function getWorkPage(slug: string) {
  return workPages.find((work) => work.slug === slug)
}
```

Add the remaining five existing portfolio entries with the same evidence-only fields. Use service and blog slugs that already exist in `lib/service-pages.ts` and `lib/blog-posts.ts`.

- [ ] **Step 2: Update homepage portfolio data to include `slug`**

Add the matching slug to each `portfolioItems` entry and replace the external overlay anchor with:

```tsx
<a
  href={`/work/${item.slug}`}
  aria-label={`Read the ${item.title} project overview`}
  className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2"
>
  <span className="sr-only">Read the {item.title} project overview</span>
</a>
```

Change the visible card label to `View project overview`.

- [ ] **Step 3: Run the focused tests**

Run: `npm test -- --test-name-pattern="portfolio cards"`

Expected: PASS for the internal portfolio-link assertion; the work-route assertions remain failing until Task 3.

### Task 3: Add static work hub and work detail routes

**Files:**
- Create: `app/work/page.tsx`
- Create: `app/work/[slug]/page.tsx`
- Modify: `app/sitemap.ts`
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: `workPages` and `getWorkPage` from `lib/work-pages.ts`.
- Produces: Static `/work`, `/work/[slug]`, canonical metadata, `CollectionPage`, `ItemList`, `CreativeWork`, and breadcrumb markup.

- [ ] **Step 1: Implement the work hub**

Render a single H1, a short factual introduction, and a card for every `workPages` entry. Emit `CollectionPage` and `ItemList` JSON-LD. Use `metadata` with:

```ts
title: 'Selected Digital Systems Work | Mukesh Khadka'
description: 'Selected digital systems, workflow platforms, websites, and software project overviews from Mukesh Khadka in Nepal.'
alternates: { canonical: `${siteUrl}/work` }
```

- [ ] **Step 2: Implement the static work detail route**

Generate routes from `workPages`. For each page, render a single H1, the existing description, a `What this work focuses on` list from `focus`, a service link, a related-article link, breadcrumb navigation, and a contact call to action. Emit this data shape:

```ts
{
  '@type': 'CreativeWork',
  '@id': `${url}#work`,
  name: work.title,
  description: work.description,
  url,
  creator: { '@id': `${siteUrl}/#mukesh-khadka` },
  about: work.focus,
}
```

- [ ] **Step 3: Add work URLs to the sitemap**

Add the work hub at priority `0.9`, then map every work page at priority `0.75` using the same `siteLastModified` value as other evergreen content.

- [ ] **Step 4: Run the focused tests**

Run: `npm test -- --test-name-pattern="work pages|work details"`

Expected: PASS.

### Task 4: Add contextual service, article, and footer links

**Files:**
- Modify: `lib/service-pages.ts`
- Modify: `lib/blog-posts.ts`
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `components/sections/Footer.tsx`
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: service slugs, blog slugs, and `workPages`.
- Produces: Server-rendered contextual links among services, articles, and work pages.

- [ ] **Step 1: Extend content types with existing-route relationships**

Add `relatedWorkSlugs: string[]` and `relatedBlogSlugs: string[]` to `ServicePage`; add `relatedServiceSlug: string` and `relatedWorkSlugs: string[]` to `BlogPost`. Populate only valid existing slugs.

- [ ] **Step 2: Add a Work hub link to public navigation**

Add `{ label: 'Work', href: '/work' }` to `quickLinks` in the footer, and add a clearly labelled work-hub link below the service cards in `app/services/page.tsx`.

- [ ] **Step 3: Render service related work and insight links**

Import `workPages` and `getBlogPost` into the service route. Below the FAQ section, render a `Related work` section for `service.relatedWorkSlugs` and a `Useful insight` link for `service.relatedBlogSlugs[0]`.

- [ ] **Step 4: Render blog related service and work links**

Import `getServicePage` and `workPages` into the blog detail route. Before the enquiry aside, render a `Related resources` section linking to the article's relevant service and every `relatedWorkSlugs` entry.

- [ ] **Step 5: Run the focused tests**

Run: `npm test -- --test-name-pattern="service and blog details|footer gives crawlers"`

Expected: PASS.

### Task 5: Expand service content without unsupported claims

**Files:**
- Modify: `lib/service-pages.ts`
- Modify: `app/services/[slug]/page.tsx`
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: New `audience` and `deliveryFocus` fields in `ServicePage`.
- Produces: More substantial, purpose-specific service-page content.

- [ ] **Step 1: Write a failing source-level test**

```js
test('service data provides useful audience and delivery context', async () => {
  const serviceData = await read('lib/service-pages.ts')

  assert.match(serviceData, /audience:/)
  assert.match(serviceData, /deliveryFocus:/)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --test-name-pattern="service data provides useful audience"`

Expected: FAIL because the fields do not exist.

- [ ] **Step 3: Add factual service context**

Add `audience: string[]` and `deliveryFocus: string[]` to the type and each service entry. Examples must describe general fit and delivery focus, not promised results:

```ts
audience: ['Organizations clarifying a public-facing website', 'Teams replacing an unclear or hard-to-maintain web presence'],
deliveryFocus: ['Information structure and page hierarchy', 'Responsive interfaces and maintainable delivery'],
```

Render these as `Who this is for` and `Delivery focus` lists before the process section.

- [ ] **Step 4: Run focused tests**

Run: `npm test -- --test-name-pattern="service data provides useful audience|service pages publish canonical"`

Expected: PASS.

### Task 6: Correct Lighthouse image-sizing findings

**Files:**
- Modify: Only the public component files identified by a fresh Lighthouse `unsized-images` audit
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: Existing image assets and layouts.
- Produces: Explicit intrinsic image dimensions without visual layout regressions.

- [ ] **Step 1: Identify the exact unsized image elements**

Run:

```bash
node -e "const report=require('./tmp/lighthouse-mobile.json'); console.log(JSON.stringify(report.audits['unsized-images'].details?.items ?? [], null, 2))"
```

- [ ] **Step 2: Write a failing regression test for each touched component**

For example, when the report identifies a raw image in `components/sections/News.tsx`:

```js
test('news images provide intrinsic dimensions', async () => {
  const news = await read('components/sections/News.tsx')

  assert.match(news, /width=\{900\}/)
  assert.match(news, /height=\{600\}/)
})
```

- [ ] **Step 3: Add the minimum dimensions or compatible `next/image` replacement**

Preserve `alt`, `loading`, `decoding`, and existing responsive classes. Do not remove deferred video loading or alter the current visual composition.

- [ ] **Step 4: Run the focused regression test**

Run: `npm test -- --test-name-pattern="images provide intrinsic dimensions"`

Expected: PASS.

### Task 7: Validate, deploy, and request recrawl

**Files:**
- Test: `tests/search-safety.test.mjs`

**Interfaces:**
- Consumes: Completed routes, content data, metadata, sitemap, and image updates.
- Produces: Verified public deployment and new URLs queued for Google crawling.

- [ ] **Step 1: Run the complete regression suite**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: all static work pages appear in the generated route output and the build succeeds without type errors.

- [ ] **Step 3: Re-run Lighthouse**

Run:

```bash
npx --yes lighthouse https://khadkamukesh.com.np/ --only-categories=performance,seo --form-factor=mobile --screenEmulation.mobile=true --output=json --output-path=tmp/lighthouse-mobile-after.json --chrome-flags="--headless --no-sandbox"
```

Expected: SEO remains 100 and the `unsized-images` audit improves or clears.

- [ ] **Step 4: Deploy only after user authorization for production publishing**

Run:

```bash
npx --yes vercel --prod --yes --scope vidkids-projects-93622fab
```

- [ ] **Step 5: Verify new public URLs and request Search Console recrawl**

Check `/work`, one `/work/[slug]` page, and `/sitemap.xml` on the custom domain. In Google Search Console, inspect `/work` and one representative work page, then select `Request indexing`.