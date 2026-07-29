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
          className="admin-control w-full py-2.5 pl-10 pr-4" />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-2 lg:col-span-2">
          {filtered.length === 0 && <div className="admin-card rounded-xl p-8 text-center text-sm text-gray-500">No messages found.</div>}
          {filtered.map(message => (
            <button key={message.id} onClick={() => void openMessage(message)}
              className={`admin-card admin-message-block block w-full rounded-xl p-4 text-left transition ${selectedId === message.id ? '!border-crimson/70' : ''} ${!message.is_read ? 'admin-message-block--unread' : ''}`}>
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
            <div className="admin-card rounded-2xl p-5 md:p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{selected.subject || 'No subject'}</h3>
                  <p className="text-sm text-gray-500">From: {selected.name} ({selected.email})</p>
                  <p className="mt-1 text-xs text-gray-400">{new Date(selected.date).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button disabled={saving} onClick={() => void action('read', { id: selected.id, is_read: !selected.is_read })}
                    className="admin-list-action rounded-lg p-2 disabled:opacity-50" title={selected.is_read ? 'Mark unread' : 'Mark read'} aria-label={selected.is_read ? 'Mark message unread' : 'Mark message read'}>
                    {selected.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                  <button disabled={saving} onClick={() => void deleteMessage(selected.id)}
                    className="admin-list-action rounded-lg p-2 text-rose-200 hover:!border-crimson/60 hover:!bg-crimson/20 disabled:opacity-50" title="Delete message" aria-label="Delete message">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="admin-message-block rounded-xl p-4 leading-relaxed text-gray-700">{selected.message}</div>
              <a
                href={`mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent(`Re: ${selected.subject || 'Your message'}`)}`}
                className="glass-action admin-action admin-action--primary mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                <Reply size={16} /> Reply via Email
              </a>
            </div>
          ) : (
            <div className="admin-card admin-message-empty rounded-2xl p-12 text-center text-gray-400">
              <Mail size={40} className="mx-auto mb-3 opacity-30" />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
