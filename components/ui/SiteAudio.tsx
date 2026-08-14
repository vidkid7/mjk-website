'use client'

import { useEffect, useRef, useState } from 'react'
import { Music2, Volume2, VolumeX } from 'lucide-react'

const MUSIC_SRC = '/mukesh-khadka-by-madhav-prasad-ghimire.mp3'

export default function SiteAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)

  useEffect(() => {
    setMounted(true)
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5

    const playMusic = () => {
      void audio.play()
        .then(() => {
          setIsPlaying(true)
          setNeedsInteraction(false)
          window.removeEventListener('pointerdown', playMusic)
          window.removeEventListener('keydown', playMusic)
        })
        .catch(() => setNeedsInteraction(true))
    }

    playMusic()
    window.addEventListener('pointerdown', playMusic, { passive: true })
    window.addEventListener('keydown', playMusic)

    return () => {
      window.removeEventListener('pointerdown', playMusic)
      window.removeEventListener('keydown', playMusic)
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      void audio.play()
        .then(() => {
          setIsPlaying(true)
          setNeedsInteraction(false)
        })
        .catch(() => setNeedsInteraction(true))
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} autoPlay loop preload="auto" aria-label="Mukesh Khadka theme music" />
      {mounted && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause theme music' : 'Play theme music'}
          title={needsInteraction ? 'Click to start the theme music' : isPlaying ? 'Pause theme music' : 'Play theme music'}
          className="fixed bottom-5 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/85 text-white shadow-xl shadow-slate-950/20 backdrop-blur-md transition hover:scale-105 hover:bg-crimson focus-visible:outline-white"
        >
          {isPlaying ? <Volume2 size={18} /> : needsInteraction ? <Music2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}
    </>
  )
}
