import type { ReactNode } from 'react'
import { Document } from '@/components/layout/Document'
import { buildMetadata, viewport } from '@/lib/i18n/metadata'
import '../globals.css'

/* Root layout for Portuguese, served at `/pt-br`. See app/(en)/layout.tsx. */

export const metadata = buildMetadata('pt-br')
export { viewport }

export default function PortugueseLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Document locale="pt-br">{children}</Document>
}
