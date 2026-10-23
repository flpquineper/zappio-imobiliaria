import Image from 'next/image'

import { cn } from '@/lib/cn'

/**
 * Logos oficiais (public/brand). Variação de cor por fundo — ver docs/DESIGN_SYSTEM.md §1:
 * 01 fundo roxo · 02 fundo navy/azul/violeta/preto · 03 branco (fotos/gradientes) · 04 fundo claro
 */
type Version = 'primary' | 'secondary' | 'symbol'
type Tone = '01' | '02' | '03' | '04'

const ratios: Record<Version, number> = {
  primary: 1263.6 / 291.6,
  secondary: 976.3 / 291.6,
  symbol: 610.56 / 489.6,
}

export function Logo({
  version = 'secondary',
  tone = '04',
  width,
  className,
}: {
  version?: Version
  tone?: Tone
  /** Largura em px. Mínimo de 100px para logotipos (manual, "Redução máxima"). */
  width: number
  className?: string
}) {
  const safeWidth = version === 'symbol' ? width : Math.max(width, 100)
  const file = version === 'symbol' ? `symbol-${tone}` : `logo-${version}-${tone}`
  return (
    <Image
      src={`/brand/${file}.svg`}
      alt="Zappio Assessoria Imobiliária"
      width={safeWidth}
      height={Math.round(safeWidth / ratios[version])}
      unoptimized
      className={cn('h-auto select-none', className)}
      style={{ width: safeWidth }}
    />
  )
}
