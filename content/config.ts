/**
 * Facts that do not change with language: identity, URLs, anchor targets.
 *
 * Anchor ids are deliberately kept in English (`#work`, `#about`) and shared
 * across locales — they are internal identifiers, and stable ids mean a link to
 * `/pt-br#work` keeps working and the two pages stay structurally identical.
 */

export const site = {
  name: 'Lucas Almeida',
  url: 'https://www.lucasalmeida.dev',
  email: 'contato@lucasalmeida.dev',
  twitterHandle: '@lucasperdidao',
} as const

/**
 * Navigation order, as displayed. This array is the single source of order for
 * the desktop nav, the mobile panel and every locale — the labels are keyed off
 * these ids, so reordering here reorders everything.
 *
 * Note it deliberately does not match the order the sections appear on the page
 * (Work comes before Approach there); the nav leads with Approach by choice.
 */
export const navIds = ['approach', 'work', 'about'] as const
export type NavId = (typeof navIds)[number]

export const navHrefs: Readonly<Record<NavId, string>> = {
  work: '#work',
  approach: '#approach',
  about: '#about',
}

export const navCtaHref = '#contact'

export const socialIds = [
  'github',
  'linkedin',
  'email',
  'x',
  'whatsapp',
  'discord',
] as const
export type SocialId = (typeof socialIds)[number]

export type SocialLink = {
  readonly id: SocialId
  readonly href: string
  /** Included in the JSON-LD `sameAs` graph. Contact methods are not. */
  readonly isProfile: boolean
}

export const socialLinks: readonly SocialLink[] = [
  { id: 'github', href: 'https://github.com/perdidao', isProfile: true },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/lucasecalmeida',
    isProfile: true,
  },
  { id: 'email', href: `mailto:${site.email}`, isProfile: false },
  { id: 'x', href: 'https://twitter.com/lucasperdidao', isProfile: true },
  { id: 'whatsapp', href: 'https://wa.me/5543991578002', isProfile: false },
  {
    id: 'discord',
    href: 'https://discordapp.com/users/423860463722299394',
    isProfile: false,
  },
]

/** Stable ids for the case studies — used for heading ids, not shown to users. */
export const caseIds = ['gamers-club', 'minehut', 'consulting'] as const
export type CaseId = (typeof caseIds)[number]

/*
 * Image sources live here rather than in the message files because the file on
 * disk is the same whichever language you read the page in. Only the alt text is
 * per-locale, and that sits in content/messages/*.
 *
 * Paths are public-relative. `next/image` renders them with `fill`, so no
 * intrinsic dimensions are needed here.
 */

/** Not every case study has a visual — the consulting one uses industry tags. */
export const caseMedia: Partial<Record<CaseId, string>> = {
  'gamers-club': '/media/gamers-club.jpg',
  minehut: '/media/minehut.jpg',
}

export const portraitSrc = '/media/portrait.jpg'
