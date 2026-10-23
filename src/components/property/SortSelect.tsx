'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Select } from '@/components/ui/Field'
import { SORT_OPTIONS, type SortKey } from '@/lib/filters'

export function SortSelect({ value }: { value: SortKey }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="ordem" className="sr-only text-body-sm text-neutral-500 sm:not-sr-only">
        Ordenar por
      </label>
      <Select
        id="ordem"
        value={value}
        className="h-11 w-auto min-w-44"
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString())
          if (e.target.value === 'recentes') params.delete('ordem')
          else params.set('ordem', e.target.value)
          params.delete('pagina')
          const qs = params.toString()
          router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
        }}
      >
        {(Object.keys(SORT_OPTIONS) as SortKey[]).map((key) => (
          <option key={key} value={key}>
            {SORT_OPTIONS[key].label}
          </option>
        ))}
      </Select>
    </div>
  )
}
