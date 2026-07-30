# Plan — English as the unconditional default

Removes automatic language detection. `/` always serves English; `/pt-br` always
serves Portuguese; nothing redirects. Switching languages is a link the visitor
clicks, and only that.

**Supersedes** the detection design in `docs/plans/i18n-pt-br.md` §4 and §7.
That document stays as the record of how the localisation itself is built (content
split, routing shape, SEO surface) — only the negotiation half is withdrawn.

## 0. Decision taken with the owner

English is the default for everyone. An explicit switch is **not** remembered
across visits: no cookie, no preference storage, no redirect. A returning
Portuguese visitor who types the bare domain gets English and clicks PT, or
bookmarks `/pt-br`.

## 1. What comes out

| File | Action |
| --- | --- |
| `proxy.ts` | delete — the site no longer has any request-time behaviour |
| `lib/i18n/negotiate.ts` | delete — `Accept-Language` is no longer read |
| `test/proxy.test.ts` | delete |
| `test/negotiate.test.ts` | delete |
| `lib/i18n/config.ts` | drop `LOCALE_COOKIE`, `LOCALE_PARAM`, `parseLocale` |
| `next.config.ts` | drop the `Vary` entry for `/` |
| `LocaleSwitcher` | links become bare paths — no `?lang=` |

`otherLocale` stays: `lib/i18n/metadata.ts` uses it for `og:locale:alternate`.

## 2. What this buys

- **No cookies at all.** The site now stores nothing on the visitor's device, so
  there is nothing to disclose or obtain consent for.
- **Both pages fully static and cacheable.** `/` no longer varies by header or
  cookie, so the `Vary` problem recorded in `i18n-pt-br.md` §10.3 stops existing
  rather than being worked around.
- **The request-time attack surface goes to zero.** §7.1–7.4 of the i18n plan
  (open redirect via `?lang`, cookie tampering, header-parsing DoS, cache
  poisoning) described risks that only existed because of the proxy. Deleting it
  retires all four — see §4.
- **Better SEO posture.** Search engines discourage auto-redirecting on language;
  both locales were already discoverable through reciprocal `hreflang`, and now
  neither is hidden behind a redirect.

## 3. What must not change

- Reciprocal `hreflang` on both pages, with `x-default` → English. Unaffected:
  it never depended on the proxy.
- `/pt-br` stays a real, directly-linkable URL. It already was.
- The switcher must still be keyboard reachable, mark the current locale with
  `aria-current`, and carry an accessible name containing its visible label.
- Anchor ids stay shared across locales, so `/pt-br#work` keeps working.

## 4. Security — the surface this removes

This change only subtracts. Each item below was a live consideration in
`i18n-pt-br.md` §7 and is now moot because the code it applied to is gone.

| Prior risk | Status |
| --- | --- |
| Open redirect / path injection via `?lang` (§7.1) | **Retired** — no redirect is issued anywhere, and `?lang` is no longer read |
| Cookie tampering (§7.2) | **Retired** — no cookie is set or read |
| DoS via `Accept-Language` parsing (§7.3) | **Retired** — the header is never read |
| Cache poisoning / wrong-language caching (§7.4) | **Retired** — `/` is unconditional, so there is nothing to vary on |
| Injection (§7.5) | Unchanged — still one audited `dangerouslySetInnerHTML` for JSON-LD |
| Information disclosure (§7.6) | Improved — no cookie, and nothing about the visitor is read |

Remaining surface is what it was before localisation: a static, unauthenticated
site whose only realistic threat is the dependency chain.

**Pen-test focus:** confirm no `Set-Cookie` on any response, and that neither `/`
nor `/pt-br` ever returns a 3xx.

## 5. Test coverage

Net effect is roughly −60 tests (the negotiation matrix and proxy cases go with
the code they covered). The replacements assert the *new* guarantee, so the
behaviour is pinned rather than merely untested:

| Area | Cases |
| --- | --- |
| No request-time behaviour | No `proxy.ts` / `middleware.ts` exists at the repo root — a file-level assertion, so re-adding one silently is caught. `lib/i18n/config.ts` exports no cookie or param constant. |
| Switcher links | Each locale links to its bare path (`/`, `/pt-br`) with **no query string** — the direct regression guard for removing `?lang=`. |
| Switcher behaviour (retained) | Both locales offered; only the current one has `aria-current`; accessible name contains the visible abbreviation; keyboard reachable. |
| hreflang / canonical (retained) | Still reciprocal, still `x-default` → English, canonical unchanged. |
| Everything else | The full existing suite must stay green: locale parity, axe on both locales, contrast, external-link `rel`, nav order. |

Verified against the production build, not just unit tests — this is where the
last `Vary` claim turned out to be false:

- `/` returns **200** with a `pt-BR` Accept-Language header (no redirect).
- Neither `/` nor `/pt-br` sets a cookie.
- Neither returns a 3xx under any header or cookie.

## 6. Steps

1. Delete the proxy, the negotiator and their tests.
2. Prune the now-unused exports from `lib/i18n/config.ts`.
3. Make the switcher's links bare paths.
4. Drop the `Vary` entry from `next.config.ts`.
5. Add the guards in §5; keep the rest of the suite passing.
6. Update `README.md`, and mark the superseded sections of `i18n-pt-br.md`.
7. `npm test`, `lint`, `typecheck`, `build`; then curl the production build with a
   `pt-BR` header and confirm 200 and no `Set-Cookie`.

## 7. Out of scope

- Removing Portuguese, or changing any translated copy.
- Any change to the routing shape (two root layouts stay as they are).
- A "we noticed you speak Portuguese" banner — that is a different feature, and
  it is not being built here.
