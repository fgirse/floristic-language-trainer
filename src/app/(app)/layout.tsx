import type { Metadata } from 'next'
import { Geist, Geist_Mono, Special_Elite } from 'next/font/google'
import { getPayloadClient } from '@/lib/payload'
import { getCurrentUser } from '@/lib/auth'
import AppNavbar from '@/components/navigation/AppNavbar'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const specialElite = Special_Elite({
  variable: '--font-special-elite',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Floristic Deutsch',
  description: 'Deutschtraining für spanischsprachige Floristinnen und Floristen',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const user = await getCurrentUser()

  let menuItems: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Vokabeln', href: '/vokabeln' },
    { label: 'Redewendungen', href: '/redewendungen' },
    { label: 'Simulation', href: '/simulation' },
  ]

  try {
    const nav = await payload.findGlobal({ slug: 'navigation' })
    if (nav.menuItems && nav.menuItems.length > 0) {
      menuItems = nav.menuItems as { label: string; href: string }[]
    }
  } catch {
    // Use defaults if global not seeded yet
  }

  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${specialElite.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <div className="min-h-screen">
          <AppNavbar menuItems={menuItems} user={user} />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
