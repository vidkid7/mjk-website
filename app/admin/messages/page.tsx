'use client'
import { useState, useEffect } from 'react'
import { Search, Trash2, Mail, MailOpen, X, Reply } from 'lucide-react'
import { loadData, saveData } from '@/lib/storage'

const demoMessages = [
  { id: '1', name: 'Hari Bahadur', email: 'hari@gmail.com', subject: 'Volunteer opportunity', message: 'I would like to know more about how I can volunteer for the campaign. I am based in Kathmandu and available on weekends.', is_read: false, date: '2024-01-15 14:30' },
  { id: '2', name: 'Sita Devi', email: 'sita@outlook.com', subject: 'Campaign event in Lalitpur', message: 'When is the next campaign event in Lalitpur? I want to bring my community group. We are about 30 people.', is_read: false, date: '2024-01-15 10:15' },
  { id: '3', name: 'Ramesh Karki', email: 'ramesh.k@yahoo.com', subject: 'Donation inquiry', message: 'I would like to donate to the campaign. Can you provide bank details? Also interested in the scholarship program.', is_read: true, date: '2024-01-14 16:45' },
  { id: '4', name: 'Anita Thapa', email: 'anita.t@gmail.com', subject: 'Youth program registration', message: 'How can I register for the youth coding bootcamp? My son is 18 and very interested in learning web development.', is_read: true, date: '2024-01-13 09:20' },
]

type Message = typeof demoMessages[0]

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const stored = loadData('messages', null as Message[] | null)
    setMessages(stored && stored.length > 0 ? stored : demoMessages)
  }, [])

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase())
  )

  const toggleRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, is_read: !m.is_read } : m)
    setMessages(updated)
    saveData('messages', updated)
  }

  const deleteMsg = (id: string) => {
    const updated = messages.filter(m => m.id !== id)
    setMessages(updated)
    saveData('messages', updated)
    if (selectedMsg?.id === id) setSelectedMsg(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-800">Contact Messages</h2>
          <p className="text-sm text-gray-500">{messages.filter(m => !m.is_read).length} unread messages</p></div>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson/50 focus:border-crimson" />
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map(msg => (
            <div key={msg.id}
              onClick={() => { setSelectedMsg(msg); if (!msg.is_read) toggleRead(msg.id) }}
              className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                selectedMsg?.id === msg.id ? 'border-crimson' : 'border-gray-200'
              } ${!msg.is_read ? 'bg-crimson/5 border-crimson/20' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                {!msg.is_read && <span className="w-2 h-2 rounded-full bg-crimson flex-shrink-0" />}
                <span className={`text-sm ${!msg.is_read ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`}>{msg.name}</span>
              </div>
              <h4 className={`text-sm truncate ${!msg.is_read ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>{msg.subject}</h4>
              <p className="text-xs text-gray-400 mt-1">{msg.date}</p>
            </div>
          ))}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          {selectedMsg ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{selectedMsg.subject}</h3>
                  <p className="text-sm text-gray-500">From: {selectedMsg.name} ({selectedMsg.email})</p>
                  <p className="text-xs text-gray-400 mt-1">{selectedMsg.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleRead(selectedMsg.id)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                    {selectedMsg.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                  <button onClick={() => deleteMsg(selectedMsg.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed">
                {selectedMsg.message}
              </div>
              <div className="mt-4">
                <button className="px-4 py-2 bg-crimson text-white rounded-lg text-sm font-semibold hover:bg-crimson-dark flex items-center gap-2">
                  <Reply size={16} /> Reply via Email
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-400">
              <Mail size={40} className="mx-auto mb-3 opacity-30" />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
