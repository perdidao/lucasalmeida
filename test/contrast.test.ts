import { describe, it, expect } from 'vitest'
import { globalsCss as css, readToken } from './tokens'

/**
 * Regression guard for the accessibility deviation documented in
 * docs/plans/nextjs-portfolio-rewrite.md §3.1.
 *
 * The design's muted greys fall below the 4.5:1 WCAG AA floor for normal text,
 * and they are applied to 11px labels. They were raised deliberately. If anyone
 * reverts them towards the original design values, this fails with the ratio.
 *
 * This is also the guard that makes changing --bg safe: every ratio is computed
 * against whatever --bg currently is, so lightening the canvas re-checks the
 * whole text palette automatically rather than silently eroding it.
 */

type Rgb = [number, number, number]

function parseColor(value: string): { rgb: Rgb; alpha: number } {
  const hex = value.match(/^#([0-9a-f]{6})$/i)
  if (hex?.[1]) {
    const n = parseInt(hex[1], 16)
    return { rgb: [(n >> 16) & 255, (n >> 8) & 255, n & 255], alpha: 1 }
  }

  const rgba = value.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/,
  )
  if (rgba) {
    return {
      rgb: [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])],
      alpha: rgba[4] === undefined ? 1 : Number(rgba[4]),
    }
  }

  throw new Error(`unsupported colour format: ${value}`)
}

/** Flattens a translucent foreground onto an opaque background. */
function composite(fg: Rgb, alpha: number, bg: Rgb): Rgb {
  return fg.map((c, i) => alpha * c + (1 - alpha) * bg[i]!) as Rgb
}

/** WCAG 2.x relative luminance. */
function luminance([r, g, b]: Rgb): number {
  const channel = (value: number) => {
    const s = value / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(fg: Rgb, bg: Rgb): number {
  const [lighter, darker] = [luminance(fg), luminance(bg)].sort((a, b) => b - a)
  return (lighter! + 0.05) / (darker! + 0.05)
}

const bg = parseColor(readToken('bg')).rgb

function ratioFor(token: string): number {
  const { rgb, alpha } = parseColor(readToken(token))
  return contrast(composite(rgb, alpha, bg), bg)
}

describe('token contrast against --bg', () => {
  // Every one of these is used for text somewhere on the page.
  it.each([
    ['ink', 4.5],
    ['ink-muted', 4.5],
    ['ink-subtle', 4.5],
    ['accent', 4.5],
  ])('--%s clears %s:1 (AA, normal text)', (token, minimum) => {
    const ratio = ratioFor(token)
    expect(
      ratio,
      `--${token} is ${ratio.toFixed(2)}:1, below the ${minimum}:1 floor`,
    ).toBeGreaterThanOrEqual(minimum)
  })

  it('keeps the accent readable as a background for --bg text', () => {
    const accent = parseColor(readToken('accent')).rgb
    expect(contrast(bg, accent)).toBeGreaterThanOrEqual(4.5)
  })

  it('has not been reverted to the design’s failing alpha values', () => {
    // .34 / .38 / .40 / .42 all measured below 4.5:1 on this background.
    for (const alpha of ['0.34', '0.38', '0.4', '0.42', '0.5']) {
      expect(
        css.includes(`--ink-muted: rgba(237, 235, 232, ${alpha})`),
        `--ink-muted regressed to ${alpha}`,
      ).toBe(false)
      expect(
        css.includes(`--ink-subtle: rgba(237, 235, 232, ${alpha})`),
        `--ink-subtle regressed to ${alpha}`,
      ).toBe(false)
    }
  })
})

describe('surface tokens relative to --bg', () => {
  const luminanceOf = (token: string) => {
    const { rgb, alpha } = parseColor(readToken(token))
    return luminance(composite(rgb, alpha, bg))
  }

  /**
   * Hover surfaces must sit *above* the canvas.
   *
   * They were near-black lifts chosen for a #0a0a0b background; on a lighter
   * canvas the same literals are darker than the page, which turns every hover
   * state from a lift into a hole. Caught exactly that when --bg moved to
   * #282828.
   */
  it.each(['surface', 'surface-2'])(
    '--%s is lighter than --bg',
    (token) => {
      expect(luminanceOf(token)).toBeGreaterThan(luminance(bg))
    },
  )

  it('keeps the two hover surfaces distinguishable and subtle', () => {
    const base = luminance(bg)
    for (const token of ['surface', 'surface-2']) {
      // Visible as a lift, but never so bright it reads as a different colour.
      expect(luminanceOf(token) - base).toBeLessThan(0.05)
    }
    expect(luminanceOf('surface-2')).toBeGreaterThan(luminanceOf('surface'))
  })

  /** The translucent header backdrop has to be the same colour as the canvas. */
  it('derives --bg-translucent from --bg', () => {
    const { rgb: translucent, alpha } = parseColor(readToken('bg-translucent'))
    expect(alpha).toBeGreaterThan(0)
    expect(alpha).toBeLessThan(1)
    expect(translucent).toEqual(bg)
  })
})
