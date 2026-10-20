import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { pt } from '@payloadcms/translations/languages/pt'
import sharp from 'sharp'

import { ContactMessages } from './collections/ContactMessages'
import { Features } from './collections/Features'
import { Media } from './collections/Media'
import { Neighborhoods } from './collections/Neighborhoods'
import { Properties } from './collections/Properties'
import { PropertyTypes } from './collections/PropertyTypes'
import { Users } from './collections/Users'
import { AboutContent } from './globals/AboutContent'
import { HomeContent } from './globals/HomeContent'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: Users.slug,
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Painel Zappio',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/brand/symbol-04.svg' }],
    },
    dateFormat: 'dd/MM/yyyy HH:mm',
    components: {
      graphics: {
        Logo: '/components/admin/Logo#AdminLogo',
        Icon: '/components/admin/Logo#AdminIcon',
      },
      beforeNavLinks: ['/components/admin/AdminNav#AdminNav'],
      views: {
        dashboard: { Component: '/components/admin/Dashboard#Dashboard' },
      },
    },
    // Prévia ao vivo: o site abre ao lado do formulário e recarrega a cada "Salvar".
    livePreview: {
      collections: ['properties'],
      globals: ['home-content', 'about-content', 'settings'],
      url: ({ data, collectionConfig, globalConfig }) => {
        let path = '/'
        if (collectionConfig?.slug === 'properties') path = data?.slug ? `/imoveis/${data.slug}` : '/imoveis'
        if (globalConfig?.slug === 'about-content' || globalConfig?.slug === 'settings') path = '/sobre'
        return `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/preview?path=${encodeURIComponent(path)}`
      },
      openByDefault: true,
      breakpoints: [
        { label: 'Celular', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Computador', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt },
  },
  collections: [Properties, ContactMessages, Neighborhoods, PropertyTypes, Features, Media, Users],
  globals: [HomeContent, AboutContent, Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  // Limite por arquivo (fotos de câmera raramente passam disso).
  upload: { limits: { fileSize: 25 * 1024 * 1024 } },
  plugins: [
    // Fotos no Cloudflare R2 (API compatível com S3). Sem as variáveis R2_*, usa a pasta local media/ (desenvolvimento).
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: { media: true },
      bucket: process.env.R2_BUCKET ?? '',
      // Upload direto do navegador para o R2: evita o limite de ~4,5 MB por requisição da Vercel.
      clientUploads: true,
      config: {
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
        },
      },
    }),
  ],
})
