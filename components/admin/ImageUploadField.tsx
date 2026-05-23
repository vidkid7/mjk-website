'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Upload } from 'lucide-react'

export default function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = 'https://...',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError('')
    const body = new FormData()
    body.append('file', file)
    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Image upload failed.')
      onChange(payload.url)
    } catch (reason: any) {
      setError(reason.message || 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={value || ''}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-crimson focus:ring-2 focus:ring-crimson/50"
        />
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={event => {
            const file = event.target.files?.[0]
            if (file) void uploadFile(file)
            event.target.value = ''
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-crimson hover:text-crimson disabled:opacity-60"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading' : 'Upload'}
        </button>
      </div>
      {value && (
        <div className="mt-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <img src={value} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      {error && <p className="mt-2 flex items-center gap-1 text-xs text-red-600"><ImagePlus size={13} />{error}</p>}
    </div>
  )
}
