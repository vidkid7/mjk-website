'use client'
import { Image, Newspaper, MessageSquare, Users, Eye, TrendingUp, ArrowUpRight } from 'lucide-react'

const overviewCards = [
  { label: 'Gallery Photos', value: '12', icon: Image, color: 'bg-blue-500', change: '+3 this week' },
  { label: 'News Posts', value: '3', icon: Newspaper, color: 'bg-green-500', change: '+1 today' },
  { label: 'Contact Messages', value: '24', icon: MessageSquare, color: 'bg-orange-500', change: '5 unread' },
  { label: 'Volunteer Signups', value: '156', icon: Users, color: 'bg-purple-500', change: '+12 this week' },
]

const quickActions = [
  { label: 'Add News Post', href: '/admin/news' },
  { label: 'Upload Photos', href: '/admin/gallery' },
  { label: 'Edit Hero Section', href: '/admin/hero' },
  { label: 'View Messages', href: '/admin/messages' },
  { label: 'Edit Entrepreneurship', href: '/admin/entrepreneurship' },
  { label: 'Edit Youth Section', href: '/admin/youth' },
]

const recentMessages = [
  { name: 'Hari Bahadur', email: 'hari@gmail.com', subject: 'Volunteer opportunity', time: '2 hours ago', read: false },
  { name: 'Sita Devi', email: 'sita@outlook.com', subject: 'Campaign event in Lalitpur', time: '5 hours ago', read: false },
  { name: 'Ramesh Karki', email: 'ramesh.k@yahoo.com', subject: 'Donation inquiry', time: '1 day ago', read: true },
  { name: 'Anita Thapa', email: 'anita.t@gmail.com', subject: 'Youth program registration', time: '2 days ago', read: true },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-crimson to-crimson-dark rounded-2xl p-6 md:p-8 text-white">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-2">
          Welcome Back, Admin 👋
        </h2>
        <p className="text-white/70">
          Manage your campaign website content, monitor submissions, and keep your supporters updated.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center text-white`}>
                <card.icon size={20} />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-crimson" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-crimson transition-colors group"
              >
                <span className="text-sm font-medium">{action.label}</span>
                <ArrowUpRight size={16} className="text-gray-400 group-hover:text-crimson transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-crimson" />
            Recent Messages
          </h3>
          <div className="space-y-3">
            {recentMessages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${!msg.read ? 'bg-crimson/5' : 'hover:bg-gray-50'} transition-colors`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${!msg.read ? 'bg-crimson' : 'bg-gray-400'}`}>
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800 truncate">{msg.name}</span>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-crimson flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/messages" className="block text-center text-sm text-crimson font-medium mt-4 hover:underline">
            View All Messages →
          </a>
        </div>
      </div>

      {/* Site Analytics Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Eye size={18} className="text-crimson" />
          Website Traffic Overview
        </h3>
        <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-center">
            <BarChart3 size={40} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Analytics integration coming soon</p>
            <p className="text-xs text-gray-300 mt-1">Connect Google Analytics for traffic data</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BarChart3(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
    </svg>
  )
}
