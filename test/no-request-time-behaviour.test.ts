import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import * as i18nConfig from '@/lib/i18n/config'

/**
 * The site has no request-time behaviour: `/` is always English, `/pt-br` is
 * always Portuguese, nothing is negotiated, nothing is stored and nothing
 * redirects.
 *
 * These are structural assertions rather than behavioural ones, because the
 * thing being guarded is an *absence*. Re-introducing a proxy or a preference
 * cookie is a deliberate architectural change and should have to delete a test
 * to happen. See docs/plans/english-default.md.
 */
describe('no request-time locale behaviour', () => {
  it.each(['proxy.ts', 'middleware.ts', 'src/proxy.ts', 'src/middleware.ts'])(
    'has no %s at the repo root',
    (file) => {
      expect(existsSync(join(process.cwd(), file))).toBe(false)
    },
  )

  it('exports no cookie or query-parameter name', () => {
    const exported = Object.keys(i18nConfig)
    expect(exported).not.toContain('LOCALE_COOKIE')
    expect(exported).not.toContain('LOCALE_PARAM')
    // parseLocale existed only to validate untrusted input for the proxy.
    expect(exported).not.toContain('parseLocale')
  })

  it('still exports what the metadata layer needs', () => {
    const exported = Object.keys(i18nConfig)
    for (const name of ['locales', 'defaultLocale', 'localeMeta', 'otherLocale', 'localeUrl']) {
      expect(exported).toContain(name)
    }
  })

  it('keeps English as the default locale', () => {
    expect(i18nConfig.defaultLocale).toBe('en')
    expect(i18nConfig.localeMeta.en.path).toBe('/')
  })

  /*
   * Asserted on disk rather than by attempting an import: Vite resolves imports
   * at transform time, so importing a deleted module fails the whole file to
   * load instead of producing a rejection this test could catch.
   */
  it('has no Accept-Language negotiator left', () => {
    expect(existsSync(join(process.cwd(), 'lib/i18n/negotiate.ts'))).toBe(false)
  })

  /*
   * Looks for the header name as a *quoted string* — i.e. code reading it —
   * rather than the bare word, which would also flag prose in a comment.
   * `git grep` exits 1 when nothing matches, which is the passing case here.
   */
  it('reads no request headers or cookies anywhere in the source', () => {
    const patterns = [
      "['\"]accept-language['\"]",
      'cookies\\.(get|set)',
      'NextResponse',
      'NextRequest',
    ]

    for (const pattern of patterns) {
      let hits = ''
      try {
        hits = execFileSync(
          'git',
          ['grep', '-lIE', pattern, '--', 'app', 'components', 'lib', 'content'],
          { encoding: 'utf8' },
        ).trim()
      } catch {
        hits = '' // exit code 1 == no matches
      }
      expect(hits, `"${pattern}" still appears in the source`).toBe('')
    }
  })
})
