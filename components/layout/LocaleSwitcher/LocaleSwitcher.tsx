import { locales, localeMeta, type Locale } from '@/lib/i18n/config'
import styles from './LocaleSwitcher.module.css'

type LocaleSwitcherProps = {
  current: Locale
  /** aria-label for the group, e.g. "Language" / "Idioma". */
  label: string
}

/**
 * `EN / PT` toggle.
 *
 * Plain links to each locale's own URL — no query string, no cookie, nothing
 * remembered. Choosing a language is navigating to it, which is the whole
 * mechanism: English is the default for everyone and the visitor opts in to
 * Portuguese. The current locale is still rendered as a link so both options
 * read as equivalent choices rather than one being a dead label.
 *
 * Each link shows the two-letter abbreviation and carries an explicit
 * `aria-label` of "EN English" / "PT Português". The label is set directly
 * rather than with a visually-hidden span, because the accessible-name algorithm
 * concatenates child text with no separator — a hidden `<span> English</span>`
 * computes as "ENEnglish", which reads as one garbled word.
 *
 * The label deliberately keeps the visible "EN" in front of the language name:
 * an accessible name must contain the visible label for voice control to address
 * it (WCAG 2.5.3 Label in Name), and "EN" alone is not meaningful read aloud.
 */
export function LocaleSwitcher({ current, label }: LocaleSwitcherProps) {
  return (
    <nav className={styles.switcher} aria-label={label}>
      <ul className={styles.list}>
        {locales.map((locale) => {
          const meta = localeMeta[locale]
          const isCurrent = locale === current

          return (
            <li key={locale}>
              <a
                href={meta.path}
                className={styles.link}
                hrefLang={meta.tag}
                aria-label={`${meta.shortLabel} ${meta.nativeName}`}
                data-current={isCurrent || undefined}
                {...(isCurrent ? { 'aria-current': true } : {})}
              >
                {meta.shortLabel}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
