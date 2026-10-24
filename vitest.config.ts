/**
 * Vitest configuration, modeled on the Smarter React workspace's
 * vitest.shared.ts (smarter-sh/smarter, smarter/react).
 *
 * - Tests are src/**\/*.test.{ts,tsx} and cloudfront/*.test.ts, run in jsdom, a
 *   simulated browser, or in Node where a test says so (@vitest-environment node).
 * - test/setup.ts adds jest-dom's matchers, stubs the browser Cache API, and
 *   starts MSW, which answers the tests' API requests and fails any test that
 *   makes an unmocked one.
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Tests run React's development build, which has act() and its warnings. Vitest only sets
// NODE_ENV=test when it is unset, and a shell may export NODE_ENV=production for builds.
process.env.NODE_ENV = 'test'
// Dates and times are formatted the same way on every machine.
process.env.TZ = 'UTC'
process.env.LANG = 'en_US.UTF-8'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost:3000/' } },
    setupFiles: ['./test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'cloudfront/**/*.test.ts'],
    restoreMocks: true,
    // Above test/setup.ts's 5 second waitFor(), so that a slow CI runner fails on the assertion.
    testTimeout: 15000,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.{ts,tsx}',
        'src/main.tsx',
        'src/service-worker.ts',
        'src/**/*.d.ts',
      ],
      reporter: ['text-summary', 'html', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
})
