'use client'

import { useEffect, useState } from 'react'
import { History, RotateCcw } from 'lucide-react'

const contentTypes = [
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About' },
  { key: 'vision', label: 'Digital Vision' },
  { key: 'initiatives', label: 'Solutions' },
  { key: 'news', label: 'Blog Posts' },
  { key: 'stats', label: 'Stats' },
  { key: 'achievements', label: 'Delivery Process' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'settings', label: 'Site Settings' },
  { key: 'pages', label: 'Landing Page Copy' },
  { key: 'services', label: 'Services' },
] as const

type ContentKey = (typeof contentTypes)[number]['key']
type Revision = {
  id: string
  content_key: ContentKey
  data: unknown
  created_at: string
}

function summaryOf(data: unknown) {
  if (Array.isArray(data)) return `${data.length} item${data.length === 1 ? '' : 's'}`
  if (data && typeof data === 'object') return `${Object.keys(data).length} field${Object.keys(data).length === 1 ? '' : 's'}`
  return 'Saved content'
}

export default function AdminHistory() {
  const [key, setKey] = useState<ContentKey>('hero')
  const [revisions, setRevisions] = useState<Revision[]>([])
  const [loading, setLoading] = useState(true)
  const [restoring, setRestoring] = useState<string | null>(null)
  const [error, setError] = useState('')

  const loadHistory = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/content?key=${key}&history=1`, { cache: 'no-store' })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Unable to load content history.')
      setRevisions(payload.data || [])
    } catch (reason: any) {
      setError(reason.message || 'Unable to load content history.')
      setRevisions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadHistory()
  }, [key])

  const restore = async (revision: Revision) => {
    if (!window.confirm('Restore this version? The current content will be saved as a new version first.')) return

    setRestoring(revision.id)
    setError('')
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, action: 'restore', data: { revisionId: revision.id } }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Unable to restore this version.')
      await loadHistory()
    } catch (reason: any) {
      setError(reason.message || 'Unable to restore this version.')
    } finally {
      setRestoring(null)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Content history</h2>
        <p className="mt-1 text-sm text-gray-500">Restore a recent saved version. Restoring also creates a new snapshot of the current content.</p>
      </div>

      <label className="block max-w-sm text-sm font-medium text-gray-700">
        Content area
        <select value={key} onChange={event => setKey(event.target.value as ContentKey)} className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/30">
          {contentTypes.map(type => <option key={type.key} value={type.key}>{type.label}</option>)}
        </select>
      </label>

      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {loading ? (
          <p className="px-5 py-8 text-sm text-gray-500">Loading history...</p>
        ) : revisions.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-500">No saved versions yet. A snapshot is created whenever this content is saved.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {revisions.map(revision => (
              <li key={revision.id} className="flex items-center gap-4 px-5 py-4">
                <History size={18} className="shrink-0 text-crimson" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800">{new Date(revision.created_at).toLocaleString()}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{summaryOf(revision.data)}</p>
                </div>
                <button type="button" onClick={() => void restore(revision)} disabled={restoring !== null} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-crimson hover:text-crimson disabled:cursor-not-allowed disabled:opacity-50">
                  <RotateCcw size={15} />
                  {restoring === revision.id ? 'Restoring...' : 'Restore'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
