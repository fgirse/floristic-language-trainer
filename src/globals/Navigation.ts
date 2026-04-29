import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    update: ({ req: { user } }) =>
      Boolean(user && (user as any).role === 'admin'),
  },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      defaultValue: [
        { label: 'Home', href: '/' },
        { label: 'Vokabeln', href: '/vokabeln' },
        { label: 'Redewendungen', href: '/redewendungen' },
        { label: 'Simulation', href: '/simulation' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
