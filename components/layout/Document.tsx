import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
import { StructuredData } from '@/components/seo/StructuredData'
import { getMessages } from '@/content'
import { fontVariables } from '@/lib/fonts'
import { localeMeta, type Locale } from '@/lib/i18n/config'

/**
 * The document shell, shared by both root layouts.
 *
 * Each locale has its own root layout so that `<html lang>` is a real static
 * attribute rather than something patched in on the client. Everything below
 * `<html>` is identical apart from the strings, so it lives here once.
 */
export function Document({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  const m = getMessages(locale)

  return (
    <html lang={localeMeta[locale].tag} className={fontVariables}>
      <body>
        <a href="#main" className="skipLink">
          {m.a11y.skipToContent}
        </a>
        <StructuredData locale={locale} />
        <SiteHeader
          locale={locale}
          role={m.meta.role}
          nav={m.nav}
          a11y={m.a11y}
        />
        <main id="main">{children}</main>
        <SiteFooter
          role={m.meta.role}
          tagline={m.meta.tagline}
          backToTop={m.footer.backToTop}
        />
      </body>
    </html>
  )
}
