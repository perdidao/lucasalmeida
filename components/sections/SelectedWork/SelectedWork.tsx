import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { CaseStudy } from './CaseStudy'
import { selectedWork } from '@/content/site'
import styles from './SelectedWork.module.css'

export function SelectedWork() {
  return (
    <Section id="work" labelledBy="work-title" className={styles.section}>
      <Eyebrow className={styles.eyebrow}>{selectedWork.eyebrow}</Eyebrow>

      <h2 id="work-title" className={styles.heading}>
        {selectedWork.heading}
      </h2>

      <p className={styles.intro}>{selectedWork.intro}</p>

      {selectedWork.cases.map((study) => (
        <CaseStudy key={study.id} study={study} />
      ))}
    </Section>
  )
}
