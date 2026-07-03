'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Image, Newspaper, MessageSquare, Users, Settings,
  LogOut, ChevronLeft, ChevronRight, Home, Info, Target, Rocket,
  Briefcase, GraduationCap, BarChart3, Menu, X, Award, Star
} from 'lucide-react'
import { NepalFlagPennant } from '@/components/ui/NepalFlag'

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Hero Content', href: '/admin/hero', icon: Home },
  { label: 'About Section', href: '/admin/about', icon: Info },
  { label: 'Delivery Process', href: '/admin/achievements', icon: Award },
  { label: 'Digital Vision', href: '/admin/vision', icon: Target },
  { label: 'Solutions', href: '/admin/initiatives', icon: Rocket },
  { label: 'Delivery Capability', href: '/admin/entrepreneurship', icon: Briefcase },
  { label: 'Insights', href: '/admin/youth', icon: GraduationCap },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Blog Posts', href: '/admin/news', icon: Newspaper },
  { label: 'Stats / Numbers', href: '/admin/stats', icon: BarChart3 },
  { label: 'Contacts / Leads', href: '/admin/volunteers', icon: Users },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`admin-sidebar fixed top-0 z-40 flex h-screen flex-col transition-all duration-300 lg:sticky ${
          collapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <NepalFlagPennant width={24} height={32} />
          {!collapsed && (
            <div>
              <span className="font-yatra text-lg text-gold">MJK</span>
              <span className="block text-[10px] text-white/50">Portfolio Admin</span>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                  isActive ? 'bg-crimson text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? link.label : undefined}
              >
                <link.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </a>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => void logout()}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-all hover:bg-white/5 hover:text-white ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden h-6 w-6 items-center justify-center rounded-full bg-crimson text-white shadow-lg transition-colors hover:bg-crimson-dark lg:flex"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="text-gray-500 lg:hidden">
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {sidebarLinks.find(l => l.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm text-gray-500 transition-colors hover:text-crimson">
              View Website →
            </a>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-sm font-bold text-white">A</div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
