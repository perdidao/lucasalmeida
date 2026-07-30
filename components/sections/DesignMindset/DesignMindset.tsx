import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import type { Messages } from '@/lib/i18n/types'
import styles from './DesignMindset.module.css'

export function DesignMindset({
  content,
}: {
  content: Messages['designMindset']
}) {
  return (
    <Section labelledBy="mindset-title">
      <div className={styles.grid}>
        <Eyebrow id="mindset-eyebrow">{content.eyebrow}</Eyebrow>

        <div>
          {/*
            The statement is the section's heading. It is styled as a pull quote
            rather than a title, but it still needs to be an h2 so the document
            outline stays intact.
          */}
          <h2 id="mindset-title" className={styles.statement}>
            {content.statement}
          </h2>

          <div className={styles.columns}>
            {content.paragraphs.map((paragraph) => (
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
