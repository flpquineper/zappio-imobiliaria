import { ArrowRight, Search } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { BrandTriangle } from '@/components/brand/BrandTriangle'
import { Logo } from '@/components/brand/Logo'
import { WhatsAppIcon } from '@/components/brand/icons'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, inputClasses, Select } from '@/components/ui/Field'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { getFeaturedProperties, getSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

const brandColors = [
  { name: 'brand-purple', hex: '#8026FA', role: 'Primária · CTAs, links', className: 'bg-brand-purple', dark: true },
  { name: 'brand-navy', hex: '#0A1747', role: 'Texto, fundos escuros', className: 'bg-brand-navy', dark: true },
  { name: 'brand-blue', hex: '#122696', role: 'Gradientes, apoio', className: 'bg-brand-blue', dark: true },
  { name: 'brand-violet', hex: '#6600C2', role: 'Hover da primária', className: 'bg-brand-violet', dark: true },
  { name: 'black', hex: '#000000', role: 'Uso pontual', className: 'bg-black', dark: true },
  { name: 'white', hex: '#FFFFFF', role: 'Fundo principal', className: 'bg-white ring-1 ring-neutral-100', dark: false },
]

const neutrals = [
  { name: 'neutral-50', hex: '#F5F3FA', className: 'bg-neutral-50' },
  { name: 'neutral-100', hex: '#E9E6F2', className: 'bg-neutral-100' },
  { name: 'neutral-300', hex: '#C9C5D8', className: 'bg-neutral-300' },
  { name: 'neutral-500', hex: '#6B6880', className: 'bg-neutral-500' },
  { name: 'neutral-700', hex: '#4A4760', className: 'bg-neutral-700' },
  { name: 'neutral-900', hex: '#2A2840', className: 'bg-neutral-900' },
  { name: 'success', hex: '#127A4B', className: 'bg-success' },
  { name: 'error', hex: '#C2183B', className: 'bg-error' },
  { name: 'warning', hex: '#A35A00', className: 'bg-warning' },
]

const typeScale = [
  { token: 'text-display', spec: '64/40 · Light 300', sample: 'Procure menos, encontre mais.' },
  { token: 'text-h1', spec: '48/32 · Regular 400', sample: 'Encontrar seu lar é simples.' },
  { token: 'text-h2', spec: '36/28 · Medium 500', sample: 'Imóveis em destaque' },
  { token: 'text-h3', spec: '24/20 · Demi Bold 600', sample: 'Casa com piscina no Laranjal' },
  { token: 'text-h4', spec: '20/18 · Demi Bold 600', sample: 'Ficha técnica' },
  { token: 'text-body-lg', spec: '18/17 · Regular 400', sample: 'Seu próximo imóvel a um Zappio de distância.' },
  { token: 'text-body', spec: '16 · Regular 400', sample: 'Apartamento com 3 quartos, sendo 1 suíte, sacada com churrasqueira.' },
  { token: 'text-body-sm', spec: '14 · Regular 400', sample: 'Centro · Pelotas' },
  { token: 'text-caption', spec: '12 · Medium 500 · +4%', sample: 'CÓD. AP0101' },
  { token: 'text-price', spec: '28/24 · Bold 700', sample: 'R$ 850.000' },
]

function Block({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-neutral-100 py-14">
      <h2 id={id} className="text-h3">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-body text-neutral-700">{description}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default async function DesignSystemPage() {
  const [settings, featured] = await Promise.all([getSettings(), getFeaturedProperties()])
  const sample = featured[0]

  return (
    <div className="container-site py-14">
      <SectionHeading
        as="h1"
        eyebrow="Interno · não indexado"
        title="Design system Zappio"
        description="Tokens e componentes do site, derivados do manual da marca. Referência: docs/DESIGN_SYSTEM.md."
      />

      <Block id="logos" title="Logotipos" description="Versão secundária no header, principal no rodapé, símbolo no favicon. Mínimo de 100px de largura.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ['04', 'bg-white ring-1 ring-neutral-100', 'Fundo claro'],
              ['01', 'bg-brand-purple', 'Fundo roxo'],
              ['02', 'bg-brand-navy', 'Fundo navy/azul/violeta'],
              ['03', 'bg-gradient-brand', 'Fotos e gradientes'],
            ] as const
          ).map(([tone, bg, label]) => (
            <figure key={tone} className="flex flex-col gap-2">
              <div className={cn('flex h-36 items-center justify-center rounded-lg', bg)}>
                <Logo version="primary" tone={tone} width={180} />
              </div>
              <figcaption className="text-body-sm text-neutral-500">
                Variação {tone} · {label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-8 rounded-lg bg-neutral-50 p-6">
          <Logo version="secondary" tone="04" width={140} />
          <Logo version="secondary" tone="04" width={100} />
          <Logo version="symbol" tone="04" width={48} />
          <Logo version="symbol" tone="04" width={32} />
        </div>
      </Block>

      <Block id="cores" title="Cores" description="Paleta oficial do manual. Roxo sobre navy nunca para texto (contraste 2.9:1).">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brandColors.map((c) => (
            <li key={c.name} className="flex flex-col gap-2">
              <div className={cn('flex h-28 items-end rounded-lg p-3', c.className)}>
                <span className={cn('text-caption', c.dark ? 'text-white' : 'text-brand-navy')}>{c.hex}</span>
              </div>
              <div>
                <p className="text-body-sm font-semibold">{c.name}</p>
                <p className="text-body-sm text-neutral-500">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {neutrals.map((c) => (
            <li key={c.name} className="flex flex-col gap-1.5">
              <div className={cn('h-14 rounded-md ring-1 ring-neutral-100', c.className)} />
              <p className="text-caption">{c.name}</p>
              <p className="text-caption text-neutral-500">{c.hex}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="gradientes" title="Gradientes e pattern" description="Fundos grandes usam gradiente (manual, p. 10). O pattern entra em baixa opacidade.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['bg-gradient-brand', 'gradient-brand'],
            ['bg-gradient-glow', 'gradient-glow'],
            ['bg-gradient-glow', 'glow + pattern 8%'],
          ].map(([bg, label], i) => (
            <div key={label} className={cn('relative flex h-44 items-end overflow-hidden rounded-lg p-4', bg)}>
              {i === 2 && <div aria-hidden className="absolute inset-0 bg-pattern opacity-[0.08]" />}
              <span className="relative text-caption text-white">{label}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block id="tipografia" title="Tipografia" description="Inter Tight (OFL) no lugar de Articulat CF, que não tem licença para web.">
        <ul className="flex flex-col divide-y divide-neutral-100">
          {typeScale.map((t) => (
            <li key={t.token} className="grid gap-2 py-5 md:grid-cols-[200px_1fr] md:items-baseline">
              <div>
                <p className="text-body-sm font-semibold">{t.token}</p>
                <p className="text-caption text-neutral-500">{t.spec}</p>
              </div>
              <p className={t.token}>{t.sample}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="forma" title="Forma de apoio" description="Triângulo do 'a', sempre ascendente da esquerda para a direita.">
        <div className="flex flex-wrap items-end gap-6">
          <BrandTriangle className="h-24 w-32 text-brand-purple" />
          <BrandTriangle className="h-16 w-20 text-brand-navy" />
          <BrandTriangle className="h-10 w-12 text-brand-blue" />
          <div className="relative h-40 w-64 overflow-hidden rounded-lg bg-neutral-100">
            <BrandTriangle className="absolute right-0 bottom-0 h-3/4 w-2/3 text-brand-purple/85" />
          </div>
        </div>
      </Block>

      <Block id="botoes" title="Botões">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Contorno</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
            Quero saber mais
          </Button>
          <Button disabled>Desabilitado</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Pequeno</Button>
          <Button size="md">Médio</Button>
          <Button size="lg">
            Grande <ArrowRight className="size-5" />
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-brand-navy p-6">
          <Button variant="on-dark">Sobre fundo escuro</Button>
          <Button variant="primary">Primário</Button>
        </div>
      </Block>

      <Block id="badges" title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Destaque</Badge>
          <Badge variant="dark">Novo</Badge>
          <Badge variant="neutral">Apartamento</Badge>
          <Badge variant="sold">Vendido</Badge>
          <span className="rounded-sm bg-neutral-500 p-1">
            <Badge variant="light">Sobre foto</Badge>
          </span>
        </div>
      </Block>

      <Block id="campos" title="Campos de formulário">
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Field label="Nome" htmlFor="ds-nome">
            <input id="ds-nome" className={inputClasses} placeholder="Seu nome" />
          </Field>
          <Field label="Bairro" htmlFor="ds-bairro">
            <Select id="ds-bairro" defaultValue="">
              <option value="">Todos os bairros</option>
              <option>Centro</option>
            </Select>
          </Field>
          <Field label="E-mail" htmlFor="ds-email" error="Informe um e-mail válido.">
            <input id="ds-email" aria-invalid className={inputClasses} defaultValue="joao@" />
          </Field>
          <Field label="Telefone" htmlFor="ds-tel" hint="Opcional">
            <input id="ds-tel" className={inputClasses} />
          </Field>
          <div className="sm:col-span-2">
            <Button icon={<Search className="size-5" />}>Buscar</Button>
          </div>
        </div>
      </Block>

      {sample && (
        <Block id="card" title="Card de imóvel">
          <div className="max-w-sm">
            <PropertyCard property={sample} settings={settings} featured />
          </div>
        </Block>
      )}

      <Block id="espacos" title="Raios e sombras">
        <div className="flex flex-wrap gap-6">
          {['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full'].map((r) => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div className={cn('size-20 bg-brand-purple/15 ring-1 ring-brand-purple/30', r)} />
              <span className="text-caption text-neutral-500">{r}</span>
            </div>
          ))}
          {['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-brand'].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={cn('size-20 rounded-lg bg-white', s)} />
              <span className="text-caption text-neutral-500">{s}</span>
            </div>
          ))}
        </div>
      </Block>
    </div>
  )
}
