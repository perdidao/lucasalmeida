import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import type { Messages } from '@/lib/i18n/types'
import styles from './HowIWork.module.css'

export function HowIWork({ content }: { content: Messages['howIWork'] }) {
  return (
    <Section labelledBy="process-title">
      <Eyebrow className={styles.eyebrow}>{content.eyebrow}</Eyebrow>

      <h2 id="process-title" className={styles.heading}>
        {content.heading}
      </h2>

      <ol className={styles.grid}>
        {content.steps.map((step) => (
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
