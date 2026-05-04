import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
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
      <section className="relative w-full overflow-hidden rounded-xl
                          h-48 sm:h-64 md:h-80 lg:h-96">
        <Image
          src="/HeroTitle.png"
          alt="Floristik Sprach Trainer"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
        />
        {/* overlay for legibility */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white font-bold drop-shadow-lg
                         text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
            Floristik Sprach Trainer
          </h1>
          <p className="mt-2 text-white/80 drop-shadow
                        text-sm sm:text-base md:text-lg max-w-xl">
            Lerne Deutsch für deinen Job als Floristin — Vokabeln, Redewendungen und echte
            Kundengespräche, auf Schweizer&nbsp;🇨🇭 Niveau.
          </p>
        </div>
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
