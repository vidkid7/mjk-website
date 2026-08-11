# Bilingual English/Nepali Language Support Design

## Goal

Add complete English and Nepali support to the existing Mukesh Khadka public portfolio and admin CMS without changing the current visual design, section structure, content order, or existing English wording. English remains the default; visitors and administrators can switch instantly between English and Nepali, and the choice persists across visits.

## Scope

The feature covers all existing user-facing copy in:

- The public homepage: navigation, hero, calls to action, project/work section, skills, experience, testimonials, contact, footer, and all supporting labels.
- Public article listing and article detail pages.
- Public services listing and service detail pages.
- Public contact page, not-found page, loading/error states, and document metadata that is visible to users or search engines.
- The authenticated admin shell, navigation, page headings, action labels, validation/error messages, and bilingual content fields in existing editors.

The feature does not add new public sections, promotional copy, cards, images, animations, routes, or design treatments. Names, URLs, email addresses, social handles, technology names, dates, numeric metrics, and image assets remain unchanged unless an existing descriptive label is translated.

## Approved decisions

- English is the default locale.
- The language control is a compact `EN / नेपाली` switch placed inside the existing public header tools and existing admin header tools.
- Switching is client-side and immediate, preserving the current route and scroll position.
- The selected locale is stored in `localStorage` and restored on later visits.
- The document language changes to `en` or `ne` when the locale changes.
- Missing Nepali values fall back to the corresponding English value.
- The current public and admin layouts remain intact; the only new control is the language switch required for the feature.

## Architecture

### Locale model

Use a small shared locale contract:

```ts
export type Locale = 'en' | 'ne'
export const DEFAULT_LOCALE: Locale = 'en'
```

Use a translation overlay instead of replacing existing English database columns. Existing English fields remain the canonical backward-compatible values. Nepali values are stored under a `translations` JSONB object on content records, keyed by field name and locale. A localized value resolves as:

```ts
translations[field]?.[locale] || englishValue
```

This keeps existing records, API responses, revisions, and English rendering compatible while allowing Nepali content to be edited independently.

### Content loading

The public content loader will normalize localized database values into the existing `PublicContent` shape. Components will continue to receive the same structural types, but the loader/provider will select the active locale before rendering. The loader must accept both the current plain-string data and localized values during migration.

For JSON page records such as `site_pages`, localized data will preserve the current object structure and add locale-specific values without changing existing page keys. Array items will retain stable IDs or slugs so translations remain attached to the correct project, service, article, testimonial, or other record.

### Shared language provider

Create one client-side provider at the shared application boundary. It will:

1. Start in English so server-rendered markup and existing visitors remain stable.
2. Read the saved locale after hydration.
3. Expose `locale` and `setLocale` to public and admin components.
4. Persist changes under a dedicated storage key.
5. Update `document.documentElement.lang`.

The provider will not modify theme, color, scroll, animation, or layout state.

### Translation catalog

Move hard-coded interface labels into a typed catalog with `en` and `ne` entries. This includes labels currently embedded in components such as navigation, status text, report/file labels, metadata labels, button text, contact-channel labels, footer facts, menu copy, accessibility labels, and error/loading messages. Content entered through the CMS remains in the content model; the catalog is only for fixed interface copy.

### Admin editing

Keep the current admin route structure, cards, field order, and save behavior. Each existing text field that is editable in the CMS will render English and Nepali controls in the same field area. Existing English values continue to update their current fields; Nepali values update the record's translation overlay. Arrays and nested JSON fields will use the same locale-aware shape while retaining stable item identifiers.

The admin language switch changes the admin interface labels and selects which content values are shown for editing. Saving one locale must not overwrite the other locale. Revision snapshots must retain both locale values so history remains recoverable.

## Interaction behavior

- Public and admin switches use the same locale state and storage key.
- The switch exposes accessible names and pressed state for both locales.
- On mobile, the switch fits within the existing header tools and does not add a new row or menu section.
- On pages with links to another public route, changing language does not alter the route or query string.
- When Nepali text is longer than English, existing responsive styles must wrap naturally without truncation or horizontal overflow.
- If browser storage is unavailable, the switch remains functional for the current session.

## Data migration and compatibility

- Add the minimal translation storage required by existing content records and page JSON without deleting or renaming current fields.
- Existing English records render exactly as they do before the feature.
- Existing API consumers that read English fields continue to receive those fields.
- The loader treats missing, malformed, or empty translation values as absent and falls back to English.
- Seed and migration utilities will provide the complete initial Nepali translations for the current published content and fixed interface catalog.
- No credentials, raw passwords, image files, or unrelated admin data are changed.

## Error handling

- Invalid locale values normalize to English.
- Malformed translation JSON is ignored for that field and does not prevent the page from loading.
- A missing Nepali translation displays English rather than an empty label.
- CMS saves validate that locale values are strings or valid localized arrays/objects before writing.
- If a localized content save fails, the current form remains populated and reports the existing save error in the selected language.

## Verification

Automated coverage will verify:

- English is the default locale.
- Nepali selection persists and updates the document language.
- Translation fallback works for missing and malformed Nepali values.
- Public loader normalization covers site, hero, about, projects, skills, experience, testimonials, contact, services, articles, and UI copy.
- All public routes consume the selected locale.
- Admin fields expose both locales and save one locale without overwriting the other.
- Existing English structure and responsive contracts remain intact.

Live verification will check the running server at desktop and mobile widths, including the homepage, article routes, service routes, contact, 404, and authenticated admin shell. The check will confirm that every existing visible area changes language, no new layout blocks appear, and the current English presentation remains visually unchanged.

## Out of scope

- Translating third-party content, URLs, code snippets, technology names, personal names, or social platform names.
- Adding automatic machine translation at runtime.
- Adding a separate language-specific URL hierarchy.
- Redesigning the navigation, typography, colors, animations, hero composition, or responsive layout.
