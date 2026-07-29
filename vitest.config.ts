import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      'next/font/google': fileURLToPath(
        new URL('./test/mocks/nextFontGoogle.ts', import.meta.url),
      ),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    /*
     * Styles are deliberately NOT applied. jsdom does not evaluate media
     * queries, so a mobile-first `display: none` that a real browser overrides
     * at a breakpoint would be treated as permanently hidden and silently drop
     * elements out of the accessibility tree — producing green tests for markup
     * no desktop user can reach. Class names still resolve; CSS correctness is
     * covered by contrast.test.ts and by the browser pass.
     */
    css: false,
    include: ['test/**/*.test.{ts,tsx}'],
  },
})
