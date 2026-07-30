import type { NextConfig } from 'next'

/**
 * Content-Security-Policy.
 *
 * `script-src` needs 'unsafe-inline' because Next inlines its bootstrap and the
 * flash-of-hidden-content guard in `app/layout.tsx` is a render-blocking inline
 * script. Everything else is locked to same-origin: fonts are self-hosted by
 * next/font, so there is no third-party origin to allow.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        /*
         * What `/` returns depends on Accept-Language and the locale cookie, so a
         * shared cache must not serve one visitor's outcome to another.
         *
         * Partial by necessity, measured against the production server:
         *   - the 307 to /pt-br DOES carry `Vary: Accept-Language, Cookie`
         *     (set in proxy.ts), which is the dangerous direction — it stops a
         *     cache pinning "everyone gets redirected".
         *   - the 200 for `/` does NOT. Next owns `Vary` on App Router responses
         *     (rsc, next-router-*) and overwrites this entry.
         *
         * The 200 case is instead covered by the proxy running per-request ahead
         * of any cache lookup, so the language decision is never itself cached.
         * A CDN placed in front of `next start` must preserve that ordering.
         * See docs/plans/i18n-pt-br.md §7.4.
         */
        source: '/',
        headers: [{ key: 'Vary', value: 'Accept-Language, Cookie' }],
      },
    ]
  },
}

export default nextConfig
