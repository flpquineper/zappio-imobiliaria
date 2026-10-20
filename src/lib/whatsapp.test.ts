import { describe, expect, it } from 'vitest'

import { buildPropertyWhatsAppUrl, buildWhatsAppUrl, fillTemplate } from './whatsapp'

describe('fillTemplate', () => {
  it('substitui as variáveis', () => {
    expect(fillTemplate('Imóvel {codigo} – {titulo}', { codigo: 'AP0101', titulo: 'Apto' })).toBe(
      'Imóvel AP0101 – Apto',
    )
  })

  it('remove variáveis desconhecidas sem deixar espaço duplo', () => {
    expect(fillTemplate('Olá {nada} mundo', {})).toBe('Olá mundo')
  })
})

describe('buildWhatsAppUrl', () => {
  it('limpa o número e codifica a mensagem', () => {
    expect(buildWhatsAppUrl('+55 (53) 98130-0950', 'Olá, tudo bem?')).toBe(
      'https://wa.me/5553981300950?text=Ol%C3%A1%2C%20tudo%20bem%3F',
    )
  })

  it('funciona sem mensagem', () => {
    expect(buildWhatsAppUrl('5553981300950')).toBe('https://wa.me/5553981300950')
  })
})

describe('buildPropertyWhatsAppUrl', () => {
  it('inclui código e link do imóvel', () => {
    const url = buildPropertyWhatsAppUrl('5553981300950', 'Tenho interesse no {codigo}: {url}', {
      codigo: 'CA0102',
      titulo: 'Casa',
      url: 'https://zappio.com.br/imoveis/casa-ca0102',
    })
    expect(decodeURIComponent(url.split('text=')[1])).toBe(
      'Tenho interesse no CA0102: https://zappio.com.br/imoveis/casa-ca0102',
    )
  })
})
