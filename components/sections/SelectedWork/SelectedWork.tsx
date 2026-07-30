import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { CaseStudy } from './CaseStudy'
import { caseIds, caseMedia } from '@/content/config'
import type { Messages } from '@/lib/i18n/types'
import styles from './SelectedWork.module.css'

export function SelectedWork({
  content,
}: {
  content: Messages['selectedWork']
}) {
  return (
    <Section id="work" labelledBy="work-title" className={styles.section}>
      <Eyebrow className={styles.eyebrow}>{content.eyebrow}</Eyebrow>

      <h2 id="work-title" className={styles.heading}>
        {content.heading}
      </h2>

      <p className={styles.intro}>{content.intro}</p>

      {content.cases.map((study, index) => {
        const caseId = caseIds[index]
        return (
          <CaseStudy
            key={caseId ?? study.title}
            id={caseId ?? String(index)}
            index={String(index + 1).padStart(2, '0')}
            media={caseId ? caseMedia[caseId] : undefined}
            study={study}
          />
        )
      })}
    </Section>
  )
}
