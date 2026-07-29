import type { ReactNode } from 'react'
import styles from './Pill.module.css'

/** Static outlined chip — industry tags in the consulting case study. */
export function Pill({ children }: { children: ReactNode }) {
  return <li className={styles.pill}>{children}</li>
}
