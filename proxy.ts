import { NextResponse, type NextRequest } from 'next/server'
import {
  LOCALE_COOKIE,
  LOCALE_PARAM,
  defaultLocale,
  localeMeta,
  parseLocale,
  type Locale,
} from '@/lib/i18n/config'
import { negotiateLocale } from '@/lib/i18n/negotiate'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/**
 * Locale routing (Next 16 `proxy` convention, formerly `middleware`).
 *
 * Security posture (docs/plans/i18n-pt-br.md §7): every redirect destination is
 * a *literal* taken from `localeMeta[...].path`, reached only by matching an
 * untrusted string against the closed locale allowlist via `parseLocale`. The
 * `Accept-Language` header, the cookie and `?lang` are never interpolated into a
 * URL, so a crafted value such as `?lang=//evil.com` resolves to "unrecognised"
 * and is dropped rather than echoed into a `Location`.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname, searchParams } = request.nextUrl

  const cookieLocale = parseLocale(request.cookies.get(LOCALE_COOKIE)?.value)

  /* 1. An explicit choice from the switcher: remember it, then clean the URL. */
  const requested = parseLocale(searchParams.get(LOCALE_PARAM))
  if (requested) {
    const target = request.nextUrl.clone()
    target.pathname = localeMeta[requested].path
    target.search = ''

    const response = NextResponse.redirect(target, 307)
    setLocaleCookie(response, requested, request)
    return response
  }

  /* An unrecognised ?lang is ignored entirely — no cookie, no redirect. */

  /* 2. A locale-prefixed path is authoritative for that request. */
  const pathLocale = localeFromPathname(pathname)
  if (pathLocale) {
    const response = NextResponse.next()
    if (cookieLocale !== pathLocale) {
      setLocaleCookie(response, pathLocale, request)
    }
    return response
  }

  /* 3. The root: cookie wins over the header; neither is trusted beyond the allowlist. */
  if (pathname === '/') {
    const resolved = cookieLocale ?? negotiateLocale(request.headers.get('accept-language'))

    if (resolved !== defaultLocale) {
      const target = request.nextUrl.clone()
      target.pathname = localeMeta[resolved].path
      const response = NextResponse.redirect(target, 307)
      addVary(response)
      return response
    }

    const response = NextResponse.next()
    addVary(response)
    return response
  }

  return NextResponse.next()
}

/** Matches only a locale's own path, never a nested route such as /pt-br/opengraph-image. */
function localeFromPathname(pathname: string): Locale | undefined {
  const path = pathname !== '/' && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  if (path === localeMeta['pt-br'].path) return 'pt-br'
  return undefined
}

function setLocaleCookie(
  response: NextResponse,
  locale: Locale,
  request: NextRequest,
): void {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    // Only middleware reads this, so keep it away from client script entirely.
    httpOnly: true,
    secure: request.nextUrl.protocol === 'https:',
  })
}

/**
 * What `/` returns now depends on the header and the cookie, so a shared cache
 * must not serve one visitor's outcome to another. See §7.4.
 */
function addVary(response: NextResponse): void {
  const existing = response.headers.get('Vary')
  const values = new Set(
    (existing ? `${existing}, ` : '')
      .concat('Accept-Language, Cookie')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean),
  )
  response.headers.set('Vary', [...values].join(', '))
}

export const config = {
  /*
   * Skip Next internals, the metadata routes and anything that looks like a
   * file. Locale negotiation has no business running for an image request.
   */
  matcher: ['/((?!_next/|.*\\..*|robots\\.txt|sitemap\\.xml).*)'],
}
