import Link from 'next/link'
import { getCurrentUser, hasAccess } from '@/lib/auth'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import CheckoutButton from '@/components/pricing/CheckoutButton'

export default async function PricingPage() {
  const user = await getCurrentUser()
  const alreadyHasAccess = hasAccess(user)

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Vollzugang freischalten</h1>
        <p className="text-muted-foreground">
          Einmalige Zahlung — dauerhafter Zugang zum gesamten Sprachtrainer
        </p>
      </div>

      <div className="bg-card border-2 border-primary rounded-xl shadow-(--shadow-hard) p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Floristic Deutsch Trainer</h2>
            <p className="text-muted-foreground text-sm mt-1">Vollzugang — einmalige Zahlung</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">CHF 29</p>
            <p className="text-xs text-muted-foreground">inkl. MwSt.</p>
          </div>
        </div>

        <ul className="space-y-2 text-sm text-foreground">
          {[
            '✅ Alle Vokabeln (Deutsch ↔ Español)',
            '✅ Alle Redewendungen mit Kontext',
            '✅ Gesprächssimulation mit Sprachtraining',
            '✅ Dauerhafter Zugang — keine Abo-Falle',
            '✅ Alle zukünftigen Updates inklusive',
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {alreadyHasAccess ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-primary font-medium">
              Du hast bereits vollen Zugang. 🎉
            </p>
            <Link href="/vokabeln" className={buttonVariants({ variant: 'outline' })}>
              Zum Sprachtrainer
            </Link>
          </div>
        ) : !user ? (
          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Bitte melde dich zuerst an oder erstelle ein Konto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/sign-in" className={buttonVariants()}>
                Anmelden
              </Link>
              <Link href="/sign-up" className={buttonVariants({ variant: 'outline' })}>
                Kostenlos registrieren
              </Link>
            </div>
          </div>
        ) : (
          <CheckoutButton />
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Sichere Zahlung über Lemon Squeezy · Sofortiger Zugang nach Bezahlung
      </p>
    </div>
  )
}
