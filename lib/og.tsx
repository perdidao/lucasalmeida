import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getMessages } from '@/content'
import { site } from '@/content/config'
import type { Locale } from '@/lib/i18n/config'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

/**
 * Social card, generated per locale rather than shipped as a static PNG so it can
 * never drift from the copy in content/messages.
 *
 * The display face is read off disk (assets/fonts) instead of fetched: nothing in
 * the render path should depend on a third-party host being reachable.
 */
export async function renderOgImage(locale: Locale) {
  const m = getMessages(locale)
  const instrumentSerif = await readFile(
    join(process.cwd(), 'assets/fonts/InstrumentSerif-Regular.ttf'),
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#282828',
          padding: '72px 80px',
          color: '#edebe8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#d7fe62',
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: 'rgba(237,235,232,.72)',
            }}
          >
            {m.meta.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: '#d7fe62',
              letterSpacing: -0.5,
            }}
          >
            {m.meta.role}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'rgba(237,235,232,.58)',
          }}
        >
          <div style={{ display: 'flex' }}>{m.og.footnote}</div>
          <div style={{ display: 'flex' }}>lucasalmeida.dev</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: 'Instrument Serif',
          data: instrumentSerif,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
