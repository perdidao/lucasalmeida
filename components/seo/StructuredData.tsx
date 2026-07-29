import { site, socialLinks } from '@/content/site'

/**
 * Schema.org graph for the page.
 *
 * The payload is built from a typed object literal and serialised with
 * `JSON.stringify` — never string concatenation. That is what makes the single
 * permitted use of `dangerouslySetInnerHTML` on this site safe: there is no
 * interpolation point an attacker could reach, and `JSON.stringify` escapes the
 * content. `</script>` cannot appear in the output because no value contains it.
 *
 * The phone number is deliberately absent: it is public on the contact row, but
 * structured data is scraped far more aggressively than rendered HTML.
 * See docs/plans/nextjs-portfolio-rewrite.md §9.1 and §9.4.
 */
export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        url: site.url,
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        description: site.description,
        knowsAbout: [...site.keywords],
        sameAs: socialLinks.filter((l) => l.isProfile).map((l) => l.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        description: site.description,
        inLanguage: 'en',
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
