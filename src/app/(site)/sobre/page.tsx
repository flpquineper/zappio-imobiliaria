import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

import { BrandTriangle } from '@/components/brand/BrandTriangle'
import { InstagramIcon, WhatsAppIcon } from '@/components/brand/icons'
import { ContactForm } from '@/components/contact/ContactForm'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { toParagraphs } from '@/lib/format'
import { asMedia, mediaUrl } from '@/lib/media'
import { getAboutContent, getSettings } from '@/lib/queries'
import { absoluteUrl } from '@/lib/site'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Sobre nós e contato',
  description:
    'Conheça a Zappio Assessoria Imobiliária, em Pelotas/RS. Fale com a gente pelo WhatsApp, e-mail ou visite nosso escritório.',
  alternates: { canonical: '/sobre' },
}

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

export default async function AboutPage() {
  const [about, s] = await Promise.all([getAboutContent(), getSettings()])
  const image = asMedia(about.image)
  const imageUrl = mediaUrl(image, 'gallery')
  const whatsappUrl = buildWhatsAppUrl(s.whatsappNumber, s.whatsappGeneralMessage)
  const fullAddress = [s.street, s.complement, s.neighborhood, s.city && `${s.city}/${s.state ?? ''}`]
    .filter(Boolean)
    .join(', ')
  const mapQuery = encodeURIComponent([s.street, s.city, s.state].filter(Boolean).join(', '))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Zappio Assessoria Imobiliária',
    url: absoluteUrl('/'),
    telephone: `+${s.whatsappNumber}`,
    email: s.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [s.street, s.complement].filter(Boolean).join(' / '),
      addressLocality: s.city,
      addressRegion: s.state,
      addressCountry: 'BR',
    },
    sameAs: s.instagram ? [`https://instagram.com/${s.instagram}`] : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-glow text-white">
        <div aria-hidden className="absolute inset-0 bg-pattern opacity-[0.06]" />
        <div className="relative container-site grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-3 text-caption text-neutral-300 uppercase">Sobre nós</p>
            <h1 className="text-display text-balance">{about.title}</h1>
            <p className="mt-6 max-w-xl text-body-lg text-neutral-100">{about.intro}</p>
          </div>
          {imageUrl && (
            <div className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image src={imageUrl} alt={image?.alt ?? ''} fill preload fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <BrandTriangle className="absolute right-0 bottom-0 h-2/5 w-1/2 text-brand-purple/85 mix-blend-multiply" />
            </div>
          )}
        </div>
      </section>

      {about.history && (
        <section aria-labelledby="historia" className="section-y">
          <div className="container-site grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <h2 id="historia" className="text-h2">Nossa história</h2>
            <div className="flex max-w-prose flex-col gap-4 text-body-lg text-neutral-700">
              {toParagraphs(about.history).map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {about.values && about.values.length > 0 && (
        <section aria-label="Missão, visão e valores" className="bg-neutral-50 section-y">
          <ul className="container-site grid gap-6 md:grid-cols-3">
            {about.values.map((v) => (
              <li key={v.id ?? v.title} className="relative overflow-hidden rounded-lg bg-white p-8 shadow-sm">
                <h3 className="text-h3 text-brand-purple">{v.title}</h3>
                <p className="mt-3 text-body text-neutral-700">{v.text}</p>
                <BrandTriangle className="absolute -right-1 -bottom-1 h-12 w-16 text-brand-purple/10" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {about.team && about.team.length > 0 && (
        <section aria-labelledby="equipe" className="section-y">
          <div className="container-site">
            <h2 id="equipe" className="text-h2">Quem faz a Zappio</h2>
            <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {about.team.map((person) => {
                const photo = asMedia(person.photo)
                const photoUrl = mediaUrl(photo, 'card')
                return (
                  <li key={person.id ?? person.name} className="flex flex-col gap-3">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-brand">
                      {photoUrl ? (
                        <Image src={photoUrl} alt={photo?.alt ?? person.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                      ) : (
                        <span aria-hidden className="absolute inset-0 flex items-center justify-center text-display text-white">
                          {initials(person.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-h4">{person.name}</p>
                      <p className="text-body-sm text-neutral-500">{person.role}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      <section id="contato" aria-labelledby="contato-titulo" className="scroll-mt-20 bg-neutral-50 section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="contato-titulo" className="text-h2">{about.contactTitle}</h2>
            {about.contactText && <p className="mt-4 text-body-lg text-neutral-700">{about.contactText}</p>}

            <ul className="mt-8 flex flex-col gap-5">
              <li>
                <WhatsAppLink href={whatsappUrl} placement="about_contact" className="group flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-body-sm text-neutral-500">WhatsApp</span>
                    <span className="text-h4 group-hover:text-brand-purple">{s.phone}</span>
                  </span>
                </WhatsAppLink>
              </li>
              {s.email && (
                <li>
                  <a href={`mailto:${s.email}`} className="group flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-purple ring-1 ring-neutral-100">
                      <Mail className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-body-sm text-neutral-500">E-mail</span>
                      <span className="text-h4 break-all group-hover:text-brand-purple">{s.email}</span>
                    </span>
                  </a>
                </li>
              )}
              {s.instagram && (
                <li>
                  <a href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-purple ring-1 ring-neutral-100">
                      <InstagramIcon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-body-sm text-neutral-500">Instagram</span>
                      <span className="text-h4 group-hover:text-brand-purple">@{s.instagram}</span>
                    </span>
                  </a>
                </li>
              )}
              <li>
                <a href={`tel:+${s.whatsappNumber}`} className="group flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-purple ring-1 ring-neutral-100">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-body-sm text-neutral-500">Telefone</span>
                    <span className="text-h4 group-hover:text-brand-purple">{s.phone}</span>
                  </span>
                </a>
              </li>
              {fullAddress && (
                <li className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-purple ring-1 ring-neutral-100">
                    <MapPin className="size-5" />
                  </span>
                  <span>
                    <span className="block text-body-sm text-neutral-500">Escritório</span>
                    <span className="text-body text-brand-navy">{fullAddress}</span>
                  </span>
                </li>
              )}
              {s.businessHours && (
                <li className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-purple ring-1 ring-neutral-100">
                    <Clock className="size-5" />
                  </span>
                  <span>
                    <span className="block text-body-sm text-neutral-500">Horário de atendimento</span>
                    <span className="text-body whitespace-pre-line text-brand-navy">{s.businessHours}</span>
                  </span>
                </li>
              )}
            </ul>
            {s.creci && <p className="mt-8 text-body-sm text-neutral-500">CRECI {s.creci}</p>}
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-xl bg-white p-6 shadow-md md:p-8">
              <h3 className="mb-6 text-h3">Envie uma mensagem</h3>
              <ContactForm />
            </div>
            {mapQuery && (
              <div className="aspect-video overflow-hidden rounded-xl bg-neutral-100">
                <iframe
                  title="Mapa do escritório da Zappio"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full border-0"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
