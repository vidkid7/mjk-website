'use client'

import { useEffect, useRef, useState } from 'react'
import { Music2, Volume2, VolumeX } from 'lucide-react'

const MUSIC_SRC = '/mukesh-khadka-by-madhav-prasad-ghimire.mp3'
const MUSIC_DURATION_SECONDS = 12

export default function SiteAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)
  const [isMutedAutoplay, setIsMutedAutoplay] = useState(false)
  const stopTimerRef = useRef<number | null>(null)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    setMounted(true)
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5

    const stopAtLimit = () => {
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current)
      stopTimerRef.current = null
      hasCompletedRef.current = true
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    }

    const enforceDuration = () => {
      if (audio.currentTime >= MUSIC_DURATION_SECONDS) stopAtLimit()
    }

    const scheduleStop = () => {
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current)
      const remaining = Math.max(0, MUSIC_DURATION_SECONDS - audio.currentTime)
      stopTimerRef.current = window.setTimeout(stopAtLimit, remaining * 1000)
    }

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
          scheduleStop()
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
        scheduleStop()
        return
      }

      if (audio.currentTime >= MUSIC_DURATION_SECONDS) audio.currentTime = 0
      audio.muted = false

      try {
        await audio.play()
        setIsPlaying(true)
        setNeedsInteraction(false)
        setIsMutedAutoplay(false)
        scheduleStop()
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
          scheduleStop()
        } catch {
          setNeedsInteraction(true)
        }
      }
    }

    audio.addEventListener('canplay', playMusic)
    audio.addEventListener('timeupdate', enforceDuration)
    audio.addEventListener('ended', stopAtLimit)
    playMusic()
    window.addEventListener('pointerdown', resumeWithSound, { passive: true })
    window.addEventListener('keydown', resumeWithSound)

    return () => {
      audio.removeEventListener('canplay', playMusic)
      audio.removeEventListener('timeupdate', enforceDuration)
      audio.removeEventListener('ended', stopAtLimit)
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current)
      removeInteractionListeners()
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.muted || isMutedAutoplay) {
      hasCompletedRef.current = false
      audio.muted = false
      void audio.play()
        .then(() => {
          setIsPlaying(true)
          setNeedsInteraction(false)
          setIsMutedAutoplay(false)
          const remaining = Math.max(0, MUSIC_DURATION_SECONDS - audio.currentTime)
          stopTimerRef.current = window.setTimeout(() => {
            audio.pause()
            audio.currentTime = 0
            setIsPlaying(false)
          }, remaining * 1000)
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
          const remaining = Math.max(0, MUSIC_DURATION_SECONDS - audio.currentTime)
          stopTimerRef.current = window.setTimeout(() => {
            audio.pause()
            audio.currentTime = 0
            setIsPlaying(false)
          }, remaining * 1000)
        })
        .catch(() => setNeedsInteraction(true))
    } else {
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current)
      stopTimerRef.current = null
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} autoPlay preload="auto" aria-label="Mukesh Khadka theme music" data-site-audio-duration="12" />
      {mounted && (
        <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2">
          {needsInteraction && (
            <span className="rounded-full border border-white/15 bg-slate-950/85 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white shadow-xl shadow-slate-950/20 backdrop-blur-md">
              Click to enable music
            </span>
          )}
          <button
            type="button"
            data-site-audio-control
            onClick={toggleMusic}
            aria-label={needsInteraction ? 'Enable theme music' : isPlaying ? 'Pause theme music' : 'Play theme music'}
            title={needsInteraction ? 'Click to enable the theme music' : isPlaying ? 'Pause theme music' : 'Play theme music'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/85 text-white shadow-xl shadow-slate-950/20 backdrop-blur-md transition hover:scale-105 hover:bg-crimson focus-visible:outline-white"
          >
            {isPlaying && !isMutedAutoplay ? <Volume2 size={18} /> : needsInteraction ? <Music2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      )}
    </>
  )
}
