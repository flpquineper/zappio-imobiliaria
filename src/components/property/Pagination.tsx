import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/cn'
import { filtersToSearch, type PropertyFilters } from '@/lib/filters'

export function Pagination({
  filters,
  page,
  totalPages,
}: {
  filters: PropertyFilters
  page: number
  totalPages: number
}) {
  if (totalPages <= 1) return null
  const href = (p: number) => `/imoveis${filtersToSearch({ ...filters, pagina: p })}`
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const base =
    'inline-flex size-11 items-center justify-center rounded-md text-body font-medium transition-colors'

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-1">
      {page > 1 ? (
        <Link href={href(page - 1)} aria-label="Página anterior" className={cn(base, 'hover:bg-neutral-50')}>
          <ChevronLeft className="size-5" />
        </Link>
      ) : (
        <span className={cn(base, 'text-neutral-300')} aria-hidden>
          <ChevronLeft className="size-5" />
        </span>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(base, p === page ? 'bg-brand-purple text-white' : 'hover:bg-neutral-50')}
        >
          {p}
        </Link>
      ))}
      {page < totalPages ? (
        <Link href={href(page + 1)} aria-label="Próxima página" className={cn(base, 'hover:bg-neutral-50')}>
          <ChevronRight className="size-5" />
        </Link>
      ) : (
        <span className={cn(base, 'text-neutral-300')} aria-hidden>
          <ChevronRight className="size-5" />
        </span>
      )}
    </nav>
  )
}
