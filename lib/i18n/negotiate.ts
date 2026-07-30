import { defaultLocale, locales, type Locale } from './config'

/**
 * Hard limits on parsing an attacker-supplied header.
 *
 * `Accept-Language` arrives on every request to `/` and is fully client
 * controlled, so the parser must be cheap in the worst case as well as the
 * common one. See docs/plans/i18n-pt-br.md §7.3.
 */
const MAX_HEADER_LENGTH = 512
const MAX_TAGS = 12

/** Primary subtag → locale. Portuguese of any region maps to the pt-BR copy. */
const PRIMARY_SUBTAG: Record<string, Locale> = {
  en: 'en',
  pt: 'pt-br',
}

type ParsedTag = { tag: string; q: number; order: number }

/**
 * Picks the best available locale for an `Accept-Language` header.
 *
 * A pure function of its argument — no request, no cookies, no environment — so
 * the whole matrix of real-world header shapes is unit-testable.
 *
 * Deliberate behaviours:
 *   - `q=0` means "not acceptable" and is discarded rather than ranked last.
 *   - equal `q` values keep header order, which is what clients expect.
 *   - an exact locale match beats a primary-subtag match at the same `q`.
 *   - anything unrecognised falls through to the default locale.
 *
 * The parser only ever returns a member of `locales`, so its result is safe to
 * use as a redirect destination.
 */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale

  const header = acceptLanguage.slice(0, MAX_HEADER_LENGTH)

  const parsed: ParsedTag[] = []
  const parts = header.split(',', MAX_TAGS)

  for (let i = 0; i < parts.length; i += 1) {
    const raw = parts[i]
    if (raw === undefined) continue

    const [tagPart, ...paramParts] = raw.split(';')
    const tag = tagPart?.trim().toLowerCase()
    if (!tag) continue

    let q = 1
    for (const param of paramParts) {
      const [key, value] = param.split('=')
      if (key?.trim().toLowerCase() !== 'q') continue
      const parsedQ = Number.parseFloat(value ?? '')
      // A malformed q is ignored, leaving the default of 1 — never NaN.
      if (Number.isFinite(parsedQ)) q = parsedQ
    }

    // q=0 (or negative) is an explicit refusal of that language.
    if (q <= 0) continue

    parsed.push({ tag, q, order: i })
  }

  if (parsed.length === 0) return defaultLocale

  parsed.sort((a, b) => (b.q === a.q ? a.order - b.order : b.q - a.q))

  for (const { tag } of parsed) {
    if ((locales as readonly string[]).includes(tag)) return tag as Locale

    const primary = tag.split('-')[0]
    const bySubtag = primary ? PRIMARY_SUBTAG[primary] : undefined
    if (bySubtag) return bySubtag
  }

  return defaultLocale
}
