# Evidence-First SEO Upgrade

## Objective

Strengthen the portfolio's ability to rank for Mukesh Khadka's services in Nepal by turning its existing project portfolio into crawlable first-party proof, improving contextual internal linking, expanding useful service content, and correcting measurable image-delivery gaps.

## Content boundaries

- Use only project names, categories, descriptions, capabilities, and client names already present in the portfolio source.
- Do not add invented statistics, timelines, customer quotes, technical stacks, client endorsements, or confidential details.
- Keep all original service and article claims intact; additions explain scope, deliverables, decisions, and relevance without guaranteeing outcomes.
- Preserve all existing public URLs, admin behavior, stored-content fallback behavior, and structured-data entities.

## Route and data model

Create a static work hub at `/work` and six static case-study detail pages under `/work/[slug]`.

`lib/work-pages.ts` will be the single source of truth for the six existing portfolio entries. Each entry contains:

- `slug`, `title`, `category`, and existing project description.
- A short factual summary and capability-focused sections derived from the existing project description.
- A matching service slug and related blog slug for contextual navigation.

The work hub lists every case study. Each detail page provides a single H1, an introduction, a factual project-focus section, a capability list, links to its relevant service and article, and a project-discussion call to action. Each page emits `CreativeWork`, `BreadcrumbList`, and canonical metadata.

## Internal linking

- Portfolio cards on the homepage link to their matching `/work/[slug]` page instead of an external portfolio destination.
- The footer adds a descriptive Work link.
- The Services hub links to the Work hub.
- Every service detail page shows related work and a relevant digital insight.
- Every blog article links to a relevant service and supporting work page.
- The sitemap lists `/work` and every work detail URL.

These links are standard anchor elements in server-rendered routes so search engines can discover the content without client interaction.

## Service and article depth

Service data gains concise, non-speculative sections for typical audiences, delivery focus, and related resources. The expanded page content stays focused on each service term and Nepal context rather than adding generic filler.

Article data gains a service and work relationship. The page template renders a compact related-resources block after the article, preserving its editorial content and page intent.

## Image delivery

Keep the current visual direction and assets. Replace only Lighthouse-identified raw image elements that lack intrinsic dimensions with dimensioned images, and use existing Next image support where it is compatible with layout behavior. Do not alter decorative videos or introduce a new image service.

## Structured data and metadata

- Work hub: `CollectionPage` and `ItemList`.
- Work detail: `CreativeWork` and `BreadcrumbList`.
- Work URLs use self-referencing canonical metadata and Open Graph data.
- Existing Person, ProfessionalService, Service, FAQPage, BlogPosting, and BreadcrumbList markup remains in place.

## Verification

1. Extend the existing Node test suite first to assert work-route sitemap coverage, internal portfolio links, service/article related-resource links, and work structured-data output.
2. Run the new tests in their failing state before implementing each slice.
3. Run `npm test` and `npm run build` after every completed implementation slice.
4. Verify the new public routes and metadata with browser inspection after deployment.
5. Re-run a mobile Lighthouse audit and compare image sizing and performance findings with the initial $88/100$ performance and $100/100$ SEO scores.
6. Submit the work hub and one representative work page to Google Search Console URL Inspection after production deployment.