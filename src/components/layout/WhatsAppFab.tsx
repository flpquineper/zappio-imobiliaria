'use client'

import { useEffect, useRef, useState } from 'react'

import { WhatsAppIcon } from '@/components/brand/icons'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { cn } from '@/lib/cn'

/** Áreas que o botão não pode cobrir: no celular ele ficava sobre selects e botões e roubava o toque. */
const AVOID_SELECTOR = 'form, [data-fab-avoid]'

export function WhatsAppFab({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      const fab = ref.current?.getBoundingClientRect()
      if (!fab) return
      const overlaps = Array.from(document.querySelectorAll(AVOID_SELECTOR)).some((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.left < fab.right && r.right > fab.left && r.top < fab.bottom && r.bottom > fab.top
      })
      setHidden(overlaps)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <WhatsAppLink
      ref={ref}
      href={href}
      placement="fab"
      aria-label="Falar com a Zappio no WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        'whatsapp-fab fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-[transform,opacity] duration-200 ease-brand hover:scale-105 md:right-6 md:bottom-6',
        hidden && 'pointer-events-none translate-y-4 scale-90 opacity-0',
      )}
    >
      <WhatsAppIcon className="size-7" />
    </WhatsAppLink>
  )
}
