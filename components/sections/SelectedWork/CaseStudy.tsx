import { Pill } from '@/components/primitives/Pill/Pill'
import { MediaFrame } from '@/components/primitives/MediaFrame/MediaFrame'
import { StatBlock } from '@/components/primitives/StatBlock/StatBlock'
import type { CaseStudyMessages } from '@/lib/i18n/types'
import styles from './CaseStudy.module.css'

type CaseStudyProps = {
  /** Stable, locale-independent id from content/config.ts — used for the heading id. */
  id: string
  /** Display number, derived from position so it cannot drift between locales. */
  index: string
  study: CaseStudyMessages
}

/** One case study: problem on the left, the decisions and outcome on the right. */
export function CaseStudy({ id, index, study }: CaseStudyProps) {
  const headingId = `case-${id}-title`

  return (
    <article aria-labelledby={headingId} className={styles.article}>
      <div className={styles.grid}>
        <div>
          <p className={styles.kicker}>
            <span className={styles.index}>{index}</span>
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
          {study.blocks.map((block, blockIndex) => (
            <div key={block.label} className={styles.block}>
              <h4 className={styles.blockLabel}>{block.label}</h4>
              <p
                className={blockIndex === 0 ? styles.blockLead : styles.blockBody}
              >
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
