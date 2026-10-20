import { Eye } from 'lucide-react'

/** Aviso fixo quando o draft mode está ativo (o usuário está vendo rascunhos). */
export function PreviewBanner() {
  return (
    <div className="sticky top-0 z-50 bg-brand-navy text-white">
      <div className="container-site flex items-center justify-between gap-3 py-2 text-body-sm">
        <p className="flex items-center gap-2">
          <Eye className="size-4" aria-hidden />
          Modo de pré-visualização: você também está vendo itens em rascunho.
        </p>
        <a href="/preview/sair" className="font-semibold underline underline-offset-2">
          Sair
        </a>
      </div>
    </div>
  )
}
