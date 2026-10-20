# Plano de Desenvolvimento — Site da Imobiliária

## 1. Objetivo

Cliente: **Zappio Assessoria Imobiliária** (DDD 53, RS). Trabalha **somente com venda** de imóveis.

Entregar um site institucional + vitrine de imóveis, com painel administrativo para que a imobiliária gerencie imóveis, destaques da home, banners e informações institucionais sem depender de desenvolvedor. O foco de conversão é levar o lead ao WhatsApp da imobiliária já com o imóvel identificado.

## 2. Escopo

### Site público

| Página | Conteúdo |
|---|---|
| **Home** (`/`) | Carrossel de banners (anúncios), busca rápida (tipo, bairro, faixa de preço), imóveis em destaque, bloco "sobre a imobiliária" com números (anos de mercado, imóveis vendidos etc.), CTA de contato |
| **Imóveis** (`/imoveis`) | Listagem de todos os imóveis publicados, com filtros (tipo, bairro/cidade, faixa de preço, quartos, vagas), ordenação e paginação. Filtros refletidos na URL (compartilhável) |
| **Detalhe do imóvel** (`/imoveis/[slug]`) | Galeria de fotos, preço, condomínio/IPTU, características, descrição, endereço completo com mapa, botão WhatsApp, imóveis semelhantes. *Não estava no briefing, mas é recomendado: melhora SEO, gera link compartilhável e dá contexto ao lead antes do contato* |
| **Sobre nós / Contato** (`/sobre`) | História, missão/valores, equipe (opcional), endereço com mapa, horário, telefones, redes sociais, formulário de contato |
| Política de privacidade | Exigência da LGPD (formulário coleta dados pessoais) |

### Botão WhatsApp nos cards

Link no formato:

```
https://wa.me/5553981300950?text=<mensagem codificada>
```

Número único da imobiliária: **(53) 98130-0950**, armazenado nas Configurações do admin (não fixo no código).

Mensagem padrão editável no admin, com variáveis:

```
Olá! Tenho interesse no imóvel {codigo} – {titulo}, em {bairro}. Link: {url}
```

- Inclui o **código do imóvel** e o **link**, para o corretor identificar na hora.
- Clique registrado como evento de conversão (GA4 / Meta Pixel), para medir leads por imóvel.
- Botão flutuante de WhatsApp genérico nas demais páginas.

### Painel administrativo (`/admin`)

| Módulo | O que o cliente controla |
|---|---|
| **Imóveis** | Cadastro completo, upload/ordenação de fotos, status (publicado, vendido, rascunho, inativo), código gerado automaticamente |
| **Página inicial** | Um único formulário na ordem da página: banners (arrastar para ordenar, foto computador/celular, destino do botão por opções, agendamento), imóveis em destaque (escolher e arrastar), textos e números |
| **Configurações gerais** | Número do WhatsApp, template da mensagem, telefones, e-mail, endereço, CRECI, redes sociais, horário de atendimento, SEO padrão |
| **Conteúdo institucional** | Textos da seção "sobre" da home e da página Sobre, números/estatísticas, equipe |
| **Cadastros auxiliares** | Tipos de imóvel, bairros/cidades, características (piscina, churrasqueira…) — alimentam os filtros |
| **Contatos recebidos** | Mensagens do formulário (também enviadas por e-mail) |
| **Usuários** | Perfis Admin (tudo) e Editor (imóveis e páginas do site) |

## 3. Stack recomendada

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSR/ISR para SEO, ótimo desempenho, `next/image` para fotos |
| CMS / Admin | **Payload CMS 3** (roda dentro do próprio Next) | Painel admin pronto (auth, uploads, rascunhos, permissões), modelado em código — economiza semanas vs. admin do zero |
| Banco | **PostgreSQL** (Neon ou Supabase) | Gerenciado, barato, backups |
| Mídia | Storage S3-compatível (Cloudflare R2 / Vercel Blob) | Fotos fora do servidor, com CDN |
| Estilo | **Tailwind CSS** com tema gerado a partir dos tokens do design system | Garante que só cores/fontes da marca sejam usadas |
| E-mail | Resend | Notificação do formulário de contato |
| Deploy | Vercel | Preview por branch, domínio do cliente, HTTPS |
| Analytics | GA4 + Meta Pixel (opcional) | Medir cliques no WhatsApp |
| Fonte | **Inter Tight** (Google Fonts, OFL) | Alternativa livre mais próxima da Articulat CF, que não tem licença web — ver `docs/DESIGN_SYSTEM.md` §3 |

## 4. Modelo de dados (resumo)

**Imóvel**: código (único, ex. `AP0123`), título, slug, tipo, preço, condomínio, IPTU, endereço completo, bairro, cidade, lat/lng, área útil/total, quartos, suítes, banheiros, vagas, características[], descrição (rich text), fotos[] (ordem + capa), status (rascunho/publicado/vendido/inativo), SEO (título/descrição), datas.

**Página inicial (global)**: banners[] (imagem computador, imagem celular opcional, título, subtítulo, texto do botão, destino do botão, ativo, início/fim), destaques[] (imóveis, ordenados), textos das seções.

**Configurações (global)**: whatsapp, template_mensagem_whatsapp, telefones, e-mail, endereço, CRECI, redes, horário, SEO padrão, logo/favicon.

**Institucional (global)**: textos da home e da página Sobre, estatísticas[], equipe[].

**Contato**: nome, e-mail, telefone, mensagem, imóvel (opcional), consentimento LGPD, data.

## 5. Design System

✅ **Criado** a partir do manual da marca, em `docs/DESIGN_SYSTEM.md` + tokens em código (`src/styles/tokens.css` e tema do Tailwind). Regra: **nenhuma cor, fonte ou espaçamento fora dos tokens**.

Conteúdo:

1. **Marca** — versões do logo, área de proteção, tamanho mínimo, usos proibidos, logo sobre fundo claro/escuro
2. **Cores** — primária, secundária, acento, neutros (escala), semânticas (sucesso, erro, alerta), com combinações aprovadas de texto/fundo validadas em contraste WCAG AA
3. **Tipografia** — famílias (títulos/corpo), pesos, escala de tamanhos (desktop/mobile), line-height, letter-spacing, licença das fontes para web
4. **Espaçamento e grid** — escala (4/8px), container, colunas, breakpoints
5. **Forma** — raios de borda, sombras, bordas
6. **Iconografia e imagens** — biblioteca de ícones, estilo de fotografia, proporções das fotos de imóvel e banners
7. **Componentes** — Button (variações/estados), Input/Select, Badge (destaque, novo, vendido), Card de imóvel, Banner, Header, Footer, Filtro, Galeria, Botão WhatsApp
8. **Tom de voz** — diretrizes de texto (CTAs, microcopy)

Uma página interna `/design-system` exibirá os tokens e componentes para validação visual com o cliente.

## 6. Fases

| # | Fase | Entregáveis |
|---|---|---|
| 0 | **Descoberta** | ✅ Manual da marca, logos, respostas do cliente. Pendente: conteúdo real, domínio |
| 1 | **Design System** | `DESIGN_SYSTEM.md`, tokens, página `/design-system` — **aprovação do cliente** |
| 2 | **Wireframes / layout** | Layout de Home, Listagem, Detalhe, Sobre (desktop + mobile) — **aprovação do cliente** |
| 3 | **Setup** | Repositório, Next + Payload, banco, storage, deploy de preview, lint/format/CI |
| 4 | **CMS / Admin** | Coleções e globals do item 4, permissões, validações, dados de exemplo (seed) |
| 5 | **Site público** | Layout base, Home, Listagem com filtros, Detalhe, Sobre/Contato, 404 |
| 6 | **Integrações** | WhatsApp com mensagem dinâmica, formulário + e-mail, mapa, analytics e eventos de conversão |
| 7 | **SEO e performance** | Metadata e Open Graph por imóvel (preview bonito ao compartilhar no WhatsApp), sitemap, robots, schema.org, Lighthouse ≥ 90 mobile |
| 8 | **QA** | Testes em navegadores e dispositivos, acessibilidade (WCAG AA), LGPD (aviso de cookies, política), revisão de conteúdo |
| 9 | **Go-live** | Registro do domínio (registro.br) e DNS, cadastro dos imóveis reais, treinamento do cliente no admin + guia rápido, período de suporte |

As fases 1–2 dependem de aprovação do cliente; a fase 3 pode correr em paralelo.

## 7. Critérios de aceite principais

- Cliente consegue, sem ajuda: cadastrar imóvel com fotos, marcá-lo como destaque, trocar banners e alterar o número do WhatsApp.
- Clique em "WhatsApp" abre a conversa com código, título e link do imóvel corretos (desktop e mobile).
- Imóveis vendidos/inativos somem da listagem automaticamente; banners fora do período não aparecem.
- Site 100% responsivo, Lighthouse ≥ 90 em performance, acessibilidade e SEO.
- Todas as cores e fontes vêm dos tokens do design system.

## 8. Decisões do cliente e pendências

| # | Tema | Decisão |
|---|---|---|
| 1 | Finalidade | **Somente venda** — sem campos/filtros de aluguel |
| 2 | WhatsApp | **Número único: (53) 98130-0950** (`5553981300950`) |
| 3 | CRM / portais | Não utilizam nenhum — sem integrações na fase 1 |
| 4 | Endereço | **Pode exibir o endereço exato** do imóvel |
| 5 | Domínio | **Não possuem** — registrar no registro.br (sugestão: `zappio.com.br` ou `zappioimoveis.com.br`, verificar disponibilidade). Até lá, usar o subdomínio da Vercel para homologação |
| 6 | Fonte | Usar a fonte livre mais próxima: **Inter Tight** |
| 7 | Contato | CRECI **27791** · Rua Andrade Neves, 2077 / Sala 401 · imobiliariazappio@gmail.com · Instagram **@zappio.imobiliaria** |
| 8 | Conteúdo | Protótipo com textos, imóveis e números **fictícios** (`src/seed/data.ts`), a substituir pelo conteúdo real |

**Ainda pendente com o cliente:** confirmar cidade/bairro e CEP do escritório (assumido Centro, Pelotas/RS), horário de atendimento, textos institucionais reais, equipe, fotos e imóveis reais, domínio e conta de hospedagem (quem é o titular).

## 9. Evoluções futuras (fora do escopo inicial)

Imóveis para aluguel, integração com portais via XML (ZAP, VivaReal, OLX), favoritos, comparador de imóveis, simulador de financiamento, tour virtual/vídeo, blog, área do proprietário, captação ("anuncie seu imóvel").

## 10. Status (19/10/2026) — protótipo funcional

Implementado (Next.js 16 + Payload 3.91 + PostgreSQL + Tailwind v4), com dados fictícios:

- ✅ Design system em código (`src/styles/tokens.css`) + página `/design-system`
- ✅ Admin em português, organizado por página do site, com painel inicial de atalhos, prévia ao vivo, listas com foto/preço/status e guia de uso (`docs/GUIA_DO_PAINEL.md`)
- ✅ Home: carrossel de banners (imagem desktop/celular, período de exibição), busca rápida, destaques, sobre + números, diferenciais, CTA
- ✅ Listagem `/imoveis` com filtros na URL, ordenação e paginação
- ✅ Detalhe `/imoveis/[slug]`: galeria com lightbox, ficha técnica, características, mapa, formulário, semelhantes, barra fixa de contato no celular, selo "Vendido"
- ✅ Sobre/Contato `/sobre` com formulário (validação, honeypot, rate limit, consentimento LGPD) salvo em "Contatos recebidos"
- ✅ WhatsApp com mensagem pré-definida editável (código, título, bairro, preço, link) + evento `whatsapp_click`
- ✅ SEO: metadata por página, Open Graph com foto do imóvel, sitemap, robots, JSON-LD
- ✅ Política de privacidade (texto-base, **precisa de revisão jurídica**) e 404

Próximos passos: aprovação visual do cliente → conteúdo real → envio de e-mail dos contatos (Resend) → storage S3/R2 para mídia → migration inicial → analytics + aviso de cookies → deploy de homologação na Vercel → testes de acessibilidade/Lighthouse → domínio e go-live.
