import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { WhatsAppIcon } from '@/components/brand/icons'
import { Badge } from '@/components/ui/Badge'
import { buttonClasses } from '@/components/ui/Button'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { mediaUrl } from '@/lib/media'
import { getCover, getNeighborhood, getType, propertyPath, whatsappVars } from '@/lib/property'
import { buildPropertyWhatsAppUrl } from '@/lib/whatsapp'
import type { Property, Setting } from '@/payload-types'

import { PropertyAttributes } from './PropertyAttributes'

export function PropertyCard({
  property: p,
  settings,
  featured = false,
  priority = false,
}: {
  property: Property
  settings: Pick<Setting, 'whatsappNumber' | 'whatsappPropertyMessage'>
  /** Mostra o selo "Destaque" (imóvel escolhido nos destaques da página inicial). */
  featured?: boolean
  priority?: boolean
}) {
  const cover = getCover(p)
  const coverUrl = mediaUrl(cover, 'card')
  const neighborhood = getNeighborhood(p)
  const type = getType(p)
  const href = propertyPath(p)
  const sold = p.status === 'sold'
  const whatsappUrl = buildPropertyWhatsAppUrl(
    settings.whatsappNumber,
    settings.whatsappPropertyMessage,
    whatsappVars(p),
  )

  return (
    <article className="group @container relative flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-neutral-100 transition-shadow duration-300 ease-brand hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={cover?.alt ?? p.title}
            fill
            priority={priority}
            sizes="(min-width: 1440px) 340px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              'object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.03]',
              sold && 'grayscale-[40%]',
            )}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-neutral-300">
            <ImageOff className="size-10" aria-hidden />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {sold && <Badge variant="sold">Vendido</Badge>}
          {!sold && featured && <Badge>Destaque</Badge>}
          {type && <Badge variant="light">{type.name}</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          {neighborhood && (
            <p className="text-body-sm text-neutral-500">
              {neighborhood.name} · {neighborhood.city}
            </p>
          )}
          <h3 className="mt-1 line-clamp-2 text-h4 text-brand-navy">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:rounded-lg after:focus-visible:outline-2 after:focus-visible:outline-brand-purple">
              {p.title}
            </Link>
          </h3>
        </div>

        <PropertyAttributes property={p} />

        <div className="mt-auto flex flex-col gap-3 border-t border-neutral-100 pt-4 @[20rem]:flex-row @[20rem]:items-end @[20rem]:justify-between">
          <div>
            <p className="text-h3 font-bold text-brand-navy">{formatPrice(p.price)}</p>
            <p className="text-caption text-neutral-500">Cód. {p.code}</p>
          </div>
          {!sold && (
            <WhatsAppLink
              href={whatsappUrl}
              propertyCode={p.code ?? undefined}
              placement="property_card"
              aria-label={`Quero saber mais sobre ${p.title} (código ${p.code}) pelo WhatsApp`}
              className={buttonClasses('whatsapp', 'sm', 'relative z-10')}
            >
              <WhatsAppIcon className="size-4" />
              Quero saber mais
            </WhatsAppLink>
          )}
        </div>
      </div>
    </article>
  )
}
