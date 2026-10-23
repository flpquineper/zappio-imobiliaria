import type { ReactNode } from 'react'

import { ADMIN } from '../routes'

export type HelpCategory = 'inicio' | 'imoveis' | 'paginas' | 'atendimento' | 'fotos' | 'acesso' | 'problemas'

export type HelpTopic = {
  id: string
  category: HelpCategory
  title: string
  /** Termos extras para a busca (sinônimos e palavras que a pessoa pode digitar). */
  keywords: string
  adminOnly?: boolean
  link?: { href: string; label: string }
  body: ReactNode
}

export const HELP_CATEGORIES: { id: HelpCategory; label: string; description: string }[] = [
  { id: 'inicio', label: 'Primeiros passos', description: 'Como o painel funciona e quando as mudanças aparecem no site' },
  { id: 'imoveis', label: 'Imóveis', description: 'Cadastrar, editar, vender e organizar os anúncios' },
  { id: 'paginas', label: 'Páginas do site', description: 'Banners, destaques e textos da página inicial e da página Sobre' },
  { id: 'atendimento', label: 'Atendimento e contato', description: 'Mensagens recebidas, WhatsApp e dados da imobiliária' },
  { id: 'fotos', label: 'Fotos', description: 'Como enviar boas fotos e organizar a biblioteca' },
  { id: 'acesso', label: 'Acesso ao painel', description: 'Perfis, usuários e senha' },
  { id: 'problemas', label: 'Algo deu errado?', description: 'Soluções para as dúvidas mais comuns' },
]

export const HELP_TOPICS: HelpTopic[] = [
  // ---------- Primeiros passos ----------
  {
    id: 'como-funciona',
    category: 'inicio',
    title: 'Como o painel funciona',
    keywords: 'menu salvar começar inicio basico',
    body: (
      <>
        <ul>
          <li>
            O menu à esquerda está organizado <strong>pelas páginas do site</strong>: Página inicial, Imóveis e Sobre nós /
            Contato. Para mudar algo, procure a página onde aquilo aparece.
          </li>
          <li>
            Nada muda no site até você clicar em <strong>Salvar</strong>, o botão roxo no canto superior direito.
          </li>
          <li>
            Campos com <strong>*</strong> são obrigatórios. Embaixo de cada campo há uma explicação curta do que ele faz e de
            onde ele aparece no site.
          </li>
          <li>
            Telas com várias partes são divididas em <strong>abas numeradas</strong>, na mesma ordem em que aparecem na página,
            de cima para baixo.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'previa-ao-vivo',
    category: 'inicio',
    title: 'Ver como vai ficar antes de publicar (prévia ao vivo)',
    keywords: 'previa preview visualizar olho testar',
    body: (
      <>
        <p>
          Ao editar um imóvel ou uma página, a <strong>prévia ao vivo</strong> mostra o site ao lado do formulário. Se ela
          estiver fechada, clique no ícone de olho ao lado de <strong>Salvar</strong>.
        </p>
        <ul>
          <li>A prévia atualiza sempre que você salva.</li>
          <li>
            Uma faixa avisa “Modo de pré-visualização”. Ela só aparece para você, que está logado: os visitantes não a veem.
            Para sair desse modo, clique em <strong>Sair</strong> na faixa.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'quando-aparece',
    category: 'inicio',
    title: 'Quando a mudança aparece no site?',
    keywords: 'demora atualizar tempo publicar aparecer cache',
    body: (
      <>
        <p>
          <strong>Na hora</strong>: assim que você clica em Salvar, o site é atualizado. Se você já estava com o site aberto
          em outra aba, recarregue a página para ver a mudança.
        </p>
        <p>
          A exceção são os <strong>banners agendados</strong>: eles entram e saem do ar em até 1 hora depois do horário
          programado.
        </p>
      </>
    ),
  },

  // ---------- Imóveis ----------
  {
    id: 'cadastrar-imovel',
    category: 'imoveis',
    title: 'Cadastrar um imóvel',
    keywords: 'novo anuncio criar adicionar incluir casa apartamento',
    link: { href: ADMIN.newProperty, label: 'Cadastrar imóvel' },
    body: (
      <>
        <ol>
          <li>
            No <strong>Início do painel</strong>, clique em <strong>Cadastrar imóvel</strong> (ou em Imóveis → Criar novo).
          </li>
          <li>
            Escreva o <strong>título do anúncio</strong>. Ex.: “Casa com piscina e espaço gourmet no Laranjal”.
          </li>
          <li>
            Aba <strong>Informações</strong>: tipo, preço, condomínio e IPTU (opcionais), áreas, quartos, suítes, banheiros,
            vagas, características e descrição. O preço vai <strong>só com números</strong>, sem pontos: <code>850000</code>.
          </li>
          <li>
            Aba <strong>Fotos</strong>: envie as fotos. <strong>A primeira é a capa</strong>, usada na lista do site e na
            prévia do WhatsApp. Arraste para mudar a ordem.
          </li>
          <li>
            Aba <strong>Endereço</strong>: rua, número, complemento e bairro. O endereço completo aparece na página do imóvel,
            com o mapa.
          </li>
          <li>
            À direita, em <strong>Situação no site</strong>, deixe <strong>Publicado</strong> para o imóvel aparecer no site,
            ou <strong>Rascunho</strong> se ainda vai terminar depois.
          </li>
          <li>
            Clique em <strong>Salvar</strong>. O código do imóvel (ex.: CA0114) é criado automaticamente.
          </li>
        </ol>
        <p>Na descrição, deixe uma linha em branco para começar um novo parágrafo.</p>
      </>
    ),
  },
  {
    id: 'editar-imovel',
    category: 'imoveis',
    title: 'Editar ou corrigir um imóvel',
    keywords: 'alterar mudar preco trocar foto atualizar corrigir',
    link: { href: ADMIN.properties, label: 'Abrir lista de imóveis' },
    body: (
      <>
        <ol>
          <li>
            Abra <strong>Imóveis</strong> no menu. Use a busca no topo da lista para encontrar pelo título ou pelo código.
          </li>
          <li>Clique no imóvel, faça as mudanças e clique em <strong>Salvar</strong>.</li>
        </ol>
        <p>
          O endereço da página do imóvel <strong>não muda</strong> quando você troca o título. Assim, links que já foram
          compartilhados no WhatsApp continuam funcionando.
        </p>
      </>
    ),
  },
  {
    id: 'situacao-imovel',
    category: 'imoveis',
    title: 'Publicado, vendido, rascunho ou inativo: qual usar?',
    keywords: 'status situacao vendido esconder ocultar tirar do site pausar rascunho inativo',
    body: (
      <>
        <p>
          A <strong>Situação no site</strong> fica à direita, na tela do imóvel. Escolha a opção e clique em Salvar.
        </p>
        <table>
          <thead>
            <tr>
              <th>Situação</th>
              <th>O que acontece no site</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Publicado</strong>
              </td>
              <td>Aparece na lista de imóveis, na busca e pode ir para os destaques.</td>
            </tr>
            <tr>
              <td>
                <strong>Vendido</strong>
              </td>
              <td>
                Sai da lista, mas a página dele continua no ar com o selo “Vendido”. Quem abrir um link antigo não encontra uma
                página de erro.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Rascunho</strong>
              </td>
              <td>Não aparece. Use enquanto ainda está preparando o anúncio.</td>
            </tr>
            <tr>
              <td>
                <strong>Inativo</strong>
              </td>
              <td>Não aparece. Use para tirar um imóvel do ar sem apagar (ex.: proprietário pediu uma pausa).</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 'excluir-imovel',
    category: 'imoveis',
    title: 'Excluir um imóvel',
    keywords: 'apagar deletar remover excluir',
    body: (
      <>
        <p>
          Antes de excluir, considere marcar como <strong>Inativo</strong> ou <strong>Vendido</strong>: o imóvel sai do site e
          você não perde as informações.
        </p>
        <p>
          Se precisar mesmo excluir: abra o imóvel, clique nos <strong>três pontinhos</strong> ao lado de Salvar e escolha{' '}
          <strong>Excluir</strong>. Na lista, também dá para marcar vários e excluir de uma vez.
        </p>
        <p className="zappio-help__warning">
          A exclusão é definitiva: não existe lixeira para recuperar depois.
        </p>
      </>
    ),
  },
  {
    id: 'codigo-imovel',
    category: 'imoveis',
    title: 'Código do imóvel',
    keywords: 'codigo referencia ca ap numero',
    body: (
      <>
        <p>
          Cada imóvel recebe um código, como <strong>CA0114</strong>. As letras vêm do <strong>tipo</strong> do imóvel (CA
          para casa, AP para apartamento…) e o número é sequencial.
        </p>
        <ul>
          <li>O código aparece no anúncio e vai junto na mensagem do WhatsApp. Assim você sabe na hora de qual imóvel o cliente está falando.</li>
          <li>Deixe o campo vazio para o painel gerar sozinho. Se preferir um código próprio, digite antes de salvar.</li>
          <li>As letras de cada tipo são definidas em <strong>Tipos de imóvel</strong> (campo “Prefixo do código”).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'bairros-tipos-caracteristicas',
    category: 'imoveis',
    title: 'Cadastrar bairro, tipo de imóvel ou característica',
    keywords: 'bairro tipo caracteristica piscina churrasqueira lista filtro novo',
    link: { href: ADMIN.neighborhoods, label: 'Abrir Bairros' },
    body: (
      <>
        <p>
          Bairros, tipos e características são listas usadas no cadastro dos imóveis e nos filtros de busca do site.
        </p>
        <ul>
          <li>
            <strong>Jeito mais rápido:</strong> no próprio imóvel, clique no <strong>+</strong> ao lado do campo (Bairro,
            Tipo ou Características) e cadastre sem sair da tela.
          </li>
          <li>
            Para revisar as listas, use <strong>Cadastros de apoio</strong> no menu: Bairros, Tipos de imóvel e
            Características.
          </li>
          <li>Corrigir o nome de um bairro atualiza todos os imóveis que usam esse bairro.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'google-imovel',
    category: 'imoveis',
    title: 'Como o imóvel aparece no Google e no WhatsApp',
    keywords: 'google seo compartilhar whatsapp previa link titulo descricao',
    body: (
      <>
        <p>
          Quando alguém compartilha o link de um imóvel, o WhatsApp mostra a <strong>foto de capa</strong>, o título e o
          preço. Por isso vale caprichar na primeira foto.
        </p>
        <p>
          A aba <strong>Avançado</strong> do imóvel permite escrever um título e uma descrição específicos para o Google. É
          opcional: se ficar vazia, o site usa o título do anúncio e o começo da descrição.
        </p>
      </>
    ),
  },

  // ---------- Páginas do site ----------
  {
    id: 'banners',
    category: 'paginas',
    title: 'Trocar os banners do topo da página inicial',
    keywords: 'banner carrossel topo capa slide promocao feirao agendar',
    link: { href: ADMIN.homePage, label: 'Abrir Página inicial' },
    body: (
      <>
        <ol>
          <li>
            Menu <strong>Página inicial</strong> → aba <strong>1. Banners</strong>.
          </li>
          <li>
            Clique em um banner para abrir, ou em <strong>Adicionar Banner</strong> para criar um novo (até 6).
          </li>
          <li>Escreva o título e, se quiser, um texto de apoio.</li>
          <li>
            Escolha a <strong>foto para computador</strong> (horizontal, 1920 × 800 px). A <strong>foto para celular</strong>{' '}
            (vertical, 1080 × 1350 px) é opcional: sem ela, o site recorta a de computador.
          </li>
          <li>
            Em <strong>“O botão leva para…”</strong>, escolha o destino: lista de imóveis (pode filtrar por um tipo), um
            imóvel específico, página Sobre nós, formulário de contato ou WhatsApp.
          </li>
          <li>
            Para um banner com data marcada (ex.: um feirão), abra <strong>Agendar exibição</strong> e defina o início e o
            fim.
          </li>
          <li>
            Clique em <strong>Salvar</strong>.
          </li>
        </ol>
        <ul>
          <li>
            <strong>Mudar a ordem:</strong> arraste o banner pelos pontinhos à esquerda. O nº 1 é o primeiro a aparecer.
          </li>
          <li>
            <strong>Esconder sem apagar:</strong> desmarque “Mostrar este banner no site”.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'destaques',
    category: 'paginas',
    title: 'Escolher os imóveis em destaque da página inicial',
    keywords: 'destaque vitrine home principais escolher ordem',
    link: { href: ADMIN.homePage, label: 'Abrir Página inicial' },
    body: (
      <>
        <ol>
          <li>
            Menu <strong>Página inicial</strong> → aba <strong>2. Destaques</strong>.
          </li>
          <li>Adicione até 6 imóveis e arraste para ordenar.</li>
          <li>
            Clique em <strong>Salvar</strong>.
          </li>
        </ol>
        <p>
          Só aparecem para escolha os imóveis <strong>Publicados</strong>. Se um destaque for marcado como vendido ou
          inativo, ele some da página inicial sozinho.
        </p>
      </>
    ),
  },
  {
    id: 'textos-home',
    category: 'paginas',
    title: 'Alterar textos, números e diferenciais da página inicial',
    keywords: 'texto sobre numeros estatisticas diferenciais chamada final titulo',
    link: { href: ADMIN.homePage, label: 'Abrir Página inicial' },
    body: (
      <>
        <p>
          Menu <strong>Página inicial</strong>. As abas seguem a ordem da página:
        </p>
        <ul>
          <li>
            <strong>3. Sobre:</strong> foto, título, texto de apresentação e até 4 números em destaque (ex.: “+150” /
            “famílias atendidas”).
          </li>
          <li>
            <strong>4. Diferenciais:</strong> até 4 cartões explicando por que comprar com a Zappio.
          </li>
          <li>
            <strong>5. Chamada final:</strong> a faixa roxa no fim da página, com o botão de WhatsApp.
          </li>
        </ul>
        <p>Para separar parágrafos, deixe uma linha em branco entre eles.</p>
      </>
    ),
  },
  {
    id: 'pagina-sobre',
    category: 'paginas',
    title: 'Editar a página Sobre nós e a equipe',
    keywords: 'sobre historia equipe pessoas corretor foto cargo valores missao visao',
    link: { href: ADMIN.aboutPage, label: 'Abrir Sobre nós / Contato' },
    body: (
      <>
        <p>
          Menu <strong>Sobre nós / Contato</strong>. As abas seguem a ordem da página:
        </p>
        <ul>
          <li>
            <strong>1. Topo:</strong> título, apresentação e foto.
          </li>
          <li>
            <strong>2. História:</strong> o texto sobre a imobiliária.
          </li>
          <li>
            <strong>3. Valores:</strong> cartões lado a lado (recomendado: 3, como Missão, Visão e Valores).
          </li>
          <li>
            <strong>4. Equipe:</strong> nome, cargo e foto de cada pessoa. Arraste para mudar a ordem. Sem foto, o site
            mostra as iniciais do nome.
          </li>
          <li>
            <strong>5. Contato:</strong> título e texto ao lado do formulário. Telefone, e-mail e endereço vêm de{' '}
            <strong>Dados da imobiliária</strong>.
          </li>
        </ul>
      </>
    ),
  },

  // ---------- Atendimento e contato ----------
  {
    id: 'contatos',
    category: 'atendimento',
    title: 'Responder as mensagens do formulário do site',
    keywords: 'contato mensagem formulario lead cliente responder novo email',
    link: { href: ADMIN.contacts, label: 'Abrir Contatos recebidos' },
    body: (
      <>
        <ol>
          <li>
            Menu <strong>Contatos recebidos</strong>. As mensagens novas aparecem com o selo roxo <strong>Novo</strong>, e o
            Início do painel mostra quantas faltam responder.
          </li>
          <li>
            Abra a mensagem e use <strong>Pelo WhatsApp</strong> ou <strong>Por e-mail</strong>: a conversa já abre com uma
            saudação pronta. O imóvel de interesse, quando houver, aparece na própria mensagem.
          </li>
          <li>
            Depois de responder, marque <strong>Já respondido</strong> e clique em <strong>Salvar</strong>.
          </li>
        </ol>
        <p className="zappio-help__warning">
          O painel não envia aviso por e-mail quando chega uma mensagem. Confira os Contatos recebidos todos os dias.
        </p>
      </>
    ),
  },
  {
    id: 'whatsapp',
    category: 'atendimento',
    title: 'Mudar o número do WhatsApp ou a mensagem automática',
    keywords: 'whatsapp numero telefone mensagem automatica texto zap',
    adminOnly: true,
    link: { href: ADMIN.settings, label: 'Abrir Dados da imobiliária' },
    body: (
      <>
        <p>
          Menu <strong>Dados da imobiliária</strong> → aba <strong>WhatsApp</strong>. Todos os botões de WhatsApp do site
          usam estes dados.
        </p>
        <ul>
          <li>
            O número pode ser digitado como preferir, com DDD. Ex.: <code>(53) 98130-0950</code>.
          </li>
          <li>
            A <strong>mensagem ao clicar em um imóvel</strong> pode usar termos entre chaves, que o site troca pelos dados do
            imóvel: <code>{'{codigo}'}</code>, <code>{'{titulo}'}</code>, <code>{'{bairro}'}</code>,{' '}
            <code>{'{preco}'}</code> e <code>{'{url}'}</code>.
          </li>
          <li>
            A <strong>mensagem do botão geral</strong> é usada no botão verde flutuante e nos botões fora dos imóveis.
          </li>
          <li>Logo abaixo há uma prévia de como a mensagem chega e um link para testar.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'dados-imobiliaria',
    category: 'atendimento',
    title: 'Telefone, e-mail, endereço, redes sociais e CRECI',
    keywords: 'endereco telefone email instagram facebook creci horario rodape google compartilhamento',
    adminOnly: true,
    link: { href: ADMIN.settings, label: 'Abrir Dados da imobiliária' },
    body: (
      <>
        <p>
          Menu <strong>Dados da imobiliária</strong>. Essas informações aparecem no rodapé de todas as páginas e na página de
          contato.
        </p>
        <ul>
          <li>
            <strong>Contato e redes:</strong> telefone exibido, e-mail, Instagram (só o usuário, sem @), Facebook, CRECI e
            horário de atendimento.
          </li>
          <li>
            <strong>Endereço:</strong> o endereço do escritório.
          </li>
          <li>
            <strong>Google e compartilhamento:</strong> o título e a descrição do site no Google e a imagem que aparece quando
            alguém compartilha o link da página inicial.
          </li>
        </ul>
      </>
    ),
  },

  // ---------- Fotos ----------
  {
    id: 'boas-fotos',
    category: 'fotos',
    title: 'Enviar boas fotos',
    keywords: 'foto imagem tamanho formato pesada qualidade upload enviar resolucao',
    body: (
      <>
        <ul>
          <li>
            Formatos aceitos: <strong>JPEG, PNG e WebP</strong>, até 25 MB por foto. Fotos tiradas no celular funcionam
            normalmente.
          </li>
          <li>
            Prefira fotos na horizontal, bem iluminadas, com pelo menos 1600 px de largura.
          </li>
          <li>
            Banners: <strong>1920 × 800 px</strong> para computador e <strong>1080 × 1350 px</strong> para celular.
          </li>
          <li>
            Não precisa reduzir nada antes de enviar: o painel diminui e otimiza cada foto sozinho, e o site entrega a
            versão certa para cada tela.
          </li>
          <li>
            A localização GPS e os dados da câmera são removidos automaticamente das fotos.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'texto-alternativo',
    category: 'fotos',
    title: 'O que escrever no “texto alternativo” da foto',
    keywords: 'texto alternativo alt descricao acessibilidade obrigatorio',
    body: (
      <>
        <p>
          Todo envio de foto pede um <strong>texto alternativo</strong>: uma frase curta descrevendo a imagem. Ele é lido por
          quem usa leitor de tela e ajuda o imóvel a aparecer no Google.
        </p>
        <p>
          Descreva o que se vê: “Sala de estar com sofá cinza e janelas amplas”, “Piscina com deck de madeira”. Evite apenas
          “foto 1” ou o nome do arquivo.
        </p>
      </>
    ),
  },
  {
    id: 'biblioteca',
    category: 'fotos',
    title: 'Biblioteca de imagens e exclusão de fotos',
    keywords: 'biblioteca imagens excluir apagar foto midia',
    link: { href: ADMIN.media, label: 'Abrir Biblioteca de imagens' },
    body: (
      <>
        <p>
          A <strong>Biblioteca de imagens</strong> reúne todas as fotos enviadas. No dia a dia, você envia fotos direto no
          imóvel ou na página; a biblioteca serve para consultar ou excluir.
        </p>
        <ul>
          <li>
            Para tirar uma foto de um imóvel, remova-a na aba <strong>Fotos</strong> do imóvel. Ela continua na biblioteca e
            pode ser reaproveitada.
          </li>
          <li>
            Uma foto usada como <strong>foto para computador de um banner</strong> não pode ser excluída. Troque a foto do
            banner antes.
          </li>
          <li>A exclusão na biblioteca é definitiva.</li>
        </ul>
      </>
    ),
  },

  // ---------- Acesso ao painel ----------
  {
    id: 'perfis',
    category: 'acesso',
    title: 'Perfis de acesso: administrador e editor',
    keywords: 'perfil permissao administrador editor acesso',
    body: (
      <table>
        <thead>
          <tr>
            <th>Perfil</th>
            <th>Pode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Administrador</strong>
            </td>
            <td>Tudo, inclusive Dados da imobiliária (WhatsApp, endereço) e Usuários do painel.</td>
          </tr>
          <tr>
            <td>
              <strong>Editor</strong>
            </td>
            <td>Imóveis, páginas do site, contatos recebidos, cadastros de apoio e fotos.</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: 'novo-usuario',
    category: 'acesso',
    title: 'Dar acesso ao painel para outra pessoa',
    keywords: 'usuario novo acesso login cadastrar pessoa funcionario corretor',
    adminOnly: true,
    link: { href: ADMIN.users, label: 'Abrir Usuários do painel' },
    body: (
      <>
        <ol>
          <li>
            Menu <strong>Usuários do painel</strong> → <strong>Criar novo</strong>.
          </li>
          <li>Preencha nome, e-mail e uma senha provisória.</li>
          <li>
            Escolha o <strong>Perfil</strong>: Editor para quem cuida dos anúncios; Administrador só para quem também precisa
            mudar WhatsApp, dados da imobiliária e usuários.
          </li>
          <li>
            Clique em <strong>Salvar</strong> e passe o e-mail e a senha para a pessoa. Peça que ela troque a senha no
            primeiro acesso.
          </li>
        </ol>
        <p>
          Quando alguém sair da equipe, exclua o usuário dessa pessoa para tirar o acesso.
        </p>
      </>
    ),
  },
  {
    id: 'senha',
    category: 'acesso',
    title: 'Trocar a senha ou recuperar o acesso',
    keywords: 'senha esqueci trocar alterar recuperar login entrar conta',
    link: { href: ADMIN.account, label: 'Abrir minha conta' },
    body: (
      <>
        <p>
          <strong>Trocar a sua senha:</strong> clique no seu avatar, no canto superior direito, para abrir a sua conta → botão{' '}
          <strong>Mudar senha</strong> → digite a nova senha duas vezes → <strong>Salvar</strong>.
        </p>
        <p>
          <strong>Esqueceu a senha?</strong> O painel não envia e-mail de recuperação. Peça a um administrador: ele abre
          Usuários do painel → o seu usuário → <strong>Mudar senha</strong>, define uma senha provisória e passa para você.
        </p>
      </>
    ),
  },

  // ---------- Algo deu errado? ----------
  {
    id: 'nao-aparece',
    category: 'problemas',
    title: 'Salvei, mas não apareceu no site',
    keywords: 'nao aparece sumiu site desatualizado salvou erro',
    body: (
      <ol>
        <li>
          Recarregue a página do site. No celular, feche e abra de novo a aba.
        </li>
        <li>
          Imóvel: confira se a <strong>Situação no site</strong> está como <strong>Publicado</strong>.
        </li>
        <li>
          Banner: confira se “Mostrar este banner no site” está marcado e se a data de <strong>Agendar exibição</strong> já
          começou (ou ainda não terminou). Banners agendados podem levar até 1 hora para entrar no ar.
        </li>
        <li>
          Destaque: só imóveis publicados aparecem na página inicial.
        </li>
      </ol>
    ),
  },
  {
    id: 'erro-salvar',
    category: 'problemas',
    title: 'Aparece um erro ao salvar',
    keywords: 'erro salvar vermelho obrigatorio nao salva campo',
    body: (
      <>
        <p>
          Quase sempre é um <strong>campo obrigatório vazio</strong> ou um valor fora do formato. O campo com problema fica em
          vermelho, e a aba que tem esse campo ganha uma marcação: abra as abas até encontrar.
        </p>
        <ul>
          <li>Preço e áreas aceitam só números, sem pontos ou “R$”.</li>
          <li>Um imóvel precisa de título, tipo, preço, área privativa, descrição, pelo menos uma foto, rua e bairro.</li>
          <li>Cada código de imóvel só pode ser usado uma vez.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'foto-nao-envia',
    category: 'problemas',
    title: 'A foto não envia',
    keywords: 'foto nao envia upload erro falha imagem grande',
    body: (
      <ul>
        <li>
          Confira o formato (JPEG, PNG ou WebP) e o tamanho: até 25 MB. Fotos em HEIC, padrão de alguns iPhones, precisam ser
          convertidas, ou o iPhone pode ser ajustado para salvar em JPEG (Ajustes → Câmera → Formatos → “Mais Compatível”).
        </li>
        <li>Verifique a internet e tente de novo. Fotos grandes demoram alguns segundos.</li>
        <li>Se o erro continuar com qualquer foto, fale com o suporte técnico.</li>
      </ul>
    ),
  },
  {
    id: 'excluiu-sem-querer',
    category: 'problemas',
    title: 'Excluí algo sem querer',
    keywords: 'excluir apagar sem querer recuperar desfazer voltar',
    body: (
      <p>
        O painel não tem lixeira. Fale com o suporte técnico <strong>o quanto antes</strong>, informando o que foi excluído e
        o horário aproximado. Para evitar isso, prefira marcar imóveis como <strong>Inativo</strong> em vez de excluir.
      </p>
    ),
  },
]
