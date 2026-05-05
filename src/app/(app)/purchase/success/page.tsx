import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function PurchaseSuccessPage() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="bg-card border border-border rounded-xl shadow-(--shadow-hard) p-8 max-w-md w-full text-center space-y-4">
        <div className="text-5xl">🌸</div>
        <h1 className="text-2xl font-bold text-foreground">Vielen Dank!</h1>
        <p className="text-muted-foreground text-sm">
          Deine Zahlung war erfolgreich. Dein Zugang wird in wenigen Sekunden aktiviert —
          bitte lade die Seite neu, falls der Zugang noch nicht sichtbar ist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/vokabeln" className={buttonVariants()}>
            Zu den Vokabeln
          </Link>
          <Link href="/simulation" className={buttonVariants({ variant: 'outline' })}>
            Zur Simulation
          </Link>
        </div>
      </div>
    </div>
  )
}
