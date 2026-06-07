import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import { isAdminRequest } from '@/lib/admin-auth'

type ContentKey =
  | 'hero'
  | 'about'
  | 'vision'
  | 'initiatives'
  | 'entrepreneurship'
  | 'youth'
  | 'gallery'
  | 'news'
  | 'stats'
  | 'achievements'
  | 'testimonials'
  | 'settings'
  | 'messages'
  | 'volunteers'
  | 'dashboard'

const EMPTY_UUID = '00000000-0000-0000-0000-000000000000'
const VISIBILITY_PREFIX = 'visible_sections:'
const CONTENT_KEYS = new Set<ContentKey>([
  'hero', 'about', 'vision', 'initiatives', 'entrepreneurship', 'youth',
  'gallery', 'news', 'stats', 'achievements', 'testimonials', 'settings',
  'messages', 'volunteers', 'dashboard',
])
const PRIVATE_KEYS = new Set<ContentKey>(['messages', 'volunteers', 'dashboard'])

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase server configuration')
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  })
}

function isUuid(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function withUuid(id: unknown) {
  return isUuid(id) ? { id } : {}
}

function splitParagraphs(value: string) {
  return (value || '').split(/\n\s*\n/).map(item => item.trim()).filter(Boolean)
}

function firstParagraphs(row: any) {
  if (Array.isArray(row.bio_paragraphs)) return row.bio_paragraphs

  return [
    row.bio_paragraph_1,
    row.bio_paragraph_2,
    row.bio_paragraph_3,
    row.bio_paragraph_4,
  ].filter(Boolean)
}

async function readSingleton(client: ReturnType<typeof getSupabaseAdmin>, table: string) {
  const { data, error } = await client.from(table).select('*').limit(1).maybeSingle()
  if (error) throw error
  return data
}

async function readSiteSettings(client: ReturnType<typeof getSupabaseAdmin>) {
  const { data, error } = await client.from('site_settings').select('*')
  if (error) throw error
  return (data || []).find(row => !String(row.site_title || '').startsWith('__cms__')) || null
}

async function saveSiteSettings(client: ReturnType<typeof getSupabaseAdmin>, payload: Record<string, any>) {
  const existing = await readSiteSettings(client)

  if (existing?.id) {
    const { error } = await client.from('site_settings').update(payload).eq('id', existing.id)
    if (error && shouldRetrySettingsWithoutLinkedIn(error)) {
      const { error: legacyError } = await client.from('site_settings').update(withoutLinkedInUrl(payload)).eq('id', existing.id)
      if (legacyError) throw legacyError
      return
    }
    if (error) throw error
    return
  }

  const { error } = await client.from('site_settings').insert(payload)
  if (error && shouldRetrySettingsWithoutLinkedIn(error)) {
    const { error: legacyError } = await client.from('site_settings').insert(withoutLinkedInUrl(payload))
    if (legacyError) throw legacyError
    return
  }
  if (error) throw error
}

function shouldRetrySettingsWithoutLinkedIn(error: any) {
  const message = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`
  return error?.code === 'PGRST204' || message.includes('linkedin_url')
}

function withoutLinkedInUrl(payload: Record<string, any>) {
  const next = { ...payload }
  delete next.linkedin_url
  return next
}

async function readCmsSection(client: ReturnType<typeof getSupabaseAdmin>, key: ContentKey) {
  const { data, error } = await client
    .from('site_settings')
    .select('meta_description')
    .eq('site_title', `__cms__${key}`)
    .limit(1)
    .maybeSingle()

  if (error) throw error
  if (!data?.meta_description) return null

  try {
    return JSON.parse(data.meta_description)
  } catch {
    return null
  }
}

async function saveCmsSection(client: ReturnType<typeof getSupabaseAdmin>, key: ContentKey, data: any) {
  const marker = `__cms__${key}`
  const payload = {
    site_title: marker,
    meta_description: JSON.stringify(data),
    updated_at: new Date().toISOString(),
  }

  const { data: existing, error: readError } = await client
    .from('site_settings')
    .select('id')
    .eq('site_title', marker)
    .limit(1)
    .maybeSingle()

  if (readError) throw readError

  if (existing?.id) {
    const { error } = await client.from('site_settings').update(payload).eq('id', existing.id)
    if (error) throw error
    return
  }

  const { error } = await client.from('site_settings').insert(payload)
  if (error) throw error
}

async function saveSingleton(client: ReturnType<typeof getSupabaseAdmin>, table: string, payload: Record<string, any>) {
  const existing = await readSingleton(client, table)

  if (existing?.id) {
    const { error } = await client.from(table).update(payload).eq('id', existing.id)
    if (error) throw error
    return
  }

  const { error } = await client.from(table).insert(payload)
  if (error) throw error
}

async function readOrdered(client: ReturnType<typeof getSupabaseAdmin>, table: string) {
  const { data, error } = await client.from(table).select('*').order('order_index', { ascending: true })
  if (error) throw error
  return data || []
}

async function syncRows(client: ReturnType<typeof getSupabaseAdmin>, table: string, rows: Record<string, any>[]) {
  const { data: existing, error: existingError } = await client.from(table).select('id')
  if (existingError) throw existingError

  if (!rows.length) {
    const { error } = await client.from(table).delete().neq('id', EMPTY_UUID)
    if (error) throw error
    return
  }

  const { data: saved, error: saveError } = await client.from(table).upsert(rows).select('id')
  if (saveError) throw saveError

  const savedIds = new Set((saved || []).map(row => row.id))
  const staleIds = (existing || []).map(row => row.id).filter(id => !savedIds.has(id))
  if (staleIds.length) {
    const { error: deleteError } = await client.from(table).delete().in('id', staleIds)
    if (deleteError) throw deleteError
  }
}

function toDateInput(value: string | null | undefined) {
  return value ? value.split('T')[0] : new Date().toISOString().split('T')[0]
}

function parseVisibleSections(row: any) {
  if (row.visible_sections && typeof row.visible_sections === 'object') {
    return row.visible_sections
  }

  if (typeof row.logo_url === 'string' && row.logo_url.startsWith(VISIBILITY_PREFIX)) {
    try {
      return JSON.parse(row.logo_url.slice(VISIBILITY_PREFIX.length))
    } catch {
      return undefined
    }
  }

  return undefined
}

async function readContent(key: ContentKey, isAdmin = false) {
  const client = getSupabaseAdmin()

  switch (key) {
    case 'hero': {
      const row = await readSingleton(client, 'hero_content')
      return row
        ? {
            label: row.label,
            headline: row.headline,
            subheadline: row.subheadline,
            bio: row.bio,
            cta_primary: row.cta_primary_text,
            cta_secondary: row.cta_secondary_text,
            hero_image: row.hero_image_url,
            stat_projects: row.stat_projects,
            stat_lives: row.stat_lives,
            stat_years: row.stat_years,
            stat_youth: row.stat_youth,
          }
        : null
    }
    case 'about': {
      const row = await readSingleton(client, 'about_content')
      return row
        ? {
            pill: row.pill_text,
            heading: row.heading,
            paragraphs: firstParagraphs(row).join('\n\n'),
            community_trust: row.community_trust,
            youth_engagement: row.youth_engagement,
            photo: row.photo_url,
          }
        : null
    }
    case 'vision':
      return (await readOrdered(client, 'vision_cards')).map(row => ({
        id: row.id,
        icon: row.icon,
        heading: row.heading,
        description: row.description,
        order_index: row.order_index,
      }))
    case 'initiatives': {
      let query = client.from('initiatives').select('*').order('order_index', { ascending: true })
      if (!isAdmin) query = query.eq('is_published', true)
      const { data, error } = await query
      if (error) throw error
      return (data || []).map(row => ({
        id: row.id,
        photo: row.photo_url,
        category: row.category,
        title: row.title,
        description: row.description,
        impact: row.impact,
        is_published: row.is_published,
      }))
    }
    case 'entrepreneurship':
    case 'youth':
      return readCmsSection(client, key)
    case 'gallery':
      return (await readOrdered(client, 'gallery_photos')).map(row => ({
        id: row.id,
        url: row.url,
        caption: row.caption,
        category: row.category,
      }))
    case 'news': {
      let query = client.from('news_posts').select('*').order('published_at', { ascending: false, nullsFirst: false })
      if (!isAdmin) query = query.eq('is_published', true)
      const { data, error } = await query
      if (error) throw error
      return (data || []).map(row => ({
        id: row.id,
        cover: row.cover_url,
        category: row.category,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        is_published: row.is_published,
        date: toDateInput(row.published_at || row.created_at),
      }))
    }
    case 'stats':
      return (await readOrdered(client, 'site_stats')).map(row => ({
        id: row.id,
        label: row.label,
        value: row.value,
        suffix: row.suffix,
        icon: row.icon,
      }))
    case 'achievements':
      return (await readOrdered(client, 'achievements')).map(row => ({
        id: row.id,
        year: row.year,
        title: row.title,
        description: row.description,
        icon: row.icon,
        order_index: row.order_index,
      }))
    case 'testimonials':
      return (await readOrdered(client, 'testimonials')).map(row => ({
        id: row.id,
        photo: row.photo_url,
        name: row.name,
        role: row.role,
        quote: row.quote,
        rating: row.rating,
      }))
    case 'settings': {
      const row = await readSiteSettings(client)
      return row
        ? {
            site_title: row.site_title || '',
            meta_description: row.meta_description || '',
            phone: row.phone || '',
            email: row.email || '',
            address: row.address || '',
            linkedin_url: row.linkedin_url || '',
            facebook_url: row.facebook_url || '',
            instagram_url: row.instagram_url || '',
            youtube_url: row.youtube_url || '',
            twitter_url: row.twitter_url || '',
            tiktok_url: row.tiktok_url || '',
            visible_sections: parseVisibleSections(row) || {},
          }
        : null
    }
    case 'messages': {
      const { data, error } = await client.from('contact_messages').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return (data || []).map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        subject: row.subject,
        message: row.message,
        is_read: row.is_read,
        date: row.created_at,
        created_at: row.created_at,
      }))
    }
    case 'volunteers': {
      const { data, error } = await client.from('volunteer_submissions').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return (data || []).map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        city: row.city,
        help: row.help_type,
        help_type: row.help_type,
        date: toDateInput(row.created_at),
        created_at: row.created_at,
      }))
    }
    case 'dashboard': {
      const [
        { count: galleryCount, error: galleryError },
        { count: newsCount, error: newsError },
        { count: messageCount, error: messageError },
        { count: volunteerCount, error: volunteerError },
        { count: unreadCount, error: unreadError },
        { data: recentMessages, error: recentError },
      ] = await Promise.all([
        client.from('gallery_photos').select('*', { count: 'exact', head: true }),
        client.from('news_posts').select('*', { count: 'exact', head: true }),
        client.from('contact_messages').select('*', { count: 'exact', head: true }),
        client.from('volunteer_submissions').select('*', { count: 'exact', head: true }),
        client.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
        client.from('contact_messages').select('id,name,email,subject,is_read,created_at').order('created_at', { ascending: false }).limit(4),
      ])
      const error = galleryError || newsError || messageError || volunteerError || unreadError || recentError
      if (error) throw error
      return {
        galleryCount: galleryCount || 0,
        newsCount: newsCount || 0,
        messageCount: messageCount || 0,
        volunteerCount: volunteerCount || 0,
        unreadCount: unreadCount || 0,
        recentMessages: recentMessages || [],
      }
    }
    default:
      return null
  }
}

async function saveContent(key: ContentKey, data: any, mode?: 'append') {
  const client = getSupabaseAdmin()

  switch (key) {
    case 'hero':
      return saveSingleton(client, 'hero_content', {
        label: data.label,
        headline: data.headline,
        subheadline: data.subheadline,
        bio: data.bio,
        cta_primary_text: data.cta_primary,
        cta_secondary_text: data.cta_secondary,
        hero_image_url: data.hero_image,
        stat_projects: data.stat_projects,
        stat_lives: data.stat_lives,
        stat_years: data.stat_years,
        stat_youth: data.stat_youth,
      })
    case 'about': {
      const paragraphs = splitParagraphs(data.paragraphs)
      const jsonPayload = {
        pill_text: data.pill,
        heading: data.heading,
        bio_paragraphs: paragraphs,
        community_trust: data.community_trust,
        youth_engagement: data.youth_engagement,
        photo_url: data.photo,
      }

      try {
        return await saveSingleton(client, 'about_content', jsonPayload)
      } catch (error: any) {
        if (!String(error?.message || '').includes('bio_paragraphs')) throw error
        return saveSingleton(client, 'about_content', {
          pill_text: data.pill,
          heading: data.heading,
          bio_paragraph_1: paragraphs[0] || '',
          bio_paragraph_2: paragraphs[1] || '',
          bio_paragraph_3: paragraphs[2] || '',
          bio_paragraph_4: paragraphs[3] || '',
          community_trust: data.community_trust,
          youth_engagement: data.youth_engagement,
          photo_url: data.photo,
        })
      }
    }
    case 'vision':
      return syncRows(client, 'vision_cards', data.map((item: any, index: number) => ({
        ...withUuid(item.id),
        icon: item.icon,
        heading: item.heading,
        description: item.description,
        order_index: index,
      })))
    case 'initiatives':
      return syncRows(client, 'initiatives', data.map((item: any, index: number) => ({
        ...withUuid(item.id),
        photo_url: item.photo,
        category: item.category,
        title: item.title,
        description: item.description,
        impact: item.impact,
        is_published: item.is_published ?? true,
        order_index: index,
      })))
    case 'entrepreneurship':
    case 'youth':
      return saveCmsSection(client, key, data)
    case 'gallery':
      return syncRows(client, 'gallery_photos', data.map((item: any, index: number) => ({
        ...withUuid(item.id),
        url: item.url,
        caption: item.caption,
        category: item.category,
        order_index: index,
      })))
    case 'news':
      return syncRows(client, 'news_posts', data.map((item: any, index: number) => ({
        ...withUuid(item.id),
        cover_url: item.cover,
        category: item.category,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content || item.excerpt,
        is_published: item.is_published ?? false,
        published_at: item.date ? new Date(item.date).toISOString() : null,
      })))
    case 'stats':
      return syncRows(client, 'site_stats', data.map((item: any, index: number) => ({
        ...withUuid(item.id),
        label: item.label,
        value: item.value,
        suffix: item.suffix,
        icon: item.icon,
        order_index: index,
      })))
    case 'achievements':
      return syncRows(client, 'achievements', data.map((item: any, index: number) => ({
        ...withUuid(item.id),
        year: item.year,
        title: item.title,
        description: item.description,
        icon: item.icon,
        order_index: index,
      })))
    case 'testimonials':
      return syncRows(client, 'testimonials', data.map((item: any, index: number) => ({
        ...withUuid(item.id),
        photo_url: item.photo,
        name: item.name,
        role: item.role,
        quote: item.quote,
        rating: item.rating,
        order_index: index,
      })))
    case 'settings': {
      const payload = {
        site_title: data.site_title,
        meta_description: data.meta_description,
        phone: data.phone,
        email: data.email,
        address: data.address,
        linkedin_url: data.linkedin_url,
        facebook_url: data.facebook_url,
        instagram_url: data.instagram_url,
        youtube_url: data.youtube_url,
        twitter_url: data.twitter_url,
        tiktok_url: data.tiktok_url,
        logo_url: `${VISIBILITY_PREFIX}${JSON.stringify(data.visible_sections || {})}`,
      }
      return saveSiteSettings(client, payload)
    }
    case 'messages':
      if (mode === 'append') {
        const { error } = await client.from('contact_messages').insert({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          is_read: false,
        })
        if (error) throw error
        return
      }
      throw new Error('Use a message action instead of replacing submissions.')
    case 'volunteers':
      if (mode === 'append') {
        const { error } = await client.from('volunteer_submissions').insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          help_type: data.help_type || data.help,
        })
        if (error) throw error
        return
      }
      throw new Error('Use a volunteer action instead of replacing submissions.')
  }
}

export async function GET(request: Request) {
  const requestedKey = new URL(request.url).searchParams.get('key')
  if (!requestedKey || !CONTENT_KEYS.has(requestedKey as ContentKey)) {
    return NextResponse.json({ error: 'Invalid content key' }, { status: 400 })
  }
  const key = requestedKey as ContentKey
  const admin = await isAdminRequest(request)
  if (PRIVATE_KEYS.has(key) && !admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await readContent(key, admin)
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to read content' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const key = body.key as ContentKey
    if (!CONTENT_KEYS.has(key) || key === 'dashboard') {
      return NextResponse.json({ error: 'Invalid content key' }, { status: 400 })
    }

    if (key === 'messages' && body.mode === 'append') {
      const submission = {
        name: cleanText(body.data?.name, 100),
        email: cleanText(body.data?.email, 200),
        subject: cleanText(body.data?.subject, 180),
        message: cleanText(body.data?.message, 5000),
      }
      if (!submission.name || !validEmail(submission.email) || !submission.message) {
        return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
      }
      await saveContent(key, submission, 'append')
      return NextResponse.json({ ok: true })
    }

    if (key === 'volunteers' && body.mode === 'append') {
      const submission = {
        name: cleanText(body.data?.name, 100),
        email: cleanText(body.data?.email, 200),
        phone: cleanText(body.data?.phone, 30),
        city: cleanText(body.data?.city, 100),
        help_type: cleanText(body.data?.help_type || body.data?.help, 120),
      }
      if (!submission.name || !validEmail(submission.email)) {
        return NextResponse.json({ error: 'Please provide a valid name and email.' }, { status: 400 })
      }
      await saveContent(key, submission, 'append')
      return NextResponse.json({ ok: true })
    }

    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (key === 'messages' && body.action === 'read') {
      const client = getSupabaseAdmin()
      const { error } = await client.from('contact_messages').update({ is_read: Boolean(body.data?.is_read) }).eq('id', body.data?.id)
      if (error) throw error
    } else if (key === 'messages' && body.action === 'delete') {
      const client = getSupabaseAdmin()
      const { error } = await client.from('contact_messages').delete().eq('id', body.data?.id)
      if (error) throw error
    } else if (key === 'volunteers' && body.action === 'delete') {
      const client = getSupabaseAdmin()
      const { error } = await client.from('volunteer_submissions').delete().eq('id', body.data?.id)
      if (error) throw error
    } else if (key === 'messages' || key === 'volunteers') {
      return NextResponse.json({ error: 'Invalid submission action' }, { status: 400 })
    } else {
      await saveContent(key, body.data)
      if (key === 'settings') revalidatePath('/', 'layout')
    }

    return NextResponse.json({ ok: true, data: await readContent(key, true) })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save content' }, { status: 500 })
  }
}
