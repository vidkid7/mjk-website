'use client'

import { Music2, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useLanguage } from '@/components/i18n/LanguageProvider'

const VIDEO_ID = 'YritHjh4Isc'
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1&rel=0&modestbranding=1`

export default function AmbientMusic() {
  const { locale } = useLanguage()
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [playingWithSound, setPlayingWithSound] = useState(false)

  const sendCommand = useCallback((func: 'mute' | 'unMute' | 'playVideo' | 'pauseVideo') => {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*')
  }, [])

  const toggleSound = () => {
    if (playingWithSound) {
      sendCommand('mute')
      setPlayingWithSound(false)
      return
    }

    sendCommand('unMute')
    sendCommand('playVideo')
    setPlayingWithSound(true)
  }

  const copy = locale === 'ne'
    ? {
        label: playingWithSound ? 'सङ्गीत बन्द गर्नुहोस्' : 'सङ्गीत सुरु गर्नुहोस्',
        status: playingWithSound ? 'सङ्गीत बजिरहेको छ' : 'सङ्गीत बन्द छ',
      }
    : {
        label: playingWithSound ? 'Mute instrumental music' : 'Play instrumental music',
        status: playingWithSound ? 'Instrumental music playing' : 'Instrumental music muted',
      }

  return (
    <>
      <iframe
        ref={frameRef}
        className="gateway-ambient-music__frame"
        src={EMBED_URL}
        title="Gauchha Geet Nepali instrumental"
        allow="autoplay; encrypted-media"
        aria-hidden="true"
      />
      <button
        type="button"
        className="gateway-ambient-music__toggle"
        onClick={toggleSound}
        aria-label={copy.label}
        aria-pressed={playingWithSound}
        title={copy.status}
      >
        <Music2 className="gateway-ambient-music__music-icon" aria-hidden="true" />
        {playingWithSound ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        <span className="sr-only">{copy.status}</span>
      </button>
    </>
  )
}
