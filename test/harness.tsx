import type { ReactElement } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
import HomePage from '@/app/page'

/**
 * The full page as a user meets it.
 *
 * `RootLayout` itself renders <html>/<body>, which Testing Library cannot mount
 * into an existing document, so this mirrors its body content instead. Anything
 * that lives on <html> (lang, font variables) is asserted separately.
 */
export function FullPage(): ReactElement {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <HomePage />
      </main>
      <SiteFooter />
    </>
  )
}
