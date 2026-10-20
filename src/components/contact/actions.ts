'use server'

import { headers } from 'next/headers'

import { getPayloadClient } from '@/lib/payload'

import { contactSchema, type ContactState } from './contactSchema'

// Limite simples por IP em memória: suficiente contra spam básico em uma instância.
const recent = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

const isRateLimited = (key: string) => {
  const now = Date.now()
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.push(now)
  recent.set(key, hits)
  return hits.length > MAX_PER_WINDOW
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: campo invisível que só robôs preenchem. Fingimos sucesso para não dar pista.
  if (formData.get('website')) return { status: 'success' }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  if (isRateLimited(ip)) {
    return { status: 'error', message: 'Muitas mensagens em pouco tempo. Tente de novo mais tarde ou chame no WhatsApp.' }
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') ?? '',
    message: formData.get('message'),
    propertyId: formData.get('propertyId') || undefined,
    consent: formData.get('consent') ?? undefined,
  })

  if (!parsed.success) {
    const errors: ContactState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState['errors']>
      errors[key] ??= issue.message
    }
    return { status: 'error', message: 'Confira os campos destacados.', errors }
  }

  const { name, email, phone, message, propertyId } = parsed.data
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-messages',
      overrideAccess: true,
      data: { name, email, phone, message, property: propertyId, consent: true },
    })
  } catch (error) {
    console.error('[contato] falha ao salvar mensagem', error)
    return { status: 'error', message: 'Não conseguimos enviar agora. Tente de novo ou chame no WhatsApp.' }
  }

  return { status: 'success', message: 'Mensagem enviada! Vamos responder em breve.' }
}
