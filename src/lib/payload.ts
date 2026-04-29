import config from '@payload-config'
import { getPayload } from 'payload'

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config })
  }
  return cachedPayload
}
