'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const KONTEXTE = ['Alle', 'Begrüssung', 'Beratung', 'Verkauf', 'Zahlung', 'Kollegen']

export default function KontextFilter({ active }: { active?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (kontext: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (kontext === 'Alle') {
      params.delete('kontext')
    } else {
      params.set('kontext', kontext)
    }
    router.push(`/redewendungen?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {KONTEXTE.map((k) => {
        const isActive = k === 'Alle' ? !active : active === k
        return (
          <Button
            key={k}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleClick(k)}
            className={cn(isActive && 'bg-primary text-primary-foreground')}
          >
            {k}
          </Button>
        )
      })}
    </div>
  )
}
