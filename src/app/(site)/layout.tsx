import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import { Inter_Tight } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { LivePreviewListener } from '@/components/preview/LivePreviewListener'
import { PreviewBanner } from '@/components/preview/PreviewBanner'
import { mediaUrl, asMedia } from '@/lib/media'
import { getSettings } from '@/lib/queries'
import { siteUrl } from '@/lib/site'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

import '@/styles/globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#8026FA',
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings()
  const og = mediaUrl(asMedia(s.ogImage), 'og')
  return {
    metadataBase: new URL(siteUrl),
    title: { default: s.siteTitle || 'Zappio Assessoria Imobiliária', template: `%s · Zappio` },
    description: s.siteDescription || undefined,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Zappio Assessoria Imobiliária',
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings()
  const { isEnabled: preview } = await draftMode()

  return (
    <html lang="pt-BR" className={interTight.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-md bg-brand-purple px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        {preview && (
          <>
            <PreviewBanner />
            <LivePreviewListener serverURL={siteUrl} />
          </>
        )}
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab href={buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappGeneralMessage)} />
      </body>
    </html>
  )
}
