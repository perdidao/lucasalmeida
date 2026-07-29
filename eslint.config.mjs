import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // See docs/plans/nextjs-portfolio-rewrite.md §9.1 — dangerouslySetInnerHTML
      // is permitted in exactly one place (the JSON-LD block), which carries an
      // explicit eslint-disable comment.
      'react/no-danger': 'error',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
]

export default config
