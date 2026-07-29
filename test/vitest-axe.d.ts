import type { AxeMatchers } from 'vitest-axe/matchers'

/**
 * vitest-axe still augments the legacy global `Vi` namespace, which Vitest 4 no
 * longer reads. This re-declares the matcher against the current module so
 * `expect(results).toHaveNoViolations()` type-checks.
 *
 * The matcher is registered at runtime in test/setup.ts.
 */
declare module 'vitest' {
  /* eslint-disable @typescript-eslint/no-empty-object-type -- interface merging is the only way to extend these. */
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
  /* eslint-enable @typescript-eslint/no-empty-object-type */
}
