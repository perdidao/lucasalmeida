import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { StatBlock } from '@/components/primitives/StatBlock/StatBlock'
import { impact } from '@/content/site'
import styles from './Impact.module.css'

export function Impact() {
  return (
    <Section labelledBy="impact-title">
      <div className={styles.head}>
        <Eyebrow as="h2" id="impact-title">
          {impact.eyebrow}
        </Eyebrow>
        <p className={styles.aside}>{impact.aside}</p>
      </div>

      <div className={styles.grid}>
        {impact.stats.map((stat) => (
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
