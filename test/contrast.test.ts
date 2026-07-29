import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Regression guard for the accessibility deviation documented in
 * docs/plans/nextjs-portfolio-rewrite.md §3.1.
 *
 * The design's muted greys sit between 2.7:1 and 3.6:1 against the page
 * background — below the 4.5:1 WCAG AA floor for normal text, and they are
 * applied to 11px labels. They were raised deliberately. If anyone reverts them
 * towards the original design values, this fails with the exact ratio.
 */

const css = readFileSync(
  join(process.cwd(), 'app/globals.css'),
  'utf8',
)

type Rgb = [number, number, number]

function readToken(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`))
  if (!match?.[1]) throw new Error(`token --${name} not found in globals.css`)
  return match[1].trim()
}

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
