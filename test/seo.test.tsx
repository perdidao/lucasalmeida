import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { buildMetadata, viewport } from '@/lib/i18n/metadata'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { StructuredData } from '@/components/seo/StructuredData'
import { Document } from '@/components/layout/Document'
import { getMessages } from '@/content'
import { site } from '@/content/config'
import { localeMeta, localeUrl, locales, type Locale } from '@/lib/i18n/config'

describe.each(locales)('metadata (%s)', (locale: Locale) => {
  const metadata = buildMetadata(locale)
  const m = getMessages(locale)

  it('sets its own canonical URL', () => {
    expect(metadata.metadataBase?.toString()).toContain('lucasalmeida.dev')
    expect(metadata.alternates?.canonical).toBe(localeMeta[locale].path)
  })

  it('has a localised, non-empty title and description', () => {
    const title = metadata.title as { default: string; template: string }
    expect(title.default).toContain(site.name)
    expect(title.default).toContain(m.meta.role)
    expect(metadata.description).toBe(m.meta.description)
    expect(metadata.description!.length).toBeGreaterThan(80)
    expect(metadata.description!.length).toBeLessThan(300)
  })

  it('describes an indexable page', () => {
    const robotsMeta = metadata.robots as { index: boolean; follow: boolean }
    expect(robotsMeta.index).toBe(true)
    expect(robotsMeta.follow).toBe(true)
  })

  /** hreflang must be reciprocal, or search engines discard the annotations. */
  it('lists every locale plus x-default, reciprocally', () => {
    const languages = metadata.alternates?.languages as Record<string, string>
    expect(languages['en']).toBe('/')
    expect(languages['pt-BR']).toBe('/pt-br')
    expect(languages['x-default']).toBe('/')
  })

  it('gets og:locale and its alternate the right way round', () => {
    const og = metadata.openGraph as {
      locale: string
      alternateLocale: string
      url: string
    }
    expect(og.locale).toBe(localeMeta[locale].ogLocale)
    expect(og.alternateLocale).not.toBe(og.locale)
    expect(og.url).toBe(localeMeta[locale].path)
  })

  it('declares the dark theme colour matching the design background', () => {
    expect(viewport.themeColor).toBe('#0a0a0b')
    expect(viewport.colorScheme).toBe('dark')
  })
})

describe('document language', () => {
  it.each(locales)('renders lang="%s" correctly', (locale: Locale) => {
    const html = renderToStaticMarkup(
      <Document locale={locale}>
        <p>content</p>
      </Document>,
    )
    expect(html).toContain(`lang="${localeMeta[locale].tag}"`)
  })

  it('does not label the Portuguese document as English', () => {
    const html = renderToStaticMarkup(
      <Document locale="pt-br">
        <p>conteúdo</p>
      </Document>,
    )
    expect(html).not.toContain('lang="en"')
  })
})

describe('sitemap and robots', () => {
  it('lists both locales', () => {
    const entries = sitemap()
    expect(entries).toHaveLength(2)
    expect(entries.map((e) => e.url)).toEqual([
      'https://www.lucasalmeida.dev',
      'https://www.lucasalmeida.dev/pt-br',
    ])
  })

  it('carries the alternates map on every entry', () => {
    for (const entry of sitemap()) {
      const languages = entry.alternates?.languages as Record<string, string>
      expect(languages['en']).toBe('https://www.lucasalmeida.dev')
      expect(languages['pt-BR']).toBe('https://www.lucasalmeida.dev/pt-br')
      expect(languages['x-default']).toBe('https://www.lucasalmeida.dev')
    }
  })

  it('allows crawling and points at the sitemap', () => {
    const result = robots()
    expect(result.sitemap).toBe(`${site.url}/sitemap.xml`)
    expect(result.rules).toEqual([{ userAgent: '*', allow: '/' }])
  })
})

describe.each(locales)('structured data (%s)', (locale: Locale) => {
  const m = getMessages(locale)

  it('emits a parseable JSON-LD graph with a Person', () => {
    const { container } = render(<StructuredData locale={locale} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()

    const parsed = JSON.parse(script!.textContent!)
    expect(parsed['@context']).toBe('https://schema.org')

    const person = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'Person',
    )
    expect(person.name).toBe(site.name)
    expect(person.jobTitle).toBe(m.meta.role)
    expect(person.sameAs.length).toBeGreaterThan(0)
  })

  it('declares the page language', () => {
    const { container } = render(<StructuredData locale={locale} />)
    const parsed = JSON.parse(container.querySelector('script')!.textContent!)
    const website = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'WebSite',
    )
    expect(website.inLanguage).toBe(localeMeta[locale].tag)
  })

  /** One person, two languages — not two people. */
  it('keeps the Person @id stable across locales', () => {
    const { container } = render(<StructuredData locale={locale} />)
    const parsed = JSON.parse(container.querySelector('script')!.textContent!)
    const person = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'Person',
    )
    const website = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'WebSite',
    )
    expect(person['@id']).toBe(`${site.url}/#person`)
    expect(website.publisher['@id']).toBe(person['@id'])
  })

  /** §9.1 — nothing in the payload may close the script element. */
  it('cannot break out of the script context', () => {
    const { container } = render(<StructuredData locale={locale} />)
    const raw = container.querySelector('script')!.innerHTML
    expect(raw.toLowerCase()).not.toContain('</script')
    expect(() => JSON.parse(raw)).not.toThrow()
  })

  /** §9.4 — the phone number stays out of machine-readable markup. */
  it('omits the phone number from structured data', () => {
    const { container } = render(<StructuredData locale={locale} />)
    expect(container.innerHTML).not.toContain('5543991578002')
  })
})

describe('URL consistency', () => {
  /**
   * The canonical tag, the sitemap and the JSON-LD must all spell each page's
   * URL identically — two spellings of one URL is the ambiguity canonicals exist
   * to remove. This caught `/` vs `` on the default locale.
   */
  it.each(locales)('spells the %s URL the same way everywhere', (locale: Locale) => {
    const expected = localeUrl(locale, site.url)

    const entry = sitemap().find((e) => e.url === expected)
    expect(entry, `sitemap is missing ${expected}`).toBeDefined()

    const { container } = render(<StructuredData locale={locale} />)
    const parsed = JSON.parse(container.querySelector('script')!.textContent!)
    const website = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'WebSite',
    )
    expect(website.url).toBe(expected)

    // Metadata stores the canonical as a path; Next resolves it against
    // metadataBase, so assert the path maps to the same absolute URL.
    const canonical = buildMetadata(locale).alternates?.canonical as string
    expect(localeUrl(locale, site.url)).toBe(
      canonical === '/' ? site.url : `${site.url}${canonical}`,
    )
  })
})
