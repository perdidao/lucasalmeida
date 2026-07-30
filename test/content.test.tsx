import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { FullPage } from './harness'
import { getMessages } from '@/content'
import { navCtaHref, navHrefs, site, socialLinks } from '@/content/config'
import { locales, type Locale } from '@/lib/i18n/config'

describe('content integrity (locale-independent)', () => {
  it('exposes only well-formed hrefs', () => {
    const hrefs = [
      ...Object.values(navHrefs),
      navCtaHref,
      ...socialLinks.map((l) => l.href),
    ]

    for (const href of hrefs) {
      const wellFormed =
        href.startsWith('#') || href.startsWith('mailto:') || URL.canParse(href)
      expect(wellFormed, `malformed href: ${href}`).toBe(true)
    }
  })

  it('keeps the real contact address, not the design placeholder', () => {
    expect(site.email).toBe('contato@lucasalmeida.dev')
  })
})

describe.each(locales)('content integrity (%s)', (locale: Locale) => {
  it('resolves every in-page anchor to a real element', () => {
    const { container } = render(<FullPage locale={locale} />)

    const anchors = Array.from(container.querySelectorAll('a[href^="#"]'))
      .map((a) => a.getAttribute('href')!)
      .filter((href) => href.length > 1)

    expect(anchors.length).toBeGreaterThan(0)

    for (const href of new Set(anchors)) {
      const target = container.querySelector(`#${CSS.escape(href.slice(1))}`)
      expect(target, `dead anchor: ${href}`).not.toBeNull()
    }
  })

  /**
   * Reverse-tabnabbing guard, enforced in both locales. If someone bypasses
   * ExternalLink and hand-rolls a `target="_blank"` anchor, this fails.
   * See docs/plans/nextjs-portfolio-rewrite.md §9.2.
   */
  it('protects every link that opens a new tab', () => {
    const { container } = render(<FullPage locale={locale} />)
    const external = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    )

    expect(external.length).toBeGreaterThan(0)

    for (const link of external) {
      const rel = link.getAttribute('rel') ?? ''
      expect(rel, `${link.href} is missing noopener`).toContain('noopener')
      expect(rel, `${link.href} is missing noreferrer`).toContain('noreferrer')
    }
  })

  it('never opens same-document or mailto links in a new tab', () => {
    const { container } = render(<FullPage locale={locale} />)

    for (const link of Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href]'),
    )) {
      const href = link.getAttribute('href')!
      if (href.startsWith('#') || href.startsWith('mailto:')) {
        expect(link).not.toHaveAttribute('target')
      }
    }
  })

  it('gives every link a non-empty accessible name', () => {
    const { container } = render(<FullPage locale={locale} />)
    for (const link of Array.from(container.querySelectorAll('a[href]'))) {
      const name = (
        link.textContent ??
        link.getAttribute('aria-label') ??
        ''
      ).trim()
      expect(name, `unnamed link: ${link.getAttribute('href')}`).not.toBe('')
    }
  })

  it('renders the contact address and no placeholder address', () => {
    const { container } = render(<FullPage locale={locale} />)
    expect(
      container.querySelector(`a[href="mailto:${site.email}"]`),
    ).not.toBeNull()
    expect(container.innerHTML).not.toContain('hello@lucasalmeida.dev')
  })

  it('renders the localised nav labels', () => {
    const m = getMessages(locale)
    const { container } = render(<FullPage locale={locale} />)
    expect(container.textContent).toContain(m.nav.labels.work)
    expect(container.textContent).toContain(m.nav.cta)
  })
})
