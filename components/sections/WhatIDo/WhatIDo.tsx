import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import type { Messages } from '@/lib/i18n/types'
import styles from './WhatIDo.module.css'

export function WhatIDo({ content }: { content: Messages['whatIDo'] }) {
  return (
    <Section id="approach" labelledBy="approach-title">
      <div className={styles.grid}>
        <div>
          <Eyebrow className={styles.eyebrow}>{content.eyebrow}</Eyebrow>
          <h2 id="approach-title" className={styles.heading}>
            {content.heading}
          </h2>
          <p className={styles.body}>{content.body}</p>
          <p className={styles.quote}>
            {content.pullQuote.lead}{' '}
            <em className={styles.quoteTrail}>{content.pullQuote.trail}</em>
          </p>
        </div>

        <div className={styles.aside}>
          <Eyebrow id="lifecycle-label" className={styles.asideLabel}>
            {content.listLabel}
          </Eyebrow>
          <ol className={styles.list} aria-labelledby="lifecycle-label">
            {content.items.map((item, index) => (
              <li key={item} className={styles.item}>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
