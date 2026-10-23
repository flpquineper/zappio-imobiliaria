import { defineConfig, devices } from '@playwright/test'

/**
 * Testes de ponta a ponta (e2e/).
 * - Local (padrão): sobe o `pnpm dev` se ainda não estiver rodando e usa o banco local com o seed.
 * - Produção: `pnpm test:e2e:prod` (só os testes de leitura; os marcados @local fazem login e são ignorados).
 */
const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'
const isLocal = baseURL.includes('localhost')

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 45_000,
  use: {
    baseURL,
    locale: 'pt-BR',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    // 360px: menor largura suportada (AGENTS.md); toque habilitado para reproduzir o uso no celular.
    { name: 'mobile', use: { ...devices['Galaxy S9+'], viewport: { width: 360, height: 740 } } },
  ],
  webServer: isLocal
    ? { command: 'pnpm dev', url: baseURL, reuseExistingServer: true, timeout: 180_000 }
    : undefined,
})
