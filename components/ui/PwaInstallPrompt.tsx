'use client'

import { Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/i18n/LanguageProvider'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PwaInstallPrompt() {
  const { locale } = useLanguage()
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => undefined)
    }

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
    if (isStandalone) return

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      deferredPromptRef.current = event as BeforeInstallPromptEvent
      setCanInstall(true)
    }
    const handleAppInstalled = () => {
      deferredPromptRef.current = null
      setCanInstall(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const install = async () => {
    const deferredPrompt = deferredPromptRef.current
    if (!deferredPrompt) return
    deferredPromptRef.current = null
    setCanInstall(false)
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
  }

  if (!canInstall) return null

  const label = locale === 'ne' ? 'एप स्थापना गर्नुहोस्' : 'Install app'

  return (
    <button
      type="button"
      data-pwa-install
      onClick={() => void install()}
      className="gateway-pwa-install"
      aria-label={label}
      title={label}
    >
      <Download aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
