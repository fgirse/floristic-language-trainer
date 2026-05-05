'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/payment/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        alert('Fehler beim Erstellen der Zahlung. Bitte versuche es erneut.')
        setLoading(false)
      }
    } catch {
      alert('Fehler beim Erstellen der Zahlung. Bitte versuche es erneut.')
      setLoading(false)
    }
  }

  return (
    <Button className="w-full text-base py-6" onClick={handleCheckout} disabled={loading}>
      {loading ? 'Weiterleitung zur Zahlung…' : '🛒 Jetzt kaufen — CHF 29'}
    </Button>
  )
}
