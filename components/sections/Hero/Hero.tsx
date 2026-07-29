import { Container } from '@/components/primitives/Container/Container'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { ButtonLink } from '@/components/primitives/ButtonLink/ButtonLink'
import { hero } from '@/content/site'
import styles from './Hero.module.css'

/**
 * The hero animates on load rather than on scroll — it is already in view, so
 * a CSS keyframe with staggered delays beats waiting for hydration.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className={styles.hero}>
      <Container>
        <Eyebrow withDot className={styles.eyebrow}>
          {hero.eyebrow}
        </Eyebrow>

        <h1 id="hero-title" className={styles.title}>
          {hero.headingBefore}
          <em className={styles.emphasis}>{hero.headingEmphasis}</em>
          {hero.headingAfter}
        </h1>

        <div className={styles.intro}>
          {hero.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.actions}>
          <ButtonLink href={hero.primaryCta.href} withArrow>
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="outline">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
