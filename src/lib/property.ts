import type { Neighborhood, Property, PropertyType } from '@/payload-types'

import { formatPrice } from './format'
import { asMedia } from './media'
import { absoluteUrl } from './site'
import type { WhatsAppPropertyVars } from './whatsapp'

export const propertyPath = (p: Pick<Property, 'slug'>) => `/imoveis/${p.slug}`

export const getNeighborhood = (p: Property): Neighborhood | null =>
  typeof p.neighborhood === 'object' ? p.neighborhood : null

export const getType = (p: Property): PropertyType | null => (typeof p.type === 'object' ? p.type : null)

export const getPhotos = (p: Property) => (p.photos ?? []).map(asMedia).filter((m) => m !== null)

export const getCover = (p: Property) => getPhotos(p)[0] ?? null

export const formatAddress = (p: Property): string => {
  const n = getNeighborhood(p)
  const street = [p.street, p.number].filter(Boolean).join(', ')
  return [street, p.complement, n?.name, n ? `${n.city}/${p.state ?? 'RS'}` : null]
    .filter(Boolean)
    .join(' · ')
}

export const whatsappVars = (p: Property): WhatsAppPropertyVars => ({
  codigo: p.code ?? '',
  titulo: p.title,
  bairro: getNeighborhood(p)?.name,
  preco: formatPrice(p.price),
  url: absoluteUrl(propertyPath(p)),
})
