import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'

/**
 * Entrada da prévia ao vivo do admin: ativa o draft mode (mostra rascunhos e ignora cache)
 * apenas para quem está logado no painel, e redireciona para a página pedida.
 */
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path') ?? '/'
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Caminho inválido', { status: 400 })

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Faça login no painel para usar a pré-visualização.', { status: 401 })

  ;(await draftMode()).enable()
  redirect(path)
}
