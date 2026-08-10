# Public Profile Field Notes Article Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with checkpoints.

**Goal:** Add five fact-grounded first-person Field Notes articles based on Mukesh Khadka's approved public professional profile, make every article link resolve through a real detail route, and add focused SEO and route verification.

**Architecture:** Keep article content in the existing `lib/articles.ts` data source. Add a server-rendered `app/articles/[slug]/page.tsx` route that reads the existing `Article` type, generates metadata and JSON-LD, and renders a self-contained editorial page. Extend the sitemap from the same article data so the index, detail pages, and SEO URLs share one source of truth.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, existing Field Notes CSS classes in `app/globals.css`, Node.js built-in test runner, and no new runtime dependencies.

## Global Constraints

- Use only the public professional facts listed in `docs/superpowers/specs/2026-08-10-public-profile-field-notes-design.md`.
- Do not publish birthday, marital status, gender, follower/following counts, friend data, private content, or third-party contact details.
- Do not copy Facebook photos or add new image assets.
- Preserve the existing Next.js application, portfolio routes, admin routes, APIs, and unrelated dirty-worktree changes.
- Keep the first-person Field Notes voice: calm, concrete, specific, and modest.
- Use existing article sorting and category behavior; the newest article must become the featured article.
- Keep article pages usable without JavaScript-dependent navigation.

---

### Task 1: Add failing coverage for the article series contract

**Files:**
- Modify: `tests/field-notes-articles.test.mjs`
- Read: `lib/articles.ts`, `app/articles/page.tsx`, `app/sitemap.ts`

**Interfaces:**
- Consumes: the current `Article` data export and existing article index/sitemap source text.
- Produces: tests that fail until the five records, detail route, and sitemap entries exist.

- [ ] **Step 1: Write the failing tests**

Create a Node test module that reads files with the existing `read(new URL(...))` pattern and asserts:

```js
import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

const requiredSlugs = [
  'building-software-for-the-way-nepal-works',
  'the-work-after-the-launch',
  'from-janakpur-to-kathmandu',
  'why-aasha-tech-focuses-on-useful-systems',
  'the-quiet-discipline-behind-a-growing-software-practice',
]

test('the approved public-profile article series is represented in the article source', async () => {
  const articles = await read('lib/articles.ts')

  for (const slug of requiredSlugs) assert.match(articles, new RegExp(`slug:\\s*'${slug}'`))
  assert.match(articles, /Aasha Tech Pvt\\. Ltd\\./)
  assert.match(articles, /University of Sunderland/)
  assert.match(articles, /Janakpur/)
  assert.doesNotMatch(articles, /July 4, 1993|Married since|2\\.4K followers|282 following/)
})

test('article detail pages and sitemap are wired to article slugs', async () => {
  const [detailRoute, sitemap] = await Promise.all([
    read('app/articles/[slug]/page.tsx'),
    read('app/sitemap.ts'),
  ])

  assert.match(detailRoute, /generateStaticParams/)
  assert.match(detailRoute, /generateMetadata/)
  assert.match(detailRoute, /notFound\(\)/)
  assert.match(detailRoute, /BlogPosting|Article/)
  assert.match(sitemap, /getArticles\(\)/)
  assert.match(sitemap, /article\.slug/)
})

test('article detail pages contain the approved provenance and content boundaries', async () => {
  const detailRoute = await read('app/articles/[slug]/page.tsx')

  assert.match(detailRoute, /Mukesh Khadka/)
  assert.match(detailRoute, /Aasha Tech/)
  assert.match(detailRoute, /khadkamukesh\.com\.np/)
  assert.doesNotMatch(detailRoute, /July 4, 1993|Married since|follower|following|missing-child|9707795284/)
})
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```powershell
npm.cmd test -- --test-name-pattern "approved public-profile article series|article detail pages|provenance"
```

Expected: FAIL because the five new slugs and `app/articles/[slug]/page.tsx` do not yet exist.

- [ ] **Step 3: Commit the failing test**

```powershell
git add -- tests/field-notes-articles.test.mjs
git commit -m "test: define profile field notes article contract"
```

---

### Task 2: Draft and add the five Field Notes articles

**Files:**
- Modify: `lib/articles.ts`

**Interfaces:**
- Consumes: the existing `Article` type with `slug`, `title`, `excerpt`, `body`, `category`, `readMinutes`, `date`, and `tags`.
- Produces: five complete article records sorted ahead of the existing 2026-07-12 article.

- [ ] **Step 1: Add the article records**

Add these records before the current first article, using dates in descending order:

```ts
{
  slug: 'building-software-for-the-way-nepal-works',
  title: 'Building software for the way Nepal works',
  excerpt: 'The best local software does not imitate a place. It pays attention to how people already work, then removes the friction that gets in their way.',
  category: 'Context',
  readMinutes: 5,
  date: '2026-08-10',
  tags: ['Nepal', 'Localization', 'Workflow'],
}
{
  slug: 'the-work-after-the-launch',
  title: 'The work after the launch',
  excerpt: 'A system proves itself after the launch call, when the records, backups, ownership, and ordinary Tuesday all have to keep moving.',
  category: 'Practice',
  readMinutes: 4,
  date: '2026-08-08',
  tags: ['Operations', 'Reliability', 'Software'],
}
{
  slug: 'from-janakpur-to-kathmandu',
  title: 'From Janakpur to Kathmandu',
  excerpt: 'A professional origin story shaped by two places, a systems engineering education, and the decision to build useful software in Nepal.',
  category: 'Field notes',
  readMinutes: 4,
  date: '2026-08-06',
  tags: ['Nepal', 'Practice', 'Origins'],
}
{
  slug: 'why-aasha-tech-focuses-on-useful-systems',
  title: 'Why Aasha Tech focuses on useful systems',
  excerpt: 'The strongest software work starts with the records, decisions, and handoffs that an organization has to get right every day.',
  category: 'Practice',
  readMinutes: 5,
  date: '2026-08-04',
  tags: ['Aasha Tech', 'Systems', 'Organizations'],
}
{
  slug: 'the-quiet-discipline-behind-a-growing-software-practice',
  title: 'The quiet discipline behind a growing software practice',
  excerpt: 'Technical study matters, but dependable delivery comes from the quieter habits: listening closely, naming things clearly, and staying with the work after it ships.',
  category: 'Craft',
  readMinutes: 5,
  date: '2026-08-02',
  tags: ['Craft', 'Learning', 'Delivery'],
}
```

For each `body`, write 650–900 words in first person with three to five concrete sections. Use the approved source facts only: Kathmandu and Janakpur as geographic context; University of Sunderland, The British College Kathmandu, and Saurya International College for education context; Aasha Tech Pvt. Ltd. and the founder role for professional context; and existing portfolio project descriptions for examples. Do not invent client stories, quotes, metrics, revenue, team size, awards, or claims about private motivations.

End each article with a practical takeaway and a restrained invitation to describe a real workflow or problem. Do not use birthday, marital status, gender, follower counts, friend data, or third-party missing-person details.

- [ ] **Step 2: Run content-contract tests**

Run:

```powershell
npm.cmd test -- --test-name-pattern "approved public-profile article series"
```

Expected: PASS for all five slugs, required source anchors, and prohibited-detail checks.

- [ ] **Step 3: Commit the content source**

```powershell
git add -- lib/articles.ts
git commit -m "content: add Mukesh Khadka field notes series"
```

---

### Task 3: Implement the article detail route and metadata

**Files:**
- Create: `app/articles/[slug]/page.tsx`
- Modify: `app/globals.css` only if the existing Field Notes classes cannot provide readable article detail styling.

**Interfaces:**
- Consumes: `getArticle`, `getArticleSlugs`, and `Article` from `@/lib/articles`.
- Produces: statically generated, server-rendered article pages at `/articles/{slug}`.

- [ ] **Step 1: Implement the route**

Use this route shape:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import { getArticle, getArticleSlugs } from '@/lib/articles'

const siteUrl = 'https://khadkamukesh.com.np'

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug)
  if (!article) return {}

  return {
    title: `${article.title} — Field Notes`,
    description: article.excerpt,
    alternates: { canonical: `${siteUrl}/articles/${article.slug}` },
    openGraph: {
      type: 'article',
      url: `${siteUrl}/articles/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: ['Mukesh Khadka'],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const url = `${siteUrl}/articles/${article.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Mukesh Khadka',
      url: siteUrl,
      jobTitle: 'Founder & Independent Software Consultant',
      worksFor: { '@type': 'Organization', name: 'Aasha Tech Pvt. Ltd.' },
    },
    publisher: { '@type': 'Person', name: 'Mukesh Khadka', url: siteUrl },
    keywords: article.tags.join(', '),
  }

  return (
    <main className="public-route-shell gateway-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <article className="public-route-content public-route-main field-article">
        <a href="/articles" className="field-article__back"><ArrowLeft aria-hidden="true" /> Back to Field Notes</a>
        <header className="field-article__header">
          <span className="public-route-kicker">{article.category}</span>
          <h1>{article.title}</h1>
          <p className="field-article__excerpt">{article.excerpt}</p>
          <div className="field-article__meta">
            <span>Filed by Mukesh Khadka</span>
            <span><Clock aria-hidden="true" /> {article.readMinutes} min read</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
        </header>
        <div className="field-article__body">
          {article.body.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <footer className="field-article__footer">
          <p>Working through a real workflow or operational problem? <a href="/#contact">Open a project channel.</a></p>
          <p>Professional context: <a href="https://aashatech.com/">Aasha Tech</a> · <a href="https://khadkamukesh.com.np/">Portfolio</a> · <a href="https://www.facebook.com/Nepali.man.67">Public profile</a></p>
        </footer>
      </article>
    </main>
  )
}
```

Define `formatDate()` in the same route as a small server-safe helper using `Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })`. Keep the author block factual and do not add birthday, relationship, gender, social metrics, or third-party data.

- [ ] **Step 2: Add only the required scoped styles**

If the current stylesheet has no suitable article-detail rules, add a scoped `.field-article` block in `app/globals.css` for readable width, responsive padding, heading scale, metadata alignment, paragraph rhythm, link focus states, and mobile stacking. Do not touch global portfolio tokens or unrelated route styles.

- [ ] **Step 3: Run route-contract tests**

Run:

```powershell
npm.cmd test -- --test-name-pattern "article detail pages|provenance"
```

Expected: PASS, with the route exporting static params/metadata, calling `notFound()`, including article structured data, and omitting prohibited profile details.

- [ ] **Step 4: Commit the route**

```powershell
git add -- 'app/articles/[slug]/page.tsx' app/globals.css tests/field-notes-articles.test.mjs
git commit -m "feat: add field notes article detail pages"
```

---

### Task 4: Extend sitemap coverage from the article source

**Files:**
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `getArticles()` from `@/lib/articles`.
- Produces: sitemap entries for `/articles/{slug}` with each article’s publication date.

- [ ] **Step 1: Update the sitemap**

Import `getArticles` and append:

```ts
...getArticles().map((article) => ({
  url: `${siteUrl}/articles/${article.slug}`,
  lastModified: new Date(article.date),
  changeFrequency: 'monthly' as const,
  priority: 0.75,
})),
```

Keep the existing collection, contact, service, and homepage entries unchanged.

- [ ] **Step 2: Run the sitemap and article tests**

Run:

```powershell
npm.cmd test -- --test-name-pattern "article detail pages"
```

Expected: PASS with sitemap source using `getArticles()` and article slugs.

- [ ] **Step 3: Commit the sitemap change**

```powershell
git add -- app/sitemap.ts
git commit -m "seo: include field notes article URLs in sitemap"
```

---

### Task 5: Verify the complete article workflow

**Files:**
- Read: `lib/articles.ts`, `app/articles/page.tsx`, `app/articles/[slug]/page.tsx`, `app/sitemap.ts`, `tests/field-notes-articles.test.mjs`
- Modify: none unless verification exposes a scoped defect.

**Interfaces:**
- Consumes: the completed article source, detail route, and sitemap.
- Produces: evidence that the index, all five detail pages, metadata, not-found behavior, and existing test suite are working.

- [ ] **Step 1: Run the focused contract tests**

```powershell
npm.cmd test -- --test-name-pattern "public-profile article series|article detail pages|provenance"
```

Expected: PASS for all focused article tests.

- [ ] **Step 2: Run the full test suite**

```powershell
npm.cmd test
```

Expected: Existing tests pass or any unrelated baseline failures are reported separately without masking article failures.

- [ ] **Step 3: Build the Next.js application**

```powershell
npm.cmd run build
```

Expected: Successful production build with static article routes listed among generated pages.

- [ ] **Step 4: Verify route behavior locally**

Start the existing app with the project’s normal Next.js command, then request:

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3000/articles
Invoke-WebRequest -UseBasicParsing http://localhost:3000/articles/building-software-for-the-way-nepal-works
Invoke-WebRequest -UseBasicParsing http://localhost:3000/articles/the-work-after-the-launch
Invoke-WebRequest -UseBasicParsing http://localhost:3000/articles/from-janakpur-to-kathmandu
Invoke-WebRequest -UseBasicParsing http://localhost:3000/articles/why-aasha-tech-focuses-on-useful-systems
Invoke-WebRequest -UseBasicParsing http://localhost:3000/articles/the-quiet-discipline-behind-a-growing-software-practice
```

Expected: HTTP 200 for the index and each article. Requesting `/articles/not-a-real-article` must return the app’s not-found response.

- [ ] **Step 5: Inspect rendered content and metadata**

Confirm the index promotes the newest article, every card link resolves, detail pages show title/excerpt/byline/date/read time/body/tags or source links as implemented, canonical URLs use `https://khadkamukesh.com.np/articles/{slug}`, JSON-LD uses `Mukesh Khadka` and `Aasha Tech Pvt. Ltd.`, and prohibited personal/third-party details are absent.

- [ ] **Step 6: Review the final diff and preserve unrelated work**

```powershell
git status --short
git diff --check HEAD~5..HEAD
git diff --name-only HEAD~5..HEAD
```

Expected: only the article implementation commits contain article-related files; pre-existing unrelated modifications remain untouched.

- [ ] **Step 7: Commit any final scoped fixes**

```powershell
git add -- lib/articles.ts 'app/articles/[slug]/page.tsx' app/sitemap.ts app/globals.css tests/field-notes-articles.test.mjs
git commit -m "chore: verify field notes publishing workflow"
```

