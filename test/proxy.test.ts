import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'
import { LOCALE_COOKIE } from '@/lib/i18n/config'

const ORIGIN = 'https://www.lucasalmeida.dev'

function request(
  path: string,
  init: { acceptLanguage?: string; cookie?: string } = {},
) {
  const headers = new Headers()
  if (init.acceptLanguage) headers.set('accept-language', init.acceptLanguage)
  if (init.cookie !== undefined) {
    headers.set('cookie', `${LOCALE_COOKIE}=${init.cookie}`)
  }
  return new NextRequest(new URL(path, ORIGIN), { headers })
}

/** Redirect target as a path, or null when the response is not a redirect. */
function redirectTarget(response: Response): string | null {
  if (response.status < 300 || response.status >= 400) return null
  const location = response.headers.get('location')
  return location ? new URL(location, ORIGIN).pathname : null
}

function cookieValue(response: Response): string | undefined {
  const header = response.headers.get('set-cookie')
  if (!header) return undefined
  return header.match(new RegExp(`${LOCALE_COOKIE}=([^;]*)`))?.[1]
}

describe('proxy — locale negotiation on /', () => {
  it('redirects a Portuguese browser to /pt-br', () => {
    const response = proxy(
      request('/', { acceptLanguage: 'pt-BR,pt;q=0.9,en;q=0.8' }),
    )
    expect(redirectTarget(response)).toBe('/pt-br')
  })

  it('leaves an English browser on /', () => {
    const response = proxy(
      request('/', { acceptLanguage: 'en-US,en;q=0.9' }),
    )
    expect(redirectTarget(response)).toBeNull()
  })

  it('leaves a crawler with no Accept-Language on /', () => {
    const response = proxy(request('/'))
    expect(redirectTarget(response)).toBeNull()
  })

  it('marks / as varying by header and cookie', () => {
    const vary = proxy(request('/')).headers.get('Vary') ?? ''
    expect(vary).toContain('Accept-Language')
    expect(vary).toContain('Cookie')
  })
})

describe('proxy — the cookie outranks the header', () => {
  it('keeps an English cookie on / despite a Portuguese header', () => {
    const response = proxy(
      request('/', { acceptLanguage: 'pt-BR', cookie: 'en' }),
    )
    expect(redirectTarget(response)).toBeNull()
  })

  it('sends a Portuguese cookie to /pt-br despite an English header', () => {
    const response = proxy(
      request('/', { acceptLanguage: 'en-US', cookie: 'pt-br' }),
    )
    expect(redirectTarget(response)).toBe('/pt-br')
  })

  it.each(['xx', '', 'EN', '../pt-br', 'pt-br,en', '<script>'])(
    'ignores the tampered cookie value %j and falls back to the header',
    (value) => {
      const response = proxy(
        request('/', { acceptLanguage: 'pt-BR', cookie: value }),
      )
      // Header still decides; the junk cookie neither wins nor throws.
      expect(redirectTarget(response)).toBe('/pt-br')
    },
  )
})

describe('proxy — explicit choice via ?lang', () => {
  it('records the choice and strips the parameter', () => {
    const response = proxy(request('/?lang=pt-br'))
    expect(redirectTarget(response)).toBe('/pt-br')
    expect(cookieValue(response)).toBe('pt-br')
    expect(response.headers.get('location')).not.toContain('lang=')
  })

  it('lets an English speaker pin English against their own header', () => {
    const response = proxy(
      request('/?lang=en', { acceptLanguage: 'pt-BR' }),
    )
    expect(redirectTarget(response)).toBe('/')
    expect(cookieValue(response)).toBe('en')
  })

  it('sets an httpOnly, lax, secure cookie', () => {
    const header = proxy(request('/?lang=pt-br')).headers.get('set-cookie')!
    expect(header).toContain('HttpOnly')
    expect(header).toContain('SameSite=lax')
    expect(header).toContain('Secure')
    expect(header).toContain('Path=/')
  })

  /**
   * Open-redirect guard. `?lang` is untrusted; it may only ever select one of
   * two literal paths. See docs/plans/i18n-pt-br.md §7.1.
   */
  it.each([
    'https://evil.com',
    '//evil.com',
    '/////evil.com',
    '../../etc/passwd',
    'en%0d%0aSet-Cookie:%20a=b',
    'pt-br/../../evil',
    'javascript:alert(1)',
    'EN',
    '',
  ])('ignores the hostile ?lang value %j entirely', (value) => {
    const response = proxy(
      request(`/?lang=${encodeURIComponent(value)}`, {
        acceptLanguage: 'en-US',
      }),
    )

    // No redirect was issued off the back of it, and no cookie was written.
    expect(redirectTarget(response)).toBeNull()
    expect(cookieValue(response)).toBeUndefined()
  })

  it('never emits a Location pointing off-origin', () => {
    for (const value of ['https://evil.com', '//evil.com', 'pt-br', 'en']) {
      const response = proxy(
        request(`/?lang=${encodeURIComponent(value)}`),
      )
      const location = response.headers.get('location')
      if (location) {
        expect(new URL(location, ORIGIN).origin).toBe(ORIGIN)
      }
    }
  })
})

describe('proxy — /pt-br', () => {
  it('never redirects, so there is no loop with /', () => {
    for (const header of ['en-US', 'pt-BR', undefined]) {
      const response = proxy(
        request('/pt-br', header ? { acceptLanguage: header } : {}),
      )
      expect(redirectTarget(response)).toBeNull()
    }
  })

  it('records pt-br as the preference on arrival', () => {
    expect(cookieValue(proxy(request('/pt-br')))).toBe('pt-br')
  })

  it('does not rewrite the cookie when it already matches', () => {
    const response = proxy(request('/pt-br', { cookie: 'pt-br' }))
    expect(cookieValue(response)).toBeUndefined()
  })

  it('treats a trailing slash the same way', () => {
    const response = proxy(request('/pt-br/'))
    expect(redirectTarget(response)).toBeNull()
    expect(cookieValue(response)).toBe('pt-br')
  })

  it('leaves nested paths such as the OG image alone', () => {
    const response = proxy(
      request('/pt-br/opengraph-image', { acceptLanguage: 'en-US' }),
    )
    expect(redirectTarget(response)).toBeNull()
  })
})
