import Link from 'next/link'
import type { Payload } from 'payload'

import { mediaUrl } from '@/lib/media'

type Props = {
  cellData?: unknown
  rowData?: { id?: number | string }
  collectionSlug: string
  payload: Payload
}

/** Miniatura da foto de capa na lista de imóveis (célula renderizada no servidor). */
export async function CoverCell({ cellData, rowData, collectionSlug, payload }: Props) {
  const first = Array.isArray(cellData) ? cellData[0] : null
  const id = first && typeof first === 'object' ? (first as { id: number }).id : (first as number | null)
  const media = id ? await payload.findByID({ collection: 'media', id, depth: 0 }).catch(() => null) : null
  const src = mediaUrl(media, 'thumb')
  const href = rowData?.id ? `/admin/collections/${collectionSlug}/${rowData.id}` : undefined

  const thumb = src ? (
    // eslint-disable-next-line @next/next/no-img-element -- célula do admin, miniatura já otimizada pelo Payload
    <img src={src} alt="" className="zappio-thumb" width={72} height={54} />
  ) : (
    <span className="zappio-thumb zappio-thumb--empty">sem foto</span>
  )
  return href ? <Link href={href}>{thumb}</Link> : thumb
}
