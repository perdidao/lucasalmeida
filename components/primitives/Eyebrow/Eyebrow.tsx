import type { ElementType, ReactNode } from 'react'
import styles from './Eyebrow.module.css'

type EyebrowProps = {
  children: ReactNode
  /**
   * Two sections in the design ("03 — Impact", "08 — About") use this label as
   * their only title. Rendering those as `h2` keeps the document outline
   * complete without changing how they look.
   */
  as?: ElementType
  /** Renders the lime status dot used in the hero. */
  withDot?: boolean
  tone?: 'subtle' | 'accent'
  id?: string
  className?: string
}

/** The uppercase mono label that opens every section ("01 — What I do"). */
export function Eyebrow({
  children,
  as: Tag = 'p',
  withDot = false,
  tone = 'subtle',
  id,
  className,
}: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={[styles.eyebrow, styles[tone], className]
        .filter(Boolean)
        .join(' ')}
    >
      {withDot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </Tag>
  )
}
