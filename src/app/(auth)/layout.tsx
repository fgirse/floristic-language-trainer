import type { Metadata } from 'next'
import { Geist, Special_Elite } from 'next/font/google'
import '../globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const specialElite = Special_Elite({
  variable: '--font-special-elite',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Floristic Deutsch — Konto',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${specialElite.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
          <a
            href="/"
            className="mb-8 text-primary font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            🌱 Floristic Deutsch Trainer 🌱
          </a>
          {children}
        </div>
      </body>
    </html>
  )
}
