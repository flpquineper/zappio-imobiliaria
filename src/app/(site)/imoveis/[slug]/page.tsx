import { Check, ChevronRight, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { WhatsAppIcon } from '@/components/brand/icons'
import { ContactForm } from '@/components/contact/ContactForm'
import { Gallery, type GalleryImage } from '@/components/property/Gallery'
import { PropertyAttributes } from '@/components/property/PropertyAttributes'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { Badge } from '@/components/ui/Badge'
import { buttonClasses } from '@/components/ui/Button'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { formatArea, formatPrice, toParagraphs } from '@/lib/format'
import { mediaUrl } from '@/lib/media'
import {
  formatAddress,
  getCover,
  getNeighborhood,
  getPhotos,
  getType,
  propertyPath,
  whatsappVars,
} from '@/lib/property'
import { getPropertyBySlug, getSettings, getSimilarProperties } from '@/lib/queries'
import { absoluteUrl } from '@/lib/site'
import { buildPropertyWhatsAppUrl, buildWhatsAppUrl } from '@/lib/whatsapp'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyBySlug((await params).slug)
  if (!property) return {}
  const neighborhood = getNeighborhood(property)
  const description =
    property.seoDescription ||
    `${formatPrice(property.price)} · ${formatArea(property.area)} · ${neighborhood?.name ?? ''}. ${toParagraphs(property.description)[0] ?? ''}`.slice(0, 160)
  const og = mediaUrl(getCover(property), 'og')
  return {
    title: property.seoTitle || `${property.title} — ${neighborhood?.name ?? 'Pelotas'}`,
    description,
    alternates: { canonical: propertyPath(property) },
    openGraph: {
      type: 'website',
      title: `${property.title} · ${formatPrice(property.price)}`,
      description,
      url: propertyPath(property),
      images: og ? [{ url: og, width: 1200, height: 630, alt: property.title }] : undefined,
    },
  }
}

export default async function PropertyPage({ params }: Props) {
  const { isEnabled: preview } = await draftMode()
  const property = await getPropertyBySlug((await params).slug, preview)
  if (!property) notFound()
  const hidden = property.status === 'draft' || property.status === 'inactive'

  const [settings, similar] = await Promise.all([getSettings(), getSimilarProperties(property)])
  const sold = property.status === 'sold'
  const neighborhood = getNeighborhood(property)
  const type = getType(property)
  const photos = getPhotos(property)
  const address = formatAddress(property)
  const features = (property.features ?? []).flatMap((f) => (typeof f === 'object' ? [f] : []))
  const whatsappUrl = sold
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappGeneralMessage)
    : buildPropertyWhatsAppUrl(settings.whatsappNumber, settings.whatsappPropertyMessage, whatsappVars(property))

  const images: GalleryImage[] = photos.flatMap((m, i) => {
    const src = mediaUrl(m, 'gallery')
    const thumb = mediaUrl(m, 'card')
    return src && thumb ? [{ src, thumb, alt: m.alt || `${property.title} — foto ${i + 1}` }] : []
  })

  const mapQuery = encodeURIComponent(
    [property.street, property.number, neighborhood?.name, neighborhood?.city, property.state].filter(Boolean).join(', '),
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: toParagraphs(property.description).join(' '),
    url: absoluteUrl(propertyPath(property)),
    image: images.map((img) => absoluteUrl(img.src)),
    datePosted: property.createdAt,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'BRL',
      availability: sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: [property.street, property.number].filter(Boolean).join(', '),
      addressLocality: neighborhood?.city,
      addressRegion: property.state,
      addressCountry: 'BR',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {hidden && (
        <div className="bg-warning text-white">
          <p className="container-site py-2 text-body-sm font-medium">
            Este imóvel está como {property.status === 'draft' ? 'rascunho' : 'inativo'} e não aparece para os visitantes.
          </p>
        </div>
      )}

      <div className="container-site pt-4 pb-6 md:pt-6">
        <nav aria-label="Você está em" className="mb-4 hidden md:block">
          <ol className="flex items-center gap-1.5 text-body-sm text-neutral-500">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-brand-purple">Início</Link>
              <ChevronRight className="size-4" aria-hidden />
            </li>
            <li className="flex items-center gap-1.5">
              <Link href="/imoveis" className="hover:text-brand-purple">Imóveis</Link>
              <ChevronRight className="size-4" aria-hidden />
            </li>
            <li aria-current="page" className="truncate text-brand-navy">
              {property.title}
            </li>
          </ol>
        </nav>
        <Gallery images={images} title={property.title} />
      </div>

      <div className="container-site grid gap-10 pb-16 lg:grid-cols-[1fr_380px] lg:gap-16 lg:pb-24">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {sold && <Badge variant="sold">Vendido</Badge>}
            {type && <Badge variant="neutral">{type.name}</Badge>}
            <Badge variant="neutral">Cód. {property.code}</Badge>
          </div>
          <h1 className="mt-4 text-h1">{property.title}</h1>
          <p className="mt-3 flex items-start gap-2 text-body text-neutral-700">
            <MapPin className="mt-1 size-4.5 shrink-0 text-brand-purple" aria-hidden />
            {address}
          </p>

          <PropertyAttributes property={property} size="lg" className="mt-8 border-y border-neutral-100 py-6" />

          <section aria-labelledby="descricao" className="mt-10">
            <h2 id="descricao" className="text-h3">Sobre o imóvel</h2>
            <div className="mt-4 flex max-w-prose flex-col gap-4 text-body-lg text-neutral-700">
              {toParagraphs(property.description).map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="ficha" className="mt-10">
            <h2 id="ficha" className="text-h3">Ficha técnica</h2>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-neutral-100 bg-neutral-100 sm:grid-cols-3">
              {[
                ['Área privativa', formatArea(property.area)],
                ['Área total', formatArea(property.totalArea)],
                ['Quartos', property.bedrooms],
                ['Suítes', property.suites],
                ['Banheiros', property.bathrooms],
                ['Vagas', property.parkingSpaces],
              ]
                .filter(([, v]) => v !== '' && v !== null && v !== undefined)
                .map(([label, value]) => (
                  <div key={label as string} className="bg-white p-4">
                    <dt className="text-body-sm text-neutral-500">{label}</dt>
                    <dd className="mt-1 text-h4">{value}</dd>
                  </div>
                ))}
            </dl>
          </section>

          {features.length > 0 && (
            <section aria-labelledby="caracteristicas" className="mt-10">
              <h2 id="caracteristicas" className="text-h3">Características</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 text-body text-neutral-700">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-purple/10">
                      <Check className="size-4 text-brand-purple" aria-hidden />
                    </span>
                    {f.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {property.showMap && (
            <section aria-labelledby="localizacao" className="mt-10">
              <h2 id="localizacao" className="text-h3">Localização</h2>
              <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-neutral-100">
                <iframe
                  title={`Mapa: ${address}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full border-0"
                />
              </div>
            </section>
          )}

          <section id="contato" aria-labelledby="contato-imovel" className="mt-12 scroll-mt-24 rounded-xl bg-neutral-50 p-6 md:p-8">
            <h2 id="contato-imovel" className="text-h3">Prefere que a gente entre em contato?</h2>
            <p className="mt-2 mb-6 text-body text-neutral-700">
              Deixe seus dados e um corretor da Zappio retorna sobre o imóvel {property.code}.
            </p>
            <ContactForm propertyId={property.id} />
          </section>
        </div>

        <aside aria-label="Preço e contato" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-neutral-100">
            <p className="text-body-sm text-neutral-500">{sold ? 'Vendido por' : 'Valor de venda'}</p>
            <p className="mt-1 text-price text-brand-navy">{formatPrice(property.price)}</p>
            {(property.condoFee || property.iptu) && (
              <dl className="mt-4 flex flex-col gap-2 border-t border-neutral-100 pt-4 text-body-sm">
                {property.condoFee ? (
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Condomínio</dt>
                    <dd className="font-medium">{formatPrice(property.condoFee)}/mês</dd>
                  </div>
                ) : null}
                {property.iptu ? (
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">IPTU</dt>
                    <dd className="font-medium">{formatPrice(property.iptu)}/ano</dd>
                  </div>
                ) : null}
              </dl>
            )}
            {sold ? (
              <p className="mt-6 rounded-md bg-neutral-50 p-4 text-body-sm text-neutral-700">
                Este imóvel já foi vendido. Fale com a gente para encontrar opções parecidas.
              </p>
            ) : null}
            <div className="mt-6 flex flex-col gap-2">
              <WhatsAppLink
                href={whatsappUrl}
                propertyCode={property.code ?? undefined}
                placement="property_sidebar"
                className={buttonClasses('whatsapp', 'lg', 'w-full')}
              >
                <WhatsAppIcon className="size-5" />
                {sold ? 'Buscar imóveis parecidos' : 'Quero saber mais'}
              </WhatsAppLink>
              <a href={`tel:+${settings.whatsappNumber}`} className={buttonClasses('ghost', 'md', 'w-full')}>
                <Phone className="size-4.5" />
                {settings.phone ?? 'Ligar'}
              </a>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="semelhantes" className="bg-neutral-50 section-y">
          <div className="container-site">
            <h2 id="semelhantes" className="text-h2">Imóveis semelhantes</h2>
            <div className="mt-10">
              <PropertyGrid properties={similar} settings={settings} />
            </div>
          </div>
        </section>
      )}

      {/* Barra fixa de contato no celular */}
      <div data-sticky-cta className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-100 bg-white/95 backdrop-blur-md lg:hidden">
        <div className="container-site flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-caption text-neutral-500">Cód. {property.code}</p>
            <p className="text-h4 font-bold">{formatPrice(property.price)}</p>
          </div>
          <WhatsAppLink
            href={whatsappUrl}
            propertyCode={property.code ?? undefined}
            placement="property_sticky"
            className={buttonClasses('whatsapp', 'md')}
          >
            <WhatsAppIcon className="size-5" />
            {sold ? 'Ver parecidos' : 'Quero saber mais'}
          </WhatsAppLink>
        </div>
      </div>
      <div aria-hidden className="h-20 lg:hidden" />
    </>
  )
}
