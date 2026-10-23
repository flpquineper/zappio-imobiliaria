# Design System — Zappio Assessoria Imobiliária

Fonte da verdade: `Identidade Visual - Zappio/Manual da Marca/Manual da Marca - Zappio.pdf` (Senti Brand, ago/2024).
Este documento traduz o manual para a web. Em caso de conflito, **o manual prevalece**; o que não está no manual (neutros de interface, estados, cores semânticas) está marcado como **[derivado]** e existe apenas por necessidade funcional da interface.

Regra de ouro: **componentes nunca usam valores soltos** (hex, px de fonte, sombras). Tudo vem dos tokens da seção 9.

---

## 1. Marca

### Versões do logotipo

| Versão | Arquivos | Uso no site |
|---|---|---|
| **Principal** (zappio + tagline "assessoria imobiliária") | `Logotipo Principal/Vetor/*.svg` | Rodapé, página Sobre, Open Graph |
| **Secundário / sem tagline** (só "zappio") | `Logotipo Secundário/Vetor/*.svg` | **Header** — o manual indica esta versão "quando o logo é apresentado ao lado de outras informações que já explicam a consultoria imobiliária, como no site" |
| **Reduzido / símbolo** | `Logotipo Reduzido - Simbolo/Vetor/*.svg` | Favicon, ícone de app, avatar, marca d'água em fotos, loading |

Variações de cor de cada versão (sufixo do arquivo):

| Sufixo | Cores | Aplicar sobre |
|---|---|---|
| `01` | Letras brancas + triângulo navy | Fundo **roxo** (`brand-purple`) |
| `02` | Letras brancas + triângulo roxo | Fundo **navy**, **azul**, **violeta** ou **preto** |
| `03` | Monocromático branco | Fotos/gradientes escuros, aplicação negativa |
| `04` | Letras roxas + triângulo navy | Fundo **branco** / claro |

### Regras

- **Tamanho mínimo digital: 100px de largura.** Abaixo disso, usar o símbolo reduzido.
- Área de proteção: a malha construtiva usa unidade `u` (logo principal = 13u × 2u). Manter **no mínimo 1u** livre ao redor (≈ altura das letras "zappio" ÷ 2). Na prática: `padding` mínimo igual à metade da altura do logo.
- **Proibido** (manual, p. 26): distorcer/alterar forma, aplicar cores ou texturas fora da paleta, rotacionar, aplicar contorno, redesenhar.
- Sempre usar o SVG original, nunca recriar em CSS/fonte. Otimizar com SVGO sem alterar geometria.
- Animações oficiais em `Motion/` (horizontal e vertical) podem ser usadas em splash/loading ou no hero, nunca alteradas.

---

## 2. Cores

### Paleta oficial (manual, p. 9)

| Token | Nome no manual | HEX | RGB | Papel na web |
|---|---|---|---|---|
| `brand-purple` | COLOR 001 | `#8026FA` | 128 38 250 | **Primária**: CTAs, links, destaques, ícones ativos |
| `brand-navy` | COLOR 002 | `#0A1747` | 10 23 71 | **Base escura**: texto principal, header/rodapé escuros, fundos institucionais |
| `brand-blue` | COLOR 003 | `#122696` | 18 38 150 | Secundária: gradientes, blocos de apoio |
| `brand-violet` | COLOR 004 | `#6600C2` | 102 0 194 | Secundária: gradientes, **hover/pressed** da primária |
| `brand-black` | COLOR 005 | `#000000` | 0 0 0 | Uso pontual (fundo de vídeo, aplicação P&B) |
| `brand-white` | COLOR 006 | `#FFFFFF` | 255 255 255 | Fundo principal, texto sobre cores escuras |

> Os SVGs oficiais usam `#0B1747` e o elemento triângulo `#7F25F9` — variações de exportação. O token canônico é o do manual (`#0A1747`, `#8026FA`).

### Contraste (WCAG 2.1)

| Combinação | Razão | Status |
|---|---|---|
| `brand-navy` sobre branco | 17.1 : 1 | ✅ AAA — texto corrido |
| `brand-blue` sobre branco | 12.1 : 1 | ✅ AAA |
| `brand-violet` sobre branco | 9.0 : 1 | ✅ AAA |
| `brand-purple` sobre branco | 5.9 : 1 | ✅ AA — botões, links, títulos |
| Branco sobre `brand-purple` | 5.9 : 1 | ✅ AA — texto de botão primário |
| `brand-purple` sobre `brand-navy` | 2.9 : 1 | ❌ **Nunca para texto**. Só decorativo (triângulos, ícones grandes não essenciais) |

### Neutros de interface [derivado]

Tons de cinza levemente azulados, derivados do navy, para bordas, fundos de seção e textos secundários. Não substituem a paleta da marca.

| Token | HEX | Uso | Contraste s/ branco |
|---|---|---|---|
| `neutral-50` | `#F5F3FA` | Fundo de seção alternada, fundo de inputs | — |
| `neutral-100` | `#E9E6F2` | Bordas, divisores, skeleton | — |
| `neutral-300` | `#C9C5D8` | Bordas de input, ícones desabilitados | — |
| `neutral-500` | `#6B6880` | Texto secundário (legendas, metadados) | 5.4 : 1 ✅ |
| `neutral-700` | `#4A4760` | Texto de corpo alternativo | 8.9 : 1 ✅ |
| `neutral-900` | `#2A2840` | Texto forte alternativo | 14.2 : 1 ✅ |

### Cores semânticas [derivado]

Apenas para feedback de formulário/sistema, nunca decorativas: `success #127A4B`, `error #C2183B`, `warning #A35A00`, `info = brand-blue`. Todas ≥ 4.5 : 1 sobre branco.

### Gradientes (manual, p. 10)

> "Opte por sempre usar gradientes nos planos de fundo para dar um ar de jovialidade e inovação. Os gradientes podem ser criados com a mescla das cores 01, 02, 03 e 04."

| Token | Definição | Uso |
|---|---|---|
| `gradient-brand` | `linear-gradient(135deg, #6600C2 0%, #8026FA 35%, #122696 75%, #0A1747 100%)` | Hero, banners sem foto, CTA de seção |
| `gradient-glow` | `radial-gradient(ellipse at 60% 80%, #8026FA 0%, #6600C2 25%, #0A1747 70%)` | Fundo de rodapé, seções institucionais, página Sobre |
| `gradient-overlay` | `linear-gradient(180deg, transparent 40%, rgba(10,23,71,.85) 100%)` | Sobre fotos para garantir legibilidade de texto branco |

Fundos grandes (hero, rodapé, blocos institucionais) devem usar gradiente, não cor chapada. Fundos de conteúdo (listagem, formulários, detalhe) permanecem brancos/`neutral-50` para leitura.

---

## 3. Tipografia

### Família: **Articulat CF** (Connary Fagen)

Pesos disponíveis: Thin 100, Extra Light 200, Light 300, Regular 400, Medium 500, Demi Bold 600, Bold 700, Extra Bold 800, Heavy 900 — todos com Oblique.

### ⚠️ Licenciamento

Os arquivos `.otf` em `Fonte/` foram baixados do site **fonnts.com** e contêm nos metadados a EULA do Typekit (`http://typekit.com/eulas/...`), ou seja, são cópias de arquivos da **Adobe Fonts**. Isso significa:

- **Não podemos hospedar esses arquivos no site** (self-hosting de fontes da Adobe Fonts viola a licença, e a origem fonnts.com não concede licença).
- **Não versionar** os `.otf` no repositório.

### Fonte adotada no site: **Inter Tight**

Decisão (out/2026): usar a alternativa livre mais próxima. Comparamos a Articulat CF lado a lado com 12 fontes do Google Fonts (Figtree, Manrope, Plus Jakarta Sans, Albert Sans, Hanken Grotesk, Geist, Onest, Instrument Sans, Schibsted Grotesk, Red Hat Display, Urbanist, Inter Tight). A **Inter Tight** (licença OFL, uso livre) foi a mais próxima em largura, espaçamento e desenho das letras, e mantém o mesmo comprimento de linha (os layouts não mudam se um dia a Articulat for licenciada). Figtree e Hanken Grotesk ficaram logo atrás.

Carregada via `next/font/google` (self-host automático, sem requisição ao Google no navegador):

```css
--font-sans: var(--font-inter-tight), system-ui, sans-serif;
```

Se o cliente licenciar a Articulat CF no futuro (Adobe Fonts Web Project ou licença web da Connary Fagen), a troca é só neste token.

### Escala tipográfica

Títulos grandes seguem o estilo das peças da marca: **peso leve, entrelinha apertada** ("Procure menos, encontre mais."). Títulos de interface usam Medium/Demi Bold.

| Token | Desktop | Mobile | Peso | Line-height | Tracking | Uso |
|---|---|---|---|---|---|---|
| `display` | 64px | 40px | 300 Light | 1.05 | -0.02em | Hero / banner |
| `h1` | 48px | 32px | 400 Regular | 1.1 | -0.015em | Título de página |
| `h2` | 36px | 28px | 500 Medium | 1.15 | -0.01em | Título de seção |
| `h3` | 24px | 20px | 600 Demi Bold | 1.25 | 0 | Título de card, subtítulos |
| `h4` | 20px | 18px | 600 Demi Bold | 1.3 | 0 | Blocos menores |
| `body-lg` | 18px | 17px | 400 | 1.6 | 0 | Textos institucionais, descrição do imóvel |
| `body` | 16px | 16px | 400 | 1.6 | 0 | Texto padrão |
| `body-sm` | 14px | 14px | 400 | 1.5 | 0 | Metadados, legendas |
| `caption` | 12px | 12px | 500 | 1.4 | 0.04em | Badges, labels (MAIÚSCULAS opcional) |
| `price` | 28px | 24px | 700 Bold | 1.1 | -0.01em | Preço no detalhe do imóvel |
| `button` | 16px | 16px | 600 Demi Bold | 1 | 0.01em | Botões |

Pesos **Thin (100) e Extra Light (200) não são usados abaixo de 40px** (legibilidade). Oblique apenas para ênfase pontual, nunca em parágrafos inteiros.

---

## 4. Formas

### Forma de apoio: o triângulo (manual, p. 15)

Extraído da letra "a" do logotipo. Arquivo: `Elemento/Elemento Triangulo.svg`.

- **Sempre ascendente da esquerda para a direita** (base embaixo, ponta alta à direita), remetendo à linha do "Z". Nunca rotacionar ou espelhar em outra direção.
- O canto reto (inferior direito) é **arredondado**; os outros dois cantos são vivos.
- Usos previstos no site:
  - **Corte diagonal em imagens** do hero/banners (o triângulo "corta" a foto, como nos criativos da marca).
  - **Máscara de imagem** combinando dois triângulos para formar um quadrado/retângulo (foco em foto do imóvel ou persona).
  - **Detalhe decorativo** em cantos de seção e no card de imóvel em destaque.
- Implementar como componente `<BrandTriangle />` (SVG inline com `fill` vindo de token) ou `clip-path: polygon(...)`.

### Pattern (manual, p. 20)

Triângulos combinados formando quadrados, em grade. Arquivo: `Pattern/Pattern Sem fundo.png` (7794px — **não usar direto**; reconstruir como SVG leve a partir do elemento triângulo ou exportar WebP otimizado).
Uso: fundos de seções institucionais, rodapé, estados vazios, sempre em baixa opacidade (8–15%) sobre gradiente ou navy.

### Raios de borda [derivado do logotipo]

O logo e o triângulo usam cantos arredondados suaves.

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 4px | Badges, tags |
| `radius-md` | 8px | Botões, inputs |
| `radius-lg` | 16px | Cards, imagens, modais |
| `radius-xl` | 24px | Banners, blocos de destaque |
| `radius-full` | 9999px | Avatares, botão flutuante de WhatsApp |

### Sombras [derivado]

Sombra tingida de navy, nunca preta pura.

| Token | Valor |
|---|---|
| `shadow-sm` | `0 1px 2px rgba(10,23,71,.06), 0 1px 3px rgba(10,23,71,.08)` |
| `shadow-md` | `0 4px 12px rgba(10,23,71,.08), 0 2px 4px rgba(10,23,71,.06)` |
| `shadow-lg` | `0 16px 40px rgba(10,23,71,.12)` |
| `shadow-brand` | `0 12px 32px rgba(128,38,250,.28)` — hover de CTA primário |

---

## 5. Espaçamento, grid e breakpoints

- Escala base **4px**: `0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128`.
- Espaçamento vertical entre seções: **96px desktop / 64px mobile**.
- Container: `max-width: 1280px`, gutter lateral **16px mobile / 24px tablet / 32px desktop**.
- Grid de 12 colunas, gap 24px (16px mobile).
- Grid de cards de imóveis: 1 col (< 640) · 2 col (≥ 640) · 3 col (≥ 1024). O rodapé do card empilha preço e botão quando o card fica estreito (container query).

| Breakpoint | Min-width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1440px |

Mobile-first: estilos base são para celular.

---

## 6. Iconografia e imagens

- Ícones: **Lucide** (traço 1.5px, cantos arredondados, combina com o logo). Tamanhos 16/20/24px. Cor herda do texto (`currentColor`).
- Ícones de características do imóvel: quartos (`BedDouble`), banheiros (`Bath`), vagas (`Car`), área (`Ruler`/`Maximize`), suítes (`BedSingle`).
- Ícone do WhatsApp: SVG oficial do WhatsApp (marca de terceiro, não alterar).
- Fotos de imóvel: proporção **4:3** no card, **16:9 / 3:2** na galeria do detalhe. Sempre `next/image`, `alt` descritivo obrigatório.
- Banner da home: desktop **1920×800** (12:5), mobile **1080×1350** (4:5 — mesmo formato dos posts da marca). O admin exige as duas versões.
- Estilo fotográfico (dos posts modelo): ambientes internos sofisticados, luz quente, pessoas reais em situações cotidianas. Texto sobre foto sempre com `gradient-overlay` ou corte de triângulo.

---

## 7. Componentes

Cada componente lista variantes e estados obrigatórios. Todo componente interativo tem `:hover`, `:focus-visible` (anel de foco `2px brand-purple` com offset 2px), `:active` e `disabled`.

### Button

| Variante | Fundo | Texto | Hover |
|---|---|---|---|
| `primary` | `brand-purple` | branco | `brand-violet` + `shadow-brand` |
| `secondary` | `brand-navy` | branco | `brand-blue` |
| `outline` | transparente, borda 1.5px `brand-purple` | `brand-purple` | fundo `brand-purple` 8% |
| `ghost` | transparente | `brand-navy` | fundo `neutral-50` |
| `on-dark` | branco | `brand-navy` | fundo `neutral-50` |
| `whatsapp` | `brand-purple` com ícone do WhatsApp | branco | `brand-violet` |

Tamanhos: `sm` 36px, `md` 44px (padrão, alvo de toque mínimo), `lg` 52px. Raio `radius-md`.

> O botão de WhatsApp usa a cor da marca, **não o verde do WhatsApp**, para não quebrar a identidade; o reconhecimento vem do ícone. Exceção: o botão flutuante fixo pode usar o verde oficial `#25D366` com ícone branco (padrão amplamente reconhecido) — decisão a validar com o cliente.

### PropertyCard (card de imóvel)

- Foto 4:3 com `radius-lg` no topo, badge sobreposto (ex. "Destaque", "Novo", "Vendido").
- Bairro · Cidade (`body-sm`, `neutral-500`)
- Título (`h3`, 2 linhas máx. com ellipsis)
- Linha de atributos com ícones: área · quartos · banheiros · vagas
- Preço (`h3` peso 700, `brand-navy`) — formato `R$ 850.000`
- Código do imóvel (`caption`, `neutral-500`)
- Ações: **"Quero saber mais"** (botão `whatsapp`) + link "Ver detalhes"
- Card inteiro clicável para o detalhe, exceto o botão de WhatsApp. Hover: `shadow-md` → `shadow-lg` e leve zoom (1.03) na foto.

### Badge

`radius-sm`, `caption`. Variantes: `brand` (roxo/branco), `dark` (navy/branco), `neutral` (`neutral-100`/`neutral-900`), `sold` (`neutral-900`/branco).

### Inputs (Input, Select, Textarea, Checkbox)

Altura 44px, fundo branco, borda 1px `neutral-300`, `radius-md`. Foco: borda `brand-purple` + anel. Erro: borda `error` + mensagem `body-sm` abaixo. Label sempre visível (nunca só placeholder).

### Header

Branco com `shadow-sm` ao rolar; logo secundário versão `04` (≥ 100px de largura). Links: Início · Imóveis · Sobre · Contato + CTA `primary` "Fale conosco" (WhatsApp). Mobile: menu hambúrguer em drawer com fundo `gradient-brand` e logo versão `03`.

### Footer

Fundo `gradient-glow` + pattern a 10%; logo principal versão `02`; colunas: navegação, contato (telefone, WhatsApp, e-mail, endereço), redes sociais, CRECI; linha final com copyright e link da política de privacidade.

### HeroBanner (carrossel)

Altura ~80vh desktop / 4:5 mobile. Imagem + `gradient-overlay` + triângulo de corte na lateral direita. Título `display` branco, subtítulo `body-lg`, CTA `on-dark` ou `primary`. Autoplay 6s, pausa no hover/foco, indicadores e setas acessíveis por teclado, respeita `prefers-reduced-motion`.

### Outros

`SearchBar` (busca rápida da home), `FilterPanel` (drawer no mobile), `Gallery` (lightbox com swipe), `StatBlock` (número grande `display` + legenda), `SectionHeading` (eyebrow `caption` roxo + `h2`), `WhatsAppFab` (botão flutuante; some enquanto estiver sobre um `form` ou elemento com `data-fab-avoid`, para não roubar o toque de campos e botões), `EmptyState` (pattern + mensagem), `Skeleton`.

---

## 8. Tom de voz

Da comunicação da marca: **simples, próximo, otimista e direto**. Frases curtas, verbos de ação, foco no cliente.

- Referências oficiais: "Procure menos, encontre mais." · "Encontrar seu lar é simples." · "Seu próximo imóvel a um Zappio de distância."
- Tratamento por **você**. Evitar jargão ("permuta", "averbação") sem explicação.
- CTAs no imperativo e específicos: "Ver imóveis", "Quero saber mais", "Falar no WhatsApp" (evitar "Clique aqui", "Enviar").
- Grafia da marca em texto corrido: **Zappio** (só o Z maiúsculo).

---

## 9. Tokens (implementação)

Os tokens vivem em `src/styles/tokens.css` como CSS custom properties e são expostos ao Tailwind via `@theme` (Tailwind v4). O tema do Tailwind **substitui** a paleta padrão: classes como `bg-blue-500` não devem existir.

```css
@theme {
  --color-*: initial; /* remove a paleta padrão do Tailwind */

  --color-brand-purple: #8026FA;
  --color-brand-navy: #0A1747;
  --color-brand-blue: #122696;
  --color-brand-violet: #6600C2;
  --color-black: #000000;
  --color-white: #FFFFFF;

  --color-neutral-50: #F5F3FA;
  --color-neutral-100: #E9E6F2;
  --color-neutral-300: #C9C5D8;
  --color-neutral-500: #6B6880;
  --color-neutral-700: #4A4760;
  --color-neutral-900: #2A2840;

  --color-success: #127A4B;
  --color-error: #C2183B;
  --color-warning: #A35A00;
  --color-whatsapp: #25D366;
  --color-transparent: transparent;
  --color-current: currentColor;

  --font-sans: var(--font-inter-tight), system-ui, sans-serif;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: 0 1px 2px rgb(10 23 71 / .06), 0 1px 3px rgb(10 23 71 / .08);
  --shadow-md: 0 4px 12px rgb(10 23 71 / .08), 0 2px 4px rgb(10 23 71 / .06);
  --shadow-lg: 0 16px 40px rgb(10 23 71 / .12);
  --shadow-brand: 0 12px 32px rgb(128 38 250 / .28);

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1440px;
}
```

Gradientes e escala tipográfica viram utilitários próprios (`bg-gradient-brand`, `text-display`, `text-h1`…) definidos em `@utility`.

A página interna **`/design-system`** renderiza todos os tokens e componentes para validação com o cliente e para revisão visual a cada mudança.

---

## 10. Assets: o que vai para o site

| Origem (`Identidade Visual - Zappio/`) | Destino (`public/brand/`) | Tratamento |
|---|---|---|
| `Logotipo Secundário/Vetor/*.svg` | `logo-secondary-0{1-4}.svg` | SVGO, sem alterar geometria |
| `Logotipo Principal/Vetor/*.svg` | `logo-primary-0{1-4}.svg` | SVGO |
| `Logotipo Reduzido - Simbolo/Vetor/*.svg` | `symbol-0{1-4}.svg` + `favicon.ico`, `icon.svg`, `apple-icon.png` | Gerar favicons |
| `Elemento/Elemento Triangulo.svg` | componente `<BrandTriangle />` | Fill via token |
| `Pattern/Pattern Sem fundo.png` | `pattern.svg` (reconstruído) ou `pattern.webp` | Reduzir para < 100 KB |
| `Motion/*.mp4` | `logo-animation.mp4` / `.webm` | Comprimir, sem áudio |
| `Fonte/*.otf` | **não copiar** | Ver seção 3 (licença) |
| `*.ai`, `*.psd` | não copiar | Arquivos-fonte de design |
