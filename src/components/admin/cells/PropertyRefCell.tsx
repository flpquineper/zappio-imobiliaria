import type { Payload } from 'payload'

/** Mostra "CÓDIGO · título" do imóvel relacionado, ou "Contato geral". */
export async function PropertyRefCell({ cellData, payload }: { cellData?: unknown; payload: Payload }) {
  const id = cellData && typeof cellData === 'object' ? (cellData as { id: number }).id : (cellData as number | undefined)
  if (!id) return <span className="zappio-muted">Contato geral</span>
  const property = await payload
    .findByID({ collection: 'properties', id, depth: 0, select: { code: true, title: true } })
    .catch(() => null)
  return property ? (
    <span>
      <strong>{property.code}</strong> · {property.title}
    </span>
  ) : (
    <span className="zappio-muted">Imóvel removido</span>
  )
}
