import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')

/** Reads a design token's declared value straight out of globals.css. */
export function readToken(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`))
  if (!match?.[1]) throw new Error(`token --${name} not found in globals.css`)
  return match[1].trim()
}

export { css as globalsCss }
