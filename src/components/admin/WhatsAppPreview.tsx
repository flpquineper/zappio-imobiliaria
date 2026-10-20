'use client'

import { useFormFields } from '@payloadcms/ui'

import { buildWhatsAppUrl, fillTemplate } from '@/lib/whatsapp'

const EXAMPLE = {
  codigo: 'CA0102',
  titulo: 'Casa com piscina no Laranjal',
  bairro: 'Laranjal',
  preco: 'R$ 1.450.000',
  url: 'https://seusite.com.br/imoveis/casa-com-piscina-ca0102',
}

/** Mostra como a mensagem chega ao WhatsApp, com dados de exemplo, enquanto o usuário digita. */
export function WhatsAppPreview() {
  const number = useFormFields(([fields]) => fields.whatsappNumber?.value as string | undefined)
  const template = useFormFields(([fields]) => fields.whatsappPropertyMessage?.value as string | undefined)
  const message = fillTemplate(template ?? '', EXAMPLE)
  const digits = (number ?? '').replace(/\D/g, '')
  const fullNumber = digits.length === 10 || digits.length === 11 ? `55${digits}` : digits

  return (
    <div className="zappio-wa-preview">
      <p className="zappio-wa-preview__label">Prévia: é assim que a mensagem chega no seu WhatsApp (imóvel de exemplo)</p>
      <div className="zappio-wa-preview__bubble">{message || 'Escreva a mensagem acima para ver a prévia.'}</div>
      {fullNumber && message && (
        <a href={buildWhatsAppUrl(fullNumber, message)} target="_blank" rel="noopener noreferrer" className="zappio-link">
          Testar no WhatsApp
        </a>
      )}
    </div>
  )
}
