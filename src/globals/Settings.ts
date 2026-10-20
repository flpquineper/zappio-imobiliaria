import type { GlobalConfig } from 'payload'

import { adminOnly, anyone } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidateSite'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Dados da imobiliária',
  admin: {
    group: false,
    hideAPIURL: true,
    description: 'WhatsApp, telefone, endereço e redes sociais. Aparecem no rodapé, na página de contato e nos botões de WhatsApp.',
  },
  access: { read: anyone, update: adminOnly },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'WhatsApp',
          description: 'Todos os botões de WhatsApp do site usam estes dados.',
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'Número do WhatsApp',
              required: true,
              admin: {
                description:
                  'Digite com DDD, do jeito que preferir. Ex.: (53) 98130-0950. Ao salvar, guardamos no formato internacional (55 + DDD + número).',
              },
              hooks: {
                // Aceita qualquer formatação e guarda só dígitos com o código do Brasil (55).
                beforeValidate: [
                  ({ value }) => {
                    if (typeof value !== 'string') return value
                    const digits = value.replace(/\D/g, '')
                    return digits.length === 10 || digits.length === 11 ? `55${digits}` : digits
                  },
                ],
              },
              // A validação também roda no navegador, antes do hook: por isso aceita o número formatado.
              validate: (value: string | null | undefined) => {
                const digits = (value ?? '').replace(/\D/g, '')
                return /^(55)?\d{10,11}$/.test(digits) || 'Número inválido. Digite o DDD + número, ex.: (53) 98130-0950.'
              },
            },
            {
              name: 'whatsappPropertyMessage',
              type: 'textarea',
              label: 'Mensagem ao clicar em um imóvel',
              required: true,
              admin: {
                description:
                  'Mensagem que o cliente já recebe pronta ao clicar em "Quero saber mais". Os termos entre chaves são trocados pelos dados do imóvel: {codigo}, {titulo}, {bairro}, {preco} e {url} (link do imóvel).',
                rows: 3,
              },
            },
            {
              name: 'whatsappGeneralMessage',
              type: 'textarea',
              label: 'Mensagem do botão geral',
              required: true,
              admin: { rows: 2, description: 'Usada no botão flutuante e nos botões fora dos imóveis.' },
            },
            {
              name: 'whatsappPreview',
              type: 'ui',
              admin: { components: { Field: '/components/admin/WhatsAppPreview#WhatsAppPreview' } },
            },
          ],
        },
        {
          label: 'Contato e redes',
          fields: [
            { name: 'phone', type: 'text', label: 'Telefone exibido', admin: { description: 'Ex.: (53) 98130-0950' } },
            { name: 'email', type: 'email', label: 'E-mail' },
            { name: 'instagram', type: 'text', label: 'Instagram', admin: { description: 'Somente o usuário, sem @. Ex.: zappio.imobiliaria' } },
            { name: 'facebook', type: 'text', label: 'Facebook (URL)' },
            { name: 'creci', type: 'text', label: 'CRECI' },
            { name: 'businessHours', type: 'textarea', label: 'Horário de atendimento', admin: { rows: 3 } },
          ],
        },
        {
          label: 'Endereço',
          fields: [
            { name: 'street', type: 'text', label: 'Rua e número' },
            { name: 'complement', type: 'text', label: 'Complemento' },
            { name: 'neighborhood', type: 'text', label: 'Bairro' },
            {
              type: 'row',
              fields: [
                { name: 'city', type: 'text', label: 'Cidade', admin: { width: '50%' } },
                { name: 'state', type: 'text', label: 'UF', maxLength: 2, admin: { width: '20%' } },
                { name: 'zipCode', type: 'text', label: 'CEP', admin: { width: '30%' } },
              ],
            },
          ],
        },
        {
          label: 'Google e compartilhamento',
          description: 'Como o site aparece no Google e quando o link é compartilhado.',
          fields: [
            { name: 'siteTitle', type: 'text', label: 'Título do site', required: true },
            { name: 'siteDescription', type: 'textarea', label: 'Descrição padrão', maxLength: 160, required: true },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Imagem de compartilhamento padrão' },
          ],
        },
      ],
    },
  ],
}
