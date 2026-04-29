'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import SpeechPlayer from '@/components/speech/SpeechPlayer'

interface VokabelCardProps {
  vokabel: {
    id: string
    deutschesBegriff: string
    spanischerBegriff: string
    kategorie: string
    schwierigkeitsgrad: string
    illustration?: { url: string; alt: string } | null
    beispielSatz?: { deutsch?: string | null; spanisch?: string | null } | null
  }
}

const schwierigkeitFarbe: Record<string, string> = {
  '1': 'bg-emerald-100 text-emerald-800',
  '2': 'bg-amber-100 text-amber-800',
  '3': 'bg-rose-100 text-rose-800',
}

export default function VokabelCard({ vokabel }: VokabelCardProps) {
  const [showSpanish, setShowSpanish] = useState(false)
  const [showExample, setShowExample] = useState(false)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        {vokabel.illustration?.url && (
          <div className="relative w-full h-32 rounded-md overflow-hidden mb-3">
            <Image
              src={vokabel.illustration.url}
              alt={vokabel.illustration.alt}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xl font-bold text-foreground">{vokabel.deutschesBegriff}</p>
            <Badge variant="outline" className="mt-1 text-xs">
              {vokabel.kategorie}
            </Badge>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Badge className={schwierigkeitFarbe[vokabel.schwierigkeitsgrad] ?? ''}>
              {'★'.repeat(Number(vokabel.schwierigkeitsgrad))}
            </Badge>
            <SpeechPlayer text={vokabel.deutschesBegriff} lang="de-DE" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSpanish(!showSpanish)}
          className="w-full justify-between text-muted-foreground"
        >
          {showSpanish ? `🇪🇸 ${vokabel.spanischerBegriff}` : 'Übersetzung anzeigen'}
          {showSpanish ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {showSpanish && (
          <div className="flex items-center justify-between px-2">
            <span className="text-foreground">{vokabel.spanischerBegriff}</span>
            <SpeechPlayer text={vokabel.spanischerBegriff} lang="es-ES" />
          </div>
        )}

        {vokabel.beispielSatz?.deutsch && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExample(!showExample)}
            className="w-full justify-between text-xs text-muted-foreground"
          >
            Beispielsatz
            {showExample ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        )}

        {showExample && vokabel.beispielSatz && (
          <div className="bg-primary/5 rounded-md p-3 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm text-foreground italic flex-1">
                {vokabel.beispielSatz.deutsch}
              </p>
              <SpeechPlayer text={vokabel.beispielSatz.deutsch ?? ''} lang="de-DE" />
            </div>
            {vokabel.beispielSatz.spanisch && (
              <p className="text-xs text-muted-foreground">{vokabel.beispielSatz.spanisch}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
