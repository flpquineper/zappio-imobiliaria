import { expect, type Page } from '@playwright/test'

export const isLocalRun = (baseURL: string | undefined) => Boolean(baseURL?.includes('localhost'))

/** Credenciais do seed local; em outros ambientes vêm de E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD. */
export const adminCredentials = () => ({
  email: process.env.E2E_ADMIN_EMAIL ?? 'admin@zappio.com.br',
  password: process.env.E2E_ADMIN_PASSWORD ?? 'zappio-dev-123',
})

/** Abre a listagem e devolve o caminho do primeiro imóvel, sem depender de um slug fixo do seed. */
export async function firstPropertyPath(page: Page) {
  await page.goto('/imoveis')
  const href = await page.locator('article a[href^="/imoveis/"]').first().getAttribute('href')
  expect(href, 'a listagem deveria ter ao menos um imóvel publicado').toBeTruthy()
  return href as string
}

export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow, 'a página não pode rolar na horizontal').toBeLessThanOrEqual(0)
}
