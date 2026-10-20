import { WhatsAppIcon } from '@/components/brand/icons'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'

export function WhatsAppFab({ href }: { href: string }) {
  return (
    <WhatsAppLink
      href={href}
      placement="fab"
      aria-label="Falar com a Zappio no WhatsApp"
      className="whatsapp-fab fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-200 ease-brand hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </WhatsAppLink>
  )
}
