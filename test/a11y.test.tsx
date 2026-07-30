import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { FullPage } from './harness'
import { getMessages } from '@/content'
import { locales, type Locale } from '@/lib/i18n/config'

/** Every assertion runs against both locales — a translation must not regress a11y. */
describe.each(locales)('accessibility (%s)', (locale: Locale) => {
  const m = getMessages(locale)

  it('has no axe violations', async () => {
    const { container } = render(<FullPage locale={locale} />)

    const results = await axe(container, {
      rules: {
        // jsdom has no layout or paint, so axe cannot compute rendered colours.
        // Contrast is covered exhaustively by contrast.test.ts instead.
        'color-contrast': { enabled: false },
      },
    })

    expect(results).toHaveNoViolations()
  })

  it('has exactly one h1', () => {
    render(<FullPage locale={locale} />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('never skips a heading level', () => {
    const { container } = render(<FullPage locale={locale} />)

    const levels = Array.from(
      container.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    ).map((el) => Number(el.tagName[1]))

    expect(levels.length).toBeGreaterThan(10)
    expect(levels[0]).toBe(1)

    levels.forEach((level, i) => {
      if (i === 0) return
      const previous = levels[i - 1] as number
      // Going deeper may only ever advance by one; coming back out is free.
      expect(level - previous).toBeLessThanOrEqual(1)
    })
  })

  it('exposes the expected landmarks', () => {
    render(<FullPage locale={locale} />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('gives every section an accessible name', () => {
    const { container } = render(<FullPage locale={locale} />)
    const sections = Array.from(container.querySelectorAll('section'))

    expect(sections.length).toBeGreaterThanOrEqual(10)

    for (const section of sections) {
      const labelledBy = section.getAttribute('aria-labelledby')
      expect(labelledBy).toBeTruthy()

      const label = container.querySelector(`#${CSS.escape(labelledBy!)}`)
      expect(label, `no element with id "${labelledBy}"`).not.toBeNull()
      expect(label!.textContent?.trim()).not.toBe('')
    }
  })

  it('names every case study region', () => {
    const { container } = render(<FullPage locale={locale} />)
    const articles = Array.from(container.querySelectorAll('article'))

    expect(articles).toHaveLength(3)
    for (const article of articles) {
      expect(article.getAttribute('aria-labelledby')).toBeTruthy()
    }
  })

  it('starts with a localised skip link that targets main', () => {
    render(<FullPage locale={locale} />)
    const skip = screen.getByRole('link', { name: m.a11y.skipToContent })
    expect(skip).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  })

  it('leaves no decorative graphic exposed to assistive tech', () => {
    const { container } = render(<FullPage locale={locale} />)
    for (const svg of Array.from(container.querySelectorAll('svg'))) {
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('keeps the anchor ids identical across locales', () => {
    const { container } = render(<FullPage locale={locale} />)
    for (const id of ['top', 'work', 'approach', 'about', 'contact']) {
      expect(
        container.querySelector(`#${id}`),
        `missing anchor #${id} in ${locale}`,
      ).not.toBeNull()
    }
  })
})
