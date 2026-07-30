import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { FullPage } from './harness'
import { getMessages } from '@/content'
import { caseIds, caseMedia, portraitSrc } from '@/content/config'
import { locales, type Locale } from '@/lib/i18n/config'

const allSources = [...Object.values(caseMedia), portraitSrc]

describe('media assets', () => {
  it.each(allSources)('%s exists in public/', (src) => {
    expect(existsSync(join(process.cwd(), 'public', src))).toBe(true)
  })

  it('declares a visual for the two case studies that have one', () => {
    expect(Object.keys(caseMedia).sort()).toEqual(['gamers-club', 'minehut'])
    // The consulting case deliberately has none — it shows industry tags.
    expect(caseMedia['consulting']).toBeUndefined()
  })

  it('uses public-relative paths', () => {
    for (const src of allSources) expect(src.startsWith('/')).toBe(true)
  })
})

describe.each(locales)('media in the page (%s)', (locale: Locale) => {
  const m = getMessages(locale)

  it('renders exactly the expected number of images', () => {
    render(<FullPage locale={locale} />)
    expect(screen.getAllByRole('img')).toHaveLength(allSources.length)
  })

  it('gives every image a meaningful, localised alt text', () => {
    render(<FullPage locale={locale} />)

    for (const image of screen.getAllByRole('img')) {
      const alt = image.getAttribute('alt') ?? ''
      expect(alt.trim(), 'empty alt').not.toBe('')
      // Guard against a filename or a lazy one-word placeholder standing in.
      expect(alt).not.toMatch(/\.(jpg|jpeg|png|webp|avif)$/i)
      expect(alt.trim().split(/\s+/).length).toBeGreaterThan(2)
    }
  })

  it('no longer renders the hatched placeholder for the filled slots', () => {
    const { container } = render(<FullPage locale={locale} />)
    // Every remaining empty frame would carry placeholder caption text; with all
    // three slots filled there should be none left.
    expect(container.querySelectorAll('[class*="empty"]')).toHaveLength(0)
  })

  it('carries the portrait alt from the message file', () => {
    render(<FullPage locale={locale} />)
    expect(
      screen.getByRole('img', { name: m.about.portraitAlt }),
    ).toBeInTheDocument()
  })

  it('carries each case study alt from the message file', () => {
    render(<FullPage locale={locale} />)

    m.selectedWork.cases.forEach((study, index) => {
      const caseId = caseIds[index]
      const hasMedia = caseId ? Boolean(caseMedia[caseId]) : false
      // alt text and image source must agree about whether a visual exists.
      expect(Boolean(study.mediaAlt), `${caseId} alt/src mismatch`).toBe(hasMedia)
      if (study.mediaAlt) {
        expect(
          screen.getByRole('img', { name: study.mediaAlt }),
        ).toBeInTheDocument()
      }
    })
  })
})
