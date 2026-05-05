import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY
  const storeId = process.env.LEMONSQUEEZY_STORE_ID
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID

  if (!apiKey || !storeId || !variantId) {
    return NextResponse.json(
      { error: 'Payment service not configured.' },
      { status: 503 },
    )
  }

  // Get current user to attach to the order
  const payload = await getPayloadClient()
  const headersList = await headers()
  const authResult = await payload.auth({ headers: headersList })
  const user = authResult.user

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
  }

  const appUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_options: {
          embed: false,
          media: true,
          logo: true,
          desc: true,
          discount: true,
          button_color: '#4a7c59',
        },
        checkout_data: {
          email: user.email,
          custom: {
            user_id: String(user.id),
          },
        },
        product_options: {
          redirect_url: `${appUrl}/purchase/success`,
        },
      },
      relationships: {
        store: {
          data: { type: 'stores', id: storeId },
        },
        variant: {
          data: { type: 'variants', id: variantId },
        },
      },
    },
  }

  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('Lemon Squeezy checkout error:', text)
    return NextResponse.json({ error: 'Failed to create checkout.' }, { status: 500 })
  }

  const json = await response.json()
  const checkoutUrl = json?.data?.attributes?.url

  return NextResponse.json({ checkoutUrl })
}
