import type { Metadata } from 'next'

import { getSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Como a Zappio Assessoria Imobiliária trata os dados pessoais enviados pelo site.',
  alternates: { canonical: '/politica-de-privacidade' },
}

// Texto-base para o protótipo. Precisa de revisão jurídica antes da publicação.
export default async function PrivacyPage() {
  const s = await getSettings()
  return (
    <article className="container-site max-w-3xl section-y">
      <p className="mb-3 text-caption text-brand-purple uppercase">LGPD</p>
      <h1 className="text-h1">Política de privacidade</h1>
      <div className="mt-8 flex flex-col gap-6 text-body-lg text-neutral-700 [&_h2]:mt-4 [&_h2]:text-h3 [&_h2]:text-brand-navy">
        <p>
          A Zappio Assessoria Imobiliária (CRECI {s.creci}) respeita a sua privacidade. Esta política explica quais
          dados coletamos neste site, para que usamos e quais são os seus direitos, conforme a Lei Geral de Proteção
          de Dados (Lei nº 13.709/2018).
        </p>
        <h2>Quais dados coletamos</h2>
        <p>
          Quando você preenche o formulário de contato, coletamos nome, e-mail, telefone (opcional), a mensagem e,
          se for o caso, o imóvel de interesse. Ao clicar nos botões de WhatsApp, a conversa acontece diretamente no
          aplicativo WhatsApp, sujeita à política de privacidade dele.
        </p>
        <h2>Para que usamos</h2>
        <p>
          Usamos os dados apenas para responder ao seu contato e oferecer imóveis compatíveis com o seu interesse.
          Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.
        </p>
        <h2>Por quanto tempo guardamos</h2>
        <p>
          Mantemos os dados enquanto houver relacionamento comercial ou pelo prazo necessário para cumprir obrigações
          legais. Depois disso, eles são excluídos.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Você pode pedir a qualquer momento acesso, correção ou exclusão dos seus dados, ou revogar o consentimento,
          pelo e-mail{' '}
          <a href={`mailto:${s.email}`} className="text-brand-purple underline underline-offset-2">
            {s.email}
          </a>
          .
        </p>
      </div>
    </article>
  )
}
