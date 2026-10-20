import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateSite'

export const PropertyTypes: CollectionConfig = {
  slug: 'property-types',
  labels: { singular: 'Tipo de imóvel', plural: 'Tipos de imóvel' },
  admin: { useAsTitle: 'name', group: false, hideAPIURL: true, description: 'Tipos usados no cadastro e no filtro do site. O prefixo forma o código dos imóveis.' },
  defaultSort: 'name',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true, admin: { description: 'Ex.: Casa, Apartamento, Cobertura' } },
    {
      name: 'codePrefix',
      type: 'text',
      label: 'Prefixo do código',
      maxLength: 3,
      admin: { description: 'Usado nos códigos dos imóveis. Ex.: AP, CA, CO' },
    },
    slugField(['name']),
  ],
}
