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
  /*
   * No `Vary` entry for `/`.
   *
   * It used to need one because the response depended on Accept-Language and a
   * preference cookie. Neither is read any more — `/` is unconditionally English
   * and `/pt-br` unconditionally Portuguese — so both pages are plain static
   * documents that any cache can serve to anyone.
   * See docs/plans/english-default.md §2.
   */
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
