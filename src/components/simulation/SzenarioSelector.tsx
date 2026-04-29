'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, ChevronRight } from 'lucide-react'
import DialogFlow from './DialogFlow'

interface DialogTurn {
  rolle: 'Florist' | 'Kunde'
  deutscherText: string
  spanischerText: string
}

interface Konversation {
  id: string
  titel: string
  szenario: string
  schwierigkeitsgrad: string
  dialog: DialogTurn[]
}

const szenarioFarbe: Record<string, string> = {
  Kundenansprache: 'bg-blue-100 text-blue-800',
  Fachberatung: 'bg-purple-100 text-purple-800',
  Verkaufsgespraech: 'bg-green-100 text-green-800',
  Zahlung: 'bg-amber-100 text-amber-800',
}

const schwierigkeitFarbe: Record<string, string> = {
  '1': 'bg-emerald-100 text-emerald-800',
  '2': 'bg-amber-100 text-amber-800',
  '3': 'bg-rose-100 text-rose-800',
}

export default function SzenarioSelector({ konversationen }: { konversationen: Konversation[] }) {
  const [selected, setSelected] = useState<Konversation | null>(null)

  if (selected) {
    return <DialogFlow konversation={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {konversationen.map((k) => (
        <Card key={k.id} className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader className="pb-2">
            <div className="flex gap-2 flex-wrap">
              <Badge className={szenarioFarbe[k.szenario] ?? 'bg-stone-100 text-stone-800'}>
                {k.szenario === 'Verkaufsgespraech' ? 'Verkaufsgespräch' : k.szenario}
              </Badge>
              <Badge className={schwierigkeitFarbe[k.schwierigkeitsgrad] ?? ''}>
                {'★'.repeat(Number(k.schwierigkeitsgrad))}
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
              {k.titel}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {k.dialog.length} Gesprächsschritte
            </p>
            <Button
              onClick={() => setSelected(k)}
              className="w-full bg-primary hover:bg-primary/90"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Starten
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
