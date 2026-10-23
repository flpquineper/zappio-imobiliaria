import Link from 'next/link'

import { Logo } from '@/components/brand/Logo'
import { WhatsAppIcon } from '@/components/brand/icons'
import { buttonClasses } from '@/components/ui/Button'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { getSettings } from '@/lib/queries'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

import { HeaderShell } from './HeaderShell'
import { MobileNav } from './MobileNav'
import { NavLinks } from './NavLinks'

export async function Header() {
  const settings = await getSettings()
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappGeneralMessage)

  return (
    <HeaderShell>
      <div className="container-site flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="Zappio — página inicial" className="flex h-11 shrink-0 items-center">
          <Logo version="secondary" tone="04" width={128} priority />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            href={whatsappUrl}
            placement="header"
            className={buttonClasses('primary', 'md', 'hidden sm:inline-flex')}
          >
            <WhatsAppIcon className="size-5" />
            Fale conosco
          </WhatsAppLink>
          <MobileNav whatsappUrl={whatsappUrl} />
        </div>
      </div>
    </HeaderShell>
  )
}
