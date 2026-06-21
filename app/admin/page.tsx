'use client'

import { ArrowUpRight, Image, MessageSquare, Newspaper, RefreshCw, Users } from 'lucide-react'
import { useAdminContent } from '@/lib/admin-data'
import AdminDataNotice from '@/components/admin/AdminDataNotice'

type DashboardData = {
  galleryCount: number
  newsCount: number
  messageCount: number
  volunteerCount: number
  unreadCount: number
  recentMessages: Array<{
    id: string
    name: string
    email: string
    subject: string
    is_read: boolean
    created_at: string
  }>
}

const emptyDashboard: DashboardData = {
  galleryCount: 0,
  newsCount: 0,
  messageCount: 0,
  volunteerCount: 0,
  unreadCount: 0,
  recentMessages: [],
}

const quickActions = [
  { label: 'Add News Post', href: '/admin/news' },
  { label: 'Upload Photos', href: '/admin/gallery' },
  { label: 'Edit Hero Section', href: '/admin/hero' },
  { label: 'View Messages', href: '/admin/messages' },
  { label: 'Review Volunteers', href: '/admin/volunteers' },
  { label: 'Site Settings', href: '/admin/settings' },
]

function relativeTime(value: string) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000))
  if (minutes < 60) return `${minutes || 1} min ago`
  if (minutes < 1440) return `${Math.round(minutes / 60)} hr ago`
  return `${Math.round(minutes / 1440)} day ago`
}

export default function AdminDashboard() {
  const { data, loading, error, refresh } = useAdminContent('dashboard', emptyDashboard, { starterOnEmpty: false })
  const overviewCards = [
    { label: 'Gallery Photos', value: data.galleryCount, icon: Image, color: 'bg-blue-500' },
    { label: 'News Posts', value: data.newsCount, icon: Newspaper, color: 'bg-green-600' },
    { label: 'Contact Messages', value: data.messageCount, icon: MessageSquare, color: 'bg-orange-500' },
    { label: 'Volunteer Signups', value: data.volunteerCount, icon: Users, color: 'bg-crimson' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-crimson to-crimson-dark p-6 text-white md:p-8">
        <div>
          <h2 className="font-playfair text-2xl font-bold md:text-3xl">Dashboard</h2>
          <p className="mt-2 text-sm text-white/75">Live content and supporter submissions from Supabase.</p>
        </div>
        <button onClick={() => void refresh()} className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-medium hover:bg-white/10">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map(card => (
          <div key={card.label} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-white ${card.color}`}>
              <card.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map(action => (
              <a key={action.href} href={action.href} className="group flex items-center justify-between rounded-lg p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-crimson">
                {action.label}
                <ArrowUpRight size={16} className="text-gray-400 group-hover:text-crimson" />
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800">
              <MessageSquare size={18} className="text-crimson" /> Recent Messages
            </h3>
            <span className="rounded-full bg-crimson/10 px-3 py-1 text-xs font-semibold text-crimson">{data.unreadCount} unread</span>
          </div>
          {data.recentMessages.length === 0 ? (
            <p className="rounded-lg bg-gray-50 p-8 text-center text-sm text-gray-500">No contact messages yet.</p>
          ) : (
            <div className="space-y-3">
              {data.recentMessages.map(message => (
                <div key={message.id} className={`rounded-lg p-3 ${message.is_read ? 'bg-gray-50' : 'bg-crimson/5'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-gray-800">{message.name}</span>
                    <span className="text-xs text-gray-400">{relativeTime(message.created_at)}</span>
                  </div>
                  <p className="truncate text-sm text-gray-600">{message.subject || 'No subject'}</p>
                </div>
              ))}
            </div>
          )}
          <a href="/admin/messages" className="mt-4 block text-center text-sm font-medium text-crimson hover:underline">View all messages</a>
        </div>
      </div>
    </div>
  )
}
