import type { Where } from 'payload'

export const SORT_OPTIONS = {
  recentes: { label: 'Mais recentes', sort: '-createdAt' },
  'menor-preco': { label: 'Menor preço', sort: 'price' },
  'maior-preco': { label: 'Maior preço', sort: '-price' },
  'maior-area': { label: 'Maior área', sort: '-area' },
} as const

export type SortKey = keyof typeof SORT_OPTIONS

export type PropertyFilters = {
  tipo?: string
  bairro?: string
  precoMin?: number
  precoMax?: number
  quartos?: number
  vagas?: number
  ordem: SortKey
  pagina: number
}

type RawParams = Record<string, string | string[] | undefined>

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

const toPositiveInt = (value: string | undefined): number | undefined => {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : undefined
}

/** Lê os filtros da URL (/imoveis?tipo=casa&quartos=3…) ignorando valores inválidos. */
export const parseFilters = (params: RawParams): PropertyFilters => {
  const ordem = first(params.ordem)
  return {
    tipo: first(params.tipo) || undefined,
    bairro: first(params.bairro) || undefined,
    precoMin: toPositiveInt(first(params.precoMin)),
    precoMax: toPositiveInt(first(params.precoMax)),
    quartos: toPositiveInt(first(params.quartos)),
    vagas: toPositiveInt(first(params.vagas)),
    ordem: ordem && ordem in SORT_OPTIONS ? (ordem as SortKey) : 'recentes',
    pagina: toPositiveInt(first(params.pagina)) ?? 1,
  }
}

export const countActiveFilters = (f: PropertyFilters): number =>
  [f.tipo, f.bairro, f.precoMin, f.precoMax, f.quartos, f.vagas].filter((v) => v !== undefined).length

/** Monta a query string mantendo só filtros preenchidos (URLs limpas e compartilháveis). */
export const filtersToSearch = (f: Partial<PropertyFilters>): string => {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(f)) {
    if (value === undefined || value === '' || value === null) continue
    if (key === 'ordem' && value === 'recentes') continue
    if (key === 'pagina' && value === 1) continue
    params.set(key, String(value))
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export const filtersToWhere = (
  f: PropertyFilters,
  ids: { typeId?: number; neighborhoodId?: number },
): Where => {
  const and: Where[] = [{ status: { equals: 'published' } }]
  if (f.tipo) and.push({ type: { equals: ids.typeId ?? -1 } })
  if (f.bairro) and.push({ neighborhood: { equals: ids.neighborhoodId ?? -1 } })
  if (f.precoMin) and.push({ price: { greater_than_equal: f.precoMin } })
  if (f.precoMax) and.push({ price: { less_than_equal: f.precoMax } })
  if (f.quartos) and.push({ bedrooms: { greater_than_equal: f.quartos } })
  if (f.vagas) and.push({ parkingSpaces: { greater_than_equal: f.vagas } })
  return { and }
}
