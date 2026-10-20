import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { BrandTriangle } from '@/components/brand/BrandTriangle'
import { WhatsAppIcon } from '@/components/brand/icons'
import { HeroCarousel, type HeroSlide } from '@/components/home/HeroCarousel'
import { QuickSearch } from '@/components/home/QuickSearch'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { ButtonLink, buttonClasses } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { toParagraphs } from '@/lib/format'
import { resolveLink } from '@/lib/link'
import { asMedia, mediaUrl } from '@/lib/media'
import { getActiveBanners, getFeaturedProperties, getFilterOptions, getHomeContent, getSettings } from '@/lib/queries'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

// Revalida a cada hora para respeitar o período de exibição dos banners mesmo sem edições no admin.
export const revalidate = 3600

export default async function HomePage() {
  const [settings, home, banners, featured, { types, neighborhoods }] = await Promise.all([
    getSettings(),
    getHomeContent(),
    getActiveBanners(),
    getFeaturedProperties(),
    getFilterOptions(),
  ])

  const slides: HeroSlide[] = banners.flatMap((b, i) => {
    const desktop = asMedia(b.imageDesktop)
    // Sem foto de celular, usamos a de computador no recorte vertical gerado pelo Payload.
    const mobile = asMedia(b.imageMobile) ?? desktop
    const desktopUrl = mediaUrl(desktop, 'bannerDesktop')
    const mobileUrl = mediaUrl(mobile, 'bannerMobile')
    if (!desktopUrl || !mobileUrl) return []
    return [
      {
        id: b.id ?? String(i),
        title: b.title,
        subtitle: b.subtitle,
        ctaLabel: b.ctaLabel,
        ctaHref: resolveLink(b, settings),
        desktop: { src: desktopUrl, alt: desktop?.alt ?? '' },
        mobile: { src: mobileUrl, alt: mobile?.alt ?? '' },
      },
    ]
  })

  const aboutImage = asMedia(home.aboutImage)
  const aboutImageUrl = mediaUrl(aboutImage, 'gallery')
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappGeneralMessage)

  return (
    <>
      <h1 className="sr-only">Zappio Assessoria Imobiliária — imóveis à venda em Pelotas</h1>
      <HeroCarousel slides={slides} />

      <div className="relative z-10 container-site -mt-10 sm:-mt-12">
        <QuickSearch types={types} neighborhoods={neighborhoods} />
      </div>

      {featured.length > 0 && (
        <section aria-labelledby="destaques" className="section-y">
          <div className="container-site">
            <SectionHeading
              id="destaques"
              eyebrow={home.featuredEyebrow}
              title={home.featuredTitle}
              action={
                <ButtonLink href="/imoveis" variant="outline" className="self-start md:self-auto">
                  Ver todos os imóveis
                  <ArrowRight className="size-4.5" />
                </ButtonLink>
              }
            />
            <div className="mt-10">
              <PropertyGrid properties={featured} settings={settings} />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="sobre-home" className="relative overflow-hidden bg-neutral-50 section-y">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {aboutImageUrl && (
            <div className="relative aspect-4/5 overflow-hidden rounded-xl lg:order-2">
              <Image src={aboutImageUrl} alt={aboutImage?.alt ?? ''} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <BrandTriangle className="absolute right-0 bottom-0 h-1/2 w-2/3 text-brand-purple/90 mix-blend-multiply" />
            </div>
          )}
          <div>
            {home.aboutEyebrow && <p className="mb-3 text-caption text-brand-purple uppercase">{home.aboutEyebrow}</p>}
            <h2 id="sobre-home" className="text-h2">
              {home.aboutTitle}
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-body-lg text-neutral-700">
              {toParagraphs(home.aboutText).map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            {home.stats && home.stats.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-neutral-100 pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {home.stats.map((stat) => (
                  <div key={stat.id ?? stat.label} className="flex flex-col-reverse gap-1">
                    <dt className="text-body-sm text-neutral-500">{stat.label}</dt>
                    <dd className="text-h1 font-light text-brand-purple">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <ButtonLink href="/sobre" variant="secondary" className="mt-10">
              Conheça a Zappio
            </ButtonLink>
          </div>
        </div>
      </section>

      {home.benefits && home.benefits.length > 0 && (
        <section aria-labelledby="diferenciais" className="section-y">
          <div className="container-site">
            {home.benefitsTitle && (
              <h2 id="diferenciais" className="max-w-2xl text-h2">
                {home.benefitsTitle}
              </h2>
            )}
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {home.benefits.map((b, i) => (
                <li key={b.id ?? b.title} className="relative flex flex-col gap-3 overflow-hidden rounded-lg border border-neutral-100 p-6">
                  <span className="text-caption text-brand-purple">0{i + 1}</span>
                  <h3 className="text-h4">{b.title}</h3>
                  <p className="text-body text-neutral-700">{b.text}</p>
                  <BrandTriangle className="absolute -right-1 -bottom-1 h-10 w-12 text-brand-purple/12" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="cta-final" className="relative overflow-hidden bg-gradient-brand text-white">
        <div aria-hidden className="absolute inset-0 bg-pattern opacity-[0.08]" />
        <BrandTriangle className="absolute right-0 bottom-0 hidden h-full w-1/3 text-brand-navy/35 lg:block" />
        <div className="relative container-site flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-24">
          <div className="max-w-2xl">
            <h2 id="cta-final" className="text-h1 font-light">
              {home.ctaTitle}
            </h2>
            {home.ctaText && <p className="mt-4 text-body-lg text-neutral-100">{home.ctaText}</p>}
          </div>
          <WhatsAppLink href={whatsappUrl} placement="home_cta" className={buttonClasses('on-dark', 'lg')}>
            <WhatsAppIcon className="size-5" />
            Falar no WhatsApp
          </WhatsAppLink>
        </div>
      </section>
    </>
  )
}
