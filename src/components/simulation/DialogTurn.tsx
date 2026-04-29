'use client'

import { Badge } from '@/components/ui/badge'
import SpeechPlayer from '@/components/speech/SpeechPlayer'
import VoiceRecorder from '@/components/speech/VoiceRecorder'
import { User, Flower2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogTurnData {
  rolle: 'Florist' | 'Kunde'
  deutscherText: string
  spanischerText: string
}

interface DialogTurnProps {
  turn: DialogTurnData
  isActive: boolean
  userTranscript?: string
  onTranscript?: (text: string) => void
}

export default function DialogTurn({ turn, isActive, userTranscript, onTranscript }: DialogTurnProps) {
  const isFlorist = turn.rolle === 'Florist'

  return (
    <div
      className={cn(
        'rounded-xl p-4 border-2 transition-all',
        isActive
          ? isFlorist
            ? 'border-primary bg-primary/5'
            : 'border-amber-400 bg-amber-50'
          : 'border-border bg-card opacity-80',
      )}
    >
      {/* Speaker label */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            isFlorist ? 'bg-primary text-primary-foreground' : 'bg-amber-500 text-white',
          )}
        >
          {isFlorist ? <Flower2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </div>
        <Badge variant={isFlorist ? 'default' : 'secondary'} className={isFlorist ? 'bg-primary' : 'bg-amber-100 text-amber-800'}>
          {turn.rolle}
        </Badge>
        {isActive && (
          <SpeechPlayer text={turn.deutscherText} lang="de-DE" label="Anhören" variant="outline" />
        )}
      </div>

      {/* German text */}
      <p className="text-base font-medium text-foreground mb-1">{turn.deutscherText}</p>

      {/* Spanish translation (smaller) */}
      <p className="text-sm text-muted-foreground italic mb-3">{turn.spanischerText}</p>

      {/* Voice recorder for active Florist turns */}
      {isActive && isFlorist && onTranscript && (
        <VoiceRecorder onTranscript={onTranscript} />
      )}

      {/* Show saved transcript for past Florist turns */}
      {!isActive && isFlorist && userTranscript && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
          <p className="text-xs text-green-700 font-medium">Deine Antwort:</p>
          <p className="text-sm text-green-900 italic">„{userTranscript}"</p>
        </div>
      )}
    </div>
  )
}
