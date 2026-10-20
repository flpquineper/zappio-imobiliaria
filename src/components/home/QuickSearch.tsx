import { Search } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { PRICE_OPTIONS } from '@/components/property/priceOptions'
import { formatPrice } from '@/lib/format'
import type { Neighborhood, PropertyType } from '@/payload-types'

/** Busca rápida da home: formulário GET que leva à listagem já filtrada. */
export function QuickSearch({ types, neighborhoods }: { types: PropertyType[]; neighborhoods: Neighborhood[] }) {
  return (
    <form
      action="/imoveis"
      method="get"
      role="search"
      aria-label="Buscar imóveis"
      className="grid gap-3 rounded-xl bg-white p-4 shadow-lg ring-1 ring-neutral-100 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:p-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="qs-tipo" className="text-caption text-neutral-500 uppercase">
          Tipo
        </label>
        <Select id="qs-tipo" name="tipo" defaultValue="">
          <option value="">Todos os tipos</option>
          {types.map((t) => (
            <option key={t.id} value={t.slug ?? ''}>
              {t.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="qs-bairro" className="text-caption text-neutral-500 uppercase">
          Bairro
        </label>
        <Select id="qs-bairro" name="bairro" defaultValue="">
          <option value="">Todos os bairros</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.slug ?? ''}>
              {n.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
        <label htmlFor="qs-preco" className="text-caption text-neutral-500 uppercase">
          Até
        </label>
        <Select id="qs-preco" name="precoMax" defaultValue="">
          <option value="">Qualquer valor</option>
          {PRICE_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {formatPrice(v)}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" size="lg" className="self-end sm:col-span-2 lg:col-span-1" icon={<Search className="size-5" />}>
        Buscar
      </Button>
    </form>
  )
}
