// Teste de carga: visitantes reais (home → listagem filtrada → imóvel), com tempo de leitura entre páginas.
// Não baixa imagens: a otimização de imagem da Vercel é cobrada por transformação, e o foco aqui é servidor + banco.
//   BASE_URL=http://localhost:3000 k6 run perf/load.js            (build local: pnpm build && pnpm start)
//   BASE_URL=https://<preview>.vercel.app VUS=20 k6 run perf/load.js
// Contra produção, combine antes: gera custo (funções e banco) e pode acionar a proteção anti-robô da Vercel.
import http from 'k6/http'
import { check, group, sleep } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000'
const VUS = Number(__ENV.VUS || 20)

export const options = {
  scenarios: {
    visitantes: {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: VUS },
        { duration: '3m', target: VUS },
        { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{page:/}': ['p(95)<1500'],
    'http_req_duration{page:/imoveis}': ['p(95)<2000'],
    'http_req_duration{page:/imoveis/[slug]}': ['p(95)<2000'],
    checks: ['rate>0.99'],
  },
}

const FILTERS = ['', '?quartos=2', '?quartos=3', '?precoMax=500000', '?precoMax=1000000', '?ordem=menor-preco', '?pagina=2']
const pick = (list) => list[Math.floor(Math.random() * list.length)]
const think = () => sleep(2 + Math.random() * 4)

export default function visitante() {
  group('home', () => {
    const res = http.get(`${BASE_URL}/`, { tags: { page: '/' } })
    check(res, { 'home 200': (r) => r.status === 200 })
  })
  think()

  let detail
  group('listagem', () => {
    const res = http.get(`${BASE_URL}/imoveis${pick(FILTERS)}`, { tags: { page: '/imoveis' } })
    check(res, { 'listagem 200': (r) => r.status === 200 })
    const links = res
      .html()
      .find('article a[href^="/imoveis/"]')
      .toArray()
      .map((a) => a.attr('href'))
    detail = links.length ? pick(links) : undefined
  })
  think()

  if (detail) {
    group('imóvel', () => {
      const res = http.get(`${BASE_URL}${detail}`, { tags: { page: '/imoveis/[slug]' } })
      check(res, { 'imóvel 200': (r) => r.status === 200 })
    })
    think()
  }
}
