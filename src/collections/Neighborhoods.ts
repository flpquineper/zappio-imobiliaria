import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateSite'

export const Neighborhoods: CollectionConfig = {
  slug: 'neighborhoods',
  labels: { singular: 'Bairro', plural: 'Bairros' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'city'], group: false, hideAPIURL: true, description: 'Bairros usados no cadastro de imóveis e no filtro do site.' },
  defaultSort: 'name',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true },
    { name: 'city', type: 'text', label: 'Cidade', required: true, defaultValue: 'Pelotas' },
    slugField(['name', 'city']),
  ],
}
