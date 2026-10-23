import { expect, test, type Page } from '@playwright/test'

import { adminCredentials, isLocalRun } from './helpers'

// Faz login: só no ambiente local (seed) ou com E2E_ADMIN_EMAIL/E2E_ADMIN_PASSWORD definidos.
test.beforeEach(({ baseURL }, testInfo) => {
  test.skip(!isLocalRun(baseURL) && !process.env.E2E_ADMIN_PASSWORD, 'login só no ambiente local ou com credenciais de teste')
  test.skip(testInfo.project.name !== 'desktop', 'fluxos do painel rodam uma vez')
})

async function login(page: Page, next = '/admin') {
  const { email, password } = adminCredentials()
  await page.goto(`/admin/login?redirect=${encodeURIComponent(next)}`)
  await page.locator('#field-email').fill(email)
  await page.locator('#field-password').fill(password)
  await page.locator('button[type=submit]').click()
  await expect(page).toHaveURL(new RegExp(`${next}$`))
}

test.describe('Painel @local', () => {
  test('central de ajuda exige login', async ({ page }) => {
    await page.goto('/admin/ajuda')
    await expect(page).toHaveURL(/\/admin\/login\?redirect=%2Fadmin%2Fajuda/)
  })

  test('login, central de ajuda com busca e logout', async ({ page }) => {
    await login(page)
    await expect(page.getByRole('link', { name: /Central de ajuda/ }).first()).toBeVisible()

    await page.goto('/admin/ajuda')
    await expect(page.getByRole('heading', { name: 'Como podemos ajudar?' })).toBeVisible()
    await page.getByLabel('Buscar na ajuda').fill('vendido')
    await expect(page.getByText(/resultado/)).toBeVisible()
    await expect(page.locator('details[open] summary').first()).toContainText(/vendido/i)

    // Link direto abre o tópico
    await page.goto('/admin/ajuda#banners')
    await expect(page.locator('#banners')).toHaveAttribute('open', '')

    await page.goto('/admin/logout')
    await page.waitForURL(/\/admin\/login/)
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin\/login/)
  })
})
