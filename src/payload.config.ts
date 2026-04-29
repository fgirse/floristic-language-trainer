import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Vokabeln } from './collections/Vokabeln'
import { Redewendungen } from './collections/Redewendungen'
import { Konversationen } from './collections/Konversationen'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Floristic Language App',
    },
  },
  collections: [Users, Media, Vokabeln, Redewendungen, Konversationen],
  globals: [Navigation],
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5_000_000,
    },
  },
})
