'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const KATEGORIEN = ['Alle', 'Blumen', 'Werkzeuge', 'Kundschaft', 'Verwaltung', 'Allgemein']

export default function KategorieFilter({ active }: { active?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (kat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (kat === 'Alle') {
      params.delete('kategorie')
    } else {
      params.set('kategorie', kat)
    }
    router.push(`/vokabeln?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {KATEGORIEN.map((kat) => {
        const isActive = kat === 'Alle' ? !active : active === kat
        return (
          <Button
            key={kat}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleClick(kat)}
            className={cn(isActive && 'bg-primary text-primary-foreground')}
          >
            {kat}
          </Button>
        )
      })}
    </div>
  )
}
