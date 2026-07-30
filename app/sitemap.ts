import type { MetadataRoute } from 'next'
import { site } from '@/content/config'
import { localeMeta, localeUrl, locales } from '@/lib/i18n/config'

/**
 * One entry per locale, each carrying the full alternates map.
 *
 * Search engines expect hreflang annotations to be reciprocal, so every entry
 * lists every locale — including itself — plus `x-default`. URLs come from
 * `localeUrl` so they match the canonical tags exactly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[localeMeta[locale].tag] = localeUrl(locale, site.url)
  }
  languages['x-default'] = localeUrl('en', site.url)

  return locales.map((locale) => ({
    url: localeUrl(locale, site.url),
    changeFrequency: 'monthly',
    priority: locale === 'en' ? 1 : 0.9,
    alternates: { languages },
  }))
}
