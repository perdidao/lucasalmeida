import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import type { Messages } from '@/lib/i18n/types'
import styles from './Philosophy.module.css'

export function Philosophy({ content }: { content: Messages['philosophy'] }) {
  return (
    <Section labelledBy="philosophy-title">
      <div className={styles.head}>
        <Eyebrow className={styles.eyebrow}>{content.eyebrow}</Eyebrow>
        <h2 id="philosophy-title" className={styles.heading}>
          {content.heading}
        </h2>
      </div>

      <ol className={styles.grid}>
        {content.principles.map((principle) => (
          <li key={principle.numeral} className={styles.card}>
            <span className={styles.numeral} aria-hidden="true">
              {principle.numeral}
            </span>
            <h3 className={styles.title}>{principle.title}</h3>
            <p className={styles.body}>{principle.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
