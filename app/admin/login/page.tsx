'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NepalFlagPennant } from '@/components/ui/NepalFlag'
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
    <div className="min-h-screen bg-gradient-to-br from-crimson-dark via-crimson to-royal-dark flex items-center justify-center p-4">
      <div className="absolute top-20 left-20 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-royal/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <NepalFlagPennant width={48} height={62} />
            </div>
            <h1 className="font-yatra text-3xl text-crimson">MJK Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in securely to manage your digital portfolio</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@mukeshjungkhadka.com.np" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson/50 focus:border-crimson transition-all" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-crimson text-white font-semibold rounded-xl hover:bg-crimson-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <div className="spinner" /> : <>Sign In</>}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">Protected Admin Area • Mukesh Khadka Digital Portfolio</p>
        </div>
      </div>
    </div>
  )
}
