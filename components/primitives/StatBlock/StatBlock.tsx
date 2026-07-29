import styles from './StatBlock.module.css'

type StatBlockProps = {
  value: string
  label: string
  accent?: boolean
  /** `impact` is the large top-rule treatment; `inline` is the case-study pair. */
  size?: 'impact' | 'inline'
}

/**
 * A headline figure with its explanation.
 *
 * The two are wrapped in a description list so the pairing survives without
 * visual context — a screen reader announces "15+ : Years building digital
 * products" rather than two loose fragments.
 */
export function StatBlock({
  value,
  label,
  accent = false,
  size = 'impact',
}: StatBlockProps) {
  return (
    <dl className={[styles.stat, styles[size]].join(' ')}>
      <dt className={[styles.value, accent && styles.accent].filter(Boolean).join(' ')}>
        {value}
      </dt>
      <dd className={styles.label}>{label}</dd>
    </dl>
  )
}
