'use client'

import { useEffect, useRef } from 'react'

/**
 * How long to wait for the observer to prove it works.
 *
 * IntersectionObserver is specified to deliver an initial callback shortly after
 * `observe()`, whether or not the target is visible. So silence past this point
 * means the observer is not functioning, not that the element is off-screen —
 * which is exactly the distinction that lets the watchdog rescue broken pages
 * without blanket-revealing content the user has not scrolled to yet.
 */
const WATCHDOG_MS = 1500

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Deliberately not Framer Motion, and deliberately not React state: revealing
 * is a one-shot visual change, so the effect writes `data-revealed` straight to
 * the node and CSS runs the transition on the compositor. Nothing re-renders,
 * and the animation never touches the main thread.
 *
 * Three ways it degrades, all of which end with the content *visible*:
 *   - no IntersectionObserver (old browser)  -> revealed immediately
 *   - prefers-reduced-motion: reduce         -> revealed immediately
 *   - observer present but never responds    -> revealed after WATCHDOG_MS
 *
 * With JavaScript off nothing here runs at all, and the CSS keeps the content
 * visible because the hidden state is gated on `@media (scripting: enabled)`.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reveal = () => {
      element.dataset.revealed = 'true'
    }

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    let observerResponded = false

    const observer = new IntersectionObserver(
      (entries) => {
        observerResponded = true
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal()
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(element)

    const watchdog = window.setTimeout(() => {
      if (observerResponded) return
      reveal()
      observer.disconnect()
    }, WATCHDOG_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(watchdog)
    }
  }, [])

  return ref
}
