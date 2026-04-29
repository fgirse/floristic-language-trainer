'use client'

import { useState, useCallback, useRef } from 'react'

export type RecognitionStatus = 'idle' | 'listening' | 'done' | 'error' | 'unsupported'

// Minimal Web Speech API types (not in lib.dom)
interface SpeechRecognitionAlternative {
  readonly transcript: string
  readonly confidence: number
}
interface SpeechRecognitionResult {
  readonly isFinal: boolean
  readonly length: number
  [index: number]: SpeechRecognitionAlternative
}
interface SpeechRecognitionResultList {
  readonly length: number
  [index: number]: SpeechRecognitionResult
}
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList
}
interface SpeechRecognition extends EventTarget {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null
  onerror: ((this: SpeechRecognition, ev: Event) => unknown) | null
  onend: ((this: SpeechRecognition, ev: Event) => unknown) | null
  start(): void
  stop(): void
}

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState('')
  const [status, setStatus] = useState<RecognitionStatus>('idle')
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognitionAPI) {
      setStatus('unsupported')
      return
    }

    const recognition: SpeechRecognition = new SpeechRecognitionAPI()
    recognition.lang = 'de-DE'
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.continuous = false

    recognition.onstart = () => setStatus('listening')
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1]
      setTranscript(result[0].transcript)
      if (result.isFinal) setStatus('done')
    }
    recognition.onerror = () => setStatus('error')
    recognition.onend = () => {
      if (status === 'listening') setStatus('done')
    }

    recognitionRef.current = recognition
    setTranscript('')
    recognition.start()
  }, [status])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
  }, [])

  const reset = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setTranscript('')
    setStatus('idle')
  }, [])

  return { transcript, status, startListening, stopListening, reset }
}
