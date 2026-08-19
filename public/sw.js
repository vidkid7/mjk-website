const VERSION = 'mukesh-shell-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// Keep a pass-through fetch handler so Chromium can evaluate this as an
// installable PWA. Nothing is cached: HTML, CMS responses, and API data must
// remain fresh after edits.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) return
  event.respondWith(fetch(event.request))
})

self.addEventListener('message', (event) => {
  if (event.data === 'version') event.source?.postMessage(VERSION)
})
