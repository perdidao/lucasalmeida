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
proxy.ts             locale negotiation, redirect and preference cookie
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
  i18n/              locale config, Accept-Language negotiation, Messages type
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

## How the language is chosen

1. `?lang=en` / `?lang=pt-br` — an explicit click in the switcher. Stored in an
   `httpOnly` cookie, then the parameter is stripped from the URL.
2. That cookie, on later visits. It always beats the browser header.
3. `Accept-Language`, negotiated in `lib/i18n/negotiate.ts`. Any Portuguese tag
   (`pt`, `pt-BR`, `pt-PT`) resolves to `/pt-br`.
4. English, for anything unmatched — including crawlers, which send no header and
   so index `/` and discover `/pt-br` via `hreflang`.

Only `/` redirects. `/pt-br` is always served as asked, so there is no loop.

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

## Filling the three image slots

`<MediaFrame>` renders the design's hatched placeholder until given a `src`. Add
the image to `public/`, then pass `src` and `alt` — `alt` is required by the type
signature whenever `src` is present. No markup changes needed.

Slots: two case-study visuals (`components/sections/SelectedWork/CaseStudy.tsx`,
driven by `mediaCaption` in `content/messages/*`) and the About portrait
(`components/sections/About/About.tsx`).

## Deployment

Targets a Node/Vercel runtime — `next/image` optimisation and the generated
`opengraph-image` both need a server. Security headers (CSP, HSTS,
`frame-ancestors 'none'`, etc.) are set in `next.config.ts` and therefore apply
only where those headers are honoured; on a static host they must be configured
at the CDN instead.

Set the canonical URL in `content/config.ts` (`site.url`) if the domain changes.
