/**
 * Popula o banco com dados fictícios do protótipo. APAGA o conteúdo existente.
 * Uso: pnpm seed
 */
import config from '@payload-config'
import path from 'path'
import { getPayload, type CollectionSlug } from 'payload'
import { fileURLToPath } from 'url'

import { slugify } from '@/lib/slugify'

import {
  ABOUT_CONTENT,
  BANNERS,
  FEATURES,
  HOME_CONTENT,
  IMAGES,
  NEIGHBORHOODS,
  PROPERTIES,
  PROPERTY_TYPES,
  SETTINGS,
} from './data'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// O seed APAGA o conteúdo. Fora do banco local, só roda com confirmação explícita e senha própria.
const isLocalDb = /@(localhost|127\.0\.0\.1)[:/]/.test(process.env.DATABASE_URL ?? '')
if (!isLocalDb && process.env.SEED_ALLOW_REMOTE !== 'true') {
  console.error('Seed bloqueado: DATABASE_URL não é local. Use SEED_ALLOW_REMOTE=true se tiver certeza (o conteúdo será apagado).')
  process.exit(1)
}
if (!isLocalDb && !process.env.SEED_ADMIN_PASSWORD) {
  console.error('Defina SEED_ADMIN_PASSWORD (senha forte) para criar o admin fora do ambiente local.')
  process.exit(1)
}

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@zappio.com.br'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'zappio-dev-123'

const payload = await getPayload({ config })
const context = { disableRevalidate: true }

const wipe: CollectionSlug[] = [
  'contact-messages',
  'properties',
  'features',
  'neighborhoods',
  'property-types',
  'media',
]
for (const collection of wipe) {
  await payload.delete({ collection, where: { id: { exists: true } }, context })
}
payload.logger.info('Conteúdo anterior removido')

const existingAdmin = await payload.find({ collection: 'users', where: { email: { equals: ADMIN_EMAIL } } })
if (existingAdmin.totalDocs === 0) {
  await payload.create({
    collection: 'users',
    data: { name: 'Administrador', email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' },
  })
  payload.logger.info(`Usuário admin criado: ${ADMIN_EMAIL}${isLocalDb ? ` / ${ADMIN_PASSWORD}` : ''}`)
}

const media: Record<string, number> = {}
for (const [file, alt] of Object.entries(IMAGES)) {
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.resolve(dirname, 'images', `${file}.jpg`),
    context,
  })
  media[file] = doc.id
}
payload.logger.info(`${Object.keys(media).length} imagens enviadas`)

const types: Record<string, number> = {}
for (const t of PROPERTY_TYPES) {
  types[t.name] = (await payload.create({ collection: 'property-types', data: t, context })).id
}

const neighborhoods: Record<string, number> = {}
for (const name of NEIGHBORHOODS) {
  neighborhoods[name] = (
    await payload.create({ collection: 'neighborhoods', data: { name, city: 'Pelotas' }, context })
  ).id
}

const features: Record<string, number> = {}
for (const name of FEATURES) {
  features[name] = (await payload.create({ collection: 'features', data: { name }, context })).id
}

const featuredByOrder: { order: number; id: number }[] = []

// Criados do mais antigo para o mais novo, para a ordenação "mais recentes" ficar natural.
for (const [i, p] of [...PROPERTIES].reverse().entries()) {
  const missing = p.photos.filter((f) => !media[f])
  if (missing.length) throw new Error(`Fotos inexistentes em ${p.code}: ${missing.join(', ')}`)
  const { featured, type, neighborhood, photos, features: featureNames, ...rest } = p
  const created = await payload.create({
    collection: 'properties',
    data: {
      ...rest,
      slug: slugify(`${p.title} ${p.code}`),
      state: 'RS',
      showMap: true,
      type: types[type],
      neighborhood: neighborhoods[neighborhood],
      photos: photos.map((f) => media[f]),
      features: featureNames.map((f) => features[f]),
      createdAt: new Date(Date.now() - (PROPERTIES.length - i) * 86_400_000 * 3).toISOString(),
    },
    context,
  })
  if (featured !== undefined) featuredByOrder.push({ order: featured, id: created.id })
}
payload.logger.info(`${PROPERTIES.length} imóveis criados`)

await payload.updateGlobal({
  slug: 'settings',
  data: { ...SETTINGS, ogImage: media['casa-contemporanea-1'] },
  context,
})
await payload.updateGlobal({
  slug: 'home-content',
  data: {
    ...HOME_CONTENT,
    aboutImage: media[HOME_CONTENT.aboutImage],
    featuredProperties: featuredByOrder.sort((a, b) => a.order - b.order).map((f) => f.id),
    banners: BANNERS.map(({ image, propertyType, ...b }) => ({
      ...b,
      imageDesktop: media[image],
      ctaPropertyType: propertyType ? types[propertyType] : undefined,
      active: true,
    })),
  },
  context,
})
await payload.updateGlobal({
  slug: 'about-content',
  data: { ...ABOUT_CONTENT, image: media[ABOUT_CONTENT.image] },
  context,
})

payload.logger.info('Seed concluído ✔')
process.exit(0)
