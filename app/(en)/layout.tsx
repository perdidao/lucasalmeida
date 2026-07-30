import type { ReactNode } from 'react'
import { Document } from '@/components/layout/Document'
import { buildMetadata, viewport } from '@/lib/i18n/metadata'
import '../globals.css'

/*
 * Root layout for English, served at `/`.
 *
 * There is no `app/layout.tsx`: each locale supplies its own <html>, which is
 * the only way `lang` can be a static server-rendered attribute rather than
 * something corrected on the client. See docs/plans/i18n-pt-br.md §2.
 */

export const metadata = buildMetadata('en')
export { viewport }

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>
}
