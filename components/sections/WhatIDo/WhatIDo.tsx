import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { whatIDo } from '@/content/site'
import styles from './WhatIDo.module.css'

export function WhatIDo() {
  return (
    <Section id="approach" labelledBy="approach-title">
      <div className={styles.grid}>
        <div>
          <Eyebrow className={styles.eyebrow}>{whatIDo.eyebrow}</Eyebrow>
          <h2 id="approach-title" className={styles.heading}>
            {whatIDo.heading}
          </h2>
          <p className={styles.body}>{whatIDo.body}</p>
          <p className={styles.quote}>
            {whatIDo.pullQuote.lead}{' '}
            <em className={styles.quoteTrail}>{whatIDo.pullQuote.trail}</em>
          </p>
        </div>

        <div className={styles.aside}>
          <Eyebrow id="lifecycle-label" className={styles.asideLabel}>
            {whatIDo.listLabel}
          </Eyebrow>
          <ol className={styles.list} aria-labelledby="lifecycle-label">
            {whatIDo.items.map((item, index) => (
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
