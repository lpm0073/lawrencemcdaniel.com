/**
 * What the Smarter Project page links to: the ideas in Smarter that Lawrence
 * originated, each with its write-ups, and the smarter-sh repositories. The
 * details live on blog.smarter.sh, docs.smarter.sh and GitHub, so each entry
 * only says enough to point there.
 */

const BLOG = 'https://blog.smarter.sh'
const DOCS = 'https://docs.smarter.sh/en/latest'
const CODE = 'https://github.com/smarter-sh/smarter/blob/main/smarter/smarter'

export const SMARTER_URLS = {
  site: 'https://smarter.sh/',
  about: 'https://smarter.sh/about',
  docs: 'https://docs.smarter.sh/',
  blog: 'https://blog.smarter.sh/',
  github: 'https://github.com/smarter-sh',
  repo: 'https://github.com/smarter-sh/smarter',
  adrs: DOCS + '/adr.html',
  architecture: DOCS + '/smarter-framework/architecture.html',
  firstPrototype: 'https://openai.lawrencemcdaniel.com/',
  workbenchScreenshot:
    'https://cdn.smarter.sh/docs/smarter-framework/smarter-web-dashboard/console-prompt-workbench.png',
}

export interface SmarterLink {
  label: string
  href: string
}

export interface SmarterIdea {
  key: string
  title: string
  summary: string
  /** An illustration from blog.smarter.sh or docs.smarter.sh. */
  image?: { src: string; alt: string }
  /** Shown instead of an image, for an idea that has no published illustration. */
  code?: string
  links: SmarterLink[]
}

export const SMARTER_IDEAS: SmarterIdea[] = [
  {
    key: 'django-react',
    title: 'Django-React integration',
    summary:
      'The web console is served by Django but includes more than 30 React apps. ' +
      'I developed a way to hand over each page’s React manifest contexts through a custom Django template tag ' +
      'making React a bound part of Django’s runtime.',
    image: {
      src: 'https://cdn.blog.smarter.sh/2026/05/10014519/django-react.png',
      alt: 'The Django and React logos',
    },
    links: [
      { label: 'Blog post', href: BLOG + '/2026/05/29/react-integration/' },
      {
        label: 'Docs',
        href: DOCS + '/smarter-framework/developer-reference/react-integration.html',
      },
      {
        label: 'Code',
        href: CODE + '/lib/django/templatetags/smarter_react_templatetag_manager.py',
      },
    ],
  },
  {
    key: 'ownership',
    title: 'A resource ownership model for Django',
    summary:
      'One abstract model decides who owns a resource, who can see it, who can change ' +
      'it, and how its name stays unique when it is cloned. Every kind of resource ' +
      'inherits it, so the rules are written, tested and cached in one place.',
    code:
      'class Secret(MetaDataWithOwnershipModel):\n' +
      '    ...\n\n' +
      'Secret.objects\n' +
      '    .with_read_permission_for(user)\n' +
      'Secret.objects\n' +
      '    .with_ownership_permission_for(user)',
    links: [
      {
        label: 'Blog post',
        href: BLOG + '/2026/10/10/claude-code-large-django-codebase/',
      },
      {
        label: 'Docs',
        href: DOCS + '/smarter-resources/account/models/metadata_with_ownership.html',
      },
      { label: 'Code', href: CODE + '/apps/account/models/metadata_with_ownership.py' },
    ],
  },
  {
    key: 'sam',
    title: 'Pydantic manifests and the broker model',
    summary:
      'Every AI resource is declared in a Kubernetes-style YAML manifest, validated by ' +
      'Pydantic models. A broker for each kind turns manifests into Django records and ' +
      'back, so the command line, the REST API and the web console share one path for ' +
      'apply, get, describe and delete.',
    image: {
      src: 'https://cdn.smarter.sh/docs/smarter-framework/smarter-manifest.png',
      alt: 'A Smarter Application Manifest for a chatbot, in YAML',
    },
    links: [
      { label: 'Manifests', href: DOCS + '/smarter-framework/smarter-manifests.html' },
      { label: 'Brokers', href: DOCS + '/smarter-framework/smarter-broker-model.html' },
      { label: 'Code', href: CODE + '/lib/manifest/broker/abstract_broker_class.py' },
    ],
  },
  {
    key: 'cache-results',
    title: 'Object caching with @cache_results()',
    summary:
      'I developed a decorator-based caching solution that works by serializing function arguments and caching their results in Django’s cache.',
    image: {
      src: 'https://cdn.blog.smarter.sh/2026/10/25132233/cache-results-featured.png',
      alt: 'Illustration of Django caching with @cache_results(): a caped courier outruns a stopwatch, delivering a cached result',
    },
    links: [
      { label: 'Blog post', href: BLOG + '/2026/10/25/smarter-cache-results/' },
      {
        label: 'Docs',
        href:
          DOCS + '/smarter-framework/developer-reference/lib/caching/cache_results.html',
      },
      { label: 'Code', href: CODE + '/lib/cache/decorators.py' },
    ],
  },
  {
    key: 'agentic',
    title: 'Agentic coding on a large codebase',
    summary:
      'Claude Code works on Smarter every day, continually improving code quality, extensibility, performance and CI-CD automation. ' +
      'These articles explore how it does that.',
    image: {
      src: 'https://cdn.blog.smarter.sh/2026/10/17235517/smarter-convergence-loop.png',
      alt: 'The convergence loop: guidance, autonomy and feedback',
    },
    links: [
      { label: 'Part 1', href: BLOG + '/2026/10/10/claude-code-large-django-codebase/' },
      { label: 'Part 2', href: BLOG + '/2026/10/11/blog-prologue-geometric-series/' },
      { label: 'Part 3', href: BLOG + '/2026/10/17/claude-code-data-sources/' },
      {
        label: 'Docs',
        href: DOCS + '/smarter-framework/developer-reference/agentic-development.html',
      },
    ],
  },
]

export interface SmarterRepoGroup {
  name: string
  repos: string[]
}

/** The smarter-sh repositories, by what they are. */
export const SMARTER_REPOS: SmarterRepoGroup[] = [
  { name: 'Platform', repos: ['smarter'] },
  { name: 'Command line', repos: ['smarter-cli'] },
  { name: 'SDKs', repos: ['smarter-python', 'smarter-nodejs', 'smarter-golang'] },
  { name: 'Editor', repos: ['smarter-vscode-yaml'] },
  {
    name: 'Chat integrations',
    repos: [
      'smarter-wordpress',
      'smarter-drupal',
      'smarter-shopify',
      'smarter-gtm-template',
      'smarter-docs-site-generators',
    ],
  },
  { name: 'Examples', repos: ['example-manifests', 'stackademy'] },
]

/** The production chatbot that the page embeds, deployed on ubc.smarter.sh. */
export const SMARTER_DEVELOPER_BOT = {
  name: 'smarter_developer',
  chatbot: 'https://smarter-developer.3141-5926-5359.api.ubc.smarter.sh/',
  appName: 'Smarter Developer Guide',
  assistant: 'Sam',
  welcome:
    'Welcome! Ask me how any part of The Smarter Project works, and I’ll show you the code.',
  examples: [
    'How do I add a new SAM resource kind to Smarter?',
    'How does @cache_results() know when to invalidate a cached result?',
    'How does Django hand a page’s context to its React app?',
  ],
  manifest:
    'https://github.com/smarter-sh/example-manifests/blob/main/llm-clients/llmclient-smarter-developer.yaml',
}
