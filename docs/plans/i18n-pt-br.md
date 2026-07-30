# Plan — pt-BR localisation

Adds a Brazilian Portuguese version of the site alongside English, selected from
the visitor's browser preference on first arrival and overridable by a switcher
in the header.

Builds on `docs/plans/nextjs-portfolio-rewrite.md`.

## 0. Decisions taken with the owner

| Question | Decision |
| --- | --- |
| URL scheme | `/` = English, `/pt-br` = Portuguese. English is `x-default`. |
| Detection | Middleware negotiates `Accept-Language` on `/` and redirects; an explicit choice is stored in a cookie and always wins. |
| Switcher | `EN / PT` mono-uppercase text toggle in the nav, current locale marked `aria-current`. |

## 1. Why the content layer already fits

`content/site.ts` was written so that "translation or a future CMS is a swap of
this module rather than a rewrite" — no component contains copy. That holds, so
this change is mostly mechanical:

- Split locale-independent facts (`url`, `email`, social links) into
  `content/config.ts`.
- Move all prose into `content/messages/en.ts` and `content/messages/pt-BR.ts`,
  both of which must satisfy one exported `Messages` type. A missing or misspelled
  key is then a **compile error**, not a runtime blank.
- Sections receive their slice as a prop (`<Hero content={m.hero} />`) instead of
  importing module state. They become pure presentational components, which is
  also what makes the pt-BR render testable.

## 2. Routing shape

Two candidate structures were considered.

**Chosen — two root layouts, literal URLs.** With no `app/layout.tsx`, the topmost
layout of each route supplies `<html>`/`<body>`:

```
app/
  globals.css  icon.svg  robots.ts  sitemap.ts
  (en)/    layout.tsx  page.tsx  opengraph-image.tsx   ->  /
  pt-br/   layout.tsx  page.tsx  opengraph-image.tsx   ->  /pt-br
```

Both routes stay statically prerendered, there is no rewrite, no shadow `/en`
route to de-duplicate, and `<html lang>` is correct per locale because each root
layout sets it directly. Duplication is confined to a thin layout file; the shared
shell lives in one `<Document>` component.

**Rejected — `app/[locale]/` + middleware rewrite of `/` → `/en`.** The
conventional pattern, and better if a third language were likely, but it creates a
publicly reachable `/en` duplicate that then needs its own redirect rule, and the
canonical URL stops matching the route path. Not worth it for two locales.

*If Next 16 rejects the two-root-layout arrangement, the fallback is the rejected
option, and this section will be corrected to say so.*

Switching locale crosses root layouts and therefore triggers a full document load
— which is what you want when the whole page's language changes.

## 3. Locale identity

| | URL segment | BCP-47 tag | `og:locale` |
| --- | --- | --- | --- |
| English | *(none)* | `en` | `en_US` |
| Portuguese | `pt-br` | `pt-BR` | `pt_BR` |

Lowercase URL-safe ids (`en`, `pt-br`) are used internally; the BCP-47 tag is
carried per locale for `<html lang>`, `hreflang` and `og:locale`. They are not
interchangeable and are not derived from each other by string munging.

## 4. Negotiation and the middleware

`lib/i18n/negotiate.ts` is a **pure function** — `(acceptLanguage: string | null)
→ Locale` — so it can be unit-tested exhaustively without a request.

Algorithm: parse tags with their `q` values, drop `q=0` (explicit refusal), sort by
`q` descending and stable-by-position, then for each tag take the first of an exact
locale match or a primary-subtag match (`pt`, `pt-PT` → `pt-br`). Fall back to
English. Input is length-capped and tag-count-capped (see §7).

`middleware.ts`:

1. `?lang=<id>` present and valid → set the cookie, 307 to the same path without
   the param. Invalid value → ignore the param entirely (no redirect, no cookie).
2. Path is `/pt-br` → record `pt-br` in the cookie if it differs, continue.
3. Path is `/` → resolve cookie (validated) else `Accept-Language`. If the result
   is not English, 307 to `/pt-br`. Otherwise continue.
4. Add `Vary: Accept-Language, Cookie` to any response for `/`, because what `/`
   returns now depends on both.

Matcher excludes `/_next/*`, `/robots.txt`, `/sitemap.xml`, `/icon.svg` and any
path with a file extension.

Crawlers send no `Accept-Language`, so they receive English at `/` and discover
Portuguese through `hreflang` and the sitemap — both locales stay indexable.

## 5. SEO surface

- `<html lang>` per locale.
- `alternates.canonical` = own URL; `alternates.languages` = `{ en: '/', 'pt-BR':
  '/pt-br', 'x-default': '/' }` on **both** pages (reciprocal, as hreflang
  requires).
- `og:locale` plus `og:locale:alternate` for the other locale.
- Localised `title`, `description` and `keywords`.
- A generated OG image per locale (the card contains prose, so it must be
  translated too).
- `sitemap.ts` lists both URLs, each carrying the `alternates.languages` map.
- JSON-LD: `inLanguage` per locale, localised `description`/`jobTitle`, and
  `Person.sameAs` unchanged. Both pages point at the same `@id`, so the Person is
  one entity described in two languages rather than two people.

## 6. Translation approach

pt-BR is written as **original copy in Portuguese**, not a literal gloss — the
English is editorial and a word-for-word rendering reads stiff. Specifically:

- First person, professional, no marketing inflation; matches the English register.
- Brazilian usage (`gerenciamento`, `desempenho`, `experiência do usuário`), not
  European Portuguese.
- Established English technical terms stay in English where a Brazilian engineer
  would use them (`frontend`, `deploy`, `design system`, `onboarding`).
- Section labels translate (`01 — O que eu faço`); Roman numerals and metrics
  (`15+`, `10k+`) do not.
- The `ch`-based measures in the CSS are checked, since Portuguese runs roughly
  15–25% longer than English and the display headings are set to tight `max-width`.

## 7. Security — threat model for this change

The site gains its first request-dependent behaviour, so the surface is no longer
empty. Two genuinely untrusted inputs arrive: the `Accept-Language` header and the
locale cookie.

**7.1 Open redirect / path injection (the main new risk)**
- *Risk:* building a redirect target out of attacker-controlled input.
- *Mitigation:* redirect destinations are **literals** (`/`, `/pt-br`) chosen by
  matching input against a closed allowlist. Neither the header, the cookie nor
  `?lang` is ever interpolated into a URL. `?lang` is compared against the locale
  ids and discarded if it does not match, so `?lang=//evil.com` resolves to
  "unknown" and is ignored rather than echoed.

**7.2 Cookie tampering**
- *Risk:* the cookie is client-controlled and can hold anything.
- *Mitigation:* validated against the allowlist on every read; an unrecognised
  value is treated as absent. Nothing is trusted about it beyond "which of two
  known locales". Set `httpOnly` (only middleware reads it), `sameSite=Lax`,
  `secure` in production, `path=/`, one-year `maxAge`. It carries no PII and is a
  functional preference, so no consent banner is required.

**7.3 Denial of service via header parsing**
- *Risk:* `Accept-Language` is attacker-supplied and parsed on every request to
  `/`; a pathological value could burn CPU in the edge runtime.
- *Mitigation:* the raw header is truncated to 512 characters and at most 12 tags
  are considered before parsing. The parser is non-backtracking (`split`, not a
  nested-quantifier regex). Both limits are unit-tested with an abusive input.

**7.4 Cache poisoning / wrong-language caching**
- *Risk:* a CDN caches the English response, or a redirect, and serves it to
  everyone regardless of their header or cookie.
- *Mitigation:* `Vary: Accept-Language, Cookie` on `/`. `/pt-br` is
  unconditional and needs no `Vary`.

**7.5 Injection**
- Unchanged from the base plan. All new strings are static module content rendered
  through JSX escaping. The JSON-LD block gains localised values but is still
  built from a typed literal and serialised with `JSON.stringify`; it remains the
  single audited `dangerouslySetInnerHTML`.

**7.6 Information disclosure**
- The negotiation result is not logged, and the cookie is not echoed into markup.
  No new headers reveal infrastructure.

**7.7 Access control / privilege escalation**
- Still not applicable: no auth, no route handlers, nothing gated. Locale is not a
  trust boundary — both pages contain exactly the same public information, so
  guessing or forging a locale grants nothing.

**7.8 Pen-test focus**
Concentrate on the middleware: attempt an open redirect through `?lang`, a cookie
value crafted to escape the allowlist, a redirect loop between `/` and `/pt-br`,
and an `Accept-Language` designed to make the parser expensive.

## 8. Test coverage

Extends the existing 61 tests.

| Area | Cases |
| --- | --- |
| `negotiateLocale` (pure) | `pt-BR`, `pt`, `pt-PT` → pt-br. `en`, `en-GB`, unknown (`de`, `ja`), `*`, `null`, `""` → en. `q` ordering decides between competing tags; `pt;q=0` is a refusal and must **not** win; malformed `q` does not throw. **Abuse:** a 100 kB header and a 5 000-tag header are truncated and still return in bounded time. |
| Middleware | pt header on `/` → 307 `/pt-br`. en header on `/` → no redirect. Cookie beats a conflicting header, in both directions. `?lang=pt-br` sets the cookie and strips the param. **`?lang=https://evil.com`, `?lang=../x`, `?lang=en%0d%0a` are ignored — no redirect, no cookie** (§7.1). Tampered cookie ignored. `/pt-br` never redirects (no loop). `Vary` present on `/`. |
| Locale parity | Both message objects have identical key paths (deep-compared), no empty or whitespace-only strings, and matching array lengths for principles/steps/cases/capability groups/milestones. Guards a half-finished translation from shipping silently. |
| pt-BR rendering | axe on the fully composed Portuguese page: zero violations. One `h1`, monotonic heading levels, every section named — the same assertions the English page gets. |
| `<html lang>` | English document renders `lang="en"`, Portuguese renders `lang="pt-BR"`. |
| hreflang / canonical | Both pages expose reciprocal `alternates.languages` including `x-default`; each canonical is its own URL; `og:locale` and `og:locale:alternate` are correct and not swapped. |
| Sitemap | Both URLs present, each with the alternates map. |
| Switcher | Renders both locales; the active one carries `aria-current="true"` and the inactive one links to the other locale with `?lang=`; it is reachable by keyboard and has an accessible name that is not just "EN". |
| Regression | The whole existing suite still passes, including `contrast.test.ts` (tokens untouched) and the external-link `rel` guard across **both** locales. |

## 9. Implementation steps

1. `lib/i18n/` — locale config, `negotiateLocale`, `Messages` type.
2. Split `content/site.ts` into `content/config.ts` + `content/messages/{en,pt-BR}.ts`.
3. Convert sections, header and footer to take content via props.
4. Extract the shared `<Document>` shell; add the two root layouts and pages.
5. `LocaleSwitcher` in the header.
6. `middleware.ts`.
7. Per-locale metadata, JSON-LD, OG images, sitemap.
8. Tests per §8.
9. Check Portuguese text against the `ch` measures at 360 / 768 / 1440; adjust
   `max-width` only where the longer language actually breaks the layout.
10. `npm test`, `lint`, `typecheck`, `build` green; verify redirect behaviour with
    real `Accept-Language` headers against the production build.

## 10. Found during implementation

**10.1 The two-root-layout arrangement works.** No fallback to the
`[locale]`-plus-rewrite structure was needed. `/` and `/pt-br` both prerender
statically, and `<html lang>` is a real server-rendered attribute on each.

**10.2 `middleware.ts` is deprecated in Next 16.** The build warns and points at
the `proxy` convention. Renamed to `proxy.ts` exporting `proxy()`; behaviour and
tests are otherwise identical.

**10.3 `Vary` on `/` is only partially achievable — and the unit test lied about
it.** `addVary` on `NextResponse.next()` passed its test against the returned
response object, but the *actual* HTTP response for `/` does not carry it: Next
owns `Vary` on App Router responses (`rsc`, `next-router-*`) and overwrites it.
Declaring it in `next.config.ts` did not win either. What *does* work is `Vary` on
the 307 — which is the direction that matters, since it stops a cache pinning
"everybody gets redirected". The 200 relies instead on the proxy running
per-request ahead of the cache. Documented at the call site; a CDN in front of
`next start` must preserve that ordering. **Caught only by checking the real
server — worth remembering that a passing middleware unit test proves nothing
about the emitted headers.**

**10.4 The accessible-name algorithm concatenates without separators.** The
switcher first used a visually-hidden `<span> English</span>` after the visible
"EN" to satisfy WCAG 2.5.3. Its computed accessible name came out as
**"ENEnglish"** — one garbled word — because the name algorithm joins child text
with no whitespace and trims each part. Replaced with an explicit
`aria-label="EN English"`. The test now asserts the exact accessible name rather
than a loose regex, so the concatenation bug cannot come back.

**10.5 Canonical and sitemap disagreed on the trailing slash.** Metadata resolved
`/` to `https://www.lucasalmeida.dev` while the sitemap emitted
`https://www.lucasalmeida.dev/` — two spellings of the URL canonicals exist to
disambiguate. Both now come from one `localeUrl()` helper, with a test asserting
canonical, sitemap and JSON-LD agree per locale.

**10.6 Portuguese runs longer, and the hero absorbs it.** The h1 wraps to four
lines in pt-BR against two in English, because the measure (`max-width: 17ch`) was
set for the English headline. Audited the rendered Portuguese page: zero
horizontal overflow, no clipped text, heading count identical to English (39). The
`ch` measures were therefore left alone rather than widened, since changing them
would pull the approved English layout around to fit the translation. **This is a
taste call — if you want the Portuguese headline at three lines, the lever is
`--fs-h1` or the `max-width` in `Hero.module.css`, and it will affect both
locales.**

**10.7 Responsive verification is still static.** Same tooling limitation as the
base plan (§11.4 there): the browser automation cannot resize the viewport, so
neither locale has been confirmed visually below 1290 px. Portuguese is the higher
risk of the two given the longer strings. **A devtools pass at 360/390/768 px on
`/pt-br` is worth doing before shipping.**

## 11. Out of scope

- A third language, or a locale-aware CMS.
- Translating `docs/`, the README, or commit messages.
- Localised formatting of numbers/dates — the copy contains no dates, and the
  metrics (`15+`, `10k+`, `34k+`) are identical in both languages.
