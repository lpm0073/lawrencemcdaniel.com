---
name: lawrencemcdaniel-code-quality
description: Use before finishing any change to lawrencemcdaniel.com, to format, lint and type-check it the way CI does (Prettier, ESLint flat config with typescript-eslint, tsc -b over three tsconfig projects, codespell and the pre-commit hooks), or when fixing a lint or type error. Explains the configuration files, the TypeScript rules (strict, no any), which eslint-disable comments are acceptable, the husky hook, and how to run the checks on changed files under zsh.
---

# lawrencemcdaniel.com Code Quality

CI (`.github/workflows/test.yml`) runs `yarn format:check`, `yarn lint`,
`yarn typecheck`, `yarn coverage` and `yarn build`. `make test` runs the first
four locally. If they pass, the code meets the standard. Never bypass a check
(`--no-verify`, `SKIP=`, a blanket disable) to make a change pass.

## Configuration

| Tool       | Configuration                                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Prettier   | `package.json` `"prettier"`: no semicolons, single quotes, printWidth 90, trailingComma es5. `.prettierignore` skips build output, coverage, `public/data`, `public/sitemap.xml` and `CHANGELOG.md`          |
| ESLint 10  | `eslint.config.js` (flat config, modeled on smarter/react's): typescript-eslint, react-hooks, react-refresh, jsx-a11y, and Testing Library, jest-dom and Vitest rules for tests; eslint-config-prettier last |
| TypeScript | `tsconfig.json` references `tsconfig.app.json` (browser code and tests), `tsconfig.sw.json` (the service worker, WebWorker lib) and `tsconfig.node.json` (configs, and the scripts Node runs)                |

## TypeScript rules

- `strict` everywhere. No `any`, explicit or implicit; use `unknown` and narrow
  it. No `@ts-ignore` / `@ts-expect-error`. Avoid non-null assertions (`!`);
  guard instead.
- Data types are inferred from the zod schemas in `src/schemas.ts`
  (`src/types.ts`), so the types and the runtime checks can't drift apart.
  Change the schema, not the type. `RootState` and `AppDispatch` are in
  `src/redux/configureStore.ts`.
- Read data with the hooks in `src/redux/hooks.ts`, and the store with
  `useAppSelector` / `useAppDispatch`. No `connect()`.
- Code that Node runs directly (the fetchers, `generator.ts`,
  `updateVersion.ts`, `dotenv.ts`) imports with explicit `.ts` extensions and
  uses only erasable syntax (`erasableSyntaxOnly`): no enums, namespaces or
  parameter properties. It needs Node 22.18+.
- A third-party package without types: install its `@types/*` package if one
  exists; otherwise declare it minimally in `src/vendor.d.ts`.
- Use `import type` for type-only imports (`verbatimModuleSyntax`).

## Commands

```console
yarn format                 # Prettier, everything
yarn lint                   # ESLint, everything, --max-warnings=0
yarn lint:fix
yarn typecheck              # tsc -b
make test                   # all of the above, plus the tests with coverage
```

On changed files only (zsh: use `xargs`, because zsh passes an unquoted
`$FILES` as one argument):

```console
git diff --name-only -- '*.ts' '*.tsx' | xargs npx eslint --max-warnings=0
git diff --name-only | xargs npx prettier --check --ignore-unknown
```

## Hooks

- **husky** `.husky/pre-commit` runs `npx prettier --write .` on every commit.
- **pre-commit** (`.pre-commit-config.yaml`, after `pre-commit install`):
  codespell (`codespell.txt` is the ignore list), the project's own Prettier
  and ESLint (local `npx --no-install` hooks, so they need `yarn install`),
  whitespace / EOF / JSON / YAML / XML checks, private-key and AWS credential
  detection, and commitlint on the commit message. Prefer
  `git diff --name-only | xargs pre-commit run --files` to `--all-files`.

## eslint-disable comments

Fix the cause. A disable must be `eslint-disable-next-line <rule>` with a
reason after `--`. The ones in the code today, and why they're acceptable:

- `react-refresh/only-export-components` on helpers exported beside
  components in `src/components/content/Component.tsx`.
- `jsx-a11y/anchor-is-valid` in `src/pages/imageTagging/Component.tsx`.
- `testing-library/no-node-access` in tests, where the asserted thing has no
  accessible role.

## Principles

- jsx-a11y findings matter: the site is a public portfolio. Give links
  discernible text, images `alt`, and landmarks `aria-label`, as the pages do.
- Don't reformat code you didn't otherwise change. It buries the diff.
