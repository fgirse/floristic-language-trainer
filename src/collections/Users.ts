import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && (user as any).role === 'admin'),
    admin: ({ req: { user } }) => Boolean(user && (user as any).role === 'admin'),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      access: {
        update: ({ req: { user } }) => Boolean(user && (user as any).role === 'admin'),
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'subscriptionStatus',
      type: 'select',
      required: true,
      defaultValue: 'inactive',
      access: {
        update: ({ req: { user } }) => Boolean(user && (user as any).role === 'admin'),
      },
      options: [
        { label: 'Inaktiv', value: 'inactive' },
        { label: 'Aktiv', value: 'active' },
      ],
      admin: {
        description: 'Wird nach erfolgter Zahlung auf "Aktiv" gesetzt.',
      },
    },
    {
      name: 'lemonSqueezyCustomerId',
      type: 'text',
      access: {
        read: ({ req: { user } }) => Boolean(user && (user as any).role === 'admin'),
        update: ({ req: { user } }) => Boolean(user && (user as any).role === 'admin'),
      },
      admin: {
        description: 'Lemon Squeezy Kunden-ID (wird automatisch gesetzt).',
      },
    },
  ],
}
