import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import SpeechPlayer from '@/components/speech/SpeechPlayer'

interface RedewendungCardProps {
  redewendung: {
    id: string
    deutscheRedewendung: string
    spanischeRedewendung: string
    kontext: string
    schwierigkeitsgrad: string
  }
}

const schwierigkeitFarbe: Record<string, string> = {
  '1': 'bg-emerald-100 text-emerald-800',
  '2': 'bg-amber-100 text-amber-800',
  '3': 'bg-rose-100 text-rose-800',
}

const kontextFarbe: Record<string, string> = {
  'Begrüssung': 'bg-blue-100 text-blue-800',
  'Beratung': 'bg-purple-100 text-purple-800',
  'Verkauf': 'bg-green-100 text-green-800',
  'Zahlung': 'bg-amber-100 text-amber-800',
  'Kollegen': 'bg-rose-100 text-rose-800',
}

export default function RedewendungCard({ redewendung }: RedewendungCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-2 flex-wrap">
            <Badge className={kontextFarbe[redewendung.kontext] ?? 'bg-stone-100 text-stone-800'}>
              {redewendung.kontext}
            </Badge>
            <Badge className={schwierigkeitFarbe[redewendung.schwierigkeitsgrad] ?? ''}>
              {'★'.repeat(Number(redewendung.schwierigkeitsgrad))}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="font-semibold text-foreground text-base leading-snug">
              {redewendung.deutscheRedewendung}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Deutsch</p>
          </div>
          <SpeechPlayer text={redewendung.deutscheRedewendung} lang="de-DE" />
        </div>

        <div className="border-t border-border pt-3 flex items-start gap-2">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm leading-snug">
              {redewendung.spanischeRedewendung}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Español</p>
          </div>
          <SpeechPlayer text={redewendung.spanischeRedewendung} lang="es-ES" />
        </div>
      </CardContent>
    </Card>
  )
}
