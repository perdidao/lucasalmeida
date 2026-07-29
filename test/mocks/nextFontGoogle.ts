/**
 * next/font/google runs a build-time downloader that has no meaning under
 * Vitest. Both families resolve to the same inert stub.
 */
const stub = () => ({
  className: 'font-stub',
  variable: 'font-stub-variable',
  style: { fontFamily: 'stub' },
})

export const Instrument_Serif = stub
export const JetBrains_Mono = stub
