import type { CollectionConfig } from 'payload'

export const Redewendungen: CollectionConfig = {
  slug: 'redewendungen',
  admin: {
    useAsTitle: 'deutscheRedewendung',
    defaultColumns: ['deutscheRedewendung', 'kontext', 'schwierigkeitsgrad'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (['admin', 'editor'].includes((user as any).role)) return true
      return (user as any).subscriptionStatus === 'active'
    },
    create: ({ req: { user } }) =>
      Boolean(user && ['admin', 'editor'].includes((user as any).role)),
    update: ({ req: { user } }) =>
      Boolean(user && ['admin', 'editor'].includes((user as any).role)),
    delete: ({ req: { user } }) =>
      Boolean(user && (user as any).role === 'admin'),
  },
  fields: [
    {
      name: 'deutscheRedewendung',
      label: 'Deutsche Redewendung',
      type: 'textarea',
      required: true,
    },
    {
      name: 'spanischeRedewendung',
      label: 'Spanische Redewendung',
      type: 'textarea',
      required: true,
    },
    {
      name: 'kontext',
      label: 'Kontext',
      type: 'select',
      required: true,
      options: [
        { label: 'Begrüssung', value: 'Begrüssung' },
        { label: 'Beratung', value: 'Beratung' },
        { label: 'Verkauf', value: 'Verkauf' },
        { label: 'Zahlung', value: 'Zahlung' },
        { label: 'Kollegen', value: 'Kollegen' },
      ],
    },
    {
      name: 'illustration',
      label: 'Illustration',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'schwierigkeitsgrad',
      label: 'Schwierigkeitsgrad',
      type: 'select',
      required: true,
      defaultValue: '1',
      options: [
        { label: '1 — Einfach', value: '1' },
        { label: '2 — Mittel', value: '2' },
        { label: '3 — Fortgeschritten', value: '3' },
      ],
    },
  ],
}
