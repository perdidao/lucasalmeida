import { getMessages } from '@/content'
import { site } from '@/content/config'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = `${site.name} — ${getMessages('pt-br').meta.role}`
export const size = ogSize
export const contentType = ogContentType

export default function OpengraphImagePtBr() {
  return renderOgImage('pt-br')
}
