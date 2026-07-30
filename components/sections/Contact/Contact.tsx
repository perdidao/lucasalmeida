import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { ExternalLink } from '@/components/primitives/ExternalLink/ExternalLink'
import { site, socialLinks } from '@/content/config'
import type { Messages } from '@/lib/i18n/types'
import styles from './Contact.module.css'

export function Contact({
  content,
  socialLabels,
}: {
  content: Messages['contact']
  socialLabels: Messages['social']
}) {
  return (
    <Section id="contact" labelledBy="contact-title" divider={false}>
      <Eyebrow className={styles.eyebrow}>{content.eyebrow}</Eyebrow>

      <h2 id="contact-title" className={styles.heading}>
        {content.heading}
      </h2>

      <p className={styles.body}>{content.body}</p>

      <a href={`mailto:${site.email}`} className={styles.email}>
        {site.email}
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </a>

      <ul className={styles.links}>
        {socialLinks.map((link) => (
          <li key={link.id}>
            <ExternalLink href={link.href} className={styles.pill}>
              {socialLabels[link.id]}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
