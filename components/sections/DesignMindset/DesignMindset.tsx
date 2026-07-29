import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { designMindset } from '@/content/site'
import styles from './DesignMindset.module.css'

export function DesignMindset() {
  return (
    <Section labelledBy="mindset-title">
      <div className={styles.grid}>
        <Eyebrow id="mindset-eyebrow">{designMindset.eyebrow}</Eyebrow>

        <div>
          {/*
            The statement is the section's heading. It is styled as a pull quote
            rather than a title, but it still needs to be an h2 so the document
            outline stays intact.
          */}
          <h2 id="mindset-title" className={styles.statement}>
            {designMindset.statement}
          </h2>

          <div className={styles.columns}>
            {designMindset.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
