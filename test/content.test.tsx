import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { FullPage } from './harness'
import { navItems, navCta, socialLinks, site } from '@/content/site'

describe('content integrity', () => {
  it('exposes only well-formed hrefs', () => {
    const hrefs = [
      ...navItems.map((i) => i.href),
      navCta.href,
      ...socialLinks.map((l) => l.href),
    ]

    for (const href of hrefs) {
      const wellFormed =
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        URL.canParse(href)
      expect(wellFormed, `malformed href: ${href}`).toBe(true)
    }
  })

  it('resolves every in-page anchor to a real element', () => {
    const { container } = render(<FullPage />)

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
   * Reverse-tabnabbing guard. If someone ever bypasses ExternalLink and hand-rolls
   * a `target="_blank"` anchor, this fails.
   * See docs/plans/nextjs-portfolio-rewrite.md §9.2.
   */
  it('protects every link that opens a new tab', () => {
    const { container } = render(<FullPage />)
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
    const { container } = render(<FullPage />)
    const links = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href]'),
    )

    for (const link of links) {
      const href = link.getAttribute('href')!
      if (href.startsWith('#') || href.startsWith('mailto:')) {
        expect(link).not.toHaveAttribute('target')
      }
    }
  })

  it('gives every link a non-empty accessible name', () => {
    const { container } = render(<FullPage />)
    for (const link of Array.from(container.querySelectorAll('a[href]'))) {
      const name = (
        link.textContent ??
        link.getAttribute('aria-label') ??
        ''
      ).trim()
      expect(name, `unnamed link: ${link.getAttribute('href')}`).not.toBe('')
    }
  })

  it('renders the real contact address, not the design placeholder', () => {
    const { container } = render(<FullPage />)
    expect(site.email).toBe('contato@lucasalmeida.dev')
    expect(
      container.querySelector(`a[href="mailto:${site.email}"]`),
    ).not.toBeNull()
    expect(container.innerHTML).not.toContain('hello@lucasalmeida.dev')
  })
})
