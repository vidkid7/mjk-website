import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-[10rem] font-bold leading-none gradient-text-warm select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mt-4">
          Page Not Found
        </h2>
        <p className="text-slate-400 mt-4 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 transition-all shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-slate-300 border border-slate-600 hover:border-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Admin
          </Link>
        </div>
      </div>
    </div>
  )
}
