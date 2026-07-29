import { Section } from '@/components/primitives/Section/Section'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { ExternalLink } from '@/components/primitives/ExternalLink/ExternalLink'
import { contact, site, socialLinks } from '@/content/site'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" divider={false}>
      <Eyebrow className={styles.eyebrow}>{contact.eyebrow}</Eyebrow>

      <h2 id="contact-title" className={styles.heading}>
        {contact.heading}
      </h2>

      <p className={styles.body}>{contact.body}</p>

      <a href={`mailto:${site.email}`} className={styles.email}>
        {site.email}
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </a>

      <ul className={styles.links}>
        {socialLinks.map((link) => (
          <li key={link.href}>
            <ExternalLink href={link.href} className={styles.pill}>
              {link.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
