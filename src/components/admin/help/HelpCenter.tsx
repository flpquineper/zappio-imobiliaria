'use client'

import { ArrowRight, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { HELP_CATEGORIES, HELP_TOPICS, type HelpTopic } from './topics'

/** Busca sem diferenciar acentos nem maiúsculas: "imovel" encontra "Imóvel". */
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

const searchableText = (topic: HelpTopic) => normalize(`${topic.title} ${topic.keywords}`)

export function HelpCenter({ isAdmin }: { isAdmin: boolean }) {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  // Link direto para um tópico (/admin/ajuda#cadastrar-imovel) já abre a resposta. Se a busca estiver
  // filtrando, ela é limpa antes, senão o tópico pedido pode nem estar na tela.
  useEffect(() => {
    const openFromHash = () => {
      const target = document.getElementById(window.location.hash.slice(1))
      if (target instanceof HTMLDetailsElement) target.open = true
      target?.scrollIntoView({ block: 'start' })
    }
    const onHashChange = () => {
      setQuery('')
      requestAnimationFrame(openFromHash)
    }
    openFromHash()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const terms = normalize(query).split(/\s+/).filter(Boolean)
  const results =
    terms.length === 0
      ? HELP_TOPICS
      : HELP_TOPICS.filter((topic) => {
          const text = searchableText(topic)
          return terms.every((term) => text.includes(term))
        })

  const searching = terms.length > 0

  return (
    <div className="zappio-help">
      <section className="zappio-hero zappio-help__hero">
        <div>
          <p className="zappio-eyebrow">Central de ajuda</p>
          <h1>Como podemos ajudar?</h1>
          <p>Encontre o passo a passo para cuidar do site sozinho. Digite o que você quer fazer ou escolha um assunto.</p>
          <div className="zappio-help__search" role="search">
            <Search size={18} aria-hidden />
            <label htmlFor="help-search" className="zappio-help__sr-only">
              Buscar na ajuda
            </label>
            <input
              id="help-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex.: marcar como vendido, trocar banner, senha…"
              autoComplete="off"
            />
            {searching && (
              <button type="button" onClick={() => setQuery('')} aria-label="Limpar busca">
                <X size={16} aria-hidden />
              </button>
            )}
          </div>
        </div>
      </section>

      {!searching && (
        <nav aria-label="Assuntos da ajuda" className="zappio-help__categories">
          {HELP_CATEGORIES.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="zappio-help__category">
              <strong>{category.label}</strong>
              <span>{category.description}</span>
            </a>
          ))}
        </nav>
      )}

      <p className="zappio-help__count" aria-live="polite">
        {searching &&
          (results.length === 0
            ? 'Nenhum resultado. Tente outras palavras, como “imóvel”, “foto” ou “banner”.'
            : `${results.length} resultado${results.length === 1 ? '' : 's'} para “${query.trim()}”`)}
      </p>

      {HELP_CATEGORIES.map((category) => {
        const topics = results.filter((topic) => topic.category === category.id)
        if (topics.length === 0) return null
        return (
          <section key={category.id} id={category.id} aria-labelledby={`${category.id}-titulo`} className="zappio-help__group">
            <h2 id={`${category.id}-titulo`} className="zappio-section-title">
              {category.label}
            </h2>
            <div className="zappio-help__list">
              {topics.map((topic) => (
                <details
                  key={topic.id}
                  id={topic.id}
                  className="zappio-help__topic"
                  open={openId === topic.id || (searching && results.length <= 3)}
                  onToggle={(e) => {
                    if (e.currentTarget.open) setOpenId(topic.id)
                  }}
                >
                  <summary>
                    <span>{topic.title}</span>
                    {topic.adminOnly && <span className="zappio-help__badge">Administradores</span>}
                  </summary>
                  <div className="zappio-help__body">
                    {topic.adminOnly && !isAdmin && (
                      <p className="zappio-help__note">
                        Esta tela é exclusiva de administradores. Se precisar dessa mudança, peça a um administrador.
                      </p>
                    )}
                    {topic.body}
                    {topic.link && (!topic.adminOnly || isAdmin) && (
                      <Link href={topic.link.href} className="zappio-btn zappio-btn--primary zappio-help__go">
                        {topic.link.label} <ArrowRight size={16} aria-hidden />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )
      })}

      <section className="zappio-help__footer">
        <h2 className="zappio-section-title">Não encontrou o que procurava?</h2>
        <p>
          Fale com o suporte técnico da Zappio e conte o que você estava tentando fazer. Se puder, envie um print da tela.
        </p>
      </section>
    </div>
  )
}
