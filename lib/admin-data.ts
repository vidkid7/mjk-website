'use client'

import { useCallback, useEffect, useState } from 'react'
import type { StorageKey } from '@/lib/storage'
import { adminFetch } from '@/lib/admin-client'

export type AdminDataKey = StorageKey | 'dashboard'

type Options = {
  starterOnEmpty?: boolean
}

export function useAdminContent<T>(key: AdminDataKey, starter: T, options: Options = {}) {
  const { starterOnEmpty = true } = options
  const [data, setData] = useState<T>(starter)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [usingStarter, setUsingStarter] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await adminFetch(`/api/content?key=${key}`, { cache: 'no-store' })
      if (response.status === 401) {
        window.location.href = '/admin/login'
        return
      }
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || `Unable to load ${key}.`)

      const empty = payload.data == null || (Array.isArray(payload.data) && payload.data.length === 0)
      if (empty && starterOnEmpty) {
        setData(starter)
        setUsingStarter(true)
      } else {
        setData((payload.data ?? starter) as T)
        setUsingStarter(false)
      }
    } catch (reason: any) {
      setError(reason.message || `Unable to load ${key}.`)
    } finally {
      setLoading(false)
    }
  }, [key, starter, starterOnEmpty])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const save = async (next: T) => {
    setSaving(true)
    setError('')
    try {
      const response = await adminFetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data: next }),
      })
      const payload = await response.json()
      if (response.status === 401) {
        window.location.href = '/admin/login'
        return false
      }
      if (!response.ok) throw new Error(payload.error || `Unable to save ${key}.`)

      setData((payload.data ?? next) as T)
      setUsingStarter(false)
      return true
    } catch (reason: any) {
      setError(reason.message || `Unable to save ${key}.`)
      return false
    } finally {
      setSaving(false)
    }
  }

  const action = async (actionName: string, payloadData: unknown) => {
    setSaving(true)
    setError('')
    try {
      const response = await adminFetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, action: actionName, data: payloadData }),
      })
      const payload = await response.json()
      if (response.status === 401) {
        window.location.href = '/admin/login'
        return false
      }
      if (!response.ok) throw new Error(payload.error || `Unable to update ${key}.`)
      setData((payload.data ?? starter) as T)
      return true
    } catch (reason: any) {
      setError(reason.message || `Unable to update ${key}.`)
      return false
    } finally {
      setSaving(false)
    }
  }

  return { data, setData, loading, saving, error, usingStarter, refresh, save, action }
}
