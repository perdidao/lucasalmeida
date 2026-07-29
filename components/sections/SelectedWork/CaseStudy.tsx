import { Pill } from '@/components/primitives/Pill/Pill'
import { MediaFrame } from '@/components/primitives/MediaFrame/MediaFrame'
import { StatBlock } from '@/components/primitives/StatBlock/StatBlock'
import type { CaseStudyContent } from '@/content/site'
import styles from './CaseStudy.module.css'

/** One case study: problem on the left, the decisions and outcome on the right. */
export function CaseStudy({ study }: { study: CaseStudyContent }) {
  const headingId = `case-${study.id}-title`

  return (
    <article aria-labelledby={headingId} className={styles.article}>
      <div className={styles.grid}>
        <div>
          <p className={styles.kicker}>
            <span className={styles.index}>{study.index}</span>
            <span className={styles.kickerText}>{study.kicker}</span>
          </p>

          <h3 id={headingId} className={styles.title}>
            {study.title}
          </h3>

          <p className={styles.summary}>{study.summary}</p>

          {study.mediaCaption && (
            <MediaFrame caption={study.mediaCaption} variant="wide" />
          )}

          {study.tags && (
            <ul className={styles.tags}>
              {study.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.blocks}>
          {study.blocks.map((block, index) => (
            <div key={block.label} className={styles.block}>
              <h4 className={styles.blockLabel}>{block.label}</h4>
              <p className={index === 0 ? styles.blockLead : styles.blockBody}>
                {block.body}
              </p>
            </div>
          ))}

          <div className={styles.block}>
            <h4 className={`${styles.blockLabel} ${styles.outcomeLabel}`}>
              {study.outcomeLabel}
            </h4>

            {study.outcomeBody && (
              <p className={styles.outcomeBody}>{study.outcomeBody}</p>
            )}

            {study.outcomeStats && (
              <div className={styles.outcomeStats}>
                {study.outcomeStats.map((stat) => (
                  <StatBlock
                    key={stat.value + stat.label}
                    value={stat.value}
                    label={stat.label}
                    size="inline"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
