import type { ReactNode } from 'react'

const IN_PAGE_OR_MAIL = /^(#|mailto:|tel:|\/)/

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

/**
 * Single choke point for links that leave the site.
 *
 * Anything that is not an in-page anchor, a mailto:/tel: URI or a same-origin
 * path opens in a new tab **and** always carries `rel="noopener noreferrer"`.
 * Centralising it here is what makes the reverse-tabnabbing guarantee in
 * docs/plans/nextjs-portfolio-rewrite.md §9.2 testable rather than aspirational.
 */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const isExternal = !IN_PAGE_OR_MAIL.test(href)

  return (
    <a
      href={href}
      className={className}
      {...(isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : undefined)}
    >
      {children}
    </a>
  )
}
