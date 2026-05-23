'use client'

import { useState } from 'react'
import { Mail, MailOpen, Reply, Search, Trash2 } from 'lucide-react'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  date: string
}

export default function AdminMessages() {
  const { data: messages, loading, saving, error, action } = useAdminContent<Message[]>('messages', [], { starterOnEmpty: false })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const selected = messages.find(message => message.id === selectedId) || null
  const filtered = messages.filter(message =>
    `${message.name} ${message.subject} ${message.email}`.toLowerCase().includes(search.toLowerCase()),
  )

  const openMessage = async (message: Message) => {
    setSelectedId(message.id)
    if (!message.is_read) await action('read', { id: message.id, is_read: true })
  }

  const deleteMessage = async (id: string) => {
    if (await action('delete', { id })) setSelectedId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Contact Messages</h2>
        <p className="text-sm text-gray-500">{messages.filter(message => !message.is_read).length} unread messages</p>
      </div>
      <AdminDataNotice loading={loading} error={error} />

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search messages..."
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-crimson focus:ring-2 focus:ring-crimson/50" />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-2 lg:col-span-2">
          {filtered.length === 0 && <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">No messages found.</div>}
          {filtered.map(message => (
            <button key={message.id} onClick={() => void openMessage(message)}
              className={`block w-full rounded-lg border bg-white p-4 text-left shadow-sm transition hover:shadow-md ${selectedId === message.id ? 'border-crimson' : 'border-gray-200'} ${!message.is_read ? 'bg-crimson/5' : ''}`}>
              <div className="mb-1 flex items-center gap-2">
                {!message.is_read && <span className="h-2 w-2 rounded-full bg-crimson" />}
                <span className={`text-sm ${message.is_read ? 'font-medium text-gray-600' : 'font-bold text-gray-800'}`}>{message.name}</span>
              </div>
              <p className="truncate text-sm text-gray-700">{message.subject || 'No subject'}</p>
              <p className="mt-1 text-xs text-gray-400">{new Date(message.date).toLocaleString()}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{selected.subject || 'No subject'}</h3>
                  <p className="text-sm text-gray-500">From: {selected.name} ({selected.email})</p>
                  <p className="mt-1 text-xs text-gray-400">{new Date(selected.date).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button disabled={saving} onClick={() => void action('read', { id: selected.id, is_read: !selected.is_read })}
                    className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50" title={selected.is_read ? 'Mark unread' : 'Mark read'}>
                    {selected.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                  <button disabled={saving} onClick={() => void deleteMessage(selected.id)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50" title="Delete message">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 leading-relaxed text-gray-700">{selected.message}</div>
              <a
                href={`mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent(`Re: ${selected.subject || 'Your message'}`)}`}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-crimson px-4 py-2 text-sm font-semibold text-white hover:bg-crimson-dark"
              >
                <Reply size={16} /> Reply via Email
              </a>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center text-gray-400 shadow-sm">
              <Mail size={40} className="mx-auto mb-3 opacity-30" />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
