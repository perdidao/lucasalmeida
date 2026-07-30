import { describe, it, expect } from 'vitest'
import { negotiateLocale } from '@/lib/i18n/negotiate'
import { locales } from '@/lib/i18n/config'

describe('negotiateLocale', () => {
  it.each([
    // Portuguese, in every shape a browser sends it.
    ['pt-BR', 'pt-br'],
    ['pt-br', 'pt-br'],
    ['pt', 'pt-br'],
    // Portugal has no separate copy, so it maps to the pt-BR translation.
    ['pt-PT', 'pt-br'],
    ['pt-BR,pt;q=0.9,en;q=0.8', 'pt-br'],
    ['pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7', 'pt-br'],
  ])('resolves %s to %s', (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected)
  })

  it.each([
    ['en', 'en'],
    ['en-US', 'en'],
    ['en-GB,en;q=0.9', 'en'],
    // Nothing we speak → default.
    ['de-DE,de;q=0.9', 'en'],
    ['ja', 'en'],
    ['zh-CN,zh;q=0.9,ko;q=0.8', 'en'],
    ['*', 'en'],
  ])('resolves %s to %s', (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected)
  })

  it.each([null, undefined, '', '   ', ',,,', ';q=0.5'])(
    'falls back to English for %j',
    (header) => {
      expect(negotiateLocale(header)).toBe('en')
    },
  )

  it('honours q-value ranking over header order', () => {
    // English listed first but explicitly less preferred.
    expect(negotiateLocale('en;q=0.3,pt-BR;q=0.9')).toBe('pt-br')
    expect(negotiateLocale('pt-BR;q=0.2,en;q=0.8')).toBe('en')
  })

  it('keeps header order when q values tie', () => {
    expect(negotiateLocale('pt-BR,en')).toBe('pt-br')
    expect(negotiateLocale('en,pt-BR')).toBe('en')
    expect(negotiateLocale('pt-BR;q=0.5,en;q=0.5')).toBe('pt-br')
  })

  /** q=0 means "not acceptable" — it must be discarded, not merely ranked last. */
  it('treats q=0 as a refusal', () => {
    expect(negotiateLocale('pt-BR;q=0,en;q=0.1')).toBe('en')
    expect(negotiateLocale('en;q=0,pt-BR;q=0.1')).toBe('pt-br')
    // Everything refused → default, not a crash.
    expect(negotiateLocale('pt;q=0,en;q=0')).toBe('en')
  })

  it('survives malformed q values without throwing', () => {
    expect(() => negotiateLocale('pt-BR;q=abc')).not.toThrow()
    expect(negotiateLocale('pt-BR;q=abc')).toBe('pt-br')
    expect(negotiateLocale('pt-BR;q=')).toBe('pt-br')
    expect(negotiateLocale('pt-BR;;;q=0.9')).toBe('pt-br')
    expect(negotiateLocale('pt-BR;qq=0')).toBe('pt-br')
  })

  it('is case-insensitive', () => {
    expect(negotiateLocale('PT-br')).toBe('pt-br')
    expect(negotiateLocale('EN-US')).toBe('en')
  })

  it('only ever returns a declared locale', () => {
    const headers = ['pt', 'en', 'de', '*', '', 'pt;q=0', 'xx-YY,zz']
    for (const header of headers) {
      expect(locales).toContain(negotiateLocale(header))
    }
  })

  /**
   * The header is attacker-controlled and parsed on every request to `/`.
   * See docs/plans/i18n-pt-br.md §7.3.
   */
  describe('hostile input', () => {
    it('handles a 100 kB header in bounded time', () => {
      const header = 'de-DE,'.repeat(20_000)
      const started = performance.now()
      const result = negotiateLocale(header)
      const elapsed = performance.now() - started

      expect(result).toBe('en')
      expect(elapsed).toBeLessThan(50)
    })

    it('handles thousands of tags in bounded time', () => {
      const header = Array.from(
        { length: 5000 },
        (_, i) => `xx-${i};q=0.5`,
      ).join(',')
      const started = performance.now()
      const result = negotiateLocale(header)
      const elapsed = performance.now() - started

      expect(result).toBe('en')
      expect(elapsed).toBeLessThan(50)
    })

    it('ignores a preferred language buried past the truncation limit', () => {
      // Truncation is a deliberate trade: correctness for absurd headers is
      // sacrificed to keep worst-case parsing cheap. Documented, not accidental.
      const padding = Array.from({ length: 200 }, (_, i) => `xx-${i}`).join(',')
      expect(negotiateLocale(`${padding},pt-BR`)).toBe('en')
    })

    it('is unfazed by regex-hostile punctuation', () => {
      expect(() =>
        negotiateLocale(`${'('.repeat(5000)}pt-BR${')'.repeat(5000)}`),
      ).not.toThrow()
      expect(negotiateLocale('pt-BR;q=0.9;q=0.8;q=;;;,,,')).toBe('pt-br')
    })
  })
})
