import type { ElementType, ReactNode } from 'react'
import styles from './Container.module.css'

type ContainerProps = {
  children: ReactNode
  /** Defaults to `div`; pass a semantic tag when the container *is* the region. */
  as?: ElementType
  className?: string
}

/** Centres content at the design's 1180px measure with the fluid page gutter. */
export function Container({
  children,
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag className={className ? `${styles.container} ${className}` : styles.container}>
      {children}
    </Tag>
  )
}
