import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { MediaFrame } from '@/components/primitives/MediaFrame/MediaFrame'
import { about } from '@/content/site'
import styles from './About.module.css'

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <Eyebrow as="h2" id="about-title" className={styles.eyebrow}>
        {about.eyebrow}
      </Eyebrow>

      <div className={styles.grid}>
        <div>
          {/* A description list: each period of the career is a term, the work
              done in it is the description. */}
          <dl className={styles.timeline}>
            {about.milestones.map((milestone) => (
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

          <p className={styles.closing}>{about.closing}</p>
        </div>

        <div className={styles.portrait}>
          <MediaFrame
            caption={about.portraitCaption}
            variant="portrait"
            monogram
          />
        </div>
      </div>
    </Section>
  )
}
