import { expect, test } from '@playwright/test'

import { expectNoHorizontalScroll, firstPropertyPath } from './helpers'

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'cenários de celular (360px)')
})

test.describe('Celular (360px)', () => {
  test('botão flutuante do WhatsApp nunca fica sobre um campo ou botão de formulário', async ({ page }) => {
    for (const path of ['/', '/imoveis', '/sobre']) {
      await page.goto(path)
      const overlaps = await page.evaluate(async () => {
        const fab = document.querySelector<HTMLElement>('.whatsapp-fab')
        if (!fab) return []
        const found = new Set<string>()
        const height = document.documentElement.scrollHeight
        for (let y = 0; y < height; y += 120) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 80))
          if (getComputedStyle(fab).pointerEvents === 'none') continue
          const f = fab.getBoundingClientRect()
          for (const el of document.querySelectorAll('form select, form input:not([type=hidden]), form textarea, form button')) {
            const r = el.getBoundingClientRect()
            if (r.width && r.left < f.right && r.right > f.left && r.top < f.bottom && r.bottom > f.top) {
              found.add(`${el.tagName} ${el.getAttribute('name') ?? el.textContent?.trim()}`)
            }
          }
        }
        return [...found]
      })
      expect(overlaps, `${path}: o botão flutuante cobre controles`).toEqual([])
    }
  })

  test('gaveta de filtros trava o fundo e fecha ao tocar fora', async ({ page }) => {
    await page.goto('/imoveis')
    await page.getByRole('button', { name: /^Filtros/ }).tap()

    const drawer = page.getByRole('dialog', { name: 'Filtros' })
    await expect(drawer).toBeVisible()
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden')

    await page.touchscreen.tap(180, 20)
    await expect(drawer).toBeHidden()
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden')
  })

  test('filtro aplicado pela gaveta chega na URL', async ({ page }) => {
    await page.goto('/imoveis')
    await page.getByRole('button', { name: /^Filtros/ }).tap()
    const drawer = page.getByRole('dialog', { name: 'Filtros' })
    await drawer.getByLabel('Quartos').selectOption('2')
    await drawer.getByRole('button', { name: 'Aplicar filtros' }).tap()
    await expect(page).toHaveURL(/quartos=2/)
  })

  test('menu abre e fecha', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Abrir menu' }).tap()
    const menu = page.getByRole('dialog', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await menu.getByRole('button', { name: 'Fechar menu' }).tap()
    await expect(menu).toBeHidden()
  })

  test('alvos de toque principais têm pelo menos 44px', async ({ page }) => {
    await page.goto('/imoveis')
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('header a, header button, article a[href^="https://wa.me"], footer a, footer button, [aria-roledescription="carrossel"] button')]
        .filter((el) => el.offsetParent !== null)
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.height < 44)
        .map(({ el, r }) => `${el.textContent?.trim() || el.getAttribute('aria-label')} (${Math.round(r.height)}px)`),
    )
    expect(small).toEqual([])
  })

  test('nenhuma página rola na horizontal', async ({ page }) => {
    for (const path of ['/', '/imoveis', '/sobre', '/politica-de-privacidade']) {
      await page.goto(path)
      await expectNoHorizontalScroll(page)
    }
    await page.goto(await firstPropertyPath(page))
    await expectNoHorizontalScroll(page)
  })
})
