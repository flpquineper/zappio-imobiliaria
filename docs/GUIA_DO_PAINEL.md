# Guia do painel da Zappio

> Versão ilustrada, com prints das telas: [`Guia-do-Painel-Zappio.pdf`](Guia-do-Painel-Zappio.pdf).

Este guia é para quem vai cuidar do site no dia a dia. Não precisa saber nada de tecnologia.

**Endereço do painel:** `zappioimobiliaria.com.br/admin` (no protótipo: http://localhost:3000/admin)

---

## Como o painel funciona

- O menu à esquerda está organizado **pelas páginas do site**: Página inicial, Imóveis e Sobre nós / Contato.
- Tudo que você muda aparece no site **assim que clica em "Salvar"** (botão roxo, no canto superior direito).
- Ao editar uma página ou um imóvel, a **prévia ao vivo** mostra o site ao lado do formulário. Se ela estiver fechada, clique no ícone de olho 👁 ao lado de "Salvar". A prévia atualiza sempre que você salva.
- Campos com <span style="color:#c2183b">*</span> são obrigatórios. Embaixo de cada campo há uma explicação curta do que ele faz.
- Na prévia, uma faixa azul avisa "Modo de pré-visualização". Ela só aparece para você, que está logado; os visitantes não veem. Para sair, clique em **Sair** na faixa.

---

## Tarefas mais comuns

### Cadastrar um imóvel

1. No **Início do painel**, clique em **Cadastrar imóvel** (ou vá em **Imóveis → Criar novo**).
2. Preencha o **título do anúncio**. Ex.: "Casa com piscina no Laranjal".
3. Aba **Informações**: tipo, preço (só números, ex.: `850000`), áreas, quartos, características e descrição.
4. Aba **Fotos**: envie as fotos. **A primeira é a capa.** Arraste para mudar a ordem.
5. Aba **Endereço**: rua, número e bairro. O bairro não está na lista? Clique no **+** ao lado para cadastrar.
6. À direita, em **Situação no site**, deixe **Publicado** para o imóvel aparecer no site.
7. Clique em **Salvar**. O **código** do imóvel (ex.: CA0114) é criado automaticamente.

### Marcar um imóvel como vendido

Abra o imóvel → em **Situação no site**, escolha **Vendido** → **Salvar**.
O imóvel sai da lista do site, mas a página dele continua no ar com o selo "Vendido", para não quebrar links já compartilhados.

### Tirar um imóvel do site sem apagar

Escolha **Inativo** (ou **Rascunho**, se ainda está preparando o anúncio) → **Salvar**.

### Trocar os banners do topo da página inicial

1. Menu **Página inicial** → aba **1. Banners**.
2. Clique em um banner para abrir, ou em **Adicionar Banner** para criar um novo.
3. Escolha a **foto para computador** (horizontal). A **foto para celular** (vertical) é opcional.
4. Em **"O botão leva para…"**, escolha o destino: lista de imóveis, um imóvel específico, página Sobre, contato ou WhatsApp.
5. Quer que o banner apareça só em um período (ex.: um feirão)? Abra **Agendar exibição**.
6. Para mudar a ordem, **arraste** pelos pontinhos ⠿ à esquerda. O banner nº 1 é o primeiro a aparecer.
7. Para esconder um banner sem apagar, desmarque **Mostrar este banner no site**.
8. **Salvar**.

### Escolher os imóveis em destaque da página inicial

Menu **Página inicial** → aba **2. Destaques** → adicione até 6 imóveis e **arraste para ordenar** → **Salvar**.
Só aparecem para escolha os imóveis **Publicados**.

### Alterar textos da página inicial ou da página Sobre

Menu **Página inicial** ou **Sobre nós / Contato**. As abas seguem a ordem da página, de cima para baixo.
Para separar parágrafos, deixe uma linha em branco entre eles.

### Responder um contato do site

1. Menu **Contatos recebidos**. Os novos aparecem com o selo roxo **Novo**.
2. Abra o contato e use **Pelo WhatsApp** ou **Por e-mail**: a conversa já abre com uma saudação.
3. Depois de responder, marque **Já respondido** → **Salvar**.

### Mudar o número do WhatsApp ou a mensagem automática

Menu **Dados da imobiliária** → aba **WhatsApp**.

- O número pode ser digitado do jeito que preferir, com DDD. Ex.: `(53) 98130-0950`.
- A **mensagem ao clicar em um imóvel** usa termos entre chaves, que o site troca pelos dados do imóvel: `{codigo}`, `{titulo}`, `{bairro}`, `{preco}` e `{url}`.
- Logo abaixo há uma **prévia** de como a mensagem chega no WhatsApp, e um link para **testar**.

Nas outras abas ficam telefone, e-mail, Instagram, CRECI, horário de atendimento e endereço do escritório.

---

## Perfis de acesso

| Perfil | Pode |
|---|---|
| **Administrador** | Tudo, inclusive Dados da imobiliária e Usuários do painel |
| **Editor** | Imóveis, páginas do site (Página inicial, Sobre nós), contatos e cadastros de apoio |

Para dar acesso a alguém: **Usuários do painel → Criar novo** (somente administradores).

---

## Dicas de fotos

- Prefira fotos na horizontal, bem iluminadas, com pelo menos 1600 px de largura.
- Banner para computador: 1920 × 800 px. Banner para celular: 1080 × 1350 px.
- Em cada foto, preencha o **texto alternativo** descrevendo a imagem (ex.: "Sala de estar com sofá cinza"). Isso ajuda no Google e em leitores de tela.
