// Conteúdo FICTÍCIO para o protótipo. Imóveis, textos, números e equipe não são reais.
// Fotos: Unsplash (licença Unsplash, uso livre).

export const PROPERTY_TYPES = [
  { name: 'Apartamento', codePrefix: 'AP' },
  { name: 'Casa', codePrefix: 'CA' },
  { name: 'Casa em condomínio', codePrefix: 'CC' },
  { name: 'Cobertura', codePrefix: 'CO' },
  { name: 'Sobrado', codePrefix: 'SO' },
]

export const NEIGHBORHOODS = ['Areal', 'Centro', 'Fragata', 'Laranjal', 'Porto', 'São Gonçalo', 'Três Vendas']

export const FEATURES = [
  'Ar-condicionado',
  'Área de serviço',
  'Churrasqueira',
  'Closet',
  'Elevador',
  'Espaço gourmet',
  'Jardim',
  'Lareira',
  'Piscina',
  'Playground',
  'Portaria 24h',
  'Sacada',
  'Salão de festas',
  'Vista para a lagoa',
]

/** Nome do arquivo em src/seed/images → texto alternativo. */
export const IMAGES: Record<string, string> = {
  'banheiro-1': 'Banheiro claro com piso xadrez e plantas',
  'casa-alto-padrao-1': 'Fachada de casa moderna de alto padrão com piscina',
  'casa-classica-1': 'Casa clássica com varanda e amplo gramado',
  'casa-contemporanea-1': 'Casa contemporânea com piscina e jardim',
  'casa-contemporanea-2': 'Fachada de casa contemporânea com revestimento em madeira',
  'casa-contemporanea-3': 'Casa contemporânea iluminada ao entardecer',
  'casa-piscina-1': 'Casa térrea com piscina e área externa',
  'casa-piscina-2': 'Casa de dois andares com piscina e palmeiras',
  'casa-piscina-3': 'Casa branca moderna com piscina',
  'cobertura-1': 'Sala com escada e portas de vidro para o terraço',
  'cozinha-1': 'Cozinha branca com bancada e banquetas',
  'pessoas-1': 'Casal cozinhando junto em casa nova',
  'predio-1': 'Fachada de edifício residencial moderno',
  'quarto-1': 'Quarto de casal com cabeceira estofada',
  'quarto-2': 'Suíte ampla com cama de casal',
  'quarto-3': 'Quarto claro com cama de casal e janelas',
  'quarto-4': 'Quarto com papel de parede escuro e luminária',
  'sala-1': 'Sala de estar com sofá azul e piso de madeira',
  'sala-2': 'Sala aconchegante com plantas e estante de livros',
  'sala-3': 'Sala de estar e jantar integradas',
  'sala-4': 'Sala de estar com sofá de couro caramelo',
  'sala-5': 'Sala de estar ampla com janelas grandes',
  'sala-6': 'Canto de leitura com poltrona amarela',
  'sala-7': 'Living com quadros e sofá de couro',
  'sala-8': 'Sala com pé-direito duplo e escada',
  'sala-9': 'Sala integrada com painel de madeira',
  'sala-10': 'Sala de estar com janelas altas e lareira',
  'sobrado-1': 'Fachada de sobrado moderno com gramado',
}

type SeedProperty = {
  code: string
  title: string
  type: string
  neighborhood: string
  street: string
  number: string
  complement?: string
  price: number
  condoFee?: number
  iptu?: number
  area: number
  totalArea?: number
  bedrooms: number
  suites: number
  bathrooms: number
  parkingSpaces: number
  features: string[]
  photos: string[]
  description: string
  status: 'published' | 'sold'
  featured?: number
}

export const PROPERTIES: SeedProperty[] = [
  {
    code: 'CA0102',
    title: 'Casa com piscina e espaço gourmet no Laranjal',
    type: 'Casa',
    neighborhood: 'Laranjal',
    street: 'Av. Adolfo Fetter',
    number: '3150',
    price: 1_450_000,
    iptu: 3_200,
    area: 280,
    totalArea: 600,
    bedrooms: 4,
    suites: 2,
    bathrooms: 4,
    parkingSpaces: 3,
    features: ['Piscina', 'Espaço gourmet', 'Churrasqueira', 'Jardim', 'Ar-condicionado'],
    photos: ['casa-piscina-1', 'sala-9', 'quarto-2', 'cozinha-1', 'banheiro-1'],
    description:
      'Casa térrea a poucas quadras da orla do Laranjal, pensada para quem quer viver perto da natureza sem abrir mão do conforto.\n\nSão quatro dormitórios, sendo duas suítes, living integrado com pé-direito alto e cozinha aberta para o espaço gourmet. A área externa tem piscina, churrasqueira e jardim com irrigação automática.\n\nGaragem coberta para três carros e terreno de 600 m² com espaço para ampliar.',
    status: 'published',
    featured: 1,
  },
  {
    code: 'CC0106',
    title: 'Casa em condomínio fechado com piscina e vista para a lagoa',
    type: 'Casa em condomínio',
    neighborhood: 'Laranjal',
    street: 'Estrada do Laranjal',
    number: '880',
    complement: 'Casa 12',
    price: 2_350_000,
    condoFee: 980,
    iptu: 5_400,
    area: 340,
    totalArea: 720,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpaces: 4,
    features: ['Piscina', 'Vista para a lagoa', 'Portaria 24h', 'Espaço gourmet', 'Closet', 'Ar-condicionado'],
    photos: ['casa-piscina-3', 'cobertura-1', 'sala-4', 'quarto-1', 'cozinha-1'],
    description:
      'Casa contemporânea em condomínio fechado com segurança 24 horas, a poucos minutos da Lagoa dos Patos.\n\nQuatro suítes, sendo a master com closet e sacada com vista para a lagoa. Living com portas de vidro que se abrem para a piscina, cozinha gourmet e lavabo.\n\nAcabamentos de alto padrão, automação de iluminação e infraestrutura para energia solar.',
    status: 'published',
    featured: 2,
  },
  {
    code: 'AP0101',
    title: 'Apartamento de 3 quartos com sacada no Centro',
    type: 'Apartamento',
    neighborhood: 'Centro',
    street: 'Rua Félix da Cunha',
    number: '1020',
    complement: 'Apto 802',
    price: 680_000,
    condoFee: 750,
    iptu: 1_900,
    area: 112,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 1,
    features: ['Sacada', 'Churrasqueira', 'Elevador', 'Portaria 24h', 'Salão de festas'],
    photos: ['predio-1', 'sala-7', 'cozinha-1', 'quarto-1', 'banheiro-1'],
    description:
      'Apartamento de andar alto, com vista aberta, no coração do Centro de Pelotas: a uma caminhada de escolas, comércio e da Praça Coronel Pedro Osório.\n\nTrês dormitórios, sendo uma suíte, sala para dois ambientes e sacada com churrasqueira. Cozinha planejada e área de serviço separada.\n\nPrédio com elevador, portaria 24h e salão de festas.',
    status: 'published',
    featured: 3,
  },
  {
    code: 'CA0104',
    title: 'Casa contemporânea com piscina no Areal',
    type: 'Casa',
    neighborhood: 'Areal',
    street: 'Av. Domingos de Almeida',
    number: '2475',
    price: 1_890_000,
    iptu: 4_100,
    area: 310,
    totalArea: 480,
    bedrooms: 3,
    suites: 3,
    bathrooms: 5,
    parkingSpaces: 2,
    features: ['Piscina', 'Espaço gourmet', 'Closet', 'Jardim', 'Ar-condicionado'],
    photos: ['casa-contemporanea-1', 'sala-8', 'quarto-4', 'sala-10', 'cozinha-1'],
    description:
      'Projeto contemporâneo com linhas retas, grandes aberturas e muita luz natural.\n\nTrês suítes, sendo a principal com closet e banheira. Living com pé-direito duplo, escada escultural e integração total com a área da piscina.\n\nEspaço gourmet completo e jardim projetado por paisagista.',
    status: 'published',
    featured: 4,
  },
  {
    code: 'AP0103',
    title: 'Apartamento de 2 quartos reformado no Porto',
    type: 'Apartamento',
    neighborhood: 'Porto',
    street: 'Rua Benjamin Constant',
    number: '1590',
    complement: 'Apto 304',
    price: 390_000,
    condoFee: 420,
    iptu: 980,
    area: 68,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpaces: 1,
    features: ['Sacada', 'Área de serviço', 'Elevador'],
    photos: ['sala-3', 'sala-1', 'quarto-3', 'banheiro-1'],
    description:
      'Apartamento totalmente reformado na região do Porto, perto das universidades e do novo polo gastronômico.\n\nDois dormitórios, sala integrada com cozinha americana e sacada. Piso em madeira, iluminação em LED e armários planejados.\n\nÓtima opção para morar ou investir.',
    status: 'published',
    featured: 5,
  },
  {
    code: 'SO0105',
    title: 'Sobrado com 3 quartos e jardim no Fragata',
    type: 'Sobrado',
    neighborhood: 'Fragata',
    street: 'Av. Duque de Caxias',
    number: '640',
    price: 720_000,
    iptu: 1_600,
    area: 165,
    totalArea: 300,
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    parkingSpaces: 2,
    features: ['Jardim', 'Churrasqueira', 'Área de serviço'],
    photos: ['sobrado-1', 'sala-5', 'quarto-3', 'cozinha-1'],
    description:
      'Sobrado em rua tranquila do Fragata, próximo a escolas, mercados e ao Parque da Baronesa.\n\nNo térreo, living com lareira, lavabo, cozinha e churrasqueira com acesso ao jardim. No andar de cima, três dormitórios, sendo uma suíte com sacada.\n\nGaragem para dois carros.',
    status: 'published',
    featured: 6,
  },
  {
    code: 'AP0107',
    title: 'Studio mobiliado perto da UFPel',
    type: 'Apartamento',
    neighborhood: 'Centro',
    street: 'Rua Gonçalves Chaves',
    number: '3120',
    complement: 'Apto 1102',
    price: 295_000,
    condoFee: 380,
    iptu: 640,
    area: 38,
    bedrooms: 1,
    suites: 0,
    bathrooms: 1,
    parkingSpaces: 0,
    features: ['Ar-condicionado', 'Elevador', 'Portaria 24h'],
    photos: ['sala-2', 'sala-6', 'banheiro-1'],
    description:
      'Studio compacto e bem resolvido, entregue mobiliado, a poucos passos dos campi da UFPel no Centro.\n\nAmbiente integrado com cozinha equipada, banheiro com box de vidro e ar-condicionado.\n\nPrédio com portaria 24h e lavanderia coletiva. Ideal para estudantes ou investidores.',
    status: 'published',
  },
  {
    code: 'CA0108',
    title: 'Casa clássica com varanda nas Três Vendas',
    type: 'Casa',
    neighborhood: 'Três Vendas',
    street: 'Av. Fernando Osório',
    number: '5210',
    price: 980_000,
    iptu: 2_300,
    area: 220,
    totalArea: 520,
    bedrooms: 4,
    suites: 1,
    bathrooms: 3,
    parkingSpaces: 2,
    features: ['Jardim', 'Lareira', 'Churrasqueira', 'Área de serviço'],
    photos: ['casa-classica-1', 'sala-5', 'quarto-2', 'cozinha-1'],
    description:
      'Casa de arquitetura clássica com varanda em L e amplo gramado, em terreno de 520 m².\n\nQuatro dormitórios, sala de estar com lareira, sala de jantar e cozinha espaçosa. Churrasqueira coberta nos fundos.\n\nPerfeita para famílias que querem espaço e tranquilidade.',
    status: 'published',
  },
  {
    code: 'CO0111',
    title: 'Cobertura duplex com terraço e piscina no Centro',
    type: 'Cobertura',
    neighborhood: 'Centro',
    street: 'Rua Anchieta',
    number: '2050',
    complement: 'Cobertura 1501',
    price: 1_650_000,
    condoFee: 1_350,
    iptu: 4_800,
    area: 245,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpaces: 3,
    features: ['Piscina', 'Espaço gourmet', 'Elevador', 'Portaria 24h', 'Ar-condicionado', 'Closet'],
    photos: ['cobertura-1', 'sala-9', 'quarto-4', 'cozinha-1', 'banheiro-1'],
    description:
      'Cobertura duplex com vista panorâmica da cidade, no prédio mais alto da região.\n\nTrês suítes, living com portas de vidro para o terraço, espaço gourmet e piscina privativa no andar superior.\n\nTrês vagas de garagem e depósito privativo.',
    status: 'published',
  },
  {
    code: 'CA0112',
    title: 'Casa contemporânea com revestimento em madeira no São Gonçalo',
    type: 'Casa',
    neighborhood: 'São Gonçalo',
    street: 'Rua Uruguai',
    number: '355',
    price: 1_120_000,
    iptu: 2_600,
    area: 210,
    totalArea: 390,
    bedrooms: 3,
    suites: 2,
    bathrooms: 3,
    parkingSpaces: 2,
    features: ['Jardim', 'Espaço gourmet', 'Ar-condicionado'],
    photos: ['casa-contemporanea-2', 'sala-10', 'quarto-1', 'cozinha-1'],
    description:
      'Casa de projeto autoral, com fachada em madeira e concreto aparente, perto do Canal São Gonçalo.\n\nTrês dormitórios, sendo duas suítes, living com janelas do piso ao teto e cozinha integrada ao espaço gourmet.\n\nJardim com deck e espaço para horta.',
    status: 'published',
  },
  {
    code: 'CA0113',
    title: 'Casa térrea com amplo pátio no Areal',
    type: 'Casa',
    neighborhood: 'Areal',
    street: 'Rua Santa Cruz',
    number: '1180',
    price: 540_000,
    iptu: 1_250,
    area: 135,
    totalArea: 360,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 2,
    features: ['Churrasqueira', 'Jardim', 'Área de serviço'],
    photos: ['casa-contemporanea-3', 'sala-1', 'quarto-3'],
    description:
      'Casa térrea em rua residencial, com pátio amplo para crianças e pets.\n\nTrês dormitórios, sendo uma suíte, sala de estar, cozinha e churrasqueira coberta.\n\nBoa oportunidade para a primeira casa da família.',
    status: 'published',
  },
  {
    code: 'CA0110',
    title: 'Casa de dois andares com piscina no Laranjal',
    type: 'Casa',
    neighborhood: 'Laranjal',
    street: 'Rua Antônio Mattos',
    number: '420',
    price: 1_280_000,
    iptu: 2_900,
    area: 260,
    totalArea: 500,
    bedrooms: 4,
    suites: 2,
    bathrooms: 4,
    parkingSpaces: 2,
    features: ['Piscina', 'Churrasqueira', 'Jardim'],
    photos: ['casa-piscina-2', 'sala-4', 'quarto-2'],
    description:
      'Casa de dois pavimentos com piscina, varanda e palmeiras, a duas quadras da praia do Laranjal.\n\nQuatro dormitórios, sendo duas suítes, sala ampla e cozinha com copa.',
    status: 'sold',
  },
]

type SeedBanner = {
  title: string
  subtitle: string
  image: string
  ctaLabel: string
  ctaType: 'properties' | 'about'
  /** Nome do tipo de imóvel para filtrar a lista (opcional). */
  propertyType?: string
}

export const BANNERS: SeedBanner[] = [
  {
    title: 'Procure menos, encontre mais.',
    subtitle: 'Imóveis selecionados em Pelotas, com atendimento próximo do primeiro contato até a chave na mão.',
    image: 'casa-contemporanea-1',
    ctaLabel: 'Ver imóveis',
    ctaType: 'properties',
  },
  {
    title: 'Seu próximo imóvel a um Zappio de distância.',
    subtitle: 'Conte o que você procura e a gente faz a busca por você.',
    image: 'pessoas-1',
    ctaLabel: 'Conheça a Zappio',
    ctaType: 'about',
  },
  {
    title: 'Encontrar seu lar é simples.',
    subtitle: 'Casas com espaço para a família crescer, do Centro ao Laranjal.',
    image: 'sala-8',
    ctaLabel: 'Ver casas',
    ctaType: 'properties',
    propertyType: 'Casa',
  },
]

export const SETTINGS = {
  whatsappNumber: '5553981300950',
  whatsappPropertyMessage:
    'Olá, Zappio! Tenho interesse no imóvel {codigo} – {titulo}, no bairro {bairro} ({preco}). Pode me passar mais informações? {url}',
  whatsappGeneralMessage: 'Olá, Zappio! Vim pelo site e gostaria de mais informações sobre imóveis.',
  phone: '(53) 98130-0950',
  email: 'imobiliariazappio@gmail.com',
  instagram: 'zappio.imobiliaria',
  creci: '27791',
  businessHours: 'Segunda a sexta, das 9h às 18h\nSábado, das 9h às 12h',
  street: 'Rua Andrade Neves, 2077',
  complement: 'Sala 401',
  neighborhood: 'Centro',
  city: 'Pelotas',
  state: 'RS',
  siteTitle: 'Zappio Assessoria Imobiliária · Imóveis à venda em Pelotas',
  siteDescription:
    'Casas, apartamentos e coberturas à venda em Pelotas/RS. Atendimento próximo e direto pelo WhatsApp. Procure menos, encontre mais.',
}

export const HOME_CONTENT = {
  featuredEyebrow: 'Destaques',
  featuredTitle: 'Imóveis selecionados para você',
  aboutEyebrow: 'Sobre a Zappio',
  aboutTitle: 'Assessoria imobiliária que simplifica a sua busca',
  aboutText:
    'A Zappio nasceu para tornar a compra de um imóvel mais leve. Em vez de dezenas de visitas sem rumo, a gente entende o que você precisa e apresenta só o que faz sentido.\n\nCuidamos de cada etapa, da primeira conversa à documentação, com transparência e atendimento direto pelo WhatsApp.',
  aboutImage: 'pessoas-1',
  stats: [
    { value: '+150', label: 'famílias atendidas' },
    { value: '+80', label: 'imóveis vendidos' },
    { value: '8', label: 'bairros atendidos' },
    { value: '4,9', label: 'nota no Google' },
  ],
  benefitsTitle: 'Por que comprar com a Zappio',
  benefits: [
    { title: 'Curadoria de verdade', text: 'Visitamos e avaliamos cada imóvel antes de anunciar. Você só vê o que vale a visita.' },
    { title: 'Atendimento direto', text: 'Fale com um corretor pelo WhatsApp, sem formulário infinito e sem espera.' },
    { title: 'Documentação segura', text: 'Conferimos matrícula, certidões e pendências antes de qualquer proposta.' },
    { title: 'Apoio no financiamento', text: 'Ajudamos a simular e encaminhar o crédito com os principais bancos.' },
  ],
  ctaTitle: 'Não encontrou o que procura?',
  ctaText: 'Conte para a gente o imóvel dos seus sonhos. A gente busca e avisa quando aparecer.',
}

export const ABOUT_CONTENT = {
  title: 'Gente que entende de lar.',
  intro:
    'Somos uma assessoria imobiliária de Pelotas focada em ajudar pessoas a encontrar o imóvel certo, com menos busca e mais segurança.',
  image: 'sala-7',
  history:
    'A Zappio começou com uma ideia simples: comprar um imóvel não precisa ser cansativo. Depois de anos no mercado imobiliário de Pelotas, percebemos que a maior dor de quem procura casa é perder tempo com opções que não servem.\n\nPor isso trabalhamos como assessoria: ouvimos o cliente, entendemos a rotina, o orçamento e os planos da família, e só então apresentamos os imóveis. Do outro lado, cuidamos dos proprietários com avaliação justa, boas fotos e divulgação certeira.\n\nHoje atendemos todos os principais bairros da cidade, do Centro ao Laranjal, sempre com o mesmo cuidado do primeiro dia.',
  values: [
    { title: 'Missão', text: 'Simplificar a compra e a venda de imóveis com atendimento próximo, honesto e eficiente.' },
    { title: 'Visão', text: 'Ser a assessoria imobiliária mais recomendada de Pelotas pela experiência dos clientes.' },
    { title: 'Valores', text: 'Transparência, cuidado com as pessoas, agilidade e responsabilidade em cada negociação.' },
  ],
  team: [
    { name: 'Mariana Duarte', role: 'Fundadora e corretora' },
    { name: 'Rafael Moreira', role: 'Corretor de imóveis' },
    { name: 'Camila Fontoura', role: 'Atendimento e documentação' },
    { name: 'Lucas Ferreira', role: 'Fotografia e marketing' },
  ],
  contactTitle: 'Fale com a gente',
  contactText: 'Tire dúvidas, agende uma visita ou conte o que você procura. Respondemos rápido.',
}
