# Deploy — Vercel + Neon + Cloudflare R2

Arquitetura de produção (opção A do plano):

| Parte | Serviço | Observação |
|---|---|---|
| Site, painel e API | **Vercel Pro** (região `gru1`, São Paulo) | Deploy automático a cada push na `main` |
| Banco PostgreSQL | **Neon** (região AWS São Paulo, `sa-east-1`) | Plano Free atende o volume do site |
| Fotos | **Cloudflare R2** | Bucket privado; o site entrega as fotos via `/api/media/file/...` |
| Domínio | **registro.br** | DNS apontado para a Vercel |

> A ordem abaixo importa: o banco é preparado (estrutura + conteúdo inicial) **antes** do primeiro deploy, para o site já nascer com conteúdo.

---

## 1. Banco de dados — Neon

1. Crie a conta em [neon.com](https://neon.com) e um projeto **zappio**, região **AWS South America (São Paulo)**.
2. Em **Connect**, copie a *connection string* **com pooling** (o host contém `-pooler`). Formato:
   `postgresql://usuario:senha@ep-xxxx-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
3. Guarde como `DATABASE_URL`.

## 2. Fotos — Cloudflare R2

1. Painel da Cloudflare → **R2 Object Storage** → **Create bucket** → nome `zappio-media` (localização automática).
2. **R2 → Manage API tokens → Create API token**:
   - Permissão: **Object Read & Write**
   - Escopo: somente o bucket `zappio-media`
   - Copie **Access Key ID** e **Secret Access Key** (o secret só aparece uma vez).
3. Copie o **Account ID** (aparece na página inicial do R2).
4. No bucket → **Settings → CORS policy** → cole (troque pelo domínio real quando tiver):

   ```json
   [
     {
       "AllowedOrigins": [
         "http://localhost:3000",
         "https://zappio-imobiliaria.vercel.app",
         "https://zappio.com.br",
         "https://www.zappio.com.br"
       ],
       "AllowedMethods": ["GET", "PUT", "HEAD"],
       "AllowedHeaders": ["*"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

   O CORS é necessário porque o painel envia as fotos **direto do navegador para o R2** (`clientUploads`). Assim, fotos grandes não esbarram no limite de ~4,5 MB por requisição da Vercel. Se o upload de fotos falhar no painel, a primeira suspeita é o CORS (domínio faltando na lista).

O bucket **não** precisa de acesso público.

**Otimização das fotos:** ao enviar, o servidor reduz a foto para no máximo 2400 px, recomprime (JPEG de alta qualidade) e remove os dados da câmera, inclusive a localização GPS. Uma foto de celular de 2–8 MB vira algumas centenas de KB, sem diferença visível. Na entrega, o site converte para AVIF/WebP no tamanho de cada tela. Limite por arquivo: 25 MB. Formatos aceitos: JPEG, PNG e WebP.

> Depois do primeiro upload pelo painel em produção, confira no bucket se ficou só um arquivo por foto (mais os tamanhos `-400x300`, `-800x600`…). Se aparecer cópia duplicada, avise: pode ser preciso ajustar a limpeza do upload direto.

## 3. Preparar o banco (no seu computador)

Na pasta do projeto, com as credenciais dos passos 1 e 2 (não salve essas senhas em arquivos versionados):

```bash
export DATABASE_URL="postgresql://...-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
export PAYLOAD_SECRET="$(openssl rand -hex 32)"   # guarde: será usado na Vercel também
export R2_ACCOUNT_ID="..." R2_BUCKET="zappio-media" R2_ACCESS_KEY_ID="..." R2_SECRET_ACCESS_KEY="..."

# 1) cria as tabelas
pnpm migrate

# 2) conteúdo inicial do protótipo (imóveis/textos fictícios) + usuário admin
SEED_ALLOW_REMOTE=true \
SEED_ADMIN_EMAIL="seu-email@exemplo.com" \
SEED_ADMIN_PASSWORD="uma-senha-forte" \
pnpm seed
```

O seed envia as 28 fotos para o R2. Rode **uma vez só**: ele apaga o conteúdo existente e por isso é bloqueado fora do banco local sem `SEED_ALLOW_REMOTE=true`.

## 4. Vercel

1. [vercel.com/new](https://vercel.com/new) → importe o repositório `flpquineper/zappio-imobiliaria`.
2. Framework: **Next.js** (detectado). Build command e região já vêm do `vercel.json`.
3. **Environment Variables** (marque *Production* e *Preview*):

   | Variável | Valor |
   |---|---|
   | `DATABASE_URL` | connection string do Neon (com `-pooler`) |
   | `PAYLOAD_SECRET` | o mesmo gerado no passo 3 |
   | `NEXT_PUBLIC_SITE_URL` | `https://zappio-imobiliaria.vercel.app` (troque pelo domínio no passo 5) |
   | `R2_ACCOUNT_ID` / `R2_BUCKET` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | do passo 2 |

4. **Deploy**. O build roda `pnpm run vercel-build`: aplica as migrations pendentes (somente em produção) e gera o site.
5. Teste: abra o site, o `/admin`, faça login, troque um texto e confira a prévia ao vivo e o upload de uma foto.

## 5. Domínio (registro.br)

1. Registre o domínio no [registro.br](https://registro.br) (ex.: `zappio.com.br`).
2. Vercel → projeto → **Settings → Domains** → adicione `zappio.com.br` e `www.zappio.com.br` (defina um como principal; o outro redireciona).
3. No registro.br, **altere os servidores DNS** para os que a Vercel indicar (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`), ou crie os registros A/CNAME exatamente como a tela de Domains da Vercel mostrar.
4. Aguarde a propagação (minutos a algumas horas). O HTTPS é emitido automaticamente.
5. Depois que o domínio estiver ativo:
   - Atualize `NEXT_PUBLIC_SITE_URL` para `https://zappio.com.br` e faça **Redeploy**.
   - Confira se o domínio está no **CORS do R2**.

## 6. Entregar ao cliente

1. Entre no `/admin` com o usuário do seed → **Usuários do painel → Criar novo** → e-mail do cliente, perfil **Administrador**.
2. Envie o link do painel e o [Guia do painel](GUIA_DO_PAINEL.md).
3. Combine com o cliente a substituição do conteúdo fictício (imóveis, textos, números, equipe).

---

## Fluxo de trabalho depois do go-live

```
feature branch ──► Pull Request ──► Preview na Vercel (URL própria) ──► revisão ──► merge na main ──► Produção
```

- Cada PR ganha uma **URL de preview** automática. Ela usa o **mesmo banco** da produção, então tenha cuidado ao editar conteúdo pelo preview.
- **Mudou o schema** (coleção/campo)? Antes do PR, rode `pnpm migrate:create nome-da-mudanca` e commite o arquivo gerado em `src/migrations/`. Ele é aplicado automaticamente no deploy de produção.
  - Builds de preview **não** rodam migrations, para não alterar o banco de produção antes do merge. Um preview com schema novo pode falhar no build; isso é esperado.
  - Melhoria futura: integração Neon ↔ Vercel com **um branch de banco por preview**.
- Nunca rode `pnpm seed` contra produção depois que o cliente começar a editar: o seed apaga o conteúdo.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| Upload de foto falha no painel | Domínio fora do CORS do R2, ou credenciais R2 erradas na Vercel |
| Links de WhatsApp/compartilhamento apontam para `localhost` ou `vercel.app` | `NEXT_PUBLIC_SITE_URL` desatualizado (precisa de redeploy depois de mudar) |
| Build falha com erro de tabela/coluna | Migration não gerada para a mudança de schema |
| Primeira visita lenta depois de um tempo parado | Neon Free suspende o banco após 5 min ocioso (~1 s para acordar); páginas em cache não são afetadas |
