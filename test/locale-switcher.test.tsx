import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher/LocaleSwitcher'
import { getMessages } from '@/content'
import { locales, localeMeta, type Locale } from '@/lib/i18n/config'

const label = (locale: Locale) => getMessages(locale).a11y.languageLabel

describe.each(locales)('LocaleSwitcher (current: %s)', (current: Locale) => {
  it('offers every locale', () => {
    render(<LocaleSwitcher current={current} label={label(current)} />)
    expect(screen.getAllByRole('link')).toHaveLength(locales.length)
  })

  it('marks only the current locale with aria-current', () => {
    const { container } = render(
      <LocaleSwitcher current={current} label={label(current)} />,
    )
    const marked = container.querySelectorAll('[aria-current]')
    expect(marked).toHaveLength(1)
    expect(marked[0]).toHaveTextContent(localeMeta[current].shortLabel)
  })

  it('labels the group so a bare "EN" has context', () => {
    render(<LocaleSwitcher current={current} label={label(current)} />)
    expect(
      screen.getByRole('navigation', { name: label(current) }),
    ).toBeInTheDocument()
  })

  /**
   * WCAG 2.5.3 Label in Name: the accessible name must contain the visible text,
   * or voice-control users cannot address the link by what they see.
   */
  it('includes the visible abbreviation in each accessible name', () => {
    render(<LocaleSwitcher current={current} label={label(current)} />)

    for (const locale of locales) {
      const meta = localeMeta[locale]
      const link = screen.getByRole('link', {
        name: `${meta.shortLabel} ${meta.nativeName}`,
      })
      // The visible text stays the bare abbreviation.
      expect(link).toHaveTextContent(meta.shortLabel)
      // ...and the accessible name contains it, separated by a real space.
      // Guards the "ENEnglish" concatenation bug a hidden span reintroduces.
      expect(link).toHaveAccessibleName(
        `${meta.shortLabel} ${meta.nativeName}`,
      )
    }
  })

  /**
   * Bare paths, no query string. Regression guard for removing `?lang=`: the
   * switcher navigates and nothing else — no preference is recorded anywhere.
   */
  it('points every link at that locale as a bare path', () => {
    render(<LocaleSwitcher current={current} label={label(current)} />)

    for (const locale of locales) {
      const meta = localeMeta[locale]
      const link = screen.getByRole('link', {
        name: `${meta.shortLabel} ${meta.nativeName}`,
      })
      expect(link).toHaveAttribute('href', meta.path)
      expect(link).toHaveAttribute('hreflang', meta.tag)
    }
  })

  it('carries no query string on any link', () => {
    const { container } = render(
      <LocaleSwitcher current={current} label={label(current)} />,
    )
    for (const link of Array.from(container.querySelectorAll('a[href]'))) {
      expect(link.getAttribute('href')).not.toContain('?')
    }
  })

  it('is reachable by keyboard', async () => {
    const user = userEvent.setup()
    render(<LocaleSwitcher current={current} label={label(current)} />)

    await user.tab()
    expect(screen.getAllByRole('link')[0]).toHaveFocus()
    await user.tab()
    expect(screen.getAllByRole('link')[1]).toHaveFocus()
  })
})

describe('LocaleSwitcher in the page', () => {
  it('shows the switcher in the language of the page it is on', () => {
    render(<LocaleSwitcher current="pt-br" label={label('pt-br')} />)
    expect(
      screen.getByRole('navigation', { name: 'Idioma' }),
    ).toBeInTheDocument()
  })
})
