import type { HomeContent, Setting } from '@/payload-types'

import { buildWhatsAppUrl } from './whatsapp'

type LinkData = Pick<
  NonNullable<HomeContent['banners']>[number],
  'ctaType' | 'ctaHref' | 'ctaProperty' | 'ctaPropertyType'
>

/** Converte o destino escolhido no admin ("O botão leva para…") em URL. */
export const resolveLink = (link: LinkData, settings: Pick<Setting, 'whatsappNumber' | 'whatsappGeneralMessage'>): string | null => {
  switch (link.ctaType) {
    case 'properties': {
      const type = link.ctaPropertyType && typeof link.ctaPropertyType === 'object' ? link.ctaPropertyType : null
      return type?.slug ? `/imoveis?tipo=${type.slug}` : '/imoveis'
    }
    case 'property': {
      const property = link.ctaProperty && typeof link.ctaProperty === 'object' ? link.ctaProperty : null
      return property?.slug ? `/imoveis/${property.slug}` : '/imoveis'
    }
    case 'about':
      return '/sobre'
    case 'contact':
      return '/sobre#contato'
    case 'whatsapp':
      return buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappGeneralMessage)
    case 'custom':
      return link.ctaHref || null
    default:
      return null
  }
}
