import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { validateSupabaseServerKey } from '@/lib/supabase-server-key'

export function getSupabaseServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase server configuration')
  }

  try {
    validateSupabaseServerKey(key)
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'The Supabase server key is invalid.')
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  })
}
