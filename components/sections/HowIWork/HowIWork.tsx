import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { howIWork } from '@/content/site'
import styles from './HowIWork.module.css'

export function HowIWork() {
  return (
    <Section labelledBy="process-title">
      <Eyebrow className={styles.eyebrow}>{howIWork.eyebrow}</Eyebrow>

      <h2 id="process-title" className={styles.heading}>
        {howIWork.heading}
      </h2>

      <ol className={styles.grid}>
        {howIWork.steps.map((step) => (
          <li key={step.index} className={styles.step}>
            <span className={styles.index} aria-hidden="true">
              {step.index}
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.body}>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
