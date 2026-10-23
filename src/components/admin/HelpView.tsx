import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'

import type { User } from '@/payload-types'

import { HelpCenter } from './help/HelpCenter'
import { ADMIN } from './routes'

/** Central de ajuda (/admin/ajuda). Views novas do Payload não ganham o layout do painel sozinhas. */
export function HelpView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, locale, permissions, visibleEntities } = initPageResult
  const user = req.user as User | null
  if (!user) redirect(`${ADMIN.home}/login?redirect=${encodeURIComponent(ADMIN.help)}`)

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <HelpCenter isAdmin={user.role === 'admin'} />
      </Gutter>
    </DefaultTemplate>
  )
}
