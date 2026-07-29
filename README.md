# lucasalmeida.dev

Personal site for Lucas Almeida — Product Engineer.

Next.js App Router, TypeScript, CSS Modules. Implements the Claude Design project
*"Dark editorial portfolio site"*.

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # production build
npm start          # serve the production build
npm test           # vitest — 61 tests
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Layout

```
app/                 routes, metadata, globals.css, sitemap/robots/icon/OG image
components/
  primitives/        Container, Section, Eyebrow, Pill, ButtonLink,
                     ExternalLink, Logo, MediaFrame, StatBlock, Reveal
  layout/            SiteHeader, MobileNav, SiteFooter
  sections/          one component per page section, in design order
  seo/               JSON-LD graph
content/site.ts      every string and link on the site, typed
lib/useReveal.ts     IntersectionObserver reveal hook
assets/fonts/        display face for OG image generation only (not served)
test/                vitest suite
docs/plans/          the implementation plan and its rationale
```

Only `SiteHeader`/`MobileNav` and `Reveal` are Client Components. Everything else
renders on the server.

## Conventions worth knowing

- **No copy in components.** All text and links live in `content/site.ts`.
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
driven by `mediaCaption` in `content/site.ts`) and the About portrait
(`components/sections/About/About.tsx`).

## Deployment

Targets a Node/Vercel runtime — `next/image` optimisation and the generated
`opengraph-image` both need a server. Security headers (CSP, HSTS,
`frame-ancestors 'none'`, etc.) are set in `next.config.ts` and therefore apply
only where those headers are honoured; on a static host they must be configured
at the CDN instead.

Set the canonical URL in `content/site.ts` (`site.url`) if the domain changes.
