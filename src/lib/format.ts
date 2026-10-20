const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })

export const formatPrice = (value: number | null | undefined): string =>
  typeof value === 'number' ? currency.format(value) : 'Consulte'

export const formatArea = (value: number | null | undefined): string =>
  typeof value === 'number' ? `${number.format(value)} m²` : ''

export const pluralize = (count: number, singular: string, plural: string): string =>
  `${count} ${count === 1 ? singular : plural}`

/** Quebra textos de textarea em parágrafos (separados por linha em branco). */
export const toParagraphs = (text: string | null | undefined): string[] =>
  (text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
