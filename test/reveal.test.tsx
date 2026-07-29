import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, render, screen, waitFor } from '@testing-library/react'
import { Reveal } from '@/components/primitives/Reveal/Reveal'

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void

/** Captures the callback so a test can decide when the element "enters view". */
function stubObserver() {
  const state = {
    callback: undefined as ObserverCallback | undefined,
    disconnected: 0,
    observed: 0,
  }

  class Stub {
    constructor(callback: ObserverCallback) {
      state.callback = callback
    }
    observe() {
      state.observed += 1
    }
    unobserve() {}
    disconnect() {
      state.disconnected += 1
    }
    takeRecords() {
      return []
    }
  }

  vi.stubGlobal('IntersectionObserver', Stub)
  return state
}

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    })),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('Reveal', () => {
  it('always renders its children, revealed or not', () => {
    stubReducedMotion(false)
    stubObserver()
    render(
      <Reveal>
        <p>Visible content</p>
      </Reveal>,
    )
    expect(screen.getByText('Visible content')).toBeInTheDocument()
  })

  it('marks itself revealed once it intersects', async () => {
    stubReducedMotion(false)
    const state = stubObserver()

    const { container } = render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    )
    const node = container.firstElementChild!

    await waitFor(() => expect(state.observed).toBe(1))
    expect(node).not.toHaveAttribute('data-revealed')

    state.callback!([{ isIntersecting: true } as IntersectionObserverEntry])

    await waitFor(() => expect(node).toHaveAttribute('data-revealed', 'true'))
    expect(state.disconnected).toBeGreaterThan(0)
  })

  /** Legacy-browser failure path: no observer at all must mean visible, not hidden. */
  it('reveals immediately when IntersectionObserver is unavailable', async () => {
    stubReducedMotion(false)
    vi.stubGlobal('IntersectionObserver', undefined)

    const { container } = render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    )

    await waitFor(() =>
      expect(container.firstElementChild).toHaveAttribute(
        'data-revealed',
        'true',
      ),
    )
  })

  it('reveals immediately under prefers-reduced-motion and never observes', async () => {
    stubReducedMotion(true)
    const state = stubObserver()

    const { container } = render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    )

    await waitFor(() =>
      expect(container.firstElementChild).toHaveAttribute(
        'data-revealed',
        'true',
      ),
    )
    expect(state.observed).toBe(0)
  })

  /** Watchdog: an observer that never responds at all must not leave content hidden. */
  it('reveals via the watchdog when the observer never responds', async () => {
    vi.useFakeTimers()
    stubReducedMotion(false)
    stubObserver()

    const { container } = render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    )

    expect(container.firstElementChild).not.toHaveAttribute('data-revealed')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600)
    })

    expect(container.firstElementChild).toHaveAttribute('data-revealed', 'true')
  })

  /**
   * The watchdog must NOT blanket-reveal off-screen content. A working observer
   * that reports "not intersecting" means the user simply has not scrolled here
   * yet — revealing anyway would silently kill the scroll animation for every
   * section below the fold, which is exactly the bug this guards.
   */
  it('leaves off-screen content hidden when the observer is working', async () => {
    vi.useFakeTimers()
    stubReducedMotion(false)
    const state = stubObserver()

    const { container } = render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    )

    // A healthy observer reports immediately, even for off-screen targets.
    await act(async () => {
      state.callback!([{ isIntersecting: false } as IntersectionObserverEntry])
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000)
    })

    expect(container.firstElementChild).not.toHaveAttribute('data-revealed')
  })

  it('disconnects the observer on unmount', async () => {
    stubReducedMotion(false)
    const state = stubObserver()

    const { unmount } = render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    )
    await waitFor(() => expect(state.observed).toBe(1))

    unmount()
    expect(state.disconnected).toBeGreaterThan(0)
  })
})
