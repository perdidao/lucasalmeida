import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import type { Messages } from '@/lib/i18n/types'
import styles from './Capabilities.module.css'

export function Capabilities({
  content,
}: {
  content: Messages['capabilities']
}) {
  return (
    <Section labelledBy="capabilities-title">
      <div className={styles.head}>
        <div>
          <Eyebrow className={styles.eyebrow}>{content.eyebrow}</Eyebrow>
          <h2 id="capabilities-title" className={styles.heading}>
            {content.heading}
          </h2>
        </div>
        <p className={styles.aside}>{content.aside}</p>
      </div>

      <div className={styles.grid}>
        {content.groups.map((group) => (
          <div key={group.label} className={styles.group}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
