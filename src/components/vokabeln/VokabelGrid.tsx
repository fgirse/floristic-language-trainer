import VokabelCard from './VokabelCard'

interface Vokabel {
  id: string
  deutschesBegriff: string
  spanischerBegriff: string
  kategorie: string
  schwierigkeitsgrad: string
  illustration?: { url: string; alt: string } | null
  beispielSatz?: { deutsch?: string | null; spanisch?: string | null } | null
}

export default function VokabelGrid({ vokabeln }: { vokabeln: Vokabel[] }) {
  if (vokabeln.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">Keine Vokabeln gefunden.</p>
        <p className="text-sm mt-1">Wähle eine andere Kategorie oder füge Einträge im CMS hinzu.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {vokabeln.map((v) => (
        <VokabelCard key={v.id} vokabel={v} />
      ))}
    </div>
  )
}
