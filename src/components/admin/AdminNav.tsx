'use client'

import { useAuth } from '@payloadcms/ui'
import {
  Building2,
  ExternalLink,
  FileText,
  Home,
  Images,
  LifeBuoy,
  LayoutDashboard,
  ListChecks,
  MapPin,
  MessageSquare,
  Settings,
  Shapes,
  Users,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { User } from '@/payload-types'

import { ADMIN } from './routes'

type Item = { href: string; label: string; icon: LucideIcon; hint?: string; adminOnly?: boolean; exact?: boolean }
type Section = { title?: string; items: Item[]; adminOnly?: boolean }

const SECTIONS: Section[] = [
  { items: [{ href: ADMIN.home, label: 'Início do painel', icon: LayoutDashboard, exact: true }] },
  {
    title: 'Páginas do site',
    items: [
      { href: ADMIN.homePage, label: 'Página inicial', icon: Home, hint: 'Banners, destaques e textos' },
      { href: ADMIN.properties, label: 'Imóveis', icon: Building2, hint: 'Cadastrar e editar anúncios' },
      { href: ADMIN.aboutPage, label: 'Sobre nós / Contato', icon: FileText, hint: 'História, equipe e contato' },
    ],
  },
  {
    title: 'Atendimento',
    items: [{ href: ADMIN.contacts, label: 'Contatos recebidos', icon: MessageSquare }],
  },
  {
    title: 'Configurações',
    adminOnly: true,
    items: [
      { href: ADMIN.settings, label: 'Dados da imobiliária', icon: Settings, hint: 'WhatsApp, endereço, redes' },
      { href: ADMIN.users, label: 'Usuários do painel', icon: Users },
    ],
  },
  {
    title: 'Cadastros de apoio',
    items: [
      { href: ADMIN.neighborhoods, label: 'Bairros', icon: MapPin },
      { href: ADMIN.types, label: 'Tipos de imóvel', icon: Shapes },
      { href: ADMIN.features, label: 'Características', icon: ListChecks },
      { href: ADMIN.media, label: 'Biblioteca de imagens', icon: Images },
    ],
  },
  {
    title: 'Ajuda',
    items: [{ href: ADMIN.help, label: 'Central de ajuda', icon: LifeBuoy, hint: 'Passo a passo de cada tarefa' }],
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const { user } = useAuth<User>()
  const isAdmin = user?.role === 'admin'

  return (
    <nav className="zappio-nav" aria-label="Menu do painel">
      {SECTIONS.filter((s) => !s.adminOnly || isAdmin).map((section, i) => (
        <div key={section.title ?? i} className="zappio-nav__section">
          {section.title && <p className="zappio-nav__title">{section.title}</p>}
          <ul>
            {section.items.map(({ href, label, icon: Icon, hint, exact }) => {
              const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`zappio-nav__link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={18} strokeWidth={1.75} aria-hidden />
                    <span>
                      {label}
                      {hint && <small>{hint}</small>}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <a href="/" target="_blank" rel="noopener noreferrer" className="zappio-nav__site">
        <ExternalLink size={16} aria-hidden />
        Abrir o site
      </a>
    </nav>
  )
}
