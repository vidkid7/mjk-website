// Single source of truth for the site's "settings" payload.
// Used by:
//   - app/page.tsx (public rendering of sections)
//   - app/admin/settings/page.tsx (admin editor)
//   - app/api/content/route.ts (validated write)
//
// Keep shapes narrow and serialize as plain JSON so Supabase and
// localStorage round-trip cleanly.

export const SECTION_KEYS = [
  'hero',
  'about',
  'achievements',
  'portfolio',
  'vision',
  'initiatives',
  'entrepreneurship',
  'youth',
  'testimonials',
  'gallery',
  'news',
  'stats',
  'contact',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]

export type VisibleSections = Record<SectionKey, boolean>

export type SiteSettings = {
  visible_sections: Partial<VisibleSections>
}

export const DEFAULT_SETTINGS: SiteSettings = {
  visible_sections: {
    hero: true,
    about: true,
    achievements: true,
    portfolio: true,
    vision: true,
    initiatives: true,
    entrepreneurship: true,
    youth: true,
    testimonials: true,
    gallery: true,
    news: true,
    stats: true,
    contact: true,
  },
}

const SECTION_KEY_SET = new Set<string>(SECTION_KEYS)

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Validate and normalize an unknown value into a `SiteSettings`. Throws on irreparable shape. */
export function parseSiteSettings(input: unknown): SiteSettings {
  if (!isPlainObject(input)) {
    return { ...DEFAULT_SETTINGS }
  }

  const rawVisible = input.visible_sections
  if (!isPlainObject(rawVisible)) {
    return { ...DEFAULT_SETTINGS }
  }

  const normalized: Partial<VisibleSections> = {}
  for (const [key, value] of Object.entries(rawVisible)) {
    if (SECTION_KEY_SET.has(key) && typeof value === 'boolean') {
      normalized[key as SectionKey] = value
    }
  }

  return { visible_sections: normalized }
}

/** Merge with defaults so a partial stored value still produces a full render matrix. */
export function withDefaults(settings: SiteSettings): SiteSettings {
  return {
    visible_sections: {
      ...DEFAULT_SETTINGS.visible_sections,
      ...settings.visible_sections,
    },
  }
}

/** Whether a given section should render for visitors. */
export function isSectionVisible(settings: SiteSettings, key: SectionKey): boolean {
  return settings.visible_sections[key] ?? true
}
