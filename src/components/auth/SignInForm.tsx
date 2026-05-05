'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signinAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

export default function SignInForm() {
  const [state, action, isPending] = useActionState(signinAction, null)

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-xl shadow-(--shadow-hard) p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Anmelden</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Willkommen zurück beim Floristik Sprachtrainer
          </p>
        </div>

        <form action={action} className="space-y-4">
          {state?.error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@beispiel.ch"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state?.fieldErrors?.email && (
              <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state?.fieldErrors?.password && (
              <p className="text-xs text-destructive">{state.fieldErrors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Anmelden…' : 'Anmelden'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Noch kein Konto?{' '}
          <Link href="/sign-up" className="text-primary font-medium hover:underline">
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </div>
  )
}
