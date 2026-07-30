# lucasalmeida.dev

Personal site for Lucas Almeida — Product Engineer.

Next.js App Router, TypeScript, CSS Modules. Implements the Claude Design project
*"Dark editorial portfolio site"*.

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # production build
npm start          # serve the production build
npm test           # vitest — 182 tests
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Available in English (`/`) and Brazilian Portuguese (`/pt-br`).

## Layout

```
app/
  (en)/              English root layout + page + OG image   ->  /
  pt-br/             Portuguese root layout + page + OG image ->  /pt-br
  globals.css  icon.svg  robots.ts  sitemap.ts
components/
  primitives/        Container, Section, Eyebrow, Pill, ButtonLink,
                     ExternalLink, Logo, MediaFrame, StatBlock, Reveal
  layout/            Document, SiteHeader, MobileNav, LocaleSwitcher, SiteFooter
  sections/          one component per page section, in design order
  seo/               JSON-LD graph
content/
  config.ts          locale-independent: URLs, email, anchors, social links
  messages/en.ts     English copy
  messages/pt-BR.ts  Portuguese copy
lib/
  i18n/              locale config, metadata builder, Messages type
  useReveal.ts       IntersectionObserver reveal hook
  og.tsx  fonts.ts
assets/fonts/        display face for OG image generation only (not served)
test/                vitest suite
docs/plans/          the implementation plans and their rationale
```

Only `SiteHeader`/`MobileNav` and `Reveal` are Client Components. Everything else
renders on the server. There is deliberately **no `app/layout.tsx`**: each locale
supplies its own root layout, which is the only way `<html lang>` can be a static
server-rendered attribute.

## Languages

English at `/`, Brazilian Portuguese at `/pt-br`. English is the default for
everyone; visitors opt in to Portuguese with the `EN / PT` switcher in the header.

Nothing is detected and nothing is remembered — no `Accept-Language` sniffing, no
preference cookie, no redirects. The switcher is two plain links, so the language
is decided purely by which URL is requested. Consequences worth knowing:

- The site sets **no cookies at all**.
- Both pages are unconditional static documents, cacheable by anyone for anyone.
- A returning Portuguese visitor who types the bare domain gets English and clicks
  PT, or bookmarks `/pt-br`.
- Both locales stay indexable via reciprocal `hreflang`, with `x-default` pointing
  at English. Neither is hidden behind a redirect.

**Adding a language:** add the id to `locales` and an entry to `localeMeta` in
`lib/i18n/config.ts`, add `content/messages/<tag>.ts` (the `Messages` type makes
every missing key a compile error), register it in `content/index.ts`, and add a
root layout + page under `app/`. `test/locale-parity.test.ts` then enforces that
the new locale is complete.

## Conventions worth knowing

- **No copy in components.** Sections take their strings as props; the strings
  live in `content/messages/*`. Anything locale-independent (URLs, anchor ids,
  social hrefs) belongs in `content/config.ts` — never duplicated per locale.
- **No hard-coded colours or fonts.** Everything comes from the custom properties
  in `app/globals.css`.
- **Muted text tokens are deliberately brighter than the design file.** The
  design's greys fail WCAG AA on this background; `contrast.test.ts` fails the
  build if they are reverted. See `docs/plans/nextjs-portfolio-rewrite.md` §3.1.
- **External links must go through `<ExternalLink>`**, which applies
  `rel="noopener noreferrer"`. A test enforces this across the rendered page.
- **Prefer CSS over JS for motion.** No animation library is used; see plan §5.

## Images

The three slots are filled from `public/media/`:

| Slot | File | Source size |
| --- | --- | --- |
| Gamers Club case study | `gamers-club.jpg` | 495 x 280 |
| Minehut case study | `minehut.jpg` | 495 x 280 |
| About portrait | `portrait.jpg` | 896 x 1040 |

Sources live in `content/config.ts` (`caseMedia`, `portraitSrc`) because the file
is the same in every language; **alt text lives per-locale** in
`content/messages/*` (`mediaAlt`, `portraitAlt`). `MediaFrame`'s prop type makes
`alt` mandatory whenever `src` is given, and rejects placeholder `caption` copy
alongside an image, so a slot cannot be filled without a description.

The Freelance & Consulting case deliberately has no image — it shows industry
tags instead, as in the design.

**Known limitation:** the two case-study sources are 495 px wide but render in a
~493 px slot, so they are 1:1 on a standard display and roughly half-resolution
on a 2x one. They will look soft on most laptops and phones. Re-exporting them at
~990 x 560 fixes it with no code change. The portrait has no such problem (896 px
into a ~447 px slot is a clean 2x).

To swap an image: drop the file in `public/media/`, update the path in
`content/config.ts`, and update the alt text in **both** message files.

## Deployment

Targets a Node/Vercel runtime — `next/image` optimisation and the generated
`opengraph-image` both need a server. Security headers (CSP, HSTS,
`frame-ancestors 'none'`, etc.) are set in `next.config.ts` and therefore apply
only where those headers are honoured; on a static host they must be configured
at the CDN instead.

Set the canonical URL in `content/config.ts` (`site.url`) if the domain changes.
