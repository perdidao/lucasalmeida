import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { metadata, viewport } from '@/app/layout'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { StructuredData } from '@/components/seo/StructuredData'
import { site } from '@/content/site'

describe('metadata', () => {
  it('sets a canonical base and URL', () => {
    expect(metadata.metadataBase?.toString()).toContain('lucasalmeida.dev')
    expect(metadata.alternates?.canonical).toBe('/')
  })

  it('has a non-empty title and description', () => {
    const title = metadata.title as { default: string; template: string }
    expect(title.default).toContain(site.name)
    expect(title.default).toContain(site.role)
    expect(title.template).toContain('%s')
    expect(metadata.description).toBe(site.description)
    expect(metadata.description!.length).toBeGreaterThan(80)
    expect(metadata.description!.length).toBeLessThan(300)
  })

  it('describes an indexable page', () => {
    const robotsMeta = metadata.robots as { index: boolean; follow: boolean }
    expect(robotsMeta.index).toBe(true)
    expect(robotsMeta.follow).toBe(true)
  })

  it('carries Open Graph and Twitter cards', () => {
    expect(metadata.openGraph?.title).toContain(site.name)
    expect(metadata.openGraph?.description).toBeTruthy()
    expect((metadata.twitter as { card: string }).card).toBe(
      'summary_large_image',
    )
  })

  it('declares the dark theme colour matching the design background', () => {
    expect(viewport.themeColor).toBe('#0a0a0b')
    expect(viewport.colorScheme).toBe('dark')
  })
})

describe('sitemap and robots', () => {
  it('lists the canonical URL', () => {
    const entries = sitemap()
    expect(entries).toHaveLength(1)
    expect(entries[0]!.url).toBe(site.url)
  })

  it('allows crawling and points at the sitemap', () => {
    const result = robots()
    expect(result.sitemap).toBe(`${site.url}/sitemap.xml`)
    expect(result.rules).toEqual([{ userAgent: '*', allow: '/' }])
  })
})

describe('structured data', () => {
  it('emits a parseable JSON-LD graph with a Person', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    )
    expect(script).not.toBeNull()

    const parsed = JSON.parse(script!.textContent!)
    expect(parsed['@context']).toBe('https://schema.org')

    const person = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'Person',
    )
    expect(person.name).toBe(site.name)
    expect(person.jobTitle).toBe(site.role)
    expect(person.sameAs.length).toBeGreaterThan(0)

    const website = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'WebSite',
    )
    expect(website.publisher['@id']).toBe(person['@id'])
  })

  /** §9.1 — nothing in the payload may close the script element. */
  it('cannot break out of the script context', () => {
    const { container } = render(<StructuredData />)
    const raw = container.querySelector('script')!.innerHTML
    expect(raw.toLowerCase()).not.toContain('</script')
    expect(() => JSON.parse(raw)).not.toThrow()
  })

  /** §9.4 — the phone number stays out of machine-readable markup. */
  it('omits the phone number from structured data', () => {
    const { container } = render(<StructuredData />)
    expect(container.innerHTML).not.toContain('5543991578002')
  })
})
