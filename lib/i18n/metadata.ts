import type { Metadata, Viewport } from 'next'
import { getMessages } from '@/content'
import { site } from '@/content/config'
import { localeMeta, locales, otherLocale, type Locale } from './config'

/**
 * hreflang map.
 *
 * Emitted identically on both pages, because hreflang annotations must be
 * reciprocal — a page that lists an alternate without being listed back is
 * ignored by search engines. `x-default` points at English, which is what an
 * unmatched visitor gets.
 */
function languageAlternates(): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[localeMeta[locale].tag] = localeMeta[locale].path
  }
  languages['x-default'] = localeMeta.en.path
  return languages
}

export function buildMetadata(locale: Locale): Metadata {
  const m = getMessages(locale)
  const meta = localeMeta[locale]
  const title = `${site.name} — ${m.meta.role}`

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description: m.meta.description,
    keywords: [...m.meta.keywords],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: meta.path,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      locale: meta.ogLocale,
      alternateLocale: localeMeta[otherLocale(locale)].ogLocale,
      url: meta.path,
      siteName: title,
      title,
      description: m.meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: m.meta.description,
      creator: site.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
}
