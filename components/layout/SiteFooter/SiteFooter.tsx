import { Container } from '@/components/primitives/Container/Container'
import { Logo } from '@/components/primitives/Logo/Logo'
import { footer, site } from '@/content/site'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p className={styles.brand}>
          <Logo size={20} />
          <span className={styles.name}>{site.name}</span>
          <span className={styles.role}>— {site.role}</span>
        </p>

        <p className={styles.tagline}>{footer.tagline}</p>

        <a href="#top" className={styles.top}>
          {footer.backToTop} <span aria-hidden="true">↑</span>
        </a>
      </Container>
    </footer>
  )
}
