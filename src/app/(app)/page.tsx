import { getPayloadClient } from '@/lib/payload'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import NavigationCards from '@/components/home/NavigationCards'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [vokabeln, redewendungen, konversationen] = await Promise.all([
    payload.find({ collection: 'vokabeln', limit: 0 }),
    payload.find({ collection: 'redewendungen', limit: 0 }),
    payload.find({ collection: 'konversationen', limit: 0 }),
  ])

  return (
    <div className="space-y-10">
      {/* Hero */}
      <HeroSection />

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
