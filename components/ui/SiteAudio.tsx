'use client'

import { useEffect, useRef, useState } from 'react'
import { Music2, Volume2, VolumeX } from 'lucide-react'

const MUSIC_SRC = '/mukesh-khadka-by-madhav-prasad-ghimire.mp3'
const MUSIC_CLIP_DURATION_SECONDS = 17

export default function SiteAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)
  const [isMutedAutoplay, setIsMutedAutoplay] = useState(false)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    setMounted(true)
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5

    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', resumeWithSound)
      window.removeEventListener('keydown', resumeWithSound)
    }

    const resumeWithSound = (event?: Event) => {
      if (event?.target instanceof Element && event.target.closest('[data-site-audio-control]')) return
      if (hasCompletedRef.current) return
      audio.muted = false
      void audio.play()
        .then(() => {
          setIsPlaying(true)
          setNeedsInteraction(false)
          setIsMutedAutoplay(false)
          removeInteractionListeners()
        })
        .catch(() => {
          audio.muted = true
          setNeedsInteraction(true)
        })
    }

    const playMusic = async () => {
      if (hasCompletedRef.current) return
      if (!audio.paused) {
        setIsPlaying(true)
        setNeedsInteraction(audio.muted)
        setIsMutedAutoplay(audio.muted)
        return
      }

      if (audio.ended) audio.currentTime = 0
      audio.muted = false

      try {
        await audio.play()
        setIsPlaying(true)
        setNeedsInteraction(false)
        setIsMutedAutoplay(false)
        removeInteractionListeners()
      } catch {
        // Browsers commonly block unmuted autoplay. Start silently when possible,
        // then turn sound on at the first real interaction.
        try {
          audio.muted = true
          await audio.play()
          setIsPlaying(true)
          setNeedsInteraction(true)
          setIsMutedAutoplay(true)
        } catch {
          setNeedsInteraction(true)
        }
      }
    }

    audio.addEventListener('canplay', playMusic)
    const handleEnded = () => {
      hasCompletedRef.current = true
      setIsPlaying(false)
    }
    const handleTimeUpdate = () => {
      if (audio.currentTime >= MUSIC_CLIP_DURATION_SECONDS) {
        audio.pause()
        audio.currentTime = 0
        hasCompletedRef.current = true
        setIsPlaying(false)
        setIsMutedAutoplay(false)
      }
    }
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    playMusic()
    window.addEventListener('pointerdown', resumeWithSound, { passive: true })
    window.addEventListener('keydown', resumeWithSound)

    return () => {
      audio.removeEventListener('canplay', playMusic)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      removeInteractionListeners()
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.muted || isMutedAutoplay) {
      if (audio.ended) audio.currentTime = 0
      hasCompletedRef.current = false
      audio.muted = false
      void audio.play()
        .then(() => {
          setIsPlaying(true)
          setNeedsInteraction(false)
          setIsMutedAutoplay(false)
        })
        .catch(() => setNeedsInteraction(true))
      return
    }

    if (audio.paused) {
      if (hasCompletedRef.current) {
        audio.currentTime = 0
        hasCompletedRef.current = false
      }
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
      <audio ref={audioRef} src={MUSIC_SRC} autoPlay preload="auto" aria-label="Mukesh Khadka theme music" data-site-audio-mode="full-track" />
      {mounted && (
        <div className="gateway-ambient-music-control">
          {needsInteraction && (
            <span className="gateway-ambient-music__prompt">
              Click to enable music
            </span>
          )}
          <button
            type="button"
            data-site-audio-control
            onClick={toggleMusic}
            aria-label={needsInteraction ? 'Enable theme music' : isPlaying ? 'Pause theme music' : 'Play theme music'}
            title={needsInteraction ? 'Click to enable the theme music' : isPlaying ? 'Pause theme music' : 'Play theme music'}
            className="gateway-ambient-music__toggle"
          >
            {isPlaying && !isMutedAutoplay ? <Volume2 size={18} /> : needsInteraction ? <Music2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      )}
    </>
  )
}
