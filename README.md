# lawrencemcdaniel.com

![Test Status](https://github.com/lpm0073/lawrencemcdaniel.com/actions/workflows/test.yml/badge.svg?event=pull_request)
![Deploy Status](https://github.com/lpm0073/lawrencemcdaniel.com/actions/workflows/deploy.yml/badge.svg?branch=main)
[![Coverage](https://img.shields.io/codecov/c/github/lpm0073/lawrencemcdaniel.com/main?label=coverage&logo=codecov)](https://codecov.io/gh/lpm0073/lawrencemcdaniel.com)
[![Latest Release](https://img.shields.io/github/v/release/lpm0073/lawrencemcdaniel.com?label=release)](https://github.com/lpm0073/lawrencemcdaniel.com/releases)
[![Website](https://img.shields.io/badge/web%20site-lawrencemcdaniel.com-blue?logo=google-chrome)](https://lawrencemcdaniel.com)
[![Blog](https://img.shields.io/badge/blog-blog.lawrencemcdaniel.com-blue?logo=wordpress)](https://blog.lawrencemcdaniel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License: GNU AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Slack](https://img.shields.io/badge/Slack-The%20Smarter%20Project-4A154B?logo=slack&logoColor=white)](https://join.slack.com/t/thesmarterproject/shared_invite/zt-4f0t6v46q-e2c5Of4hS4fBr_XwfQARCw)<br>

My personal web site. Of note:

- React single page web app, written in TypeScript and built with Vite
- Redux state management
- Progressive web app architecture using workbox
- Static asset precaching using service-worker.ts
- Logo cube on home page. see [LogoCube source](https://github.com/lpm0073/lawrencemcdaniel.com/tree/main/src/components/logocube) and my blog post on [Animations in React](https://blog.lawrencemcdaniel.com/animations-in-reactjs/)
- Matrix Digital Rain Effect component. Gives you your favorite Matrix movie screen effect in the form of a React component. Implemented as an [npm package](https://www.npmjs.com/package/react-mdr).
- Content component. An optimized content library sourced by Api's from GitHub, YouTube and Wordpress.

## Installation

Requires Node.js 22.18 or later (24 recommended) and yarn 1.

```bash
git clone https://github.com/lpm0073/lawrencemcdaniel.com.git
cd lawrencemcdaniel.com
yarn install
```

## Development

```bash
yarn start          # dev server with hot reloading, http://localhost:3000
yarn test           # unit tests (Vitest), once
yarn test:watch     # unit tests, re-run on every change
yarn coverage       # unit tests with a coverage report in coverage/
yarn lint           # ESLint
yarn typecheck      # TypeScript
yarn format         # Prettier
yarn build          # production build into build/ (uploads nothing)
yarn preview        # serve build/ on http://localhost:3000, with the service worker
yarn sitemap        # regenerate public/sitemap.xml
make test           # everything CI checks: formatting, lint, types, tests
```

The service worker is only registered in production builds, so check offline
and caching behavior with `yarn build && yarn preview`.

## Data

Repository, blog and YouTube metadata are served from
`https://lawrencemcdaniel.com/data/*.json`, which the Node scripts in
[src/shared/fetchers/](src/shared/fetchers/) generate into `public/data/`
(`make github`, `make blog`, `make yt`). They read API keys from `.env`
(`PAT` for GitHub, `YT` for YouTube). `make update` runs all three and uploads
the results to S3; the [Weekly Data Update](.github/workflows/updateDataStores.yml)
workflow does this every Monday.

## CI/CD

Every merge to `main` is tested, released and deployed to production,
automatically, by [deploy.yml](.github/workflows/deploy.yml):

1. **test**: [test.yml](.github/workflows/test.yml) checks formatting,
   lint, types, the unit tests (uploading coverage to Codecov) and the build.
   It also runs on every pull request.
2. **release**: semantic-release creates a GitHub release and updates
   `CHANGELOG.md` from the [conventional commit](https://www.conventionalcommits.org/)
   messages.
3. **deploy**: builds the site (`make site`), uploads it to AWS S3 and
   invalidates the CloudFront CDN.

A failure at any stage stops the stages after it. This is the only way the
site is deployed. To redeploy `main` without a new merge, run the workflow by
hand: `gh workflow run deploy.yml`, or **Run workflow** on the Actions tab.

## Resources

- API: <https://api.lawrencemcdaniel.com/>
- CDN: <https://cdn.lawrencemcdaniel.com/>
- [Vite](https://vite.dev/) and [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Deploy to AWS S3](https://medium.com/serverlessguru/deploy-reactjs-app-with-s3-static-hosting-f640cb49d7e6)
- [Configure Cloudfront](https://stackoverflow.com/questions/46497969/cloudfront-returns-403-forbidden-when-refreshing-page)
- [React Bootstrap](https://react-bootstrap.github.io/components/)
