'use client'

import { useCallback, useId, useRef, useState } from 'react'
import { Logo } from '@/components/primitives/Logo/Logo'
import { ButtonLink } from '@/components/primitives/ButtonLink/ButtonLink'
import { MobileNav } from '@/components/layout/MobileNav/MobileNav'
import { MenuToggle } from '@/components/layout/MobileNav/MenuToggle'
import { navItems, navCta, site } from '@/content/site'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
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
          <span className={styles.role}>{site.role}</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={navCta.href} variant="outline" size="sm">
            {navCta.label}
          </ButtonLink>
        </nav>

        <MenuToggle
          ref={toggleRef}
          open={open}
          panelId={panelId}
          onToggle={() => (open ? close() : setOpen(true))}
        />
      </div>

      <MobileNav id={panelId} open={open} onClose={close} />
    </header>
  )
}
