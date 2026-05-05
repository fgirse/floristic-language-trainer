import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayloadClient } from '@/lib/payload'

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

export async function POST(req: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get('x-signature') ?? ''

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  const event = JSON.parse(rawBody)
  const eventName: string = event?.meta?.event_name ?? ''

  console.log('[webhook] event received', { eventName })

  if (eventName === 'order_created') {
    const orderId: string = event?.data?.id ?? 'unknown'
    const userId: string | undefined = event?.meta?.custom_data?.user_id
    const customerEmail: string | undefined = event?.data?.attributes?.user_email

    console.log('[webhook] order_created', { orderId, userId, customerEmail })

    if (!userId && !customerEmail) {
      console.error('[webhook] order_created missing user identifier', { orderId })
      return NextResponse.json({ error: 'No user identifier in payload.' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    try {
      if (userId) {
        await payload.update({
          collection: 'users',
          id: userId,
          data: { subscriptionStatus: 'active' },
        })
        console.log('[webhook] subscriptionStatus set to active', { userId })
      } else if (customerEmail) {
        const { docs } = await payload.find({
          collection: 'users',
          where: { email: { equals: customerEmail } },
          limit: 1,
        })
        if (docs[0]) {
          await payload.update({
            collection: 'users',
            id: String(docs[0].id),
            data: { subscriptionStatus: 'active' },
          })
          console.log('[webhook] subscriptionStatus set to active', { email: customerEmail })
        } else {
          console.warn('[webhook] no user found for email', { customerEmail })
        }
      }
    } catch (err) {
      console.error('[webhook] failed to update user', err)
      return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
