import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { MediaFrame } from '@/components/primitives/MediaFrame/MediaFrame'
import { portraitSrc } from '@/content/config'
import type { Messages } from '@/lib/i18n/types'
import styles from './About.module.css'

export function About({ content }: { content: Messages['about'] }) {
  return (
    <Section id="about" labelledBy="about-title">
      <Eyebrow as="h2" id="about-title" className={styles.eyebrow}>
        {content.eyebrow}
      </Eyebrow>

      <div className={styles.grid}>
        <div>
          {/* A description list: each period of the career is a term, the work
              done in it is the description. */}
          <dl className={styles.timeline}>
            {content.milestones.map((milestone) => (
              <div
                key={milestone.when}
                className={styles.milestone}
                data-current={milestone.current || undefined}
              >
                <dt className={styles.when}>{milestone.when}</dt>
                <dd className={styles.what}>{milestone.what}</dd>
              </div>
            ))}
          </dl>

          <p className={styles.closing}>{content.closing}</p>
        </div>

        <div className={styles.portrait}>
          <MediaFrame
            src={portraitSrc}
            alt={content.portraitAlt}
            variant="portrait"
          />
        </div>
      </div>
    </Section>
  )
}
