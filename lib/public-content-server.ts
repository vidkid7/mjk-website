import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { EMPTY_PUBLIC_CONTENT, EMPTY_PUBLIC_UI_COPY, type PublicContent, type PublicService } from '@/lib/public-content'
import { resolveLocalizedArray, resolveLocalizedValue } from '@/lib/localized-content'
import { getRequestLocale } from '@/lib/i18n-server'
import type { Locale } from '@/lib/i18n'
import { copyFor } from '@/lib/i18n-copy'
import { translateAvailability, translateKnown, translateKnownArray } from '@/lib/i18n-content'
import { getSupabaseServerClient } from '@/lib/supabase-server-client'

export class PublicContentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PublicContentError'
  }
}

type PageRecord = { page_key: string; data: any }

function getClient(): SupabaseClient {
  try {
    return getSupabaseServerClient()
  } catch (error) {
    throw new PublicContentError(error instanceof Error
      ? error.message
      : 'The public CMS is not configured. Add Supabase server credentials before publishing the site.')
  }
}

function first<T>(rows: T[] | null | undefined): T | null {
  return rows?.[0] ?? null
}

function pageData(pages: PageRecord[], key: string): Record<string, any> {
  const record = pages.find((page) => page.page_key === key)
  return record?.data && typeof record.data === 'object' && !Array.isArray(record.data) ? record.data : {}
}

function scopedTranslations(root: Record<string, any>, prefix: string) {
  const translations = root.translations && typeof root.translations === 'object' ? root.translations : {}
  return Object.fromEntries(Object.entries(translations)
    .filter(([key]) => key.startsWith(`${prefix}.`))
    .map(([key, value]) => [key.slice(prefix.length + 1), value]))
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function socialLinks(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is { label: string; href: string } => (
    typeof item?.label === 'string' && typeof item?.href === 'string'
  ))
}

function parseVisibleSections(value: unknown): Record<string, boolean> {
  if (typeof value !== 'string' || !value.startsWith('visible_sections:')) return {}
  try {
    const parsed = JSON.parse(value.slice('visible_sections:'.length))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(Object.entries(parsed).filter(([, item]) => typeof item === 'boolean')) as Record<string, boolean>
  } catch {
    return {}
  }
}

function paragraphs(row: any): string[] {
  if (Array.isArray(row?.bio_paragraphs)) return strings(row.bio_paragraphs)
  return [row?.bio_paragraph_1, row?.bio_paragraph_2, row?.bio_paragraph_3, row?.bio_paragraph_4].filter(Boolean)
}

function localized<T>(row: any, field: string, locale: Locale, fallback?: T): T {
  const englishValue = (row?.[field] ?? fallback) as T
  const resolved = resolveLocalizedValue(englishValue, row?.translations, field, locale)
  if (locale === 'ne' && typeof resolved === 'string' && resolved === englishValue) {
    return translateKnown(resolved, locale) as T
  }
  return resolved
}

function localizedStrings(values: string[], translations: unknown, field: string, locale: Locale): string[] {
  const resolved = resolveLocalizedArray(values, translations, field, locale)
  return locale === 'ne' && resolved === values ? translateKnownArray(resolved, locale) : resolved
}

function normalizeAvailability(value: string) {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, ' ')
  return normalized.includes('ceo at aashatech') ? 'Founder/CEO at Aashatech' : value
}

function normalizeServices(value: unknown, locale: Locale): PublicService[] {
  if (!Array.isArray(value)) return []
  type ServiceStep = { title: string; body: string }
  type ServiceFaq = { question: string; answer: string }
  return value.map((item: any, index) => ({
    id: String(item.id || item.slug || index),
    slug: String(item.slug || ''),
    name: String(localized(item, 'name', locale, item.name || '')),
    shortName: String(localized(item, 'shortName', locale, item.shortName || item.short_name || item.name || '')),
    title: String(localized(item, 'title', locale, item.title || item.name || '')),
    description: String(localized(item, 'description', locale, item.description || '')),
    intro: String(localized(item, 'intro', locale, item.intro || item.description || '')),
    outcomes: localizedStrings(strings(item.outcomes), item.translations, 'outcomes', locale),
    process: Array.isArray(item.process)
      ? resolveLocalizedArray<ServiceStep>(item.process as ServiceStep[], item.translations, 'process', locale).filter((step) => typeof step?.title === 'string' && typeof step?.body === 'string')
      : [],
    faqs: Array.isArray(item.faqs)
      ? resolveLocalizedArray<ServiceFaq>(item.faqs as ServiceFaq[], item.translations, 'faqs', locale).filter((faq) => typeof faq?.question === 'string' && typeof faq?.answer === 'string')
      : [],
    isPublished: item.isPublished !== false && item.is_published !== false,
    orderIndex: Number(item.orderIndex ?? item.order_index ?? index),
  })).filter((item) => item.slug && item.isPublished)
}

function mergeUiCopy(value: unknown, locale: Locale) {
  const raw = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, any> : {}
  const groups = ['navigation', 'projects', 'skills', 'experience', 'testimonials', 'contact', 'footer']
  const localeDefaults = copyFor(locale)
  const localizedGroups = Object.fromEntries(groups.map((group) => {
    const source = raw[group] && typeof raw[group] === 'object' ? raw[group] : {}
    const defaults = localeDefaults[group as keyof typeof localeDefaults] as Record<string, unknown>
    const keys = Array.from(new Set([...Object.keys(defaults), ...Object.keys(source)]))
    const fields = Object.fromEntries(keys.map((key) => [
      key,
      locale === 'ne'
        ? resolveLocalizedValue(defaults[key], raw.translations, `${group}.${key}`, locale)
        : resolveLocalizedValue(source[key] ?? defaults[key], raw.translations, `${group}.${key}`, locale),
    ]))
    return [group, fields]
  }))
  return {
    ...EMPTY_PUBLIC_UI_COPY,
    ...raw,
    ...Object.fromEntries(groups.map((group) => [group, { ...EMPTY_PUBLIC_UI_COPY[group as keyof typeof EMPTY_PUBLIC_UI_COPY], ...localizedGroups[group] }])),
  }
}

export async function loadPublicContent(requestedLocale?: Locale): Promise<PublicContent> {
  const locale = requestedLocale || getRequestLocale()
  const client = getClient()
  const [heroResult, aboutResult, visionResult, projectsResult, experienceResult, testimonialsResult, statsResult, settingsResult, pagesResult, articlesResult] = await Promise.all([
    client.from('hero_content').select('*').limit(1),
    client.from('about_content').select('*').limit(1),
    client.from('vision_cards').select('*').order('order_index', { ascending: true }),
    client.from('initiatives').select('*').eq('is_published', true).order('order_index', { ascending: true }),
    client.from('achievements').select('*').order('order_index', { ascending: true }),
    client.from('testimonials').select('*').order('order_index', { ascending: true }),
    client.from('site_stats').select('*').order('order_index', { ascending: true }),
    client.from('site_settings').select('*'),
    client.from('site_pages').select('page_key,data'),
    client.from('news_posts').select('*').eq('is_published', true).order('published_at', { ascending: false }),
  ])

  const failed = [heroResult, aboutResult, visionResult, projectsResult, experienceResult, testimonialsResult, statsResult, settingsResult, pagesResult, articlesResult].find((result) => result.error)
  if (failed?.error) throw new PublicContentError(failed.error.message)

  const heroRow = first(heroResult.data)
  const aboutRow = first(aboutResult.data)
  const settings = (settingsResult.data || []).find((row: any) => !String(row.site_title || '').startsWith('__cms__')) || {}
  const pages = (pagesResult.data || []) as PageRecord[]
  const legacyPortfolio = pageData(pages, 'portfolio')
  const profilePage = pageData(pages, 'profile')
  const heroPage = pageData(pages, 'heroCopy')
  const aboutPage = pageData(pages, 'aboutCopy')
  const contactPage = pageData(pages, 'contactCopy')
  const pageTranslations = pageData(pages, 'translations')
  const ui = mergeUiCopy({ ...pageData(pages, 'uiCopy'), translations: scopedTranslations({ translations: pageTranslations }, 'uiCopy') }, locale)
  const profile = { ...(Object.keys(profilePage).length ? profilePage : legacyPortfolio.profile || {}), translations: scopedTranslations({ translations: pageTranslations }, 'profile') }
  const heroCopy = { ...(Object.keys(heroPage).length ? heroPage : legacyPortfolio.hero || {}), translations: scopedTranslations({ translations: pageTranslations }, 'heroCopy') }
  const aboutCopy = { ...(Object.keys(aboutPage).length ? aboutPage : legacyPortfolio.about || {}), translations: scopedTranslations({ translations: pageTranslations }, 'aboutCopy') }
  const skillsCopy = legacyPortfolio.skills || {}
  const contactCopy = { ...(Object.keys(contactPage).length ? contactPage : pageData(pages, 'contact').contact || legacyPortfolio.contact || {}), translations: scopedTranslations({ translations: pageTranslations }, 'contactCopy') }
  const mergedSocials = socialLinks(profile.socials || settings.socials)

  const site = {
    ...EMPTY_PUBLIC_CONTENT.site,
    name: String(localized(profile, 'name', locale, '')),
    role: String(localized(profile, 'role', locale, '')),
    tagline: String(localized(profile, 'tagline', locale, '')),
    location: String(localized(settings, 'address', locale, profile.location || '')),
    email: String(settings.email || profile.email || ''),
    phone: String(settings.phone || profile.phone || ''),
    availability: translateAvailability(String(localized(profile, 'availability', locale, '')), locale),
    availabilityHref: String(profile.availabilityHref || ''),
    siteTitle: String(localized(settings, 'site_title', locale, '')),
    metaDescription: String(localized(settings, 'meta_description', locale, '')),
    socials: mergedSocials,
    visibleSections: parseVisibleSections(settings.logo_url),
  }

  const stats = (statsResult.data || []).map((row: any) => ({ value: Number(row.value || 0), suffix: String(row.suffix || ''), label: String(row.label || '') }))
  const hero = {
    ...EMPTY_PUBLIC_CONTENT.hero,
    eyebrow: String(localized(heroCopy, 'eyebrow', locale, '')),
    roleLine: String(localized(heroCopy, 'roleLine', locale, '')),
    headline: String(localized(heroRow, 'headline', locale, '')),
    subheadline: String(localized(heroRow, 'subheadline', locale, '')),
    bio: String(localized(heroRow, 'bio', locale, '')),
    ctaPrimary: { label: String(localized(heroRow, 'cta_primary_text', locale, '')), href: String(heroCopy.ctaPrimaryHref || '#work') },
    ctaSecondary: { label: String(localized(heroRow, 'cta_secondary_text', locale, '')), href: String(heroCopy.ctaSecondaryHref || '#contact') },
    portrait: String(heroRow?.hero_image_url || ''),
    stats: stats.length ? stats : [
      { value: Number(heroRow?.stat_projects || 0), suffix: '+', label: '' },
      { value: Number(heroRow?.stat_lives || 0), suffix: '+', label: '' },
      { value: Number(heroRow?.stat_years || 0), suffix: '+', label: '' },
      { value: Number(heroRow?.stat_youth || 0), suffix: '+', label: '' },
    ],
  }

  const about = {
    ...EMPTY_PUBLIC_CONTENT.about,
    index: String(aboutCopy.index || ''),
    eyebrow: String(aboutCopy.eyebrow || ''),
    heading: String(localized(aboutRow, 'heading', locale, '')),
    paragraphs: resolveLocalizedArray(paragraphs(aboutRow), aboutRow?.translations, 'bio_paragraphs', locale),
    portrait: String(aboutRow?.photo_url || ''),
    highlights: localizedStrings(strings(aboutCopy.highlights), aboutCopy.translations, 'highlights', locale),
    resumeHref: String(aboutCopy.resumeHref || '#contact'),
    meta: Array.isArray(aboutCopy.meta) ? aboutCopy.meta : [],
  }

  const projects = (projectsResult.data || []).map((row: any, index) => ({
    id: String(row.id || index),
    title: String(localized(row, 'title', locale, '')),
    category: String(localized(row, 'category', locale, '')),
    year: String(row.year || ''),
    description: String(localized(row, 'description', locale, '')),
    outcome: String(localized(row, 'impact', locale, '')),
    tags: strings(row.tags),
    image: row.photo_url ? String(row.photo_url) : undefined,
  }))

  const skills = {
    disciplines: (visionResult.data || []).map((row: any) => ({ title: String(localized(row, 'heading', locale, '')), description: String(localized(row, 'description', locale, '')) })),
    toolbox: strings(skillsCopy.toolbox),
  }

  const experience = (experienceResult.data || []).map((row: any) => ({
    period: String(row.year || ''),
    title: String(localized(row, 'title', locale, '')),
    org: String(localized(row, 'org', locale, '')),
    points: Array.isArray(row.points) ? localizedStrings(strings(row.points), row.translations, 'points', locale) : [String(localized(row, 'description', locale, ''))].filter(Boolean),
  }))

  const testimonials = (testimonialsResult.data || []).map((row: any, index) => ({
    id: String(row.id || index),
    quote: String(localized(row, 'quote', locale, '')),
    name: String(row.name || ''),
    role: String(localized(row, 'role', locale, '')),
    photo: row.photo_url ? String(row.photo_url) : undefined,
    rating: Number(row.rating || 0),
  }))

  const contact = {
    ...EMPTY_PUBLIC_CONTENT.contact,
    index: String(contactCopy.index || ''),
    eyebrow: String(localized(contactCopy, 'eyebrow', locale, '')),
    heading: String(localized(contactCopy, 'heading', locale, '')),
    blurb: String(localized(contactCopy, 'blurb', locale, '')),
    email: site.email,
    phone: site.phone,
    location: site.location,
    socials: socialLinks(contactCopy.socials || site.socials),
    studioFacts: resolveLocalizedArray<{ label: string; value: string }>(Array.isArray(contactCopy.studioFacts) ? contactCopy.studioFacts : [], contactCopy.translations, 'studioFacts', locale),
    workPrompts: resolveLocalizedArray<{ title: string; body: string }>(Array.isArray(contactCopy.workPrompts) ? contactCopy.workPrompts : [], contactCopy.translations, 'workPrompts', locale),
  }

  const articles = (articlesResult.data || []).map((row: any, index) => ({
    id: String(row.id || index),
    slug: String(row.slug || ''),
    title: String(localized(row, 'title', locale, '')),
    excerpt: String(localized(row, 'excerpt', locale, '')),
    body: String(localized(row, 'content', locale, '')),
    category: String(localized(row, 'category', locale, '')),
    readMinutes: Number(row.read_minutes || 0),
    date: String(row.published_at || row.created_at || '').split('T')[0],
    cover: row.cover_url ? String(row.cover_url) : undefined,
    image: row.cover_url ? String(row.cover_url) : undefined,
    caption: row.title ? String(row.title) : undefined,
    tags: strings(row.tags),
  })).filter((article) => article.slug)

  return {
    site,
    hero,
    about,
    projects,
    skills,
    experience,
    testimonials,
    contact,
    services: normalizeServices(pageData(pages, 'services').items, locale),
    articles,
    ui,
  }
}
