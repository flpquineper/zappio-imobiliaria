# AGENTS.md — Regras de desenvolvimento do site Zappio

Este arquivo vale para qualquer pessoa ou agente de IA (Claude Code, Codex, Cursor etc.) que trabalhe neste repositório. Leia antes de alterar qualquer coisa.

## Contexto do projeto

Site da **Zappio Assessoria Imobiliária** (DDD 53, RS): site institucional + vitrine de imóveis **somente à venda**, com painel admin para o cliente gerenciar imóveis, destaques da home, banners e informações institucionais. O objetivo de conversão é levar o lead ao WhatsApp com o imóvel já identificado.

Documentos de referência (leitura obrigatória antes de tarefas relacionadas):

| Documento | Quando ler |
|---|---|
| `docs/PLANO_DE_DESENVOLVIMENTO.md` | Escopo, fases, modelo de dados, critérios de aceite |
| `docs/DESIGN_SYSTEM.md` | **Qualquer** trabalho de UI: cores, tipografia, formas, componentes, tom de voz |
| `Identidade Visual - Zappio/Manual da Marca/` | Dúvida que o design system não responda — o manual prevalece |

## Stack

- **Next.js** (App Router) + **TypeScript** (`strict: true`)
- **Payload CMS 3** rodando dentro do Next (admin em `/admin`)
- **PostgreSQL** (adapter `@payloadcms/db-postgres`)
- **Tailwind CSS v4** com tema **substituído** pelos tokens da marca
- Storage de mídia S3-compatível (adapter oficial do Payload)
- Deploy na Vercel
- Gerenciador de pacotes: **pnpm**

Não adicione dependências novas sem justificar no PR (o que resolve, por que não dá com o que já existe).

## Estrutura de pastas (alvo)

```
src/
  app/
    (site)/               # rotas públicas: /, /imoveis, /imoveis/[slug], /sobre, /politica-de-privacidade
    (payload)/            # rotas geradas pelo Payload (admin e API) — não editar à mão
    design-system/        # página interna de tokens e componentes
  collections/            # Properties, ContactMessages, Neighborhoods, PropertyTypes, Features, Media, Users
  globals/                # HomeContent (banners + destaques + textos), AboutContent, Settings
  components/
    ui/                   # primitivos do design system (Button, Badge, Input…)
    property/             # PropertyCard, Gallery, FilterPanel…
    layout/               # Header, Footer, WhatsAppFab
  lib/                    # helpers puros (whatsapp.ts, format.ts, seo.ts) + queries ao Payload
  styles/                 # tokens.css, globals.css
public/brand/             # logos e assets da marca otimizados
docs/                     # plano, design system, guia do admin
```

## Convenções de código

- **Idioma**: código (variáveis, funções, componentes, slugs de coleções do Payload) em **inglês**; textos da interface, labels do admin, rotas públicas e conteúdo em **português do Brasil**.
  - Ex.: coleção `properties` com `labels: { singular: 'Imóvel', plural: 'Imóveis' }`, rota `/imoveis`.
- **Server Components por padrão**. `"use client"` somente onde há estado/interação (carrossel, filtros, galeria, menu mobile), e o mais abaixo possível na árvore.
- Dados lidos pela **Local API do Payload** em Server Components (`getPayload`) — não chamar a REST API do próprio app via `fetch`.
- Filtros da listagem vivem nos **search params da URL** (compartilháveis, indexáveis), nunca só em estado local.
- Componentes: um por arquivo, `PascalCase.tsx`, props tipadas, sem `any`. Helpers em `camelCase.ts`.
- Não duplicar lógica: formatação de preço/área, montagem do link do WhatsApp e geração de metadata têm **um único helper** em `src/lib/`.
- Formatação: `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })` para preço; área em `m²`.
- Comentários só quando explicam o **porquê**; o código deve se explicar.

## Regras de design (inegociáveis)

1. **Só tokens.** Proibido hex, `rgb()`, `px` de fonte ou sombras soltas em componentes. Tudo vem de `src/styles/tokens.css` / tema Tailwind. A paleta padrão do Tailwind está desativada.
2. **Cores da marca**: `brand-purple #8026FA` (primária), `brand-navy #0A1747`, `brand-blue #122696`, `brand-violet #6600C2`, preto e branco. Neutros e semânticas só os definidos no design system.
3. **Nunca** texto roxo sobre navy (contraste 2.9:1). Verifique contraste AA para qualquer combinação nova.
4. **Logo**: sempre o SVG oficial de `public/brand/`, na variação de cor certa para o fundo (tabela no design system), **mínimo 100px de largura**. Nunca rotacionar, distorcer, recolorir, contornar ou recriar.
5. **Triângulo de apoio**: sempre ascendente da esquerda para a direita, canto reto arredondado.
6. Fundos grandes (hero, rodapé, blocos institucionais) usam os **gradientes** da marca; áreas de leitura ficam brancas/`neutral-50`.
7. **Fonte**: **Inter Tight** (Google Fonts, OFL) via `next/font` e token `--font-sans` — a alternativa livre mais próxima da Articulat CF da marca. **Nunca** copiar os `.otf` de `Identidade Visual - Zappio/Fonte/` para o projeto (sem licença para web — ver design system, seção 3).
8. Componente novo ou variante nova → adicionar também na página `/design-system`.

## Regras de negócio

- Imobiliária trabalha **apenas com venda**. Não criar campos/filtros de aluguel (deixar para evolução futura, se o cliente pedir).
- **Endereço completo do imóvel pode ser exibido** (autorizado pelo cliente).
- **WhatsApp**: número único, armazenado no global `Settings` (valor inicial `5553981300950`, exibido como `(53) 98130-0950`). **Nunca hardcodar o número** em componentes.
  - Link gerado exclusivamente por `buildWhatsAppUrl()` em `src/lib/whatsapp.ts`: `https://wa.me/<numero>?text=<encodeURIComponent(mensagem)>`.
  - Mensagem vem do template editável em `Settings` com variáveis `{codigo}`, `{titulo}`, `{bairro}`, `{url}`, `{preco}`.
  - Todo clique dispara o evento de analytics `whatsapp_click` com o código do imóvel (ou `geral`).
- Imóveis públicos = `status: 'published'`. `sold` aparece só no detalhe (com badge "Vendido"), `draft`/`inactive` nunca aparecem no site.
- Banners e destaques vivem no global **`home-content`** (não são coleções): `banners` é um array ordenável; `featuredProperties` é uma relação ordenável (máx. 6, só publicados). Banner só aparece se `active` e dentro de `startsAt`/`endsAt`.
- Botões de banner usam `ctaType` (lista de imóveis, imóvel, sobre, contato, WhatsApp, link) — resolvidos por `resolveLink()` em `src/lib/link.ts`. Não peça URLs ao usuário quando der para oferecer opções.
- Código do imóvel e slug são gerados no hook `beforeValidate` da coleção `properties` quando ficam vazios.

## Payload / Admin

O painel é usado por pessoas **não técnicas**. Princípios (ver `docs/GUIA_DO_PAINEL.md`):

- **Organizado por página do site**, não por estrutura de dados. Menu próprio em `src/components/admin/AdminNav.tsx` (todas as coleções/globals usam `admin.group: false`); ao criar coleção/global nova, adicione o link lá e em `src/components/admin/routes.ts`.
- Painel inicial customizado (`src/components/admin/Dashboard.tsx`) com atalhos de tarefas e resumo das páginas.
- Abas numeradas na **mesma ordem da página** pública; `description` em toda aba/campo não óbvio dizendo *onde aparece* no site.
- **Prévia ao vivo** (`admin.livePreview`) em imóveis e nas páginas; passa por `/preview` (draft mode, exige login) e recarrega a cada "Salvar" (`LivePreviewListener`).
- Nada técnico na tela: `hideAPIURL: true`, sem pedir slug/URL/IDs, valores aceitos em formato livre e normalizados no servidor (ex.: telefone).
- Listas com células legíveis (`src/components/admin/cells/`): foto, preço em R$, status colorido.
- Estilo do painel em `src/app/(payload)/custom.scss` (tema claro + cores da marca).

- Admin em português: `labels`, `admin.description` em campos não óbvios, `admin.useAsTitle` em toda coleção.
- **Access control explícito em toda coleção/global**: leitura pública filtra por status publicado; criação/edição só para usuários autenticados; `Users` e `Settings` só para `admin`.
- Validação no schema (campos obrigatórios, `min`, códigos únicos), não só no front.
- Imagens: `alt` obrigatório na coleção `Media`. No upload, o sharp reduz para no máx. 2400px, recomprime em JPEG mozjpeg (q82), remove EXIF/GPS e gera os tamanhos `thumb`, `card`, `gallery`, `bannerDesktop`, `bannerMobile`, `og`. Na entrega, o `next/image` converte para AVIF/WebP. Mantenha JPEG no armazenamento: trocar o formato muda a extensão e deixa o original órfão no R2 (`clientUploads`).
- Armazenamento: Cloudflare R2 via `@payloadcms/storage-s3`, ativado quando `R2_BUCKET` está definido; sem ele, pasta local `media/`. Upload direto do navegador (`clientUploads`) por causa do limite de ~4,5 MB por requisição da Vercel — exige CORS no bucket.
- Revalidação: hooks `afterChange`/`afterDelete` chamam `revalidatePath`/`revalidateTag` das páginas afetadas.
- Mudança de schema → `pnpm migrate:create nome` e commitar `src/migrations/`. Nunca editar migration já aplicada. O deploy de produção roda `pnpm migrate` (ver `vercel-build`); previews não rodam migrations.
- Seed (`pnpm seed`) deve manter dados de exemplo realistas para desenvolvimento.

## SEO, performance e acessibilidade

- Toda página pública exporta `generateMetadata` (título, descrição, canonical, Open Graph com imagem). Detalhe do imóvel usa a foto de capa no OG — o preview no WhatsApp precisa ficar bonito.
- `sitemap.ts` e `robots.ts` gerados dinamicamente. JSON-LD (`RealEstateListing` / `Offer`) no detalhe e `RealEstateAgent` no institucional.
- Imagens sempre via `next/image` com `sizes` correto; banner do hero com `priority`.
- Meta: Lighthouse mobile ≥ 90 em Performance, Acessibilidade, Boas práticas e SEO.
- WCAG 2.1 AA: HTML semântico, `alt` descritivo, foco visível, navegação por teclado, labels em inputs, alvos de toque ≥ 44px, `prefers-reduced-motion` respeitado no carrossel e animações.
- `<html lang="pt-BR">`.

## Segurança e LGPD

- Segredos só em variáveis de ambiente; manter `.env.example` atualizado (sem valores reais). Nunca commitar `.env`.
- Formulário de contato: validação no servidor (zod), proteção anti-spam (honeypot + rate limit), checkbox de consentimento LGPD obrigatório.
- Banner de cookies antes de carregar scripts de analytics/pixel.

## Comandos

> Atualize esta seção quando criar/alterar scripts.

```bash
pnpm db:up        # sobe o PostgreSQL local (Docker, porta 5433)
pnpm dev          # site em http://localhost:3000 · admin em /admin
pnpm seed         # APAGA o conteúdo e recria os dados fictícios do protótipo
pnpm migrate      # aplica migrations pendentes (produção roda no deploy)
pnpm migrate:create nome  # gera migration após mudar coleções/globals
pnpm build        # build de produção
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm test         # testes unitários (Vitest, arquivos *.test.ts)
pnpm format       # Prettier
pnpm generate:types      # regenera src/payload-types.ts após mudar o schema
pnpm generate:importmap  # após adicionar componentes customizados no admin
```

Primeira vez: `cp .env.example .env`, preencher `PAYLOAD_SECRET`, `pnpm install`, `pnpm db:up`, `pnpm seed`, `pnpm dev`.
Login do seed (só desenvolvimento): `admin@zappio.com.br` / `zappio-dev-123` (sobrescreva com `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD`).

Gotchas:
- A Local API do Payload **ignora access control por padrão**: consultas públicas em `src/lib/queries.ts` filtram `status`/`active` explicitamente.
- URLs de mídia do Payload vêm absolutas; use sempre `mediaUrl()` (`src/lib/media.ts`), que devolve o caminho local aceito pelo `next/image`.
- `cn()` usa tailwind-merge configurado com a escala tipográfica da marca; ao criar utilidade `text-*` nova em `tokens.css`, registre-a em `src/lib/cn.ts`.
- Em dev o banco local usa *push* automático do schema; produção usa só migrations. Deploy: ver `docs/DEPLOY.md`.
- O seed apaga o conteúdo e é bloqueado fora do banco local (exige `SEED_ALLOW_REMOTE=true` + `SEED_ADMIN_PASSWORD`). Nunca rode contra produção depois que o cliente começar a editar.

## Git

- Branch padrão `main` (sempre deployável). Trabalho em branches `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Commits no padrão **Conventional Commits**, em português: `feat(imoveis): adiciona filtro por bairro`.
- PR pequeno e focado, com descrição do que mudou, prints (desktop + mobile) quando houver UI e checklist abaixo.
- Não commitar: `.env*` (exceto `.env.example`), `node_modules`, `.next`, arquivos de fonte `.otf/.ttf` sem licença, a pasta `Identidade Visual - Zappio/` (material bruto do cliente, pesado — fica fora do git).

## Definição de pronto (checklist do PR)

- [ ] `pnpm lint`, `pnpm typecheck` e `pnpm build` passam
- [ ] Usa apenas tokens do design system; nenhum valor solto de cor/fonte/sombra
- [ ] Responsivo testado em 360px, 768px e 1440px
- [ ] Acessível por teclado, foco visível, contraste AA
- [ ] Textos em pt-BR revisados, seguindo o tom de voz da marca
- [ ] Conteúdo variável vem do Payload (nada que o cliente deva editar está hardcoded)
- [ ] Migration incluída se o schema mudou
- [ ] `/design-system` atualizado se houve componente/variante nova
- [ ] Docs atualizados (`AGENTS.md`, `docs/`) se mudou regra, comando ou escopo

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
