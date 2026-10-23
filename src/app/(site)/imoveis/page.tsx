import { SearchX } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { FilterDrawer } from '@/components/property/FilterDrawer'
import { FilterForm } from '@/components/property/FilterForm'
import { Pagination } from '@/components/property/Pagination'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { SortSelect } from '@/components/property/SortSelect'
import { ButtonLink } from '@/components/ui/Button'
import { countActiveFilters, parseFilters } from '@/lib/filters'
import { getFeaturedIds, getFilterOptions, getSettings, searchProperties } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Imóveis à venda em Pelotas',
  description:
    'Casas, apartamentos e coberturas à venda em Pelotas e região. Filtre por bairro, preço e número de quartos e fale direto com a Zappio pelo WhatsApp.',
  alternates: { canonical: '/imoveis' },
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const filters = parseFilters(await searchParams)
  const [settings, { types, neighborhoods }, result, featuredIds] = await Promise.all([
    getSettings(),
    getFilterOptions(),
    searchProperties(filters),
    getFeaturedIds(),
  ])
  const activeCount = countActiveFilters(filters)
  const total = result.totalDocs

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-glow text-white">
        <div aria-hidden className="absolute inset-0 bg-pattern opacity-[0.06]" />
        <div className="relative container-site py-12 lg:py-16">
          <p className="mb-3 text-caption text-neutral-300 uppercase">Imóveis à venda</p>
          <h1 className="text-h1 font-light">Encontre o imóvel certo para você</h1>
        </div>
      </section>

      <div className="container-site grid gap-10 py-10 lg:grid-cols-[280px_1fr] lg:py-14">
        <aside aria-label="Filtros" className="hidden lg:block">
          <div className="sticky top-24 rounded-lg border border-neutral-100 p-5">
            <h2 className="mb-5 text-h4">Filtros</h2>
            <FilterForm filters={filters} types={types} neighborhoods={neighborhoods} idPrefix="desktop" />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-body font-normal text-neutral-700" aria-live="polite">
              <strong className="font-semibold text-brand-navy">{total}</strong>{' '}
              {total === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </h2>
            <div className="flex items-center gap-2">
              <div className="lg:hidden">
                <FilterDrawer activeCount={activeCount}>
                  <FilterForm filters={filters} types={types} neighborhoods={neighborhoods} idPrefix="mobile" />
                </FilterDrawer>
              </div>
              <Suspense>
                <SortSelect value={filters.ordem} />
              </Suspense>
            </div>
          </div>

          {result.docs.length > 0 ? (
            <div className="flex flex-col gap-12">
              <PropertyGrid properties={result.docs} settings={settings} featuredIds={featuredIds} preloadFirst />
              <Pagination filters={filters} page={result.page ?? 1} totalPages={result.totalPages} />
            </div>
          ) : (
            <div className="relative flex flex-col items-center overflow-hidden rounded-xl bg-neutral-50 px-6 py-16 text-center">
              <SearchX className="size-10 text-brand-purple" aria-hidden />
              <h2 className="mt-4 text-h3">Nenhum imóvel com esses filtros</h2>
              <p className="mt-2 max-w-md text-body text-neutral-700">
                Tente ampliar a faixa de preço ou escolher outro bairro. Se preferir, conte o que você procura e a
                gente busca para você.
              </p>
              <ButtonLink href="/imoveis" variant="outline" className="mt-6">
                Ver todos os imóveis
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
