import type { ReactNode } from 'react'
import styles from './ButtonLink.module.css'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  /** solid = light fill (hero primary); outline = hairline border. */
  variant?: 'solid' | 'outline'
  size?: 'md' | 'sm'
  /** Appends the design's trailing arrow glyph. */
  withArrow?: boolean
  className?: string
}

/**
 * The pill-shaped call-to-action. All hrefs on this site are in-page anchors or
 * mailto: links, so this deliberately renders a plain `<a>` — external
 * destinations go through `ExternalLink`, which adds the rel guard.
 */
export function ButtonLink({
  href,
  children,
  variant = 'solid',
  size = 'md',
  withArrow = false,
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={[styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      {withArrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </a>
  )
}
