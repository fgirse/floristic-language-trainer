import { headers } from 'next/headers'
import { getPayloadClient } from './payload'

export type AuthUser = {
  id: string
  email: string
  name?: string
  role: 'admin' | 'editor' | 'user'
  subscriptionStatus: 'active' | 'inactive'
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const payload = await getPayloadClient()
    const headersList = await headers()
    const result = await payload.auth({ headers: headersList })
    return (result.user as unknown as AuthUser) ?? null
  } catch {
    return null
  }
}

export function hasAccess(user: AuthUser | null): boolean {
  if (!user) return false
  if (['admin', 'editor'].includes(user.role)) return true
  return user.subscriptionStatus === 'active'
}
