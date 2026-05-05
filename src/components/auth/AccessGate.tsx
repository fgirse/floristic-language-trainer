import Link from 'next/link'
import type { AuthUser } from '@/lib/auth'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AccessGateProps {
  user: AuthUser | null
}

export default function AccessGate({ user }: AccessGateProps) {
  if (!user) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-card border border-border rounded-xl shadow-(--shadow-hard) p-8 max-w-md w-full text-center space-y-4">
          <div className="text-4xl">🔒</div>
          <h2 className="text-xl font-bold text-foreground">
            Nur für registrierte Nutzer
          </h2>
          <p className="text-muted-foreground text-sm">
            Dieser Bereich ist ausschliesslich für registrierte Nutzer zugänglich.
            Bitte melde dich an oder erstelle ein kostenloses Konto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/sign-in" className={buttonVariants()}>
              Anmelden
            </Link>
            <Link href="/sign-up" className={buttonVariants({ variant: 'outline' })}>
              Kostenlos registrieren
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="bg-card border border-border rounded-xl shadow-(--shadow-hard) p-8 max-w-md w-full text-center space-y-4">
        <div className="text-4xl">🌸</div>
        <h2 className="text-xl font-bold text-foreground">Zugang freischalten</h2>
        <p className="text-muted-foreground text-sm">
          Hallo {user.name ?? user.email}! Um den Sprachtrainer zu nutzen, benötigst du einen
          aktiven Zugang. Schalte ihn jetzt mit einem einmaligen Kauf frei.
        </p>
        <Link
          href="/pricing"
          className={cn(buttonVariants(), 'w-full sm:w-auto')}
        >
          Jetzt Zugang kaufen
        </Link>
      </div>
    </div>
  )
}
