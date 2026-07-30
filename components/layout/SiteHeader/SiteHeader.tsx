'use client'

import { useCallback, useId, useRef, useState } from 'react'
import { Logo } from '@/components/primitives/Logo/Logo'
import { ButtonLink } from '@/components/primitives/ButtonLink/ButtonLink'
import { MobileNav } from '@/components/layout/MobileNav/MobileNav'
import { MenuToggle } from '@/components/layout/MobileNav/MenuToggle'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher/LocaleSwitcher'
import { navCtaHref, navHrefs, navIds, site } from '@/content/config'
import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/types'
import styles from './SiteHeader.module.css'

type SiteHeaderProps = {
  locale: Locale
  nav: Messages['nav']
  a11y: Messages['a11y']
}

export function SiteHeader({ locale, nav, a11y }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  /** Always hand focus back to the trigger so keyboard users are not dropped. */
  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand}>
          <Logo size={26} />
          <span className={styles.name}>{site.name}</span>
        </a>

        <div className={styles.actions}>
          <nav className={styles.desktopNav} aria-label={a11y.navPrimary}>
            <ul className={styles.links}>
              {navIds.map((id) => (
                <li key={id}>
                  <a href={navHrefs[id]} className={styles.link}>
                    {nav.labels[id]}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink href={navCtaHref} variant="outline" size="sm">
              {nav.cta}
            </ButtonLink>
          </nav>

          <LocaleSwitcher current={locale} label={a11y.languageLabel} />

          <MenuToggle
            ref={toggleRef}
            open={open}
            panelId={panelId}
            openLabel={a11y.menuOpen}
            closeLabel={a11y.menuClose}
            onToggle={() => (open ? close() : setOpen(true))}
          />
        </div>
      </div>

      <MobileNav
        id={panelId}
        open={open}
        onClose={close}
        label={a11y.navMobile}
        nav={nav}
      />
    </header>
  )
}
