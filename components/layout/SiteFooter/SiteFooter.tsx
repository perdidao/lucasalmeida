import { Container } from '@/components/primitives/Container/Container'
import { Logo } from '@/components/primitives/Logo/Logo'
import { site } from '@/content/config'
import styles from './SiteFooter.module.css'

export function SiteFooter({
  role,
  tagline,
  backToTop,
}: {
  role: string
  tagline: string
  backToTop: string
}) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p className={styles.brand}>
          <Logo size={20} />
          <span className={styles.name}>{site.name}</span>
          <span className={styles.role}>— {role}</span>
        </p>

        <p className={styles.tagline}>{tagline}</p>

        <a href="#top" className={styles.top}>
          {backToTop} <span aria-hidden="true">↑</span>
        </a>
      </Container>
    </footer>
  )
}
