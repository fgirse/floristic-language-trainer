import { getPayloadClient } from '@/lib/payload'
import StatsBar from '@/components/home/StatsBar'
import NavigationCards from '@/components/home/NavigationCards'
import { Flower2 } from 'lucide-react'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [vokabeln, redewendungen, konversationen] = await Promise.all([
    payload.find({ collection: 'vokabeln', limit: 0 }),
    payload.find({ collection: 'redewendungen', limit: 0 }),
    payload.find({ collection: 'konversationen', limit: 0 }),
  ])

  return (
    <div className="space-y-10">
      <section className="text-center py-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Flower2 className="h-9 w-9 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">Deutsch für Floristik</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Lerne Deutsch für deinen Job als Floristin — Vokabeln, Redewendungen und echte
          Kundengespräche, auf Schweizer Niveau.
        </p>
        <p className="text-sm text-muted-foreground/70 mt-2">
          Aprende alemán para trabajar como florista en Suiza
        </p>
      </section>

      <StatsBar
        vokabelnCount={vokabeln.totalDocs}
        redewendungenCount={redewendungen.totalDocs}
        konversationenCount={konversationen.totalDocs}
      />

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Wo möchtest du üben?</h2>
        <NavigationCards />
      </section>
    </div>
  )
}
