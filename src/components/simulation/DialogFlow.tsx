'use client'

import { useState, useEffect } from 'react'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react'
import DialogTurn from './DialogTurn'

interface DialogTurnData {
  rolle: 'Florist' | 'Kunde'
  deutscherText: string
  spanischerText: string
}

interface Konversation {
  titel: string
  szenario: string
  dialog: DialogTurnData[]
}

interface DialogFlowProps {
  konversation: Konversation
  onBack: () => void
}

export default function DialogFlow({ konversation, onBack }: DialogFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userTranscripts, setUserTranscripts] = useState<Record<number, string>>({})
  const { speak } = useSpeechSynthesis()

  const currentTurn = konversation.dialog[currentStep]
  const isLast = currentStep === konversation.dialog.length - 1
  const progress = Math.round(((currentStep + 1) / konversation.dialog.length) * 100)

  const isFloristTurn = currentTurn?.rolle === 'Florist'
  const floristTurnRecorded = isFloristTurn ? Boolean(userTranscripts[currentStep]) : true
  const canAdvance = floristTurnRecorded

  // Auto-play Kunde lines
  useEffect(() => {
    if (currentTurn?.rolle === 'Kunde') {
      const timer = setTimeout(() => speak(currentTurn.deutscherText, 'de-DE'), 600)
      return () => clearTimeout(timer)
    }
  }, [currentStep]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTranscript = (text: string) => {
    setUserTranscripts((prev) => ({ ...prev, [currentStep]: text }))
  }

  const handleNext = () => {
    if (currentStep < konversation.dialog.length - 1) setCurrentStep((s) => s + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setUserTranscripts({})
  }

  if (isLast && canAdvance && currentStep > 0) {
    // Check if all steps done
  }

  const allDone = isLast && canAdvance

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zurück
        </Button>
        <div className="text-center">
          <p className="font-semibold text-foreground text-sm">{konversation.titel}</p>
          <p className="text-xs text-muted-foreground">
            Schritt {currentStep + 1} von {konversation.dialog.length}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleReset} title="Neustart">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Dialog thread */}
      <div className="space-y-3">
        {konversation.dialog.slice(0, currentStep + 1).map((turn, idx) => (
          <DialogTurn
            key={idx}
            turn={turn}
            isActive={idx === currentStep}
            userTranscript={userTranscripts[idx]}
            onTranscript={idx === currentStep ? handleTranscript : undefined}
          />
        ))}
      </div>

      {/* Success banner */}
      {allDone && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-300 rounded-xl p-4">
          <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-800">Gespräch abgeschlossen!</p>
            <p className="text-sm text-green-700">Super gemacht. Starte neu oder wähle ein anderes Szenario.</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0} size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zurück
        </Button>

        {!isLast ? (
          <Button
            onClick={handleNext}
            disabled={!canAdvance}
            className="bg-primary hover:bg-primary/90"
            size="sm"
          >
            Weiter
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" />
            Nochmal
          </Button>
        )}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Florist-Zeilen: Spreche laut nach und klicke "Sprechen" — Kunden-Zeilen werden automatisch vorgelesen.
      </p>
    </div>
  )
}
