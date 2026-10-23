import { expect, test } from '@playwright/test'

import { firstPropertyPath } from './helpers'

test.describe('Site público', () => {
  test('home mostra o banner e a busca rápida leva à listagem filtrada', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('section[aria-roledescription="carrossel"]')).toBeVisible()

    const search = page.getByRole('search', { name: 'Buscar imóveis' })
    await search.locator('#qs-preco').selectOption({ index: 3 })
    await search.getByRole('button', { name: 'Buscar' }).click()

    await expect(page).toHaveURL(/\/imoveis\?.*precoMax=\d+/)
    await expect(page.getByRole('heading', { name: /imóve(l|is) encontrados?/ })).toBeVisible()
  })

  test('listagem mostra imóveis e a ordenação atualiza a URL', async ({ page }) => {
    await page.goto('/imoveis')
    await expect(page.locator('article').first()).toBeVisible()

    await page.getByLabel('Ordenar por').selectOption({ index: 1 })
    await expect(page).toHaveURL(/ordem=/)
  })

  test('detalhe do imóvel tem WhatsApp com o código, Open Graph e JSON-LD', async ({ page }) => {
    const path = await firstPropertyPath(page)
    await page.goto(path)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // O cabeçalho também tem um WhatsApp geral; o do imóvel é o que leva o código na mensagem.
    const code = path.match(/-([a-z]{2}\d{4})$/i)?.[1]?.toUpperCase()
    expect(code, 'o endereço do imóvel termina com o código').toBeTruthy()
    const links = await page.locator('a[href^="https://wa.me/"]').evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''))
    expect(links.every((href) => /^https:\/\/wa\.me\/\d{12,13}\?text=/.test(href))).toBe(true)
    expect(links.some((href) => decodeURIComponent(href).includes(code as string))).toBe(true)

    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/api\/media\/file\//)
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(jsonLd.some((s) => s.includes('"RealEstateListing"'))).toBe(true)
  })

  test('fotos carregam sem erro na home e no detalhe', async ({ page }) => {
    const broken: string[] = []
    page.on('response', (r) => {
      if (r.request().resourceType() === 'image' && r.status() >= 400) broken.push(`${r.status()} ${r.url()}`)
    })
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.goto(await firstPropertyPath(page), { waitUntil: 'networkidle' })
    expect(broken).toEqual([])
  })

  test('URL inexistente mostra a 404 do site, em português', async ({ page }) => {
    const response = await page.goto('/pagina-que-nao-existe-e2e')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { name: /Essa página não existe/ })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Ver imóveis' })).toBeVisible()
  })

  test('robots.txt bloqueia o painel e o sitemap lista as páginas', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain('Disallow: /admin')

    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toContain('/imoveis</loc>')
    expect(sitemap.match(/<loc>/g)?.length ?? 0).toBeGreaterThan(3)
  })
})
