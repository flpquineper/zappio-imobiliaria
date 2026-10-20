const LABELS: Record<string, string> = {
  published: 'Publicado',
  sold: 'Vendido',
  draft: 'Rascunho',
  inactive: 'Inativo',
}

export function StatusCell({ cellData }: { cellData?: unknown }) {
  const status = typeof cellData === 'string' ? cellData : 'draft'
  return <span className={`zappio-status zappio-status--${status}`}>{LABELS[status] ?? status}</span>
}
