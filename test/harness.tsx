import type { ReactElement } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
import { PageSections } from '@/components/sections/PageSections'
import { getMessages } from '@/content'
import type { Locale } from '@/lib/i18n/config'

/**
 * The full page as a user meets it, for one locale.
 *
 * `Document` itself renders <html>/<body>, which Testing Library cannot mount
 * into an existing document, so this mirrors its body content instead. The
 * <html lang> attribute is asserted separately, by server-rendering `Document`.
 */
export function FullPage({ locale }: { locale: Locale }): ReactElement {
  const m = getMessages(locale)

  return (
    <>
      <a href="#main" className="skipLink">
        {m.a11y.skipToContent}
      </a>
      <SiteHeader locale={locale} nav={m.nav} a11y={m.a11y} />
      <main id="main">
        <PageSections locale={locale} />
      </main>
      <SiteFooter
        role={m.meta.role}
        tagline={m.meta.tagline}
        backToTop={m.footer.backToTop}
      />
    </>
  )
}

/** Props for a `SiteHeader` in the given locale — used by the nav tests. */
export function headerProps(locale: Locale = 'en') {
  const m = getMessages(locale)
  return { locale, nav: m.nav, a11y: m.a11y }
}
