import { cache } from 'react'

import type { Property } from '@/payload-types'

import { filtersToWhere, SORT_OPTIONS, type PropertyFilters } from './filters'
import { getPayloadClient } from './payload'

export const PAGE_SIZE = 12

export const getSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'settings', depth: 1 })
})

export const getHomeContent = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'home-content', depth: 2 })
})

export const getAboutContent = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'about-content', depth: 1 })
})

/** Banners da página inicial que estão ativos e dentro do período de exibição. */
export const getActiveBanners = cache(async () => {
  const home = await getHomeContent()
  const now = new Date()
  return (home.banners ?? []).filter(
    (b) =>
      b.active !== false &&
      (!b.startsAt || new Date(b.startsAt) <= now) &&
      (!b.endsAt || new Date(b.endsAt) >= now),
  )
})

/** Destaques escolhidos (e ordenados) em "Página inicial", apenas os publicados. */
export const getFeaturedProperties = cache(async () => {
  const home = await getHomeContent()
  const ids = (home.featuredProperties ?? []).map((p) => (typeof p === 'object' ? p.id : p))
  if (ids.length === 0) return []
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'properties',
    depth: 1,
    limit: ids.length,
    where: { and: [{ id: { in: ids } }, { status: { equals: 'published' } }] },
  })
  return ids.flatMap((id) => docs.find((d) => d.id === id) ?? [])
})

export const getFeaturedIds = cache(async () => {
  const home = await getHomeContent()
  return new Set((home.featuredProperties ?? []).map((p) => (typeof p === 'object' ? p.id : p)))
})

export const getFilterOptions = cache(async () => {
  const payload = await getPayloadClient()
  const [types, neighborhoods] = await Promise.all([
    payload.find({ collection: 'property-types', limit: 100, sort: 'name', depth: 0 }),
    payload.find({ collection: 'neighborhoods', limit: 200, sort: 'name', depth: 0 }),
  ])
  return { types: types.docs, neighborhoods: neighborhoods.docs }
})

export const searchProperties = cache(async (filters: PropertyFilters) => {
  const payload = await getPayloadClient()
  const { types, neighborhoods } = await getFilterOptions()
  const where = filtersToWhere(filters, {
    typeId: types.find((t) => t.slug === filters.tipo)?.id,
    neighborhoodId: neighborhoods.find((n) => n.slug === filters.bairro)?.id,
  })
  return payload.find({
    collection: 'properties',
    depth: 1,
    limit: PAGE_SIZE,
    page: filters.pagina,
    sort: SORT_OPTIONS[filters.ordem].sort,
    where,
  })
})

/** `preview` (draft mode do admin) também encontra rascunhos e inativos. */
export const getPropertyBySlug = cache(async (slug: string, preview = false) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'properties',
    depth: 2,
    limit: 1,
    // Local API ignora o access control por padrão: o filtro de status precisa ser explícito.
    where: preview
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { status: { in: ['published', 'sold'] } }] },
  })
  return docs[0] ?? null
})

/** Mesmo tipo ou mesmo bairro, faixa de preço parecida. */
export const getSimilarProperties = cache(async (property: Property, limit = 3) => {
  const payload = await getPayloadClient()
  const typeId = typeof property.type === 'object' ? property.type.id : property.type
  const neighborhoodId =
    typeof property.neighborhood === 'object' ? property.neighborhood.id : property.neighborhood
  const { docs } = await payload.find({
    collection: 'properties',
    depth: 1,
    limit,
    sort: '-createdAt',
    where: {
      and: [
        { status: { equals: 'published' } },
        { id: { not_equals: property.id } },
        { or: [{ type: { equals: typeId } }, { neighborhood: { equals: neighborhoodId } }] },
        { price: { greater_than_equal: property.price * 0.5 } },
        { price: { less_than_equal: property.price * 1.6 } },
      ],
    },
  })
  return docs
})

export const getPropertySlugsForSitemap = async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'properties',
    depth: 0,
    limit: 1000,
    pagination: false,
    select: { slug: true, updatedAt: true },
    where: { status: { in: ['published', 'sold'] } },
  })
  return docs
}
