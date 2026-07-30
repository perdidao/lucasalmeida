import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { globalsCss } from './tokens'
import { FullPage } from './harness'
import { getMessages } from '@/content'
import { locales, type Locale } from '@/lib/i18n/config'

/**
 * Sections whose cards are static content. A :hover state on any of them
 * advertises a click that does nothing, which is why they were removed — and a
 * hover is trivially easy to reintroduce by copying a neighbouring rule.
 */
const STATIC_SECTION_STYLESHEETS = [
  'components/sections/Philosophy/Philosophy.module.css',
  'components/sections/HowIWork/HowIWork.module.css',
  'components/sections/Capabilities/Capabilities.module.css',
  'components/sections/Impact/Impact.module.css',
  'components/sections/DesignMindset/DesignMindset.module.css',
  'components/sections/About/About.module.css',
]

/**
 * Comments are stripped first: the files explaining *why* they have no hover
 * state say ":hover" in prose, which a naive substring check would flag.
 */
function rules(path: string): string {
  return readFileSync(join(process.cwd(), path), 'utf8').replace(
    /\/\*[\s\S]*?\*\//g,
    '',
  )
}

describe('hover affordances', () => {
  it.each(STATIC_SECTION_STYLESHEETS)(
    '%s declares no :hover state',
    (path) => {
      expect(rules(path)).not.toContain(':hover')
    },
  )

  it('keeps hover states on the things that are actually interactive', () => {
    // The counterpart assertion: removing hover everywhere would be just as wrong.
    for (const path of [
      'components/primitives/ButtonLink/ButtonLink.module.css',
      'components/layout/LocaleSwitcher/LocaleSwitcher.module.css',
      'components/sections/Contact/Contact.module.css',
    ]) {
      expect(rules(path), `${path} lost its hover state`).toContain(':hover')
    }
  })

  it('drops the unused hover-surface tokens', () => {
    expect(globalsCss).not.toMatch(/--surface(-2)?:/)
  })
})

describe('anchor scroll offset', () => {
  /**
   * Anchor targets must land flush under the fixed header. The `+ 1px` is the
   * header's bottom border, which --nav-h does not include; the previous value
   * added 1.5rem on top and left a visible 23px gap.
   */
  it('offsets by exactly the header height', () => {
    expect(globalsCss).toContain(
      'scroll-padding-top: calc(var(--nav-h) + 1px);',
    )
    expect(globalsCss).not.toContain('calc(var(--nav-h) + 1.5rem)')
  })
})

describe.each(locales)('header brand lockup (%s)', (locale: Locale) => {
  const m = getMessages(locale)

  it('shows the name without the role label', () => {
    render(<FullPage locale={locale} />)
    const banner = screen.getByRole('banner')

    expect(banner.textContent).toContain('Lucas Almeida')
    expect(banner.textContent).not.toContain(m.meta.role)
  })

  it('still names the role in the footer', () => {
    render(<FullPage locale={locale} />)
    expect(screen.getByRole('contentinfo').textContent).toContain(m.meta.role)
  })
})
