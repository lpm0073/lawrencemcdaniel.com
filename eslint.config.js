/**
 * ESLint configuration, modeled on the shared configuration of the Smarter
 * React workspace (smarter-sh/smarter, smarter/react/eslint.config.js).
 *
 * - TypeScript, React hooks and React Refresh rules for all source files.
 * - jsx-a11y: accessibility rules for JSX.
 * - Testing Library, jest-dom and Vitest rules for tests.
 * - eslint-config-prettier, last: formatting is Prettier's job, not ESLint's.
 */
import js from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import prettier from 'eslint-config-prettier'
import jestDom from 'eslint-plugin-jest-dom'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import { reactRefresh } from 'eslint-plugin-react-refresh'
import testingLibrary from 'eslint-plugin-testing-library'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const TESTS = ['**/*.test.{ts,tsx}', 'test/**/*.{ts,tsx}']

// Scripts that Node runs directly: the fetchers, the sitemap generator, and
// the version bump that CI runs.
const NODE_SCRIPTS = [
  'src/components/sitemap/generator.ts',
  'src/prerender/prerender.ts',
  'src/shared/dotenv.ts',
  'src/shared/updateVersion.ts',
  'src/shared/fetchers/blogPostFetcher.ts',
  'src/shared/fetchers/githubRepoFetcher.ts',
  'src/shared/fetchers/youtubeFetcher.ts',
  // and their tests
  'src/**/*.node.test.ts',
  // the CloudFront Function's test
  'cloudfront/*.test.ts',
]

export default defineConfig([
  globalIgnores(['build', 'build-ssr', 'coverage', 'node_modules', 'public', 'dev-dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite(),
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // react-multi-carousel is CommonJS only: Vite's dev server imports its default as
      // the module object, which crashes rendering. Use the shim instead.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-multi-carousel',
              importNames: ['default'],
              message: "Import Carousel from 'src/components/carousel' instead.",
            },
          ],
        },
      ],
      // unused variables are errors, except those named _, e.g. the ignored half of a [key, value] pair.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // configuration files and scripts run in Node.
    files: ['*.config.{js,ts,cjs}', ...NODE_SCRIPTS],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    files: ['src/service-worker.ts'],
    languageOptions: {
      globals: globals.serviceworker,
    },
  },
  {
    // tests define more than components.
    files: TESTS,
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: TESTS,
    extends: [
      testingLibrary.configs['flat/react'],
      jestDom.configs['flat/recommended'],
      vitest.configs.recommended,
    ],
  },
  {
    files: ['test/setup.ts'],
    rules: {
      // Vitest's globals are off, so Testing Library's automatic cleanup is not registered.
      'testing-library/no-manual-cleanup': 'off',
    },
  },
  prettier,
])
