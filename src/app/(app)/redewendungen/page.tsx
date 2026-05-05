import { Suspense } from 'react'
import { getPayloadClient } from '@/lib/payload'
import { getCurrentUser, hasAccess } from '@/lib/auth'
import AccessGate from '@/components/auth/AccessGate'
import KontextFilter from '@/components/redewendungen/KontextFilter'
import RedewendungCard from '@/components/redewendungen/RedewendungCard'
import { Skeleton } from '@/components/ui/skeleton'

// Next.js 16: searchParams is a Promise
export default async function RedewendungenPage({
  searchParams,
}: {
  searchParams: Promise<{ kontext?: string }>
}) {
  const user = await getCurrentUser()
  if (!hasAccess(user)) return <AccessGate user={user} />

  const { kontext } = await searchParams
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'redewendungen',
    ...(kontext ? { where: { kontext: { equals: kontext } } } : {}),
    depth: 1,
    limit: 200,
    sort: 'schwierigkeitsgrad',
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Redewendungen</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Typische Sätze für den Floristik-Alltag — mit Aussprache auf Deutsch und Spanisch
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-10 w-80" />}>
        <KontextFilter active={kontext} />
      </Suspense>

      {docs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Keine Redewendungen gefunden.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((d: any) => (
            <RedewendungCard
              key={d.id}
              redewendung={{
                id: String(d.id),
                deutscheRedewendung: d.deutscheRedewendung,
                spanischeRedewendung: d.spanischeRedewendung,
                kontext: d.kontext,
                schwierigkeitsgrad: d.schwierigkeitsgrad,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
