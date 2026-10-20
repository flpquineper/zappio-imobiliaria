export function HandledCell({ cellData }: { cellData?: unknown }) {
  return cellData ? (
    <span className="zappio-status zappio-status--inactive">Respondido</span>
  ) : (
    <span className="zappio-status zappio-status--new">Novo</span>
  )
}
