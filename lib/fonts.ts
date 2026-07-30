import { Instrument_Serif, JetBrains_Mono } from 'next/font/google'

/*
 * Initialised once and shared by both root layouts, so the two locales serve the
 * same font files from the same URLs and a language switch is not a font refetch.
 *
 * next/font self-hosts both families and inlines the @font-face rules, which
 * removes the two cross-origin connections the design's <link> tags would have
 * put on the critical path. `display: swap` keeps text paintable throughout.
 */

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const fontVariables = `${instrumentSerif.variable} ${jetbrainsMono.variable}`
