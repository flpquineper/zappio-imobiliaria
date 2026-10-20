'use client'

import { useRowLabel } from '@payloadcms/ui'

type BannerRow = { title?: string; active?: boolean; endsAt?: string }

export function BannerRowLabel() {
  const { data, rowNumber } = useRowLabel<BannerRow>()
  const expired = data?.endsAt ? new Date(data.endsAt) < new Date() : false
  const hidden = data?.active === false || expired

  return (
    <span className="zappio-row-label">
      <span className="zappio-row-label__number">{(rowNumber ?? 0) + 1}</span>
      {data?.title || 'Novo banner'}
      {hidden && <span className="zappio-status zappio-status--inactive">{expired ? 'Expirado' : 'Oculto'}</span>}
    </span>
  )
}
