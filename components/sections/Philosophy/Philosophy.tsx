import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { philosophy } from '@/content/site'
import styles from './Philosophy.module.css'

export function Philosophy() {
  return (
    <Section labelledBy="philosophy-title">
      <div className={styles.head}>
        <Eyebrow className={styles.eyebrow}>{philosophy.eyebrow}</Eyebrow>
        <h2 id="philosophy-title" className={styles.heading}>
          {philosophy.heading}
        </h2>
      </div>

      <ol className={styles.grid}>
        {philosophy.principles.map((principle) => (
          <li key={principle.title} className={styles.card}>
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
