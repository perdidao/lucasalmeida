import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/types'
import { en } from './messages/en'
import { ptBR } from './messages/pt-BR'

const messages: Record<Locale, Messages> = {
  en,
  'pt-br': ptBR,
}

/** Every string the UI renders, for one locale. */
export function getMessages(locale: Locale): Messages {
  return messages[locale]
}

export { messages }
