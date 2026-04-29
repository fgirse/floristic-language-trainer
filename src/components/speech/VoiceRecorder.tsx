'use client'

import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mic, Square } from 'lucide-react'

interface VoiceRecorderProps {
  onTranscript?: (text: string) => void
}

export default function VoiceRecorder({ onTranscript }: VoiceRecorderProps) {
  const { transcript, status, startListening, stopListening, reset } = useSpeechRecognition()

  const handleStop = () => {
    stopListening()
    if (transcript && onTranscript) onTranscript(transcript)
  }

  const handleStart = () => {
    reset()
    startListening()
  }

  const borderClass =
    status === 'listening'
      ? 'border-red-300 bg-red-50'
      : status === 'done'
        ? 'border-green-300 bg-green-50'
        : status === 'error' || status === 'unsupported'
          ? 'border-amber-300 bg-amber-50'
          : 'border-stone-200 bg-stone-50'

  return (
    <div className={`rounded-lg border-2 p-4 transition-colors ${borderClass}`}>
      <div className="flex items-center gap-3 flex-wrap">
        {status === 'listening' ? (
          <Button onClick={handleStop} variant="destructive" size="sm">
            <Square className="h-4 w-4 mr-1" />
            Stopp
          </Button>
        ) : (
          <Button
            onClick={handleStart}
            size="sm"
            className="bg-primary hover:bg-primary/90"
            disabled={status === 'unsupported'}
          >
            <Mic className="h-4 w-4 mr-1" />
            Sprechen
          </Button>
        )}
        <Badge variant={status === 'listening' ? 'destructive' : 'secondary'}>
          {status === 'idle' && 'Bereit — klicke Sprechen'}
          {status === 'listening' && 'Aufnahme läuft...'}
          {status === 'done' && 'Fertig'}
          {status === 'error' && 'Fehler — bitte Mikrofon erlauben'}
          {status === 'unsupported' && 'Nicht unterstützt (Chrome empfohlen)'}
        </Badge>
      </div>

      {transcript && (
        <div className="mt-3">
          <p className="text-xs text-stone-500 mb-1">Deine Aussprache:</p>
          <p className="text-base font-medium text-stone-800 italic">„{transcript}"</p>
        </div>
      )}
    </div>
  )
}
