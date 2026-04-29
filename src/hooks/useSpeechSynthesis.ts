'use client'

import { useCallback, useRef } from 'react'

export function useSpeechSynthesis() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string, lang: 'de-DE' | 'es-ES' | 'de-CH' = 'de-DE') => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.85
    utterance.pitch = 1
    utterance.volume = 1

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      const voice =
        voices.find((v) => v.lang === lang) ||
        voices.find((v) => v.lang.startsWith(lang.split('-')[0]))
      if (voice) utterance.voice = voice
      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      pickVoice()
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', pickVoice, { once: true })
    }
  }, [])

  const stop = useCallback(() => {
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  }, [])

  return { speak, stop }
}
