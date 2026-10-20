# CLAUDE.md

As regras do projeto ficam em `AGENTS.md` (fonte única, compartilhada com outras ferramentas). Não duplique regras aqui — altere o `AGENTS.md`.

@AGENTS.md

## Específico para o Claude Code

- Antes de qualquer tarefa de UI, leia `docs/DESIGN_SYSTEM.md`. Antes de mudar escopo ou modelo de dados, leia `docs/PLANO_DE_DESENVOLVIMENTO.md`.
- A pasta `Identidade Visual - Zappio/` é material bruto do cliente: **somente leitura**. O manual é um PDF de 56 MB — leia por páginas (`pdftotext -f N -l N`) em vez de abri-lo inteiro.
- Para Payload CMS e Next.js, confirme APIs na documentação da versão instalada (`package.json`) antes de escrever código; as duas bibliotecas mudam rápido.
- Ao terminar uma mudança de UI, rode o app e confira visualmente em mobile (360px) e desktop (1440px) antes de declarar pronto.
- Rode `pnpm lint && pnpm typecheck` antes de considerar uma tarefa concluída; relate falhas em vez de escondê-las.
- Commits e PRs apenas quando solicitado.
