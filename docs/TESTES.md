# Testes

| Tipo | Ferramenta | Pasta | Quando rodar |
|---|---|---|---|
| Unitários | Vitest | `src/**/*.test.ts` | Sempre (`pnpm test`) |
| Ponta a ponta | Playwright | `e2e/` | Antes de abrir PR que mexe em tela, painel ou rotas |
| Desempenho | k6 | `perf/` | Smoke depois de cada deploy; carga antes de campanhas ou mudanças grandes |

## Playwright (`e2e/`)

```bash
pnpm exec playwright install chromium   # primeira vez
pnpm test:e2e                            # local: sobe o pnpm dev se precisar; usa o banco do seed
pnpm test:e2e:prod                       # produção: só leitura (os testes de painel são pulados)
pnpm exec playwright show-report         # relatório da última execução
```

Cada teste roda em dois projetos: **desktop** (1440px) e **mobile** (360px, toque). O que só faz sentido em um deles é pulado no outro.

| Arquivo | Cobre |
|---|---|
| `site.spec.ts` | Busca rápida → listagem filtrada, ordenação, detalhe (WhatsApp com código, Open Graph, JSON-LD), fotos sem erro, 404 em português, robots e sitemap |
| `mobile.spec.ts` | Botão flutuante nunca sobre campos, gaveta de filtros (trava o fundo, fecha ao tocar fora, aplica filtro), menu, alvos de toque ≥ 44px, sem rolagem horizontal |
| `security.spec.ts` | Cabeçalhos de segurança, API fechada para anônimos (usuários, contatos, cadastro), API pública só com imóveis publicados/vendidos, prévia exige login |
| `admin.spec.ts` | Login, Central de ajuda (busca e link direto para tópico) e logout. **Só local** ou com `E2E_ADMIN_EMAIL`/`E2E_ADMIN_PASSWORD` |

Os testes não dependem de slugs ou textos fixos do seed: abrem o primeiro imóvel da listagem. Assim continuam válidos depois que o cliente trocar o conteúdo.

## k6 (`perf/`)

O k6 é um binário à parte ([instalação](https://grafana.com/docs/k6/latest/set-up/install-k6/)), não uma dependência do projeto.

```bash
BASE_URL=https://zappioimobiliaria.com.br pnpm perf:smoke   # 1 usuário, 30 s, páginas principais
pnpm build && pnpm start                                     # em outro terminal
BASE_URL=http://localhost:3000 VUS=30 pnpm perf:load         # visitantes simulados, ~4,5 min
```

- **smoke** (`perf/smoke.js`): falha se algum erro aparecer ou se o p95 passar de 1,5 s.
- **load** (`perf/load.js`): home → listagem com filtro aleatório → imóvel, com 2 a 6 s de leitura entre páginas. Limites: p95 de 1,5 s na home e 2 s na listagem e no detalhe, menos de 1% de erros.
- **Não rode o teste de carga contra produção sem combinar**: gera custo de funções e de banco, e pode acionar a proteção anti-robô da Vercel. Prefira o build local ou um preview.
- O load não baixa imagens, porque a otimização de imagem da Vercel é cobrada por transformação.

### Referência (23/10/2026)

| Ambiente | Cenário | Resultado |
|---|---|---|
| Build local (`next start`) | load, 30 usuários | 0% de erros; p95 8 ms (home), 57 ms (listagem), 46 ms (imóvel) |
| Produção (Vercel + Neon) | smoke | 0% de erros; p95 500 ms; pior caso 2,7 s (banco acordando) |

## Lighthouse

Meta do AGENTS.md: ≥ 90 nas quatro categorias, no celular. Rode contra o domínio final, porque no `*.vercel.app` a checagem anti-robô da Vercel adiciona ~0,9 s ao teste (não afeta visitantes reais).

```bash
npx lighthouse https://zappioimobiliaria.com.br/imoveis --form-factor=mobile --view
```
