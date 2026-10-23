import { expect, test } from '@playwright/test'

// Só HTTP: roda uma vez, no projeto desktop.
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'verificações de HTTP não dependem da tela')
})

test.describe('Segurança', () => {
  test('cabeçalhos de segurança em todas as respostas', async ({ request }) => {
    for (const path of ['/', '/imoveis', '/admin/login']) {
      const headers = (await request.get(path)).headers()
      expect(headers['x-content-type-options'], path).toBe('nosniff')
      expect(headers['x-frame-options'], path).toBe('SAMEORIGIN')
      expect(headers['content-security-policy'], path).toContain("frame-ancestors 'self'")
      expect(headers['referrer-policy'], path).toBe('strict-origin-when-cross-origin')
      expect(headers['x-powered-by'], path).toBeUndefined()
    }
  })

  test('visitante anônimo não lê nem altera dados restritos', async ({ request }) => {
    for (const path of ['/api/users', '/api/contact-messages', '/api/payload-preferences']) {
      expect((await request.get(path)).status(), path).toBe(403)
    }
    const post = await request.post('/api/contact-messages', { data: { name: 'e2e', email: 'e2e@example.com', message: 'e2e' } })
    expect(post.status()).toBe(403)
    expect((await request.post('/api/users/first-register', { data: { email: 'e2e@example.com', password: 'e2e-12345678' } })).status()).toBe(403)
  })

  test('API pública só expõe imóveis publicados ou vendidos', async ({ request }) => {
    for (const status of ['draft', 'inactive']) {
      const res = await request.get(`/api/properties?where[status][equals]=${status}&depth=0`)
      expect((await res.json()).totalDocs, status).toBe(0)
    }
    const all = await (await request.get('/api/properties?limit=100&depth=0')).json()
    const statuses = new Set((all.docs as { status: string }[]).map((d) => d.status))
    expect([...statuses].every((s) => s === 'published' || s === 'sold')).toBe(true)
  })

  test('prévia (rascunhos) exige login', async ({ request }) => {
    expect((await request.get('/preview?path=/', { maxRedirects: 0 })).status()).toBe(401)
  })
})
