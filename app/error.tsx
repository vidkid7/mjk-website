'use client'

import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-20 h-20 text-red-500" />
        </div>

        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white">
          Something went wrong
        </h1>
        <p className="text-slate-400 mt-4 text-lg">
          An unexpected error occurred. Please try again or return to the home page.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 transition-all shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-slate-300 border border-slate-600 hover:border-slate-400 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
