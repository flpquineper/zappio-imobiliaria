import type { Property, Setting } from '@/payload-types'

import { PropertyCard } from './PropertyCard'

export function PropertyGrid({
  properties,
  settings,
  featuredIds,
}: {
  properties: Property[]
  settings: Setting
  /** Ids em destaque na home, para exibir o selo "Destaque". */
  featuredIds?: Set<number>
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p, i) => (
        <li key={p.id} className="flex">
          <PropertyCard property={p} settings={settings} featured={featuredIds?.has(p.id)} priority={i < 3} />
        </li>
      ))}
    </ul>
  )
}
