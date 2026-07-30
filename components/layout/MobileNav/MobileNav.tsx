'use client'

import { useEffect, useRef } from 'react'
import { navCtaHref, navHrefs, navIds } from '@/content/config'
import type { Messages } from '@/lib/i18n/types'
import styles from './MobileNav.module.css'

type MobileNavProps = {
  id: string
  open: boolean
  onClose: () => void
  label: string
  nav: Messages['nav']
}

/**
 * The mobile disclosure panel.
 *
 * No animation library. The panel stays mounted and absolutely positioned, so
 * opening and closing is a plain CSS transition on opacity/transform — and
 * `inert` is what actually removes the closed panel from the tab order and the
 * accessibility tree. That combination gives a real exit animation without the
 * ~45 kB gzipped that an animation runtime costs, which is the whole reason
 * Framer Motion is not used here. See docs/plans/nextjs-portfolio-rewrite.md §5.
 */
export function MobileNav({ id, open, onClose, label, nav }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* Escape closes; Tab is trapped inside the open panel. */
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href]')
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  /* Freeze the page behind the panel, and always restore on unmount. */
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  /* Move focus into the panel once it opens. */
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
  }, [open])

  return (
    <div
      ref={panelRef}
      id={id}
      className={styles.panel}
      data-open={open || undefined}
      inert={!open}
    >
      <nav aria-label={label}>
        <ul className={styles.list}>
          {navIds.map((navId) => (
            <li key={navId}>
              <a
                href={navHrefs[navId]}
                className={styles.link}
                onClick={onClose}
              >
                {nav.labels[navId]}
              </a>
            </li>
          ))}
          <li>
            <a href={navCtaHref} className={styles.link} onClick={onClose}>
              {nav.cta}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
