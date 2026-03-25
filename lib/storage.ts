'use client'

// Storage keys
const KEYS = {
  hero: 'mjk_hero',
  about: 'mjk_about',
  vision: 'mjk_vision',
  initiatives: 'mjk_initiatives',
  entrepreneurship: 'mjk_entrepreneurship',
  youth: 'mjk_youth',
  gallery: 'mjk_gallery',
  news: 'mjk_news',
  stats: 'mjk_stats',
  settings: 'mjk_settings',
  messages: 'mjk_messages',
  volunteers: 'mjk_volunteers',
} as const

type StorageKey = keyof typeof KEYS

export function saveData<T>(key: StorageKey, data: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(KEYS[key], JSON.stringify(data))
  } catch (e) {
    console.error(`Failed to save ${key}:`, e)
  }
}

export function loadData<T>(key: StorageKey, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = localStorage.getItem(KEYS[key])
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function addMessage(message: { name: string; email: string; subject: string; message: string }): void {
  const messages = loadData('messages', [] as any[])
  messages.unshift({
    ...message,
    id: Date.now().toString(),
    is_read: false,
    created_at: new Date().toISOString(),
  })
  saveData('messages', messages)
}

export function addVolunteer(volunteer: { name: string; email: string; phone: string; city: string; help_type: string }): void {
  const volunteers = loadData('volunteers', [] as any[])
  volunteers.unshift({
    ...volunteer,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  })
  saveData('volunteers', volunteers)
}
