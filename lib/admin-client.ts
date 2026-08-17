'use client'

let refreshInFlight: Promise<boolean> | null = null

function refreshAdminAccess() {
  if (!refreshInFlight) {
    refreshInFlight = fetch('/api/admin/refresh', {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
    })
      .then(response => response.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null
      })
  }
  return refreshInFlight
}

export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const request = () => fetch(input, { ...init, credentials: 'same-origin' })
  const response = await request()
  if (response.status !== 401) return response

  if (!(await refreshAdminAccess())) return response
  return request()
}
