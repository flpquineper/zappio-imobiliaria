import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'

const jpeg = (quality: number) => ({ format: 'jpeg' as const, options: { quality, mozjpeg: true, progressive: true } })

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagem', plural: 'Biblioteca de imagens' },
  admin: {
    group: false,
    hideAPIURL: true,
    description: 'Todas as fotos enviadas ao site. Normalmente você envia fotos direto no imóvel ou na página; aqui é só para consultar ou excluir.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
      admin: {
        description:
          'Descreva a imagem para quem usa leitor de tela e para o Google. Ex.: "Sala de estar com sofá cinza e janelas amplas".',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    focalPoint: true,
    // Otimização no upload: fotos de celular (4000px+, 5–10 MB) viram ~2400px e algumas centenas de KB.
    // Mantém JPEG (mesma extensão do arquivo enviado: não deixa cópia órfã no R2 com clientUploads);
    // a conversão para AVIF/WebP no tamanho de cada tela é feita na entrega pelo next/image.
    // Metadados (EXIF, inclusive localização GPS) são removidos; a orientação é aplicada antes.
    resizeOptions: { width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true },
    formatOptions: { format: 'jpeg', options: { quality: 82, mozjpeg: true, progressive: true } },
    imageSizes: [
      { name: 'thumb', width: 400, height: 300, position: 'centre', formatOptions: jpeg(78) },
      { name: 'card', width: 800, height: 600, position: 'centre', formatOptions: jpeg(80) },
      { name: 'gallery', width: 1600, withoutEnlargement: true, formatOptions: jpeg(82) },
      { name: 'bannerDesktop', width: 1920, height: 800, position: 'centre', formatOptions: jpeg(82) },
      { name: 'bannerMobile', width: 1080, height: 1350, position: 'centre', formatOptions: jpeg(82) },
      { name: 'og', width: 1200, height: 630, position: 'centre', formatOptions: jpeg(80) },
    ],
    adminThumbnail: 'thumb',
  },
}
