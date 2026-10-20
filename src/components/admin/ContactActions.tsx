'use client'

import { useFormFields } from '@payloadcms/ui'
import { Mail } from 'lucide-react'

import { WhatsAppIcon } from '@/components/brand/icons'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

/** Botões para responder o contato direto do painel. */
export function ContactActions() {
  const name = useFormFields(([f]) => f.name?.value as string | undefined)
  const phone = useFormFields(([f]) => f.phone?.value as string | undefined)
  const email = useFormFields(([f]) => f.email?.value as string | undefined)
  const digits = (phone ?? '').replace(/\D/g, '')
  const firstName = name?.split(' ')[0] ?? ''
  const greeting = `Olá, ${firstName}! Aqui é da Zappio, recebemos sua mensagem pelo site.`

  return (
    <div className="zappio-contact-actions">
      <p className="zappio-wa-preview__label">Responder</p>
      {digits.length >= 10 && (
        <a
          className="zappio-btn zappio-btn--primary"
          href={buildWhatsAppUrl(digits.length <= 11 ? `55${digits}` : digits, greeting)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon width={16} height={16} /> Pelo WhatsApp
        </a>
      )}
      {email && (
        <a className="zappio-btn zappio-btn--ghost" href={`mailto:${email}?subject=${encodeURIComponent('Seu contato com a Zappio')}`}>
          <Mail size={16} aria-hidden /> Por e-mail
        </a>
      )}
      <p className="zappio-muted">Depois de responder, marque “Já respondido” e salve.</p>
    </div>
  )
}
