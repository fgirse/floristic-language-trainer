import { getPayloadClient } from '@/lib/payload'
import SzenarioSelector from '@/components/simulation/SzenarioSelector'

export default async function SimulationPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'konversationen',
    depth: 1,
    limit: 50,
    sort: 'schwierigkeitsgrad',
  })

  const konversationen = docs.map((d: any) => ({
    id: String(d.id),
    titel: d.titel,
    szenario: d.szenario,
    schwierigkeitsgrad: d.schwierigkeitsgrad,
    dialog: (d.dialog ?? []).map((turn: any) => ({
      rolle: turn.rolle,
      deutscherText: turn.deutscherText,
      spanischerText: turn.spanischerText,
    })),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gesprächssimulation</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Wähle ein Szenario und übe echte Kundengespräche — mit Sprachausgabe und Stimmtraining
        </p>
        <p className="text-xs text-muted-foreground/70 mt-0.5">
          Empfohlen: Google Chrome oder Edge (volle Sprachunterstützung)
        </p>
      </div>

      {konversationen.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Noch keine Gespräche vorhanden.</p>
          <p className="text-sm mt-1">
            Führe <code className="bg-muted px-1 rounded">npm run seed</code> aus oder füge
            Konversationen im CMS unter <code className="bg-muted px-1 rounded">/admin</code> hinzu.
          </p>
        </div>
      ) : (
        <SzenarioSelector konversationen={konversationen} />
      )}
    </div>
  )
}
