'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/brand/Logo'
import { WhatsAppIcon } from '@/components/brand/icons'
import { buttonClasses } from '@/components/ui/Button'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'

import { NavLinks } from './NavLinks'

export function MobileNav({ whatsappUrl }: { whatsappUrl: string }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        className="inline-flex size-11 items-center justify-center rounded-md text-brand-navy hover:bg-neutral-50"
      >
        <Menu className="size-6" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-gradient-brand p-0 text-white backdrop:bg-brand-navy/60"
      >
        <div className="relative flex h-full flex-col overflow-hidden">
          <div aria-hidden className="absolute inset-0 bg-pattern opacity-[0.08]" />
          <div className="relative container-site flex h-18 items-center justify-between">
            <Logo version="secondary" tone="03" width={120} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex size-11 items-center justify-center rounded-md hover:bg-white/10"
            >
              <X className="size-6" />
            </button>
          </div>
          <nav aria-label="Menu principal" className="relative container-site mt-8 flex-1">
            <NavLinks tone="dark" onNavigate={() => setOpen(false)} />
          </nav>
          <div className="relative container-site pb-10">
            <WhatsAppLink
              href={whatsappUrl}
              placement="mobile_menu"
              className={buttonClasses('on-dark', 'lg', 'w-full')}
            >
              <WhatsAppIcon className="size-5" />
              Falar no WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </dialog>
    </div>
  )
}
