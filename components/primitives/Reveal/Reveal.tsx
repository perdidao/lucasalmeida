'use client'

import type { ReactNode } from 'react'
import { useReveal } from '@/lib/useReveal'
import styles from './Reveal.module.css'

type RevealProps = {
  children: ReactNode
  className?: string
}

/** Fades and lifts its children into place the first time they enter the viewport. */
export function Reveal({ children, className }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={[styles.reveal, className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
