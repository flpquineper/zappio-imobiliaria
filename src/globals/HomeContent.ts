import type { Field, GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { linkFields } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidateSite'

const bannerFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Título',
    required: true,
    maxLength: 70,
    admin: { description: 'Frase curta e marcante. Ex.: "Procure menos, encontre mais."' },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    label: 'Texto de apoio',
    maxLength: 180,
    admin: { rows: 2, description: 'Opcional. Uma ou duas linhas abaixo do título.' },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'imageDesktop',
        type: 'upload',
        relationTo: 'media',
        label: 'Foto para computador',
        required: true,
        admin: { width: '50%', description: 'Horizontal, de preferência 1920 × 800 px.' },
      },
      {
        name: 'imageMobile',
        type: 'upload',
        relationTo: 'media',
        label: 'Foto para celular (opcional)',
        admin: {
          width: '50%',
          description: 'Vertical, 1080 × 1350 px. Se ficar vazio, usamos a foto de computador recortada.',
        },
      },
    ],
  },
  ...linkFields({ labelDefault: 'Ver imóveis' }),
  {
    type: 'collapsible',
    label: 'Agendar exibição (opcional)',
    admin: { initCollapsed: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'startsAt',
            type: 'date',
            label: 'Mostrar a partir de',
            admin: { width: '50%', date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd/MM/yyyy HH:mm' } },
          },
          {
            name: 'endsAt',
            type: 'date',
            label: 'Mostrar até',
            admin: { width: '50%', date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd/MM/yyyy HH:mm' } },
          },
        ],
      },
    ],
  },
  {
    name: 'active',
    type: 'checkbox',
    label: 'Mostrar este banner no site',
    defaultValue: true,
  },
]

export const HomeContent: GlobalConfig = {
  slug: 'home-content',
  label: 'Página inicial',
  admin: {
    group: false,
    hideAPIURL: true,
    description:
      'Tudo o que aparece na página inicial, na mesma ordem do site. Edite, clique em "Salvar" e acompanhe na prévia ao lado.',
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '1. Banners',
          description:
            'O carrossel de fotos no topo da página. Arraste os itens para mudar a ordem; o primeiro é o que aparece ao abrir o site.',
          fields: [
            {
              name: 'banners',
              type: 'array',
              label: 'Banners',
              labels: { singular: 'Banner', plural: 'Banners' },
              maxRows: 6,
              admin: {
                initCollapsed: true,
                components: { RowLabel: '/components/admin/BannerRowLabel#BannerRowLabel' },
              },
              fields: bannerFields,
            },
          ],
        },
        {
          label: '2. Destaques',
          description: 'Escolha até 6 imóveis para aparecer logo abaixo da busca. Arraste para mudar a ordem.',
          fields: [
            {
              name: 'featuredProperties',
              type: 'relationship',
              relationTo: 'properties',
              hasMany: true,
              maxRows: 6,
              label: 'Imóveis em destaque',
              filterOptions: { status: { equals: 'published' } },
              admin: {
                isSortable: true,
                description: 'Só aparecem aqui imóveis com status "Publicado".',
              },
            },
            {
              type: 'row',
              fields: [
                { name: 'featuredEyebrow', type: 'text', label: 'Chamada (texto pequeno)', defaultValue: 'Destaques', admin: { width: '35%' } },
                { name: 'featuredTitle', type: 'text', label: 'Título da seção', required: true, admin: { width: '65%' } },
              ],
            },
          ],
        },
        {
          label: '3. Sobre',
          description: 'Bloco com foto, texto de apresentação e números da imobiliária.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'aboutEyebrow', type: 'text', label: 'Chamada (texto pequeno)', defaultValue: 'Sobre a Zappio', admin: { width: '35%' } },
                { name: 'aboutTitle', type: 'text', label: 'Título', required: true, admin: { width: '65%' } },
              ],
            },
            {
              name: 'aboutText',
              type: 'textarea',
              label: 'Texto',
              required: true,
              admin: { rows: 6, description: 'Para começar um novo parágrafo, deixe uma linha em branco.' },
            },
            { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'Foto' },
            {
              name: 'stats',
              type: 'array',
              label: 'Números em destaque',
              labels: { singular: 'Número', plural: 'Números' },
              maxRows: 4,
              admin: { description: 'Até 4. Ex.: "+150" / "famílias atendidas".' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', label: 'Número', required: true, admin: { width: '35%', placeholder: '+150' } },
                    { name: 'label', type: 'text', label: 'Legenda', required: true, admin: { width: '65%', placeholder: 'famílias atendidas' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '4. Diferenciais',
          description: 'Quatro cartões explicando por que comprar com a Zappio.',
          fields: [
            { name: 'benefitsTitle', type: 'text', label: 'Título da seção' },
            {
              name: 'benefits',
              type: 'array',
              label: 'Diferenciais',
              labels: { singular: 'Diferencial', plural: 'Diferenciais' },
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', label: 'Título', required: true },
                { name: 'text', type: 'textarea', label: 'Texto', required: true, admin: { rows: 2 } },
              ],
            },
          ],
        },
        {
          label: '5. Chamada final',
          description: 'Faixa roxa no fim da página, com botão de WhatsApp.',
          fields: [
            { name: 'ctaTitle', type: 'text', label: 'Título', required: true },
            { name: 'ctaText', type: 'textarea', label: 'Texto', admin: { rows: 2 } },
          ],
        },
      ],
    },
  ],
}
