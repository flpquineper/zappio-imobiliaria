import { Bath, BedDouble, Car, Maximize } from 'lucide-react'

import { cn } from '@/lib/cn'
import { formatArea } from '@/lib/format'
import type { Property } from '@/payload-types'

export function PropertyAttributes({
  property: p,
  size = 'sm',
  className,
}: {
  property: Property
  size?: 'sm' | 'lg'
  className?: string
}) {
  const items = [
    { icon: Maximize, value: formatArea(p.area), label: 'de área privativa', show: Boolean(p.area) },
    { icon: BedDouble, value: p.bedrooms, label: p.bedrooms === 1 ? 'quarto' : 'quartos', show: Boolean(p.bedrooms) },
    { icon: Bath, value: p.bathrooms, label: p.bathrooms === 1 ? 'banheiro' : 'banheiros', show: Boolean(p.bathrooms) },
    { icon: Car, value: p.parkingSpaces, label: p.parkingSpaces === 1 ? 'vaga' : 'vagas', show: Boolean(p.parkingSpaces) },
  ].filter((i) => i.show)

  const lg = size === 'lg'
  return (
    <ul className={cn('flex flex-wrap', lg ? 'gap-x-8 gap-y-4' : 'gap-x-4 gap-y-2', className)}>
      {items.map(({ icon: Icon, value, label }) => (
        <li key={label} className={cn('flex items-center text-neutral-700', lg ? 'gap-2.5 text-body' : 'gap-1.5 text-body-sm')}>
          <Icon aria-hidden strokeWidth={1.5} className={cn('shrink-0 text-brand-purple', lg ? 'size-6' : 'size-4.5')} />
          <span>
            <span className="font-semibold text-brand-navy">{value}</span>
            <span className={cn(!lg && 'sr-only')}> {label}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
