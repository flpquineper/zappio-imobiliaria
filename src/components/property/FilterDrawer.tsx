'use client'

import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { Button } from '@/components/ui/Button'

/** No celular, os filtros abrem em uma gaveta; no desktop ficam na coluna lateral. */
export function FilterDrawer({ activeCount, children }: { activeCount: number; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        icon={<SlidersHorizontal className="size-4.5" />}
        aria-haspopup="dialog"
      >
        Filtros{activeCount > 0 && ` (${activeCount})`}
      </Button>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        // O conteúdo preenche a gaveta inteira: clique que chega no próprio <dialog> veio do fundo escurecido.
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        aria-label="Filtros"
        className="m-0 mt-auto max-h-[90dvh] w-full max-w-none rounded-t-xl bg-white p-0 backdrop:bg-brand-navy/50"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white px-4 py-3">
          <h2 className="text-h4">Filtros</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar filtros"
            className="inline-flex size-11 items-center justify-center rounded-md hover:bg-neutral-50"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="p-4 pb-8">{children}</div>
      </dialog>
    </>
  )
}
