import type { Field } from 'payload'

/**
 * Botão com destino escolhido por opções, em vez de pedir uma URL ao usuário.
 * Resolvido no site por `resolveLink()` (src/lib/link.ts).
 */
export const linkFields = ({ labelDefault }: { labelDefault: string }): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'ctaLabel',
        type: 'text',
        label: 'Texto do botão',
        defaultValue: labelDefault,
        admin: { width: '40%', description: 'Deixe vazio para não mostrar botão.' },
      },
      {
        name: 'ctaType',
        type: 'select',
        label: 'O botão leva para…',
        defaultValue: 'properties',
        required: true,
        admin: { width: '60%' },
        options: [
          { label: 'Lista de todos os imóveis', value: 'properties' },
          { label: 'Um imóvel específico', value: 'property' },
          { label: 'Página Sobre nós', value: 'about' },
          { label: 'Formulário de contato', value: 'contact' },
          { label: 'Conversa no WhatsApp', value: 'whatsapp' },
          { label: 'Outro endereço (avançado)', value: 'custom' },
        ],
      },
    ],
  },
  {
    name: 'ctaProperty',
    type: 'relationship',
    relationTo: 'properties',
    label: 'Qual imóvel?',
    filterOptions: { status: { equals: 'published' } },
    admin: { condition: (_, sibling) => sibling?.ctaType === 'property' },
  },
  {
    name: 'ctaPropertyType',
    type: 'relationship',
    relationTo: 'property-types',
    label: 'Mostrar só um tipo de imóvel? (opcional)',
    admin: {
      condition: (_, sibling) => sibling?.ctaType === 'properties',
      description: 'Ex.: escolha "Casa" para o botão abrir a lista já filtrada por casas.',
    },
  },
  {
    name: 'ctaHref',
    type: 'text',
    label: 'Endereço do link',
    admin: {
      condition: (_, sibling) => sibling?.ctaType === 'custom',
      placeholder: '/imoveis?bairro=laranjal-pelotas',
    },
  },
]
