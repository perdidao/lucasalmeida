import { Container } from '@/components/primitives/Container/Container'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { ButtonLink } from '@/components/primitives/ButtonLink/ButtonLink'
import { navCtaHref, navHrefs } from '@/content/config'
import type { Messages } from '@/lib/i18n/types'
import styles from './Hero.module.css'

/**
 * The hero animates on load rather than on scroll — it is already in view, so
 * a CSS keyframe with staggered delays beats waiting for hydration.
 */
export function Hero({
  content,
  tagline,
}: {
  content: Messages['hero']
  tagline: string
}) {
  return (
    <section id="top" aria-labelledby="hero-title" className={styles.hero}>
      <Container>
        <Eyebrow withDot className={styles.eyebrow}>
          {tagline}
        </Eyebrow>

        <h1 id="hero-title" className={styles.title}>
          {content.headingBefore}
          <em className={styles.emphasis}>{content.headingEmphasis}</em>
          {content.headingAfter}
        </h1>

        <div className={styles.intro}>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.actions}>
          <ButtonLink href={navHrefs.work} withArrow>
            {content.primaryCta}
          </ButtonLink>
          <ButtonLink href={navCtaHref} variant="outline">
            {content.secondaryCta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
