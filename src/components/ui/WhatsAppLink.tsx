'use client'

import type { ComponentProps, ReactNode } from 'react'

import { trackEvent } from '@/lib/analytics'

/** Link externo para o WhatsApp que registra a conversão (evento whatsapp_click). */
export function WhatsAppLink({
  href,
  propertyCode,
  placement,
  children,
  ...props
}: {
  href: string
  propertyCode?: string
  placement: string
  children: ReactNode
} & Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel'>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { property_code: propertyCode ?? 'geral', placement })}
      {...props}
    >
      {children}
    </a>
  )
}
