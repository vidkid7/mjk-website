'use client'

import { useEffect, useRef } from 'react'

type SoundKind = 'hover' | 'click'

const INTERACTIVE_SELECTOR = '.gateway-shell a, .gateway-shell button, .gateway-shell [role="button"]'

function getAudioContext() {
  const AudioContextConstructor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  return AudioContextConstructor ? new AudioContextConstructor() : null
}

function playInterfaceTone(context: AudioContext, kind: SoundKind) {
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const now = context.currentTime
  const frequency = kind === 'click' ? 320 : 620
  const duration = kind === 'click' ? 0.075 : 0.045

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, now)
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.72, now + duration)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(kind === 'click' ? 0.035 : 0.018, now + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(now)
  oscillator.stop(now + duration + 0.01)
}

export default function InterfaceSounds() {
  const contextRef = useRef<AudioContext | null>(null)
  const lastHoverAtRef = useRef(0)

  useEffect(() => {
    const play = (kind: SoundKind) => {
      const context = contextRef.current || (contextRef.current = getAudioContext())
      if (!context) return
      if (context.state === 'suspended') void context.resume()
      if (context.state === 'running') playInterfaceTone(context, kind)
    }

    const isInteractive = (event: Event) => {
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null
      if (!target || target.closest('[data-interface-sound-control], [data-site-audio-control]')) return null
      return target
    }

    const handlePointerOver = (event: PointerEvent) => {
      const target = isInteractive(event)
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return
      const now = performance.now()
      if (now - lastHoverAtRef.current < 90) return
      lastHoverAtRef.current = now
      play('hover')
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (isInteractive(event)) play('hover')
    }

    const handleClick = (event: MouseEvent) => {
      if (isInteractive(event)) play('click')
    }

    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('click', handleClick)
      contextRef.current?.close()
      contextRef.current = null
    }
  }, [])

  return null
}
