// Smoke test: 1 usuário por 30 s passando pelas páginas principais. Rode depois de cada deploy.
//   BASE_URL=https://zappioimobiliaria.com.br k6 run perf/smoke.js
import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000'

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1500'],
    checks: ['rate>0.99'],
  },
}

const PAGES = ['/', '/imoveis', '/imoveis?quartos=2', '/sobre', '/politica-de-privacidade', '/sitemap.xml']

export default function smoke() {
  for (const path of PAGES) {
    const res = http.get(`${BASE_URL}${path}`, { tags: { page: path.split('?')[0] } })
    check(res, { [`${path} responde 200`]: (r) => r.status === 200 })
  }

  const listing = http.get(`${BASE_URL}/imoveis`, { tags: { page: '/imoveis' } })
  const detail = listing.html().find('article a[href^="/imoveis/"]').first().attr('href')
  if (detail) {
    const res = http.get(`${BASE_URL}${detail}`, { tags: { page: '/imoveis/[slug]' } })
    check(res, {
      'detalhe responde 200': (r) => r.status === 200,
      'detalhe tem link de WhatsApp': (r) => r.body.includes('https://wa.me/'),
    })
  }
  sleep(1)
}
