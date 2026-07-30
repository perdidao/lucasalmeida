import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { headerProps } from './harness'
import { getMessages } from '@/content'

const toggle = () => screen.getByRole('button', { name: /menu/i })

/**
 * The panel stays mounted and `inert` when closed, which correctly removes it
 * from the accessibility tree — so it cannot be found by role while closed.
 * Resolving it through `aria-controls` works in both states, and doubles as a
 * check that the trigger really is wired to the panel.
 */
const panelRoot = () => {
  const id = toggle().getAttribute('aria-controls')
  expect(id).toBeTruthy()
  const root = document.getElementById(id!)
  expect(root, `aria-controls points at missing id "${id}"`).not.toBeNull()
  return root!
}

describe('mobile navigation', () => {
  it('starts closed, collapsed and inert', () => {
    render(<SiteHeader {...headerProps()} />)
    expect(toggle()).toHaveAttribute('aria-expanded', 'false')

    const root = panelRoot()
    expect(root).not.toHaveAttribute('data-open')
    expect(root).toHaveAttribute('inert')
  })

  it('opens on click, drops inert and points aria-controls at the panel', async () => {
    const user = userEvent.setup()
    render(<SiteHeader {...headerProps()} />)

    await user.click(toggle())

    expect(toggle()).toHaveAttribute('aria-expanded', 'true')

    const root = panelRoot()
    expect(root).toHaveAttribute('data-open')
    expect(root).not.toHaveAttribute('inert')
    expect(
      root.querySelector('nav[aria-label="Primary, mobile"]'),
    ).not.toBeNull()
  })

  it('moves focus into the panel when it opens', async () => {
    const user = userEvent.setup()
    render(<SiteHeader {...headerProps()} />)

    await user.click(toggle())

    const first = panelRoot().querySelector<HTMLElement>('a[href]')!
    await waitFor(() => expect(first).toHaveFocus())
    expect(first).toHaveTextContent(getMessages('en').nav.labels.work)
  })

  it('closes on Escape and hands focus back to the trigger', async () => {
    const user = userEvent.setup()
    render(<SiteHeader {...headerProps()} />)

    await user.click(toggle())
    await user.keyboard('{Escape}')

    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
    expect(panelRoot()).toHaveAttribute('inert')
    expect(toggle()).toHaveFocus()
  })

  it('closes when a link inside it is chosen', async () => {
    const user = userEvent.setup()
    render(<SiteHeader {...headerProps()} />)

    await user.click(toggle())

    const link = panelRoot().querySelector<HTMLElement>(
      'a[href="#contact"]',
    )!
    await user.click(link)

    expect(toggle()).toHaveAttribute('aria-expanded', 'false')
  })

  it('traps Tab inside the open panel', async () => {
    const user = userEvent.setup()
    render(<SiteHeader {...headerProps()} />)

    await user.click(toggle())

    const links = Array.from(
      panelRoot().querySelectorAll<HTMLElement>('a[href]'),
    )
    expect(links.length).toBeGreaterThan(1)

    const last = links[links.length - 1]!
    last.focus()
    await user.tab()
    expect(document.activeElement).toBe(links[0])

    await user.tab({ shift: true })
    expect(document.activeElement).toBe(last)
  })

  /** Failure path: rapid toggling must not desynchronise state or scroll lock. */
  it('survives a rapid triple toggle', async () => {
    const user = userEvent.setup()
    render(<SiteHeader {...headerProps()} />)

    await user.click(toggle())
    await user.click(toggle())
    await user.click(toggle())

    expect(toggle()).toHaveAttribute('aria-expanded', 'true')
    expect(panelRoot()).toHaveAttribute('data-open')
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('locks page scroll while open and restores it on close', async () => {
    const user = userEvent.setup()
    render(<SiteHeader {...headerProps()} />)

    const before = document.body.style.overflow

    await user.click(toggle())
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'))

    await user.keyboard('{Escape}')
    await waitFor(() => expect(document.body.style.overflow).toBe(before))
  })

  /** Failure path: unmounting while open must not leave listeners or a frozen page. */
  it('cleans up listeners and scroll lock when unmounted while open', async () => {
    const user = userEvent.setup()
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const { unmount } = render(<SiteHeader {...headerProps()} />)

    await user.click(toggle())
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'))

    unmount()

    expect(document.body.style.overflow).not.toBe('hidden')
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    removeSpy.mockRestore()
  })

  it('keeps the desktop nav labelled separately from the mobile one', () => {
    render(<SiteHeader {...headerProps()} />)
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Primary, mobile' }),
    ).toBeInTheDocument()
  })
})
