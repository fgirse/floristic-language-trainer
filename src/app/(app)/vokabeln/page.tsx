import { Suspense } from 'react'
import { getPayloadClient } from '@/lib/payload'
import KategorieFilter from '@/components/vokabeln/KategorieFilter'
import VokabelGrid from '@/components/vokabeln/VokabelGrid'
import { Skeleton } from '@/components/ui/skeleton'

// Next.js 16: searchParams is a Promise
export default async function VokabelnPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorie?: string }>
}) {
  const { kategorie } = await searchParams
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'vokabeln',
    ...(kategorie ? { where: { kategorie: { equals: kategorie } } } : {}),
    depth: 1,
    limit: 200,
    sort: 'schwierigkeitsgrad',
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vokabeln</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Deutsch ↔ Español — klicke das Lautsprecher-Symbol zum Anhören
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-10 w-64" />}>
        <KategorieFilter active={kategorie} />
      </Suspense>

      <VokabelGrid
        vokabeln={docs.map((d: any) => ({
          id: String(d.id),
          deutschesBegriff: d.deutschesBegriff,
          spanischerBegriff: d.spanischerBegriff,
          kategorie: d.kategorie,
          schwierigkeitsgrad: d.schwierigkeitsgrad,
          illustration: d.illustration
            ? { url: d.illustration.url, alt: d.illustration.alt ?? d.illustration.filename }
            : null,
          beispielSatz: d.beispielSatz ?? null,
        }))}
      />
    </div>
  )
}
