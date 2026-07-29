import type { ReactNode } from 'react'
import { Container } from '@/components/primitives/Container/Container'
import { Reveal } from '@/components/primitives/Reveal/Reveal'
import styles from './Section.module.css'

type SectionProps = {
  children: ReactNode
  /** Anchor target. Also used to derive the heading id when `labelledBy` is omitted. */
  id?: string
  /** id of the heading that names this region — required for an accessible name. */
  labelledBy: string
  /** Reveal-on-scroll. Off for the hero, which animates on load instead. */
  reveal?: boolean
  /** The last section before the footer drops its divider. */
  divider?: boolean
  className?: string
}

/**
 * One page region: vertical rhythm, bottom hairline, centred container and the
 * scroll reveal. Every section is a labelled landmark, so screen-reader users
 * can jump between them by region.
 */
export function Section({
  children,
  id,
  labelledBy,
  reveal = true,
  divider = true,
  className,
}: SectionProps) {
  const body = <Container>{children}</Container>

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[styles.section, divider && styles.divider, className]
        .filter(Boolean)
        .join(' ')}
    >
      {reveal ? <Reveal>{body}</Reveal> : body}
    </section>
  )
}
