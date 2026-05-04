'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Flower2, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MenuItem {
  label: string
  href: string
}

export default function AppNavbar({ menuItems }: { menuItems: MenuItem[] }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
        
          <span>🌱 Floristic Deutsch Trainer 🌱</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-4 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent',
              )}
            >
              <span>{item.label}</span>
              {item.label === 'Vokabeln' && (
                <Image
                  src="/wave-blue.svg"
                  alt=""
                  aria-hidden={true}
                  width={64}
                  height={10}
                  unoptimized
                  className="absolute left-0 -bottom-1.5 w-full h-auto pointer-events-none"
                />
              )}
              {item.label === 'Redewendungen' && (
                <Image
                  src="/rect1.svg"
                  alt=""
                  aria-hidden={true}
                  width={56}
                  height={10}
                  unoptimized
                  className="absolute left-0 -bottom-1.0 w-full h-auto pointer-events-none"
                />
              )}
              {item.label === 'Simulation' && (
                <Image
                  src="/halbkreis-chartreuse.svg"
                  alt=""
                  aria-hidden={true}
                  width={56}
                  height={10}
                  unoptimized
                  className="absolute left-0 -bottom-1.5 w-full h-auto pointer-events-none"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger
            render={(props) => (
              <Button variant="ghost" size="icon" className="md:hidden" {...props}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü öffnen</span>
              </Button>
            )}
          />
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-primary">
                <Flower2 className="h-5 w-5" />
                Floristic Deutsch
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-3 rounded-md text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
