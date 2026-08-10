# Database-Backed Public CMS Design

**Goal:** Make every active public page and section read content managed by the existing Supabase-backed admin panel, with no runtime dependency on TypeScript content constants.

## Architecture

Supabase is the source of truth. Existing structured tables remain the source for hero, about, projects, skills, experience, testimonials, settings, gallery, news, and submissions. A new `site_pages` table stores structured JSON for content that does not fit the existing collection tables, including service pages, route copy, and portfolio-only labels.

The public app uses a server-side content loader for initial rendering. Public pages do not read localStorage and do not silently fall back to starter content. If the database is unavailable, the page exposes a clear CMS configuration state rather than publishing stale hardcoded copy. Existing TypeScript records remain only as migration seed input and test fixtures.

The admin panel gets a unified Portfolio Content editor for the active homepage and route copy, plus a Services editor. Existing admin editors are retained and mapped to the active public sections so a save changes the visitor-facing page.

## Content ownership

- `hero_content`: homepage hero copy, portrait, metrics, and CTAs.
- `about_content`: homepage about copy, portrait, and profile metrics.
- `initiatives`: homepage work/project cards.
- `vision_cards`: homepage disciplines and toolbox metadata.
- `achievements`: homepage experience timeline.
- `testimonials`: homepage reports.
- `site_settings`: contact channels, social links, site metadata, and section visibility.
- `news_posts`: published articles, with stable slugs added for article routes.
- `site_pages`: active homepage labels, contact route copy, and service records.

## Safety and migration

The migration adds tables and columns only. A seed script imports the current curated constants once when explicitly run with Supabase credentials. It never runs during a request and never overwrites existing records unless `--replace` is supplied. Server-only Supabase service credentials are never sent to the browser.

## Verification

- Static contract tests assert that active public components consume the content loader rather than portfolio constants.
- API tests assert public reads, admin writes, and published/draft filtering.
- TypeScript and focused tests run before the full suite.
- A live smoke matrix checks `/`, `/services`, each service detail route, `/articles`, each article detail route, and `/contact` after a database-backed local configuration is available.
