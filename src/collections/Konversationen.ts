import type { CollectionConfig } from 'payload'

export const Konversationen: CollectionConfig = {
  slug: 'konversationen',
  admin: {
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'szenario', 'schwierigkeitsgrad'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      Boolean(user && ['admin', 'editor'].includes((user as any).role)),
    update: ({ req: { user } }) =>
      Boolean(user && ['admin', 'editor'].includes((user as any).role)),
    delete: ({ req: { user } }) =>
      Boolean(user && (user as any).role === 'admin'),
  },
  fields: [
    {
      name: 'titel',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'szenario',
      label: 'Szenario',
      type: 'select',
      required: true,
      options: [
        { label: 'Kundenansprache', value: 'Kundenansprache' },
        { label: 'Fachberatung', value: 'Fachberatung' },
        { label: 'Verkaufsgespräch', value: 'Verkaufsgespraech' },
        { label: 'Zahlung', value: 'Zahlung' },
      ],
    },
    {
      name: 'dialog',
      label: 'Dialog',
      type: 'array',
      minRows: 2,
      fields: [
        {
          name: 'rolle',
          label: 'Rolle',
          type: 'select',
          required: true,
          options: [
            { label: 'Florist', value: 'Florist' },
            { label: 'Kunde', value: 'Kunde' },
          ],
        },
        {
          name: 'deutscherText',
          label: 'Text auf Deutsch',
          type: 'textarea',
          required: true,
        },
        {
          name: 'spanischerText',
          label: 'Text auf Spanisch',
          type: 'textarea',
          required: true,
        },
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
