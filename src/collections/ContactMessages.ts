import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: { singular: 'Contato recebido', plural: 'Contatos recebidos' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'handled', 'phone', 'property', 'createdAt'],
    group: false,
    hideAPIURL: true,
    description: 'Mensagens enviadas pelo formulário do site. Depois de responder, marque "Já respondido".',
  },
  defaultSort: '-createdAt',
  // Criação só acontece pela server action do formulário (Local API com overrideAccess).
  access: { read: authenticated, create: () => false, update: authenticated, delete: authenticated },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true, admin: { readOnly: true } },
    { name: 'email', type: 'email', label: 'E-mail', required: true, admin: { readOnly: true } },
    { name: 'phone', type: 'text', label: 'Telefone', admin: { readOnly: true } },
    { name: 'message', type: 'textarea', label: 'Mensagem', required: true, admin: { readOnly: true } },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      label: 'Imóvel de interesse',
      admin: { readOnly: true, components: { Cell: '/components/admin/cells/PropertyRefCell#PropertyRefCell' } },
    },
    {
      name: 'consent',
      type: 'checkbox',
      label: 'Consentiu com a política de privacidade',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'replyActions',
      type: 'ui',
      admin: { position: 'sidebar', components: { Field: '/components/admin/ContactActions#ContactActions' } },
    },
    {
      name: 'handled',
      type: 'checkbox',
      label: 'Já respondido',
      defaultValue: false,
      admin: { position: 'sidebar', components: { Cell: '/components/admin/cells/HandledCell#HandledCell' } },
    },
  ],
}
