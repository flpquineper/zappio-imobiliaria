import {
  ArrowRight,
  Building2,
  ExternalLink,
  FileText,
  Home,
  LifeBuoy,
  MessageSquare,
  Plus,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import type { Payload } from 'payload'

import type { User } from '@/payload-types'

import { ADMIN } from './routes'

type Props = { payload: Payload; user?: User | null }

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

function QuickAction({ href, icon: Icon, title, text, primary }: { href: string; icon: LucideIcon; title: string; text: string; primary?: boolean }) {
  return (
    <Link href={href} className={`zappio-action${primary ? ' is-primary' : ''}`}>
      <span className="zappio-action__icon">
        <Icon size={22} strokeWidth={1.75} aria-hidden />
      </span>
      <span className="zappio-action__body">
        <strong>{title}</strong>
        <span>{text}</span>
      </span>
      <ArrowRight className="zappio-action__arrow" size={18} aria-hidden />
    </Link>
  )
}

function PageCard({
  icon: Icon,
  title,
  sitePath,
  editHref,
  items,
}: {
  icon: LucideIcon
  title: string
  sitePath: string
  editHref: string
  items: string[]
}) {
  return (
    <article className="zappio-page-card">
      <header>
        <Icon size={20} strokeWidth={1.75} aria-hidden />
        <h3>{title}</h3>
      </header>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <footer>
        <Link href={editHref} className="zappio-btn zappio-btn--primary">
          Editar
        </Link>
        <a href={sitePath} target="_blank" rel="noopener noreferrer" className="zappio-btn zappio-btn--ghost">
          Ver no site <ExternalLink size={14} aria-hidden />
        </a>
      </footer>
    </article>
  )
}

export async function Dashboard({ payload, user }: Props) {
  const now = new Date()
  const [published, sold, drafts, home, unread, latest] = await Promise.all([
    payload.count({ collection: 'properties', where: { status: { equals: 'published' } } }),
    payload.count({ collection: 'properties', where: { status: { equals: 'sold' } } }),
    payload.count({ collection: 'properties', where: { status: { in: ['draft', 'inactive'] } } }),
    payload.findGlobal({ slug: 'home-content', depth: 0 }),
    payload.count({ collection: 'contact-messages', where: { handled: { not_equals: true } } }),
    payload.find({ collection: 'contact-messages', limit: 5, sort: '-createdAt', depth: 1 }),
  ])

  const banners = home.banners ?? []
  const liveBanners = banners.filter(
    (b) =>
      b.active !== false &&
      (!b.startsAt || new Date(b.startsAt) <= now) &&
      (!b.endsAt || new Date(b.endsAt) >= now),
  ).length
  const featured = home.featuredProperties?.length ?? 0
  const firstName = user?.name?.split(' ')[0]
  const isAdmin = user?.role === 'admin'

  return (
    <div className="zappio-dashboard">
      <section className="zappio-hero">
        <div>
          <p className="zappio-eyebrow">Painel da Zappio</p>
          <h1>{firstName ? `Olá, ${firstName}!` : 'Olá!'} O que você quer fazer hoje?</h1>
          <p>
            Tudo o que você altera aqui aparece no site assim que clica em <strong>Salvar</strong>. Ao editar uma
            página, use a aba <strong>Prévia ao vivo</strong> para ver como vai ficar.
          </p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="zappio-btn zappio-btn--light">
          Abrir o site <ExternalLink size={16} aria-hidden />
        </a>
      </section>

      <section aria-labelledby="atalhos">
        <h2 id="atalhos" className="zappio-section-title">
          Atalhos
        </h2>
        <div className="zappio-actions">
          <QuickAction href={ADMIN.newProperty} icon={Plus} title="Cadastrar imóvel" text="Fotos, preço, endereço e descrição" primary />
          <QuickAction href={ADMIN.homePage} icon={Home} title="Trocar banners e destaques" text="Carrossel e imóveis da página inicial" />
          <QuickAction
            href={ADMIN.contacts}
            icon={MessageSquare}
            title={unread.totalDocs > 0 ? `${unread.totalDocs} contato${unread.totalDocs > 1 ? 's' : ''} para responder` : 'Contatos recebidos'}
            text="Mensagens do formulário do site"
          />
          {isAdmin && (
            <QuickAction href={ADMIN.settings} icon={Settings} title="Alterar WhatsApp e contato" text="Número, mensagem, endereço e redes" />
          )}
          <QuickAction href={ADMIN.help} icon={LifeBuoy} title="Central de ajuda" text="Passo a passo de cada tarefa do painel" />
        </div>
      </section>

      <section aria-labelledby="paginas">
        <h2 id="paginas" className="zappio-section-title">
          Páginas do site
        </h2>
        <div className="zappio-pages">
          <PageCard
            icon={Home}
            title="Página inicial"
            sitePath="/"
            editHref={ADMIN.homePage}
            items={[
              `${liveBanners} de ${banners.length} banner${banners.length === 1 ? '' : 's'} no ar`,
              `${featured} imóve${featured === 1 ? 'l' : 'is'} em destaque`,
              'Textos “Sobre”, diferenciais e chamada final',
            ]}
          />
          <PageCard
            icon={Building2}
            title="Imóveis"
            sitePath="/imoveis"
            editHref={ADMIN.properties}
            items={[
              `${published.totalDocs} publicado${published.totalDocs === 1 ? '' : 's'}`,
              `${sold.totalDocs} vendido${sold.totalDocs === 1 ? '' : 's'}`,
              `${drafts.totalDocs} em rascunho ou inativo${drafts.totalDocs === 1 ? '' : 's'}`,
            ]}
          />
          <PageCard
            icon={FileText}
            title="Sobre nós / Contato"
            sitePath="/sobre"
            editHref={ADMIN.aboutPage}
            items={['Apresentação e história', 'Missão, visão e valores', 'Equipe']}
          />
        </div>
      </section>

      <section aria-labelledby="contatos">
        <div className="zappio-section-head">
          <h2 id="contatos" className="zappio-section-title">
            Últimos contatos
          </h2>
          <Link href={ADMIN.contacts} className="zappio-link">
            Ver todos <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        {latest.docs.length === 0 ? (
          <p className="zappio-empty">Nenhuma mensagem ainda. Quando alguém usar o formulário do site, aparece aqui.</p>
        ) : (
          <ul className="zappio-contacts">
            {latest.docs.map((c) => {
              const property = c.property && typeof c.property === 'object' ? c.property : null
              return (
                <li key={c.id}>
                  <Link href={`${ADMIN.contacts}/${c.id}`}>
                    <span className={`zappio-dot${c.handled ? '' : ' is-new'}`} aria-label={c.handled ? 'Respondido' : 'Novo'} />
                    <strong>{c.name}</strong>
                    <span className="zappio-muted">{property ? `sobre ${property.code}` : 'contato geral'}</span>
                    <span className="zappio-muted zappio-contacts__date">{dateFormat.format(new Date(c.createdAt))}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
