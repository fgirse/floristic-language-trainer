import * as dotenv from 'dotenv'
import path from 'path'

// Must run before any Payload imports so env vars are available at module init time
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import vokabelnData from './vokabeln.json' with { type: 'json' }
import redewendungenData from './redewendungen.json' with { type: 'json' }
import konversationenData from './konversationen.json' with { type: 'json' }

async function seed() {
  // Dynamic imports ensure env vars are set before payload config initialises
  const { getPayload } = await import('payload')
  const { default: config } = await import('../../payload.config.js')

  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'vokabeln', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('Already seeded — skipping. Delete existing entries first to re-seed.')
    process.exit(0)
  }

  console.log('Seeding Vokabeln...')
  for (const item of vokabelnData) {
    await payload.create({ collection: 'vokabeln', data: item as Record<string, unknown> })
  }
  console.log(`  ✓ ${vokabelnData.length} Vokabeln`)

  console.log('Seeding Redewendungen...')
  for (const item of redewendungenData) {
    await payload.create({ collection: 'redewendungen', data: item as Record<string, unknown> })
  }
  console.log(`  ✓ ${redewendungenData.length} Redewendungen`)

  console.log('Seeding Konversationen...')
  for (const item of konversationenData) {
    await payload.create({ collection: 'konversationen', data: item as Record<string, unknown> })
  }
  console.log(`  ✓ ${konversationenData.length} Konversationen`)

  console.log('\nSeed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
