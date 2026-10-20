import { formatPrice } from '@/lib/format'

export function PriceCell({ cellData }: { cellData?: unknown }) {
  return <span className="zappio-price">{formatPrice(typeof cellData === 'number' ? cellData : null)}</span>
}
