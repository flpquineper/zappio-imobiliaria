import type { CollectionConfig } from 'payload'

import { adminOnly, adminOnlyField, adminOrSelf } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: false,
    hideAPIURL: true,
    description: 'Pessoas com acesso a este painel.',
  },
  auth: true,
  access: {
    read: adminOrSelf,
    create: adminOnly,
    update: adminOrSelf,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true },
    {
      name: 'role',
      type: 'select',
      label: 'Perfil',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      access: { update: adminOnlyField },
      options: [
        { label: 'Administrador — tudo, inclusive dados da imobiliária e usuários', value: 'admin' },
        { label: 'Editor — imóveis e páginas do site', value: 'editor' },
      ],
    },
  ],
}
