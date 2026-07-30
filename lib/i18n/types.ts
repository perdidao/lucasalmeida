import type { NavId, SocialId } from '@/content/config'

/**
 * The shape every locale must provide.
 *
 * Both message modules are declared `satisfies Messages`, so a key that is
 * missing, misspelled or left behind in a translation is a compile error rather
 * than a blank patch of page. Array lengths are additionally checked at test
 * time (see test/locale-parity.test.ts) since types cannot express "same number
 * of principles as the other locale".
 *
 * Note what is NOT here: URLs, the email address, anchor targets and social
 * hrefs all live in content/config.ts because they are identical in every
 * language. Duplicating them per locale would invite silent divergence.
 */

export type CaseBlock = {
  readonly label: string
  readonly body: string
}

export type CaseStudyMessages = {
  readonly kicker: string
  readonly title: string
  readonly summary: string
  /** Placeholder caption for an empty media slot. Omit when the case has none. */
  readonly mediaCaption?: string
  readonly tags?: readonly string[]
  readonly blocks: readonly CaseBlock[]
  readonly outcomeLabel: string
  readonly outcomeBody?: string
  readonly outcomeStats?: readonly {
    readonly value: string
    readonly label: string
  }[]
}

export type Messages = {
  readonly meta: {
    readonly role: string
    readonly tagline: string
    readonly description: string
    readonly keywords: readonly string[]
  }

  readonly a11y: {
    readonly skipToContent: string
    readonly languageLabel: string
    /** Combined with the target language's native name, e.g. "Switch to" + "Português". */
    readonly switchLanguagePrefix: string
    readonly navPrimary: string
    readonly navMobile: string
    readonly menuOpen: string
    readonly menuClose: string
  }

  readonly nav: {
    readonly labels: Readonly<Record<NavId, string>>
    readonly cta: string
  }

  readonly social: Readonly<Record<SocialId, string>>

  readonly hero: {
    readonly headingBefore: string
    readonly headingEmphasis: string
    readonly headingAfter: string
    readonly paragraphs: readonly string[]
    readonly primaryCta: string
    readonly secondaryCta: string
  }

  readonly whatIDo: {
    readonly eyebrow: string
    readonly heading: string
    readonly body: string
    readonly pullQuote: { readonly lead: string; readonly trail: string }
    readonly listLabel: string
    readonly items: readonly string[]
  }

  readonly philosophy: {
    readonly eyebrow: string
    readonly heading: string
    readonly principles: readonly {
      readonly numeral: string
      readonly title: string
      readonly body: string
    }[]
  }

  readonly impact: {
    readonly eyebrow: string
    readonly aside: string
    readonly stats: readonly {
      readonly value: string
      readonly label: string
      readonly accent: boolean
    }[]
  }

  readonly selectedWork: {
    readonly eyebrow: string
    readonly heading: string
    readonly intro: string
    readonly cases: readonly CaseStudyMessages[]
  }

  readonly howIWork: {
    readonly eyebrow: string
    readonly heading: string
    readonly steps: readonly {
      readonly index: string
      readonly title: string
      readonly body: string
    }[]
  }

  readonly designMindset: {
    readonly eyebrow: string
    readonly statement: string
    readonly paragraphs: readonly string[]
  }

  readonly capabilities: {
    readonly eyebrow: string
    readonly heading: string
    readonly aside: string
    readonly groups: readonly {
      readonly label: string
      readonly items: readonly string[]
    }[]
  }

  readonly about: {
    readonly eyebrow: string
    readonly milestones: readonly {
      readonly when: string
      readonly what: string
      readonly current: boolean
    }[]
    readonly closing: string
    readonly portraitCaption: string
  }

  readonly contact: {
    readonly eyebrow: string
    readonly heading: string
    readonly body: string
  }

  readonly footer: {
    readonly backToTop: string
  }

  /** Copy baked into the generated Open Graph card. */
  readonly og: {
    readonly footnote: string
  }
}
