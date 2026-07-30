/**
 * Locale identity.
 *
 * Three different strings are involved and they are NOT interchangeable:
 *   - `id`       url-safe internal identifier and URL segment ('en', 'pt-br')
 *   - `tag`      BCP-47, for <html lang> and hreflang
 *   - `ogLocale` Open Graph's underscore form
 *
 * Nothing derives one from another by string munging; they are declared.
 */

export const locales = ['en', 'pt-br'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

type LocaleMeta = {
  readonly tag: string
  readonly ogLocale: string
  /** Path this locale is served from. The default locale owns the root. */
  readonly path: string
  /** Name of the language, written in that language. */
  readonly nativeName: string
  /** Two-letter label for the switcher. */
  readonly shortLabel: string
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    tag: 'en',
    ogLocale: 'en_US',
    path: '/',
    nativeName: 'English',
    shortLabel: 'EN',
  },
  'pt-br': {
    tag: 'pt-BR',
    ogLocale: 'pt_BR',
    path: '/pt-br',
    nativeName: 'Português',
    shortLabel: 'PT',
  },
}

/*
 * There is deliberately no cookie, no `?lang` parameter and no string->Locale
 * parser here any more.
 *
 * The locale is decided entirely by which URL is requested: `/` is English,
 * `/pt-br` is Portuguese, and nothing redirects. Because no untrusted string is
 * ever turned into a locale, there is no allowlist to enforce and no redirect
 * target to protect. See docs/plans/english-default.md.
 */

/** The other locale — with exactly two, this is the switcher's target. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'pt-br' : 'en'
}

/**
 * Absolute URL for a locale.
 *
 * Single source of truth so the canonical tag, the sitemap and the JSON-LD all
 * emit the *same* string. `new URL('/', base)` would append a trailing slash for
 * the default locale while Next's canonical resolution does not, and two
 * spellings of one URL is exactly the ambiguity canonicals exist to remove.
 */
export function localeUrl(locale: Locale, baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, '')
  const path = localeMeta[locale].path
  return path === '/' ? base : `${base}${path}`
}
