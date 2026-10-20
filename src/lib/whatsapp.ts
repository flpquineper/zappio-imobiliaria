export type WhatsAppPropertyVars = {
  codigo: string
  titulo: string
  bairro?: string
  preco?: string
  url?: string
}

/** Troca {variavel} pelo valor; variáveis sem valor somem junto com espaços duplicados. */
export const fillTemplate = (template: string, vars: Record<string, string | undefined>): string =>
  template
    .replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()

/** Único ponto do código que monta links do WhatsApp (ver AGENTS.md). */
export const buildWhatsAppUrl = (number: string | null | undefined, message?: string | null): string => {
  // Banco recém-criado pode ainda não ter as Configurações preenchidas.
  const digits = (number ?? '').replace(/\D/g, '')
  const base = `https://wa.me/${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const buildPropertyWhatsAppUrl = (
  number: string | null | undefined,
  template: string | null | undefined,
  vars: WhatsAppPropertyVars,
): string => buildWhatsAppUrl(number, fillTemplate(template ?? '', vars))
