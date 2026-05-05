'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { generatePayloadCookie } from 'payload'
import { getPayloadClient } from '@/lib/payload'

export type AuthState = {
  error?: string
  fieldErrors?: Record<string, string>
} | null

export async function signinAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email) return { fieldErrors: { email: 'E-Mail ist erforderlich.' } }
  if (!password) return { fieldErrors: { password: 'Passwort ist erforderlich.' } }

  try {
    const payload = await getPayloadClient()
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (result.token) {
      const collectionConfig = payload.collections['users'].config
      const payloadCookie = generatePayloadCookie({
        collectionAuthConfig: collectionConfig.auth as any,
        cookiePrefix: payload.config.cookiePrefix,
        returnCookieAsObject: true,
        token: result.token,
      }) as any

      const cookieStore = await cookies()
      cookieStore.set(payloadCookie.name, payloadCookie.value, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: payloadCookie.expires ? new Date(payloadCookie.expires) : undefined,
      })
    }
  } catch (err: any) {
    const msg: string = err?.message ?? ''
    if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('credentials')) {
      return { error: 'Ungültige E-Mail oder Passwort.' }
    }
    return { error: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' }
  }

  redirect('/')
}

export async function signupAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  const fieldErrors: Record<string, string> = {}
  if (!name || name.length < 2) fieldErrors.name = 'Name muss mindestens 2 Zeichen haben.'
  if (!email || !email.includes('@')) fieldErrors.email = 'Gültige E-Mail erforderlich.'
  if (!password || password.length < 8) fieldErrors.password = 'Passwort muss mindestens 8 Zeichen haben.'
  if (password !== passwordConfirm) fieldErrors.passwordConfirm = 'Passwörter stimmen nicht überein.'
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors }

  try {
    const payload = await getPayloadClient()

    await payload.create({
      collection: 'users',
      data: { name, email, password },
    })

    const loginResult = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (loginResult.token) {
      const collectionConfig = payload.collections['users'].config
      const payloadCookie = generatePayloadCookie({
        collectionAuthConfig: collectionConfig.auth as any,
        cookiePrefix: payload.config.cookiePrefix,
        returnCookieAsObject: true,
        token: loginResult.token,
      }) as any

      const cookieStore = await cookies()
      cookieStore.set(payloadCookie.name, payloadCookie.value, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: payloadCookie.expires ? new Date(payloadCookie.expires) : undefined,
      })
    }
  } catch (err: any) {
    const msg: string = err?.message ?? ''
    if (msg.toLowerCase().includes('duplicate') || msg.toLowerCase().includes('already')) {
      return { error: 'Diese E-Mail-Adresse ist bereits registriert.' }
    }
    return { error: 'Registrierung fehlgeschlagen. Bitte versuche es erneut.' }
  }

  redirect('/')
}

export async function signoutAction() {
  try {
    const payload = await getPayloadClient()
    const headersList = await headers()
    const authResult = await payload.auth({ headers: headersList })

    if (authResult.user) {
      const cookieStore = await cookies()
      const allCookies = cookieStore.getAll()
      const tokenCookie = allCookies.find((c) =>
        c.name.startsWith(payload.config.cookiePrefix),
      )
      if (tokenCookie) {
        cookieStore.delete(tokenCookie.name)
      }
    }
  } catch {
    // ignore errors during logout
  }

  redirect('/')
}
