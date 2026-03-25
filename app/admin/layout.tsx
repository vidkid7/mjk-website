'use client'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Image, Newspaper, MessageSquare, Users, Settings,
  LogOut, ChevronLeft, ChevronRight, Home, Info, Target, Rocket,
  Briefcase, GraduationCap, BarChart3, Menu, X
} from 'lucide-react'
import { NepalFlagPennant } from '@/components/ui/NepalFlag'

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Hero Content', href: '/admin/hero', icon: Home },
  { label: 'About Section', href: '/admin/about', icon: Info },
  { label: 'Vision Cards', href: '/admin/vision', icon: Target },
  { label: 'Initiatives', href: '/admin/initiatives', icon: Rocket },
  { label: 'Entrepreneurship', href: '/admin/entrepreneurship', icon: Briefcase },
  { label: 'Youth Inspiration', href: '/admin/youth', icon: GraduationCap },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'News / Blog', href: '/admin/news', icon: Newspaper },
  { label: 'Stats / Numbers', href: '/admin/stats', icon: BarChart3 },
  { label: 'Volunteers', href: '/admin/volunteers', icon: Users },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Skip sidebar for login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed lg:sticky top-0 h-screen z-40 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <NepalFlagPennant width={24} height={32} />
          {!collapsed && (
            <div>
              <span className="font-yatra text-lg text-gold">MJK</span>
              <span className="block text-[10px] text-white/50">Admin Panel</span>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-crimson text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? link.label : undefined}
              >
                <link.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </a>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => { document.cookie = 'mjk_admin_auth=; path=/; max-age=0'; router.push('/admin/login') }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm w-full transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-crimson text-white items-center justify-center shadow-lg hover:bg-crimson-dark transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-gray-500"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {sidebarLinks.find(l => l.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm text-gray-500 hover:text-crimson transition-colors">
              View Website →
            </a>
            <div className="w-8 h-8 rounded-full bg-crimson text-white flex items-center justify-center text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
