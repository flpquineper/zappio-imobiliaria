import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/brand/Logo'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/brand/icons'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { getSettings } from '@/lib/queries'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

import { NAV_LINKS } from './nav'

export async function Footer() {
  const s = await getSettings()
  const whatsappUrl = buildWhatsAppUrl(s.whatsappNumber, s.whatsappGeneralMessage)
  const address = [s.street, s.complement].filter(Boolean).join(' / ')
  const cityLine = [s.neighborhood, [s.city, s.state].filter(Boolean).join('/')].filter(Boolean).join(' · ')

  return (
    <footer className="relative overflow-hidden bg-gradient-glow text-white">
      <div aria-hidden className="absolute inset-0 bg-pattern opacity-[0.07]" />
      <div className="relative container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr_1fr] lg:py-20">
        <div className="flex flex-col gap-5">
          <Logo version="primary" tone="02" width={200} />
          <p className="max-w-xs text-body-sm text-neutral-100">
            Assessoria imobiliária em Pelotas. Procure menos, encontre mais.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="mb-4 text-caption text-neutral-300 uppercase">Navegação</h2>
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-11 items-center text-body-sm text-white hover:text-neutral-100 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-caption text-neutral-300 uppercase">Contato</h2>
          <ul className="flex flex-col text-body-sm">
            <li>
              <WhatsAppLink href={whatsappUrl} placement="footer" className="inline-flex min-h-11 items-center gap-2.5 hover:underline">
                <WhatsAppIcon className="size-4 shrink-0" />
                {s.phone}
              </WhatsAppLink>
            </li>
            {s.phone && (
              <li>
                <a href={`tel:+${s.whatsappNumber}`} className="inline-flex min-h-11 items-center gap-2.5 hover:underline">
                  <Phone className="size-4 shrink-0" />
                  Ligar agora
                </a>
              </li>
            )}
            {s.email && (
              <li>
                <a href={`mailto:${s.email}`} className="inline-flex min-h-11 items-center gap-2.5 break-all hover:underline">
                  <Mail className="size-4 shrink-0" />
                  {s.email}
                </a>
              </li>
            )}
            {address && (
              <li className="mt-2 flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  {address}
                  <br />
                  {cityLine}
                </span>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-caption text-neutral-300 uppercase">Redes sociais</h2>
          <ul className="flex gap-2">
            {s.instagram && (
              <li>
                <a
                  href={`https://instagram.com/${s.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram @${s.instagram}`}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 hover:bg-white/10"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </li>
            )}
            {s.facebook && (
              <li>
                <a
                  href={s.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 hover:bg-white/10"
                >
                  <FacebookIcon className="size-5" />
                </a>
              </li>
            )}
          </ul>
          {s.businessHours && (
            <p className="mt-6 text-body-sm whitespace-pre-line text-neutral-100">{s.businessHours}</p>
          )}
        </div>
      </div>

      <div data-fab-avoid className="relative border-t border-white/15">
        <div className="container-site flex flex-col py-4 text-body-sm text-neutral-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Zappio Assessoria Imobiliária{s.creci ? ` · CRECI ${s.creci}` : ''}
          </p>
          <Link href="/politica-de-privacidade" className="inline-flex min-h-11 items-center self-start hover:text-white hover:underline">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  )
}
