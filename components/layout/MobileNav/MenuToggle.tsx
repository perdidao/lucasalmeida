'use client'

import type { Ref } from 'react'
import styles from './MobileNav.module.css'

type MenuToggleProps = {
  open: boolean
  panelId: string
  onToggle: () => void
  ref?: Ref<HTMLButtonElement>
}

/**
 * The hamburger. Its two bars morph into a cross with a CSS transform — the
 * label is what actually communicates state to assistive tech, the glyph is
 * decorative.
 */
export function MenuToggle({ open, panelId, onToggle, ref }: MenuToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.toggle}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onToggle}
    >
      <span className={styles.toggleLabel}>{open ? 'Close menu' : 'Menu'}</span>
      <span className={styles.bars} data-open={open || undefined} aria-hidden="true">
        <span className={styles.bar} />
        <span className={styles.bar} />
      </span>
    </button>
  )
}
