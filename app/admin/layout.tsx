'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Image, Newspaper, MessageSquare, Users, Settings,
  LogOut, ChevronLeft, ChevronRight, Home, Info, Target, Rocket,
  Briefcase, GraduationCap, BarChart3, Menu, X, Award, Star
} from 'lucide-react'
import { NepalFlagPennant } from '@/components/ui/NepalFlag'
import { LiquidBackdrop } from '@/components/ui/LiquidBackdrop'

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
    <div className="admin-liquid-shell flex min-h-screen text-white">
      <LiquidBackdrop variant="admin" />
      <aside
        className={`admin-sidebar admin-card fixed top-0 z-40 flex h-screen flex-col transition-all duration-300 lg:sticky ${
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
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                  isActive ? 'admin-sidebar-link--active bg-crimson text-white shadow-lg' : 'text-white/65 hover:bg-white/10 hover:text-white'
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
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/65 transition-all hover:bg-white/10 hover:text-white ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-crimson text-white shadow-lg transition-colors hover:bg-crimson-dark lg:flex"
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="admin-mobile-overlay fixed inset-0 z-30 bg-black/65 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        <header className="admin-header admin-card sticky top-0 z-20 m-2 flex items-center justify-between rounded-2xl px-4 py-3 md:mx-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded-lg p-1 text-white/75 transition hover:bg-white/10 hover:text-white lg:hidden" aria-label="Open navigation">
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-white">
              {sidebarLinks.find(l => l.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="hidden text-sm text-white/65 transition-colors hover:text-gold sm:inline">
              View Website →
            </a>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-crimson text-sm font-bold text-white">A</div>
          </div>
        </header>

        <main className="flex-1 p-4 pt-2 md:px-6 md:pb-8 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
