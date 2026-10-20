'use client'

import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

import { Button } from '@/components/ui/Button'
import { Field, inputClasses } from '@/components/ui/Field'
import { cn } from '@/lib/cn'

import { submitContact } from './actions'
import type { ContactState } from './contactSchema'

const initialState: ContactState = { status: 'idle' }

export function ContactForm({ propertyId }: { propertyId?: number }) {
  const [state, action, pending] = useActionState(submitContact, initialState)
  const e = state.errors ?? {}

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-3 rounded-lg bg-neutral-50 p-6">
        <CheckCircle2 className="size-8 text-success" aria-hidden />
        <p className="text-h4">{state.message ?? 'Mensagem enviada!'}</p>
        <p className="text-body text-neutral-700">Se preferir, fale agora mesmo pelo WhatsApp.</p>
      </div>
    )
  }

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Não preencha
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="Nome" htmlFor="name" error={e.name}>
        <input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(e.name)} aria-describedby={e.name ? 'name-error' : undefined} className={inputClasses} />
      </Field>
      <Field label="Telefone" htmlFor="phone" error={e.phone} hint="Opcional">
        <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(e.phone)} aria-describedby={e.phone ? 'phone-error' : undefined} className={inputClasses} />
      </Field>
      <Field label="E-mail" htmlFor="email" error={e.email} className="sm:col-span-2">
        <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(e.email)} aria-describedby={e.email ? 'email-error' : undefined} className={inputClasses} />
      </Field>
      <Field label="Mensagem" htmlFor="message" error={e.message} className="sm:col-span-2">
        <textarea id="message" name="message" rows={5} required aria-invalid={Boolean(e.message)} aria-describedby={e.message ? 'message-error' : undefined} className={cn(inputClasses, 'h-auto py-3')} />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-body-sm text-neutral-700">
          <input type="checkbox" name="consent" required aria-invalid={Boolean(e.consent)} className="mt-0.5 size-5 shrink-0 accent-brand-purple" />
          <span>
            Concordo com o uso dos meus dados para retorno do contato, conforme a{' '}
            <Link href="/politica-de-privacidade" className="text-brand-purple underline underline-offset-2">
              política de privacidade
            </Link>
            .
          </span>
        </label>
        {e.consent && <p className="mt-1.5 text-body-sm text-error">{e.consent}</p>}
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="text-body-sm text-error sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? 'Enviando…' : 'Enviar mensagem'}
        </Button>
      </div>
    </form>
  )
}
