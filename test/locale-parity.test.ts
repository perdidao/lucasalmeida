import { describe, it, expect } from 'vitest'
import { messages } from '@/content'
import { locales } from '@/lib/i18n/config'
import { navIds, socialIds } from '@/content/config'

/**
 * Guards against a half-finished translation shipping silently.
 *
 * The `satisfies Messages` declarations already make a *missing* key a compile
 * error. What types cannot express is "the same number of principles as the other
 * locale", or "no key was left as an empty string" — which is exactly how a
 * partial translation escapes review.
 */

type Json = Record<string, unknown>

/** Every leaf path in an object, with array indices included. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`))
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value as Json).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    )
  }
  return [prefix]
}

function stringLeaves(value: unknown, prefix = ''): [string, string][] {
  if (typeof value === 'string') return [[prefix, value]]
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => stringLeaves(item, `${prefix}[${i}]`))
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value as Json).flatMap(([key, child]) =>
      stringLeaves(child, prefix ? `${prefix}.${key}` : key),
    )
  }
  return []
}

const [reference, ...others] = locales

describe('locale parity', () => {
  it('covers every declared locale', () => {
    expect(Object.keys(messages).sort()).toEqual([...locales].sort())
  })

  it.each(others)(
    `has exactly the same key paths in %s as in ${reference}`,
    (locale) => {
      const expected = keyPaths(messages[reference!]).sort()
      const actual = keyPaths(messages[locale]).sort()

      const missing = expected.filter((k) => !actual.includes(k))
      const extra = actual.filter((k) => !expected.includes(k))

      expect(missing, `missing in ${locale}`).toEqual([])
      expect(extra, `unexpected in ${locale}`).toEqual([])
    },
  )

  it.each(locales)('has no empty or whitespace-only strings (%s)', (locale) => {
    const blanks = stringLeaves(messages[locale])
      .filter(([, value]) => value.trim() === '')
      .map(([path]) => path)

    expect(blanks).toEqual([])
  })

  it.each(locales)('covers every nav and social id (%s)', (locale) => {
    const m = messages[locale]
    for (const id of navIds) expect(m.nav.labels[id]?.trim()).toBeTruthy()
    for (const id of socialIds) expect(m.social[id]?.trim()).toBeTruthy()
  })

  it.each(locales)('keeps the structural counts fixed (%s)', (locale) => {
    const m = messages[locale]
    expect(m.meta.keywords).toHaveLength(10)
    expect(m.hero.paragraphs).toHaveLength(2)
    expect(m.whatIDo.items).toHaveLength(5)
    expect(m.philosophy.principles).toHaveLength(4)
    expect(m.impact.stats).toHaveLength(5)
    expect(m.selectedWork.cases).toHaveLength(3)
    expect(m.howIWork.steps).toHaveLength(5)
    expect(m.designMindset.paragraphs).toHaveLength(2)
    expect(m.capabilities.groups).toHaveLength(5)
    expect(m.about.milestones).toHaveLength(4)
  })

  it.each(locales)(
    'keeps locale-independent values identical across locales (%s)',
    (locale) => {
      const m = messages[locale]
      // Numerals and metrics are the same in every language; if a translator
      // "localises" them the two pages stop describing the same facts.
      expect(m.philosophy.principles.map((p) => p.numeral)).toEqual([
        'I.',
        'II.',
        'III.',
        'IV.',
      ])
      expect(m.howIWork.steps.map((s) => s.index)).toEqual([
        '01',
        '02',
        '03',
        '04',
        '05',
      ])
      // Numeric metrics must match exactly. The one worded value ("Millions" /
      // "Milhões") is prose and is expected to differ, so it is excluded here
      // and covered by the translation check below.
      const numericValues = (locale: (typeof locales)[number]) =>
        messages[locale].impact.stats
          .map((s) => s.value)
          .filter((value) => /^\d/.test(value))

      expect(numericValues(locale)).toEqual(numericValues(reference!))
      expect(numericValues(locale)).toEqual(['15+', '100+', '10k+', '34k+'])

      expect(m.impact.stats.map((s) => s.accent)).toEqual([
        false,
        false,
        true,
        false,
        false,
      ])
    },
  )

  it('translates the prose rather than copying English', () => {
    const en = messages.en
    const pt = messages['pt-br']

    // A handful of high-visibility strings that must genuinely differ.
    expect(pt.hero.headingAfter).not.toBe(en.hero.headingAfter)
    expect(pt.contact.heading).not.toBe(en.contact.heading)
    expect(pt.meta.description).not.toBe(en.meta.description)
    expect(pt.nav.cta).not.toBe(en.nav.cta)
    expect(pt.a11y.skipToContent).not.toBe(en.a11y.skipToContent)
    expect(pt.selectedWork.eyebrow).not.toBe(en.selectedWork.eyebrow)
  })
})
