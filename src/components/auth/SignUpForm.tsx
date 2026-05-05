'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signupAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

export default function SignUpForm() {
  const [state, action, isPending] = useActionState(signupAction, null)

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-xl shadow-(--shadow-hard) p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Konto erstellen</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Registriere dich für den Floristik Sprachtrainer
          </p>
        </div>

        <form action={action} className="space-y-4">
          {state?.error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Maria Müller"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state?.fieldErrors?.name && (
              <p className="text-xs text-destructive">{state.fieldErrors.name}</p>
            )}
          </div>

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
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state?.fieldErrors?.password && (
              <p className="text-xs text-destructive">{state.fieldErrors.password}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="passwordConfirm" className="text-sm font-medium text-foreground">
              Passwort bestätigen
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state?.fieldErrors?.passwordConfirm && (
              <p className="text-xs text-destructive">{state.fieldErrors.passwordConfirm}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Registrieren…' : 'Konto erstellen'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Bereits registriert?{' '}
          <Link href="/sign-in" className="text-primary font-medium hover:underline">
            Jetzt anmelden
          </Link>
        </p>
      </div>
    </div>
  )
}
