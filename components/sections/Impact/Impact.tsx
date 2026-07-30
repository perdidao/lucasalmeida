import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { StatBlock } from '@/components/primitives/StatBlock/StatBlock'
import type { Messages } from '@/lib/i18n/types'
import styles from './Impact.module.css'

export function Impact({ content }: { content: Messages['impact'] }) {
  return (
    <Section labelledBy="impact-title">
      <div className={styles.head}>
        <Eyebrow as="h2" id="impact-title">
          {content.eyebrow}
        </Eyebrow>
        <p className={styles.aside}>{content.aside}</p>
      </div>

      <div className={styles.grid}>
        {content.stats.map((stat) => (
          <StatBlock
            key={stat.value + stat.label}
            value={stat.value}
            label={stat.label}
            accent={stat.accent}
          />
        ))}
      </div>
    </Section>
  )
}
