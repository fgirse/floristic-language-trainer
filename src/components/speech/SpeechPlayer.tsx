'use client'

import { useEffect, useState } from 'react'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { Button } from '@/components/ui/button'
import { Volume2, Square } from 'lucide-react'

interface SpeechPlayerProps {
  text: string
  lang: 'de-DE' | 'es-ES'
  label?: string
  variant?: 'default' | 'ghost' | 'outline'
}

export default function SpeechPlayer({ text, lang, label, variant = 'ghost' }: SpeechPlayerProps) {
  const { speak, stop } = useSpeechSynthesis()
  const [isPlaying, setIsPlaying] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const handleToggle = () => {
    if (isPlaying) {
      stop()
      setIsPlaying(false)
    } else {
      speak(text, lang)
      setIsPlaying(true)
      const estimatedMs = Math.max((text.length / 10) * (1000 / 0.85), 1500)
      setTimeout(() => setIsPlaying(false), estimatedMs)
    }
  }

  if (!supported) return null

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleToggle}
      aria-label={label ?? `Abspielen auf ${lang === 'de-DE' ? 'Deutsch' : 'Spanisch'}`}
      className="gap-1"
    >
      {isPlaying ? (
        <Square className="h-4 w-4 text-red-500" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
      {label && <span className="text-xs">{label}</span>}
    </Button>
  )
}
