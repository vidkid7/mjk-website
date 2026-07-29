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
    <div className="relative z-10 space-y-6">
      <div className="admin-dashboard-hero admin-card flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] p-6 md:p-8">
        <div>
          <h2 className="font-playfair text-2xl font-bold md:text-3xl">Dashboard</h2>
          <p className="mt-2 text-sm text-white/70">Live content and supporter submissions from Supabase.</p>
        </div>
        <button onClick={() => void refresh()} className="admin-action inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <AdminDataNotice loading={loading} error={error} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map(card => (
          <div key={card.label} className="admin-card admin-overview-card rounded-2xl p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-white ${card.color}`}>
              <card.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <div className="text-sm text-white/60">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="admin-card rounded-2xl p-6">
          <h3 className="mb-4 font-semibold text-white">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map(action => (
              <a key={action.href} href={action.href} className="admin-list-action group flex items-center justify-between rounded-xl p-3 text-sm font-medium">
                {action.label}
                <ArrowUpRight size={16} className="text-white/45 transition group-hover:text-gold" />
              </a>
            ))}
          </div>
        </div>

        <div className="admin-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold text-white">
              <MessageSquare size={18} className="text-gold" /> Recent Messages
            </h3>
            <span className="rounded-full border border-crimson/50 bg-crimson/20 px-3 py-1 text-xs font-semibold text-white">{data.unreadCount} unread</span>
          </div>
          {data.recentMessages.length === 0 ? (
            <p className="admin-message-empty rounded-xl p-8 text-center text-sm text-white/60">No contact messages yet.</p>
          ) : (
            <div className="space-y-3">
              {data.recentMessages.map(message => (
                <div key={message.id} className={`admin-message-block rounded-xl p-3 ${message.is_read ? 'admin-message-block--read' : 'admin-message-block--unread'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{message.name}</span>
                    <span className="text-xs text-white/45">{relativeTime(message.created_at)}</span>
                  </div>
                  <p className="truncate text-sm text-white/65">{message.subject || 'No subject'}</p>
                </div>
              ))}
            </div>
          )}
          <a href="/admin/messages" className="mt-4 block text-center text-sm font-medium text-gold hover:underline">View all messages</a>
        </div>
      </div>
    </div>
  )
}
