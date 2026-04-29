import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, crop: 'center' },
      { name: 'card', width: 800, height: 600, crop: 'center' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      Boolean(user && ['admin', 'editor'].includes((user as any).role)),
    update: ({ req: { user } }) =>
      Boolean(user && (user as any).role === 'admin'),
    delete: ({ req: { user } }) =>
      Boolean(user && (user as any).role === 'admin'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
