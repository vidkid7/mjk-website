'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NepalFlagPennant } from '@/components/ui/NepalFlag'
import { LiquidBackdrop } from '@/components/ui/LiquidBackdrop'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Invalid credentials. Please try again.')
      router.replace('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-liquid-shell relative flex min-h-screen items-center justify-center overflow-hidden p-4 text-white">
      <LiquidBackdrop variant="admin" />

      <div className="relative z-10 w-full max-w-md">
        <div className="admin-login-card admin-card rounded-[1.75rem] p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <NepalFlagPennant width={48} height={62} />
            </div>
            <h1 className="font-yatra text-3xl text-gold">MJK Admin</h1>
            <p className="mt-1 text-sm text-white/65">Sign in securely to manage your digital portfolio</p>
          </div>

          {error && <div role="alert" className="admin-notice admin-notice--error mb-4 rounded-xl p-3 text-sm">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/90">Email</label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold/80" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@mukeshjungkhadka.com.np" className="admin-control w-full py-3 pl-10 pr-4 transition-all" required />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white/90">Password</label>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold/80" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="admin-control w-full py-3 pl-10 pr-12 transition-all" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/55 transition hover:text-gold">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="admin-action admin-action--primary flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all disabled:opacity-50">
              {loading ? <div className="spinner" /> : <>Sign In</>}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/45">Protected Admin Area • Mukesh Khadka Digital Portfolio</p>
        </div>
      </div>
    </div>
  )
}
