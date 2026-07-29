# Plan — Next.js portfolio rewrite

Complete rewrite of `lucasalmeida.dev` from the Parcel/jQuery static page to a
Next.js App Router site implementing the Claude Design project
**"Dark editorial portfolio site"** (`Lucas Almeida.dc.html`).

Source of truth for visuals: `Lucas Almeida.dc.html` (design project
`d7acca39-f5bb-4b25-8c14-81a024d96bda`).

## 0. Decisions taken with the owner

| Question | Decision |
| --- | --- |
| Styling | CSS Modules + CSS custom-property design tokens |
| Deploy target | Vercel / Node server (full App Router, `next/image`, `next/og`) |
| Contact details | Real links from the current site, not the design's placeholders |
| Image slots | Reusable `<MediaFrame>` placeholder, image-ready via one prop |

## 1. What exists today

- Parcel 2 + SCSS + jQuery single page (`src/index.html`, `src/styles/*.scss`,
  `src/scripts/{jquery,index}.js`), a mouse-tracking "face" widget.
- No tests, no CI, no linting, no type checking.
- Real contact links worth preserving: `contato@lucasalmeida.dev`,
  `github.com/perdidao`, `linkedin.com/in/lucasecalmeida`,
  `twitter.com/lucasperdidao`, `wa.me/5543991578002`,
  Discord `423860463722299394`.

None of the existing patterns survive the rewrite (different framework, different
styling system, different content). This is a greenfield replacement inside the
same repo — `src/` is removed, `src/assets/favicon.png` and `social.png` are the
only artifacts considered for reuse.

## 2. Design system extracted from the design file

Tokens go in `app/globals.css` under `:root`. No other file hard-codes a colour.

**Colour**

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0a0a0b` | page background |
| `--surface` | `#0d0d0f` | card hover |
| `--surface-2` | `#0e0e10` | process/step card hover |
| `--ink` | `#edebe8` | primary text |
| `--ink-muted` | `rgba(237,235,232,.72)` | prose |
| `--ink-subtle` | `rgba(237,235,232,.58)` | mono eyebrows, captions |
| `--accent` | `#d7fe62` | numerals, emphasis, hover |
| `--rule` | `rgba(255,255,255,.06)` | section dividers |
| `--rule-strong` | `rgba(255,255,255,.10)` | card/grid hairlines |
| `--border` | `rgba(255,255,255,.16)` | pill outlines |

**Type**

- Display: Instrument Serif (400, + italic) — h1/h2/h3, stat numerals, pull quotes.
- Mono: JetBrains Mono (400/500) — eyebrows, numerals, tags, arrows.
- Body: system sans stack (`-apple-system, "Helvetica Neue", Helvetica, Arial`)
  — matches the design's `Helvetica Neue` at zero byte cost.
- Fluid scale via `clamp()`, lifted verbatim from the design
  (hero `clamp(48px,7.2vw,108px)`, section h2 `clamp(34px,4vw,54px)`, etc.).

**Layout** — `--container: 1180px`, `--gutter: clamp(20px, 5vw, 40px)`,
section rhythm `clamp(88px, 12vw, 150px)`.

## 3. Deliberate deviations from the design (and why)

1. **Muted-text contrast.** The design's muted greys fail WCAG AA against
   `#0a0a0b`: alpha `.34` → 2.7:1, `.38` → 3.1:1, `.40` → 3.4:1, `.42` → 3.6:1
   (AA normal text needs 4.5:1). All of these are applied to 10–11px mono labels.
   Every value ≤ `.5` is remapped to `--ink-subtle` (`.58` → **5.9:1**) and every
   prose value in `.55–.66` to `--ink-muted` (`.72` → **8.7:1**). The accent
   `#d7fe62` on `#0a0a0b` is already 17.2:1 and is untouched.
2. **Minimum type size** raised from 10px to 11px on mono eyebrows.
3. **Focus states.** The design specifies none. A visible `:focus-visible` ring
   (`2px solid var(--accent)`, `2px` offset) is added to every interactive element.
4. **Google Fonts `<link>` dropped** in favour of `next/font/google`, which
   self-hosts and inlines the `@font-face` — removes two cross-origin
   connections from the critical path and eliminates a third-party dependency.
5. **Mobile navigation.** The design's nav is desktop-only. Below `860px` the
   links collapse into a disclosure drawer (the design has no mobile spec).

## 4. Architecture

```
app/
  layout.tsx            fonts, <html lang>, metadata, JSON-LD, skip link
  page.tsx              composes the sections in design order
  globals.css           reset + tokens + base element styles
  opengraph-image.tsx   next/og, on-brand 1200×630
  icon.svg              the mark, from uploads/lucas-almeida.svg
  sitemap.ts  robots.ts
components/
  primitives/           Container, Section, Eyebrow, Rule, Pill, ButtonLink,
                        Logo, MediaFrame, StatBlock, Reveal
  layout/               SiteHeader (client), MobileNav (client), SiteFooter
  sections/             Hero, WhatIDo, Philosophy, Impact, SelectedWork,
                        CaseStudy, HowIWork, DesignMindset, Capabilities,
                        About, Contact
content/
  site.ts               every string + link, typed — no copy inside components
lib/
  useReveal.ts          IntersectionObserver hook
```

Atomic rule: a component owns one responsibility and one `.module.css`. Section
components are pure composition over primitives + `content/site.ts`.

All components are **Server Components** except `SiteHeader`/`MobileNav` (needs
scroll + disclosure state) and `Reveal` (needs IntersectionObserver).

## 5. Motion strategy

Requirement: *Framer Motion only where it genuinely improves the experience;
prefer CSS.*

| Effect | Implementation | Why |
| --- | --- | --- |
| Hero staggered fade-up | CSS `@keyframes` + `animation-delay` | No JS needed; runs before hydration |
| Section reveal on scroll | IntersectionObserver → `data-revealed` attr → CSS transition (~30 lines) | A library is not justified for a one-shot opacity/transform |
| Hover states, nav backdrop | CSS `transition` | — |
| Mobile nav drawer | CSS transition on opacity/transform + `visibility` delay, with `inert` when closed | See below |

**Framer Motion is not used anywhere, and the dependency was removed.**

The plan above earmarked it for the mobile drawer, on the reasoning that an *exit*
animation needs the node to animate before leaving the DOM. Measuring it killed
the idea: even with `LazyMotion` and a lazily-imported feature bundle, the
statically-imported `AnimatePresence`/`m` core pulled **~40 kB gzipped** into the
first load — for a 220 ms fade on a nav panel.

The replacement costs nothing. The panel stays mounted and absolutely positioned;
`visibility` flips back to hidden on a `0s` transition *delayed* until the opacity
and transform transitions finish, which produces a genuine exit animation in pure
CSS. `inert` — not unmounting — is what removes the closed panel from the tab
order and the accessibility tree, which was the actual requirement.

Measured effect of removing it: **228 kB → 189 kB** of gzipped JS on first load.
The brief said "only where it genuinely improves the experience"; on measurement,
nowhere qualified.

`prefers-reduced-motion: reduce` disables every animation and reveal (content
renders in its final state).

**No-JS safety:** reveal-hiding is gated behind a `js` class set by a tiny
render-blocking inline script, so with JS disabled all content is visible. This
also avoids a flash of hidden content.

## 6. Performance

- `next/font/google` with `display: swap`, `latin` subset, self-hosted.
- Zero images above the fold; hero is pure text → LCP is a font-rendered `<h1>`.
- Client components: `SiteHeader`/`MobileNav` and `Reveal`. Everything else is a
  Server Component.
- `next.config.ts`: `poweredByHeader: false`, `reactStrictMode`, AVIF/WebP
  formats for `next/image`.
- CSS Modules only — no runtime style engine.

**Measured first load** (production build, gzipped, 15 subresources):

| | |
| --- | --- |
| HTML | 15.4 kB |
| JS | 188.9 kB |
| CSS | 6.6 kB |
| Fonts (3 × woff2) | 60.6 kB |
| **Total** | **271.5 kB** |

Honest caveat: the JS figure is dominated by the React 19 + App Router runtime,
which is the floor for this framework once any client component exists — it is not
first-party code, and it cannot be reduced without abandoning the App Router. The
site's own JS is a few kB. If that baseline is unacceptable, the lever is the
framework choice, not this code; say so and it can be revisited.

## 7. SEO

- Metadata API: `metadataBase`, title template, description, keywords (carried
  from the design's `<helmet>`), canonical, `openGraph`, `twitter`, `robots`.
- Dynamic `opengraph-image.tsx` (next/og) replacing the static `social.png`.
- JSON-LD `Person` + `WebSite` graph, injected as a `<script type="application/ld+json">`
  built from `content/site.ts` and serialised with `JSON.stringify` (never string
  concatenation — see §9).
- `sitemap.ts`, `robots.ts`, semantic landmarks, exactly one `<h1>`, ordered
  heading levels, descriptive link text.

## 8. Test coverage

Vitest + React Testing Library + jsdom + `vitest-axe`. `npm test` in CI-ready form.

| Area | Cases |
| --- | --- |
| Accessibility | `axe` on the fully composed page: zero violations. Heading order is monotonic (no skipped levels). Exactly one `<h1>`. Every landmark present. Every `<section>` has an accessible name. |
| MobileNav (interaction) | Opens on click and sets `aria-expanded=true`; `Escape` closes and returns focus to the trigger; `Tab` stays inside the open panel; clicking a link closes it. **Failure paths:** rapid double-toggle leaves state consistent; unmount while open removes the `keydown` + scroll-lock listeners. |
| Reveal | Without `IntersectionObserver` (deleted from the jsdom global) children still render visible — *the no-JS/legacy failure path*. With `prefers-reduced-motion: reduce` no hidden state is applied. Observer is disconnected on unmount. |
| Content integrity | Every `href` in `content/site.ts` parses as a URL or `mailto:`/`#` anchor. Every external link is `target="_blank"` **and** `rel` contains `noopener` + `noreferrer` (regression guard for §9.2). Every nav anchor `#id` resolves to a rendered element id. |
| Metadata / SEO | `generateMetadata` output has non-empty title/description/canonical/OG image. JSON-LD parses as valid JSON and has `@type: Person`. `sitemap()` returns the canonical URL. |
| Primitives | `MediaFrame` renders the placeholder when no `src`, an `<img>` with non-empty `alt` when `src` is given, and **throws/fails a test if `src` is given without `alt`** (edge case). `ButtonLink` renders `<a>` and forwards `aria-*`. |
| Contrast (regression) | Unit test asserting every text token in `globals.css` meets 4.5:1 against `--bg`, computed via a small WCAG relative-luminance helper. Guards §3.1 from being silently reverted. |

## 9. Security — threat model

The site is static, unauthenticated, has no forms, no database, no user input and
no secrets. The realistic attack surface is small but not empty.

**9.1 Injection (XSS / template)**
- *Risk:* content injected into the DOM outside React's escaping.
- *Mitigation:* `dangerouslySetInnerHTML` is used in exactly one place — the
  JSON-LD block — and its payload is produced by `JSON.stringify` over a typed
  object literal, never string interpolation. All other content flows through
  JSX, which escapes by default. A lint rule (`react/no-danger`) with a single
  documented exception enforces this.
- *Also:* the design file is untrusted third-party content; nothing from it is
  executed — it was read and re-authored by hand, and the design's inline
  `<script type="text/x-dc">` runtime is **not** ported.

**9.2 Tampering / reverse tabnabbing**
- *Risk:* `target="_blank"` links let the opened page rewrite `window.opener`.
- *Mitigation:* every external link carries `rel="noopener noreferrer"`, enforced
  by a single `ExternalLink` primitive plus the content-integrity test in §8.

**9.3 Spoofing / clickjacking**
- *Risk:* the site framed inside an attacker page to lend it credibility.
- *Mitigation:* response headers in `next.config.ts` —
  `X-Frame-Options: DENY`, CSP `frame-ancestors 'none'`.

**9.4 Information disclosure**
- *Risk:* leaking infrastructure detail or personal data beyond what's intended.
- *Mitigation:* `poweredByHeader: false`. No `.env` and no secrets in the repo —
  the canonical URL is the only configuration value. The phone number (WhatsApp)
  is already public on the current site; it stays, but is not marked up in the
  JSON-LD `Person` (structured data is scraped far more aggressively than HTML).
  `Referrer-Policy: strict-origin-when-cross-origin`.

**9.5 Privilege escalation / broken access control**
- Not applicable: no auth, no roles, no protected routes, no API routes. This is
  deliberate — no route handlers will be added by this change.

**9.6 Supply chain**
- *Risk:* the largest realistic threat, given the site is otherwise inert.
- *Mitigation:* runtime dependencies are exactly three — `next`, `react`,
  `react-dom`. Everything else is dev-only. No CDN-loaded scripts at runtime;
  fonts are self-hosted, which removes `fonts.googleapis.com` as a third party
  that could serve arbitrary CSS.
- *Lockfile:* `package-lock.json` was previously in `.gitignore`. It is now
  committed — without it the `overrides` below are not reproducible.
- *Patched transitive vulnerabilities:* `npm audit` flagged three highs inside
  Next's own dependency tree (`sharp` < 0.35.0 libvips CVEs; `postcss` 8.4.31
  path traversal). npm's suggested remedy was `next@9.3.3`, a five-major
  downgrade — rejected. Patched versions exist upstream, so they are pinned via
  `overrides`: `sharp ^0.35.3`, `postcss ^8.5.25`. **`npm audit --omit=dev` is
  clean.**
- *Known, accepted:* `npm audit` still reports a `brace-expansion` DoS advisory
  reachable only through `eslint-config-next`'s glob matching. Overriding it to
  v5 breaks `minimatch`'s API and takes the linter down, so it is left alone: it
  is dev-tooling-only, not reachable from anything the site serves, and the
  "fix" is worse than the finding.

**9.7 Headers set in `next.config.ts`**
`Content-Security-Policy` (`default-src 'self'`, `frame-ancestors 'none'`,
`base-uri 'self'`, `form-action 'self'`, `object-src 'none'`, styles allowing
`'unsafe-inline'` only as required by Next's inlined critical CSS),
`X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`,
`Permissions-Policy` denying camera/microphone/geolocation.

**9.8 Pen-test focus**
Concentrate on: (a) the JSON-LD block — attempt to break out of the script
context; (b) the CSP in production build, verifying Next's inline bootstrap
doesn't force `script-src 'unsafe-inline'` open; (c) `target="_blank"` audit
across all rendered links.

## 10. Implementation steps

1. Remove Parcel scaffolding; scaffold Next.js App Router + TypeScript.
2. `app/globals.css` — reset, tokens, base typography, focus, reduced motion.
3. `content/site.ts` — all copy and links, typed.
4. Primitives (`Container`, `Section`, `Eyebrow`, `Pill`, `ButtonLink`,
   `ExternalLink`, `Logo`, `MediaFrame`, `StatBlock`, `Reveal`).
5. `SiteHeader` + `MobileNav` + `SiteFooter`.
6. Sections in design order: Hero → WhatIDo → Philosophy → Impact →
   SelectedWork/CaseStudy → HowIWork → DesignMindset → Capabilities → About →
   Contact.
7. SEO surface: metadata, JSON-LD, `opengraph-image`, `sitemap`, `robots`, `icon`.
8. Security headers + `next.config.ts`.
9. Test suite per §8; `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`
   all green.
10. Responsive pass at 360 / 768 / 1024 / 1440 and a manual keyboard-only pass.

## 11. Found during implementation

**11.1 The reveal watchdog was blanket-revealing the whole page.**
The design's own script revealed *any* still-hidden element after 4 s. Ported
verbatim, that silently defeats the entire effect on a page this long: sit at the
top for four seconds and every off-screen section is revealed before you scroll
to it, so scrolling animates nothing. The watchdog now distinguishes the two
cases it was conflating — IntersectionObserver is specified to deliver an initial
callback shortly after `observe()` regardless of visibility, so *silence* means
the observer is broken, while `isIntersecting: false` means the user simply has
not scrolled there yet. Only the former triggers a rescue (1.5 s). Both cases
have regression tests.

**11.2 Toolchain versions had to be pinned down.**
`typescript@7` is not yet supported by `typescript-eslint` (and Next 16's
in-process type check rejects it outright), and `eslint@10` breaks
`eslint-plugin-react` as bundled by `eslint-config-next@16`. Settled on
**TypeScript 6** and **ESLint 9**, which both toolchains support. No source
changes were needed for either.

**11.3 `css: true` in Vitest produced false-green accessibility tests.**
jsdom does not evaluate media queries, so a mobile-first `display: none` that a
real browser overrides at a breakpoint was treated as permanently hidden — which
dropped the entire desktop nav out of the accessibility tree and made queries
against it pass for the wrong reason. Styles are no longer applied in tests; CSS
is verified by `contrast.test.ts` and in the browser instead.

**11.4 Responsive verification is static, not visual.**
The browser automation could not resize the viewport (the window manager kept it
at 1290 px), so the mobile and tablet renderings were **not** confirmed visually.
Instead every `grid-template-columns` declaration in the codebase was audited:
all 12 are either `repeat(auto-fit, minmax(min(100%, …), 1fr))` — which collapses
to one column on narrow screens — or gated behind a `min-width` media query. Zero
unguarded multi-column grids. Desktop was verified visually. **A real device or
devtools pass at 360/390/768 px is still worth doing before shipping.**

**11.5 A browser measurement that looked like a catastrophic bug was not one.**
Off-screen sections reported `opacity: 0` with `data-revealed="true"`, and
scrolled screenshots came back blank. Cause: the automated tab was
`document.hidden`, so Chrome pinned `document.timeline.currentTime` at 0 and every
CSS transition froze at its start value. Once the tab was actually visible the
timeline advanced and all nine sections resolved to `opacity: 1`. Recorded here
because the symptom is convincing and the wrong fix would have been to rip out
the transitions.

## 12. Out of scope

- The mouse-tracking "face" widget from the old site (not in the design).
- A CMS or MDX case-study routes — the design is a single page.
- Real photography for the three `MediaFrame` slots.
