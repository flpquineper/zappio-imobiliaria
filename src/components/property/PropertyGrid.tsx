import type { Property, Setting } from '@/payload-types'

import { PropertyCard } from './PropertyCard'

export function PropertyGrid({
  properties,
  settings,
  featuredIds,
  preloadFirst = false,
}: {
  properties: Property[]
  settings: Setting
  /** Ids em destaque na home, para exibir o selo "Destaque". */
  featuredIds?: Set<number>
  /** Pré-carrega a foto do primeiro card. Só quando a grade está no topo da página. */
  preloadFirst?: boolean
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p, i) => (
        <li key={p.id} className="flex">
          <PropertyCard property={p} settings={settings} featured={featuredIds?.has(p.id)} preload={preloadFirst && i === 0} />
        </li>
      ))}
    </ul>
  )
}
