import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidateSite'

export const AboutContent: GlobalConfig = {
  slug: 'about-content',
  label: 'Sobre nós / Contato',
  admin: {
    group: false,
    hideAPIURL: true,
    description:
      'Textos da página "Sobre nós". Telefone, e-mail, endereço e redes sociais ficam em "Dados da imobiliária".',
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '1. Topo',
          description: 'Faixa de abertura com título, apresentação e foto.',
          fields: [
            { name: 'title', type: 'text', label: 'Título', required: true },
            { name: 'intro', type: 'textarea', label: 'Apresentação', required: true, admin: { rows: 3 } },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Foto' },
          ],
        },
        {
          label: '2. História',
          fields: [
            {
              name: 'history',
              type: 'textarea',
              label: 'Texto',
              admin: { rows: 10, description: 'Para começar um novo parágrafo, deixe uma linha em branco.' },
            },
          ],
        },
        {
          label: '3. Valores',
          description: 'Cartões lado a lado. Recomendado: 3 itens.',
          fields: [
            {
              name: 'values',
              type: 'array',
              label: 'Itens',
              labels: { singular: 'Item', plural: 'Itens' },
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', label: 'Título', required: true },
                { name: 'text', type: 'textarea', label: 'Texto', required: true, admin: { rows: 2 } },
              ],
            },
          ],
        },
        {
          label: '4. Equipe',
          description: 'Arraste para mudar a ordem. Sem foto, mostramos as iniciais do nome.',
          fields: [
            {
              name: 'team',
              type: 'array',
              label: 'Pessoas',
              labels: { singular: 'Pessoa', plural: 'Pessoas' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', label: 'Nome', required: true, admin: { width: '50%' } },
                    { name: 'role', type: 'text', label: 'Cargo', required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'photo', type: 'upload', relationTo: 'media', label: 'Foto (opcional)' },
              ],
            },
          ],
        },
        {
          label: '5. Contato',
          description: 'Título e texto ao lado do formulário. Os dados de contato vêm de "Dados da imobiliária".',
          fields: [
            { name: 'contactTitle', type: 'text', label: 'Título', defaultValue: 'Fale com a gente' },
            { name: 'contactText', type: 'textarea', label: 'Texto', admin: { rows: 2 } },
          ],
        },
      ],
    },
  ],
}
