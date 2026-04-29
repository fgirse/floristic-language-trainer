import type { CollectionConfig } from 'payload'

export const Vokabeln: CollectionConfig = {
  slug: 'vokabeln',
  admin: {
    useAsTitle: 'deutschesBegriff',
    defaultColumns: ['deutschesBegriff', 'spanischerBegriff', 'kategorie', 'schwierigkeitsgrad'],
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
      name: 'deutschesBegriff',
      label: 'Deutsches Wort / Begriff',
      type: 'text',
      required: true,
    },
    {
      name: 'spanischerBegriff',
      label: 'Spanisches Wort / Begriff',
      type: 'text',
      required: true,
    },
    {
      name: 'kategorie',
      label: 'Kategorie',
      type: 'select',
      required: true,
      options: [
        { label: 'Blumen', value: 'Blumen' },
        { label: 'Werkzeuge', value: 'Werkzeuge' },
        { label: 'Kundschaft', value: 'Kundschaft' },
        { label: 'Verwaltung', value: 'Verwaltung' },
        { label: 'Allgemein', value: 'Allgemein' },
      ],
    },
    {
      name: 'illustration',
      label: 'Illustration',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'beispielSatz',
      label: 'Beispielsatz',
      type: 'group',
      fields: [
        {
          name: 'deutsch',
          label: 'Auf Deutsch',
          type: 'textarea',
        },
        {
          name: 'spanisch',
          label: 'Auf Spanisch',
          type: 'textarea',
        },
      ],
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
