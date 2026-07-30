import { getMessages } from '@/content'
import { site, socialLinks } from '@/content/config'
import { localeMeta, localeUrl, type Locale } from '@/lib/i18n/config'

/**
 * Schema.org graph for the page.
 *
 * The payload is built from a typed object literal and serialised with
 * `JSON.stringify` — never string concatenation. That is what makes the single
 * permitted use of `dangerouslySetInnerHTML` on this site safe: there is no
 * interpolation point an attacker could reach, and `JSON.stringify` escapes the
 * content. `</script>` cannot appear in the output because no value contains it.
 *
 * Both locales describe the *same* Person under the same `@id`, so this is one
 * entity documented in two languages rather than two people. Only `WebSite` is
 * per-locale, since that is what `inLanguage` describes.
 *
 * The phone number is deliberately absent: it is public on the contact row, but
 * structured data is scraped far more aggressively than rendered HTML.
 * See docs/plans/nextjs-portfolio-rewrite.md §9.1 and §9.4.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const m = getMessages(locale)
  const meta = localeMeta[locale]
  const pageUrl = localeUrl(locale, site.url)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        url: site.url,
        jobTitle: m.meta.role,
        email: `mailto:${site.email}`,
        description: m.meta.description,
        knowsAbout: [...m.meta.keywords],
        sameAs: socialLinks.filter((l) => l.isProfile).map((l) => l.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${pageUrl}#website`,
        url: pageUrl,
        name: `${site.name} — ${m.meta.role}`,
        description: m.meta.description,
        inLanguage: meta.tag,
        publisher: { '@id': `${site.url}/#person` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- see the note above: static, JSON.stringify-serialised, no interpolation.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
