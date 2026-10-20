import { Button, ButtonLink } from '@/components/ui/Button'
import { Field, Select } from '@/components/ui/Field'
import type { PropertyFilters } from '@/lib/filters'
import { formatPrice } from '@/lib/format'
import type { Neighborhood, PropertyType } from '@/payload-types'

import { PRICE_OPTIONS, ROOM_OPTIONS } from './priceOptions'

/** Formulário GET: funciona sem JavaScript e mantém os filtros na URL. */
export function FilterForm({
  filters,
  types,
  neighborhoods,
  idPrefix,
}: {
  filters: PropertyFilters
  types: PropertyType[]
  neighborhoods: Neighborhood[]
  idPrefix: string
}) {
  const id = (name: string) => `${idPrefix}-${name}`
  return (
    <form action="/imoveis" method="get" className="flex flex-col gap-5">
      {filters.ordem !== 'recentes' && <input type="hidden" name="ordem" value={filters.ordem} />}

      <Field label="Tipo de imóvel" htmlFor={id('tipo')}>
        <Select id={id('tipo')} name="tipo" defaultValue={filters.tipo ?? ''}>
          <option value="">Todos</option>
          {types.map((t) => (
            <option key={t.id} value={t.slug ?? ''}>
              {t.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Bairro" htmlFor={id('bairro')}>
        <Select id={id('bairro')} name="bairro" defaultValue={filters.bairro ?? ''}>
          <option value="">Todos</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.slug ?? ''}>
              {n.name}
            </option>
          ))}
        </Select>
      </Field>

      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="mb-1.5 text-body-sm font-medium text-brand-navy">Faixa de preço</legend>
        <Select aria-label="Preço mínimo" name="precoMin" defaultValue={filters.precoMin ?? ''}>
          <option value="">Mínimo</option>
          {PRICE_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {formatPrice(v)}
            </option>
          ))}
        </Select>
        <Select aria-label="Preço máximo" name="precoMax" defaultValue={filters.precoMax ?? ''}>
          <option value="">Máximo</option>
          {PRICE_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {formatPrice(v)}
            </option>
          ))}
        </Select>
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Quartos" htmlFor={id('quartos')}>
          <Select id={id('quartos')} name="quartos" defaultValue={filters.quartos ?? ''}>
            <option value="">Qualquer</option>
            {ROOM_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}+
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Vagas" htmlFor={id('vagas')}>
          <Select id={id('vagas')} name="vagas" defaultValue={filters.vagas ?? ''}>
            <option value="">Qualquer</option>
            {ROOM_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}+
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <Button type="submit" className="w-full">
          Aplicar filtros
        </Button>
        <ButtonLink href="/imoveis" variant="ghost" className="w-full">
          Limpar filtros
        </ButtonLink>
      </div>
    </form>
  )
}
