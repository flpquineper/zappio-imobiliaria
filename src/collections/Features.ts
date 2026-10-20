import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateSite'

export const Features: CollectionConfig = {
  slug: 'features',
  labels: { singular: 'Característica', plural: 'Características' },
  admin: {
    useAsTitle: 'name',
    group: false, hideAPIURL: true,
    description: 'Itens como piscina, churrasqueira, sacada, elevador…',
  },
  defaultSort: 'name',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [{ name: 'name', type: 'text', label: 'Nome', required: true, unique: true }],
}
