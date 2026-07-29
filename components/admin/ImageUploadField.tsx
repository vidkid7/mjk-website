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
    <div className="admin-upload-field">
      <label className="mb-1 block text-sm font-medium text-white/85">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={value || ''}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          className="admin-control min-w-0 flex-1 px-4 py-2.5"
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
          className="admin-upload-button admin-action inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading' : 'Upload'}
        </button>
      </div>
      {value && (
        <div className="admin-upload-preview mt-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl">
          <img src={value} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      {error && <p role="alert" className="admin-upload-error mt-2 flex items-center gap-1 text-xs"><ImagePlus size={13} />{error}</p>}
    </div>
  )
}
