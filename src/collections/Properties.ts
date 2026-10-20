import type { CollectionBeforeValidateHook, CollectionConfig, PayloadRequest } from 'payload'

import { authenticated, publicPropertiesOrAuthenticated } from '@/access'
import { slugField } from '@/fields/slug'
import { slugify } from '@/lib/slugify'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateSite'

/**
 * Gera o código (ex.: CA0114) a partir do tipo quando fica vazio e, em seguida, o slug (título + código).
 * Fica no hook da coleção porque o slug depende do código, que é assíncrono.
 */
const generateCodeAndSlug: CollectionBeforeValidateHook = async ({ data, req, operation, originalDoc }) => {
  if (!data) return data
  if (typeof data.code === 'string' && data.code.trim()) {
    data.code = data.code.trim().toUpperCase()
  } else if (operation === 'create' || 'code' in data) {
    // Na edição, só gera de novo se o usuário apagou o código (atualizações parciais não trazem o campo).
    data.code = await nextCode({ ...originalDoc, ...data }, req)
  }
  const code = data.code ?? originalDoc?.code
  if (!data.slug && !originalDoc?.slug && data.title) data.slug = slugify(`${data.title} ${code}`)
  return data
}

const nextCode = async (data: Record<string, unknown>, req: PayloadRequest): Promise<string> => {
  let prefix = 'IM'
  const typeRef = data.type as number | { id: number } | undefined
  const typeId = typeRef && typeof typeRef === 'object' ? typeRef.id : typeRef
  if (typeId) {
    const type = await req.payload.findByID({ collection: 'property-types', id: typeId, depth: 0, req })
    prefix = (type.codePrefix || type.name.slice(0, 2)).toUpperCase()
  }

  const { docs } = await req.payload.find({
    collection: 'properties',
    depth: 0,
    pagination: false,
    select: { code: true },
    req,
  })
  const highest = docs.reduce((max, doc) => Math.max(max, Number(doc.code?.replace(/\D/g, '')) || 0), 0)
  return `${prefix}${String(highest + 1).padStart(4, '0')}`
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: { singular: 'Imóvel', plural: 'Imóveis' },
  admin: {
    group: false,
    useAsTitle: 'title',
    description: 'Anúncios de imóveis do site. Campos com * são obrigatórios.',
    defaultColumns: ['photos', 'title', 'code', 'neighborhood', 'price', 'status'],
    listSearchableFields: ['code', 'title', 'street'],
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
  },
  defaultSort: '-createdAt',
  access: {
    read: publicPropertiesOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeValidate: [generateCodeAndSlug],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      label: 'Código do imóvel',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        placeholder: 'Gerado ao salvar',
        description: 'Aparece no anúncio e na mensagem do WhatsApp. Deixe vazio para gerar automaticamente.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título do anúncio',
      required: true,
      maxLength: 90,
      admin: { placeholder: 'Ex.: Casa com piscina e espaço gourmet no Laranjal' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informações',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'type', type: 'relationship', relationTo: 'property-types', label: 'Tipo', required: true, admin: { width: '50%' } },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Preço de venda (R$)',
                  required: true,
                  min: 0,
                  admin: {
                    width: '50%',
                    placeholder: '850000',
                    description: 'Só números, sem pontos. Ex.: 850000',
                    components: { Cell: '/components/admin/cells/PriceCell#PriceCell' },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'condoFee', type: 'number', label: 'Condomínio por mês (R$)', min: 0, admin: { width: '50%', description: 'Opcional' } },
                { name: 'iptu', type: 'number', label: 'IPTU por ano (R$)', min: 0, admin: { width: '50%', description: 'Opcional' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'area', type: 'number', label: 'Área privativa (m²)', required: true, min: 0, admin: { width: '50%' } },
                { name: 'totalArea', type: 'number', label: 'Área total do terreno (m²)', min: 0, admin: { width: '50%', description: 'Opcional' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'bedrooms', type: 'number', label: 'Quartos', min: 0, defaultValue: 0, admin: { width: '25%' } },
                { name: 'suites', type: 'number', label: 'Suítes', min: 0, defaultValue: 0, admin: { width: '25%' } },
                { name: 'bathrooms', type: 'number', label: 'Banheiros', min: 0, defaultValue: 0, admin: { width: '25%' } },
                { name: 'parkingSpaces', type: 'number', label: 'Vagas', min: 0, defaultValue: 0, admin: { width: '25%' } },
              ],
            },
            {
              name: 'features',
              type: 'relationship',
              relationTo: 'features',
              hasMany: true,
              label: 'Características',
              admin: { description: 'Piscina, churrasqueira, sacada… Falta alguma? Clique no + para criar.' },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descrição',
              required: true,
              admin: { rows: 10, description: 'Para começar um novo parágrafo, deixe uma linha em branco.' },
            },
          ],
        },
        {
          label: 'Fotos',
          description: 'A primeira foto é a capa, usada nos cards e no WhatsApp. Arraste para mudar a ordem.',
          fields: [
            {
              name: 'photos',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: 'Fotos',
              required: true,
              minRows: 1,
              admin: { components: { Cell: '/components/admin/cells/CoverCell#CoverCell' } },
            },
          ],
        },
        {
          label: 'Endereço',
          description: 'O endereço completo aparece na página do imóvel, junto com o mapa.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'street', type: 'text', label: 'Rua', required: true, admin: { width: '60%' } },
                { name: 'number', type: 'text', label: 'Número', admin: { width: '15%' } },
                { name: 'complement', type: 'text', label: 'Complemento', admin: { width: '25%', placeholder: 'Apto 802' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'neighborhood',
                  type: 'relationship',
                  relationTo: 'neighborhoods',
                  label: 'Bairro',
                  required: true,
                  admin: { width: '50%', description: 'Falta o bairro? Clique em "+" para cadastrar.' },
                },
                { name: 'zipCode', type: 'text', label: 'CEP', admin: { width: '25%' } },
                { name: 'state', type: 'text', label: 'UF', defaultValue: 'RS', maxLength: 2, admin: { width: '25%' } },
              ],
            },
            { name: 'showMap', type: 'checkbox', label: 'Mostrar mapa na página do imóvel', defaultValue: true },
          ],
        },
        {
          label: 'Avançado',
          description: 'Opcional. Ajustes para o Google e para o endereço da página.',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: 'Título no Google',
              maxLength: 60,
              admin: { description: 'Se ficar vazio, usamos o título do anúncio.' },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'Descrição no Google',
              maxLength: 160,
              admin: { rows: 2, description: 'Se ficar vazio, usamos o começo da descrição.' },
            },
            slugField(['title', 'code'], { sidebar: false, auto: false }),
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'radio',
      label: 'Situação no site',
      required: true,
      defaultValue: 'published',
      index: true,
      options: [
        { label: 'Publicado — aparece no site', value: 'published' },
        { label: 'Vendido — fica no site com selo "Vendido"', value: 'sold' },
        { label: 'Rascunho — ainda não aparece', value: 'draft' },
        { label: 'Inativo — oculto do site', value: 'inactive' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'vertical',
        components: { Cell: '/components/admin/cells/StatusCell#StatusCell' },
      },
    },
  ],
}
