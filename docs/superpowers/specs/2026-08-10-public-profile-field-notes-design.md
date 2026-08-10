# Public Profile Field Notes Article Series

## Status

Approved direction pending written-spec review.

## Objective

Use the verified, publicly visible information from Mukesh Jung Khadka's Facebook profile and the existing portfolio content to publish a small first-person Field Notes series on the website. The series should make the person's work and perspective easier to understand without copying a social profile into an article or turning private/personal details into marketing claims.

## Existing project context

- The site is an existing Next.js 14 App Router portfolio.
- The editorial index is `/articles` and its content source is `lib/articles.ts`.
- The current articles are short first-person essays about software, workflows, Nepal, and dependable systems.
- The index already expects article slugs and links to `/articles/{slug}`, but this checkout does not currently contain an `app/articles/[slug]/page.tsx` detail route. The implementation should close that gap so the new articles are real, indexable pages.
- The current working tree contains unrelated changes. Only files required for this article work may be changed or staged.

## Editorial interpretation

The public profile presents four useful, supportable signals:

1. Mukesh is publicly presented as a verified entrepreneur and the Managing Director & Founder of Aasha Tech Pvt. Ltd.
2. His public education information identifies a BSc (Hons) Computer Systems Engineering background at the University of Sunderland, with study at The British College Kathmandu and Saurya International College.
3. His public profile connects his work to Kathmandu and his hometown to Janakpur.
4. The profile and existing site position him around practical software, useful systems, and Nepal-rooted work.

The articles should treat these as evidence for an editorial perspective, not as proof of unobservable personality traits. The writing can describe a public-facing builder/operator identity, but it must not claim motivations, private experiences, client outcomes, or personal beliefs that are not already supported by the portfolio or directly supplied by the user.

## Factual boundaries

### Allowed source facts

- Name: Mukesh Jung Khadka / Mukesh Khadka.
- Public profile username and public profile URL.
- Verified-account status as currently displayed.
- Entrepreneur category.
- Aasha Tech Pvt. Ltd.; Managing Director & Founder; December 2019–present.
- Kathmandu, Nepal; hometown Janakpur.
- Publicly displayed education institutions and degree/major.
- Publicly displayed business links: `aashatech.com` and `khadkamukesh.com.np`.
- Existing portfolio claims and project descriptions already present in the website source.

### Do not publish in the article series

- Birthday, marital status, gender, follower/following counts, or friend/mutual-friend information.
- Private messages, hidden fields, authentication data, or non-public Facebook content.
- Phone numbers, names, or identifying details from third-party posts, including the visible missing-child awareness post.
- Inferred claims such as “visionary,” “influential,” “community leader,” “self-made,” or “successful” unless rewritten as clearly attributed editorial framing and supported by published work.
- Fabricated quotes, client names, revenue, team size, awards, project counts, or performance metrics.

## Article series

The five articles below should be added to `lib/articles.ts` in the existing data shape. The newest article should be dated after the current latest article so it becomes the featured item automatically.

### 1. Building Software for the Way Nepal Works

- Slug: `building-software-for-the-way-nepal-works`
- Category: `Context`
- Angle: A first-person essay about designing around actual local workflows, language, institutional habits, and constraints rather than importing generic software assumptions.
- Verified anchors: Kathmandu/Janakpur context, software systems work, existing site language about practical systems and Nepali context.
- Reader promise: A concrete explanation of what “local context” changes in product decisions.

### 2. The Work After the Launch

- Slug: `the-work-after-the-launch`
- Category: `Practice`
- Angle: Why dependable systems are judged by ordinary use after deployment: readable logs, clear ownership, backups, maintenance, and workflows people can actually keep using.
- Verified anchors: Existing portfolio positioning around useful, reliable systems and the founder/operator role at Aasha Tech.
- Reader promise: A practical checklist for organizations evaluating whether software will keep working.

### 3. From Janakpur to Kathmandu

- Slug: `from-janakpur-to-kathmandu`
- Category: `Field notes`
- Angle: A restrained professional origin story using the public hometown/current-city information as geographic context, then moving quickly to education, software practice, and building in Nepal.
- Verified anchors: Janakpur, Kathmandu, University of Sunderland, The British College Kathmandu, and the existing first-person portfolio biography.
- Reader promise: A human introduction to the person behind the systems without publishing intimate personal details.

### 4. Why Aasha Tech Focuses on Useful Systems

- Slug: `why-aasha-tech-focuses-on-useful-systems`
- Category: `Practice`
- Angle: A founder’s explanation of the kinds of operational problems a software company should solve: records, workflows, reporting, communication, and the handoff from launch to routine.
- Verified anchors: Aasha Tech founder role, public business link, and project/service descriptions already present in the website.
- Reader promise: A clear explanation of the company’s practical value for prospective clients and collaborators.

### 5. The Quiet Discipline Behind a Growing Software Practice

- Slug: `the-quiet-discipline-behind-a-growing-software-practice`
- Category: `Craft`
- Angle: A reflective essay about combining technical study, project-driven learning, and careful delivery. It should remain modest and avoid unsupported claims about scale or success.
- Verified anchors: Computer Systems Engineering education, existing portfolio experience, and the public founder role.
- Reader promise: A credible account of the habits that make software work trustworthy.

## Voice and article shape

- First person, calm, direct, and specific.
- 650–900 words per article, with a 3–5 minute reading estimate.
- Strong opening scene or problem; no generic motivational introduction.
- Three to five short sections or paragraphs with descriptive subheads where useful.
- Each article ends with a practical takeaway and a restrained contact invitation.
- Use “I” for the author’s published professional position and clearly established experience; use “the profile presents” or “the work suggests” for interpretation.
- Avoid repeating the Facebook profile’s vanity metrics and avoid writing a biography as a list of credentials.

## Website integration

### Data

- Add the five articles to `lib/articles.ts` using the existing `Article` type and sorting behavior.
- Keep the existing article index presentation and category system unless a small label adjustment is needed for clarity.
- Add a small shared author provenance object only if it prevents repeated hard-coded identity text. It may contain Mukesh Khadka, Founder & Independent Software Consultant, Kathmandu, Nepal, Aasha Tech, and the two public links.

### Detail route

Create `app/articles/[slug]/page.tsx` with:

- `generateStaticParams()` from `getArticleSlugs()`.
- `generateMetadata()` from `getArticle(slug)` with a canonical URL, title, and description.
- A readable article layout matching the existing Field Notes visual language.
- Visible title, category, date, reading time, byline, excerpt, body paragraphs, tags, and a link back to `/articles`.
- A factual author block linking to the portfolio and Aasha Tech; the Facebook profile link may be included as a source/provenance link, not as a tracking or engagement prompt.
- `notFound()` for unknown slugs.
- Article JSON-LD using `Article` or `BlogPosting`, with author, headline, description, datePublished, dateModified, and canonical URL.

### Index and SEO

- Ensure each article link from `/articles` resolves successfully.
- Extend `app/sitemap.ts` with the five article URLs and the detail route's last-modified dates.
- Preserve the existing `/articles` collection metadata and structured data.
- Do not add unsupported Person schema fields. Use only the public author identity and professional role that are already present in site content.

### Assets and design

- Reuse the current Field Notes layout, typography, rules, and existing imagery.
- Do not download or copy Facebook photos into the website without a separate explicit asset permission.
- Do not introduce a new runtime dependency.
- Keep the pages usable without JavaScript-dependent article navigation.

## Verification

1. Test that all five new article records have unique slugs, non-empty titles/excerpts/bodies, valid dates, and reading times.
2. Test that `getArticleSlugs()` matches the detail route’s static params.
3. Build the site and verify `/articles` plus every new detail URL returns successfully.
4. Check that unknown article slugs return the not-found state.
5. Inspect metadata and JSON-LD for canonical URLs, author, dates, and no private/third-party personal data.
6. Review the rendered pages at desktop and mobile widths for readable line length, heading hierarchy, focus visibility, and no horizontal overflow.
7. Run the existing relevant article, route, and test checks without altering unrelated dirty-worktree files.

## Scope decision

This phase adds the five articles and the missing article detail route, metadata, sitemap coverage, and focused tests. It does not redesign the portfolio, change admin behavior, import Facebook media, or publish claims outside the source facts listed above.
