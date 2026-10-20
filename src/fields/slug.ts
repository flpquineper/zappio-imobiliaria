import type { TextField } from 'payload'

import { slugify } from '@/lib/slugify'

/** Campo slug gerado a partir de outros campos quando deixado em branco. */
export const slugField = (
  from: string[],
  { sidebar = true, auto = true }: { sidebar?: boolean; /** false: a coleção gera o slug no próprio hook */ auto?: boolean } = {},
): TextField => ({
  name: 'slug',
  type: 'text',
  label: 'Slug (URL)',
  unique: true,
  index: true,
  admin: {
    position: sidebar ? 'sidebar' : undefined,
    description: 'Endereço da página no site. Gerado automaticamente; só altere se souber o que está fazendo.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        if (!auto) return value
        const source = from
          .map((key) => data?.[key])
          .filter(Boolean)
          .join(' ')
        return source ? slugify(source) : value
      },
    ],
  },
})
