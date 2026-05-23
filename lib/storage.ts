'use client'

import { useEffect, useState } from 'react'

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
  achievements: 'mjk_achievements',
  testimonials: 'mjk_testimonials',
  settings: 'mjk_settings',
  messages: 'mjk_messages',
  volunteers: 'mjk_volunteers',
} as const

export type StorageKey = keyof typeof KEYS
const STORAGE_UPDATE_EVENT = 'mjk_storage_update'

function saveLocalData<T>(key: StorageKey, data: T): void {
  localStorage.setItem(KEYS[key], JSON.stringify(data))
  window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { key } }))
}

async function fetchRemoteData<T>(key: StorageKey): Promise<T | null> {
  const response = await fetch(`/api/content?key=${key}`, { cache: 'no-store' })
  if (!response.ok) return null

  const payload = await response.json()
  return payload.data ?? null
}

async function persistRemoteData<T>(key: StorageKey, data: T, mode?: 'append'): Promise<void> {
  const response = await fetch('/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, data, mode }),
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.error || `Failed to save ${key}`)
  }
}

export async function saveData<T>(key: StorageKey, data: T): Promise<void> {
  if (typeof window === 'undefined') return
  await persistRemoteData(key, data)
  saveLocalData(key, data)
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

export function useStoredData<T>(key: StorageKey, fallback: T): T {
  const [data, setData] = useState(fallback)

  useEffect(() => {
    const refresh = () => setData(loadData(key, fallback))
    const refreshRemote = async () => {
      try {
        const remoteData = await fetchRemoteData<T>(key)
        if (remoteData === null) return
        saveLocalData(key, remoteData)
        setData(remoteData)
      } catch (error) {
        console.error(`Failed to load ${key} from Supabase:`, error)
      }
    }

    refresh()
    void refreshRemote()

    const handleStorage = (event: StorageEvent) => {
      if (event.key === KEYS[key]) refresh()
    }

    const handleLocalUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ key?: StorageKey }>
      if (customEvent.detail?.key === key) refresh()
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(STORAGE_UPDATE_EVENT, handleLocalUpdate)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(STORAGE_UPDATE_EVENT, handleLocalUpdate)
    }
  }, [key, fallback])

  return data
}

export async function addMessage(message: { name: string; email: string; subject: string; message: string }): Promise<void> {
  const messages = loadData('messages', [] as any[])
  const createdAt = new Date()
  const entry = {
    ...message,
    id: createdAt.getTime().toString(),
    is_read: false,
    created_at: createdAt.toISOString(),
    date: createdAt.toLocaleString(),
  }

  await persistRemoteData('messages', entry, 'append')
  messages.unshift(entry)
  saveLocalData('messages', messages)
}

export async function addVolunteer(volunteer: { name: string; email: string; phone: string; city: string; help_type: string }): Promise<void> {
  const volunteers = loadData('volunteers', [] as any[])
  const createdAt = new Date()
  const entry = {
    name: volunteer.name,
    email: volunteer.email,
    phone: volunteer.phone,
    city: volunteer.city,
    help: volunteer.help_type,
    help_type: volunteer.help_type,
    id: createdAt.getTime().toString(),
    created_at: createdAt.toISOString(),
    date: createdAt.toLocaleDateString(),
  }

  await persistRemoteData('volunteers', entry, 'append')
  volunteers.unshift(entry)
  saveLocalData('volunteers', volunteers)
}
