// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { http, HttpResponse } from 'msw'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../../../test/server.ts'
import {
  assertArray,
  assertObject,
  extractMainDescriptionMD,
  extractMainDescriptionRST,
  fetchGitHub,
  fetchGitHubOrg,
  fetchIndividualRepos,
  fetchSingleRepo,
  getRepoCommitInfo,
  getRepoLanguages,
  getRepoReadme,
  getTotalCommits,
  githubApiHeaders,
  INDIVIDUAL_REPOS,
  isObject,
  main,
  skills,
} from './githubRepoFetcher.ts'

// never read the real .env
vi.mock('../dotenv.ts', () => ({ loadEnv: vi.fn() }))

const GH = 'https://api.github.com'

const MD_README = `[![badge](https://img.shields.io/x.svg)](https://x)
# Project

A **great** project.
![image](https://x/y.png)
<br/>
[](https://x/badge?y)
[] ()

## Install

pip install it
`

const RST_README = `Project
=======

.. image:: https://img.shields.io/x.svg
   :target: https://x

A great project, |badge| with text.

https://example.com/standalone

Installation
------------

pip install it
`

function apiRepo(owner: string, name: string, topics?: string[]) {
  return {
    name,
    html_url: `https://github.com/${owner}/${name}`,
    private: false,
    description: `About ${name}`,
    visibility: 'public',
    forks: 1,
    open_issues: 2,
    watchers: 3,
    stargazers_count: 4,
    topics,
    owner: { login: owner },
    default_branch: 'main',
  }
}

function readme(fileName: string, content: string) {
  return {
    content: Buffer.from(content).toString('base64'),
    name: fileName,
    path: fileName,
    sha: 'abc',
    size: content.length,
    download_url: `https://raw.githubusercontent.com/o/r/main/${fileName}`,
  }
}

/** Handlers for every per-repo endpoint, for a healthy repo. */
function repoHandlers() {
  return [
    http.get(`${GH}/repos/:owner/:repo`, ({ params }) =>
      HttpResponse.json(apiRepo(String(params.owner), String(params.repo), ['python']))
    ),
    http.get(`${GH}/repos/:owner/:repo/commits`, ({ request }) =>
      new URL(request.url).searchParams.get('sha')
        ? HttpResponse.json([{}], {
            headers: {
              link: '<https://api.github.com/x?per_page=1&page=42>; rel="last"',
            },
          })
        : HttpResponse.json([{ commit: { committer: { date: '2025-01-01T00:00:00Z' } } }])
    ),
    http.get(`${GH}/repos/:owner/:repo/languages`, () =>
      HttpResponse.json({ Python: 300, Shell: 100 })
    ),
    http.get(`${GH}/repos/:owner/:repo/readme`, () =>
      HttpResponse.json(readme('README.md', MD_README))
    ),
  ]
}

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  vi.unstubAllEnvs()
})

describe('helpers', () => {
  it('narrow unknown json', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(() => assertArray([], 'x')).not.toThrow()
    expect(() => assertArray({}, 'x')).toThrow('Unexpected response for x: not an array')
    expect(() => assertObject({}, 'x')).not.toThrow()
    expect(() => assertObject(1, 'x')).toThrow('Unexpected response for x: not an object')
  })

  it('adds the PAT to the headers when there is one', () => {
    vi.stubEnv('PAT', '')
    expect(githubApiHeaders()).toEqual({ Accept: 'application/vnd.github+json' })
    vi.stubEnv('PAT', 'secret')
    expect(githubApiHeaders().Authorization).toBe('Bearer secret')
  })
})

describe('skills', () => {
  it('maps topics and orgs to skill slugs, without duplicates', () => {
    expect(skills('x', [])).toEqual([])
    expect(skills('x', ['python', 'full-stack', 'fullstack'])).toEqual(['full-stack'])
    expect(skills('x', ['data-science'])).toEqual(['data-science'])
    expect(skills('x', ['terraform'])).toEqual(['cloud', 'full-stack'])
    expect(skills('x', ['terraform-aws'])).toEqual(['cloud'])
    expect(skills('x', ['kubernetes'])).toEqual(['cloud'])
    expect(skills('x', ['azure'])).toEqual(['cloud'])
    expect(skills('smarter-sh', ['x'])).toEqual(['full-stack'])
    expect(skills('x', ['react'])).toEqual(['react'])
    expect(skills('x', ['reactjs'])).toEqual(['react'])
    expect(skills('x', ['openedx'])).toEqual(['openedx'])
  })
})

describe('extractMainDescriptionMD', () => {
  it('renders the text between the title and the first subheading, without badges', () => {
    const html = extractMainDescriptionMD(MD_README)

    expect(html).toBe('<p>A <strong>great</strong> project.</p>\n')
  })

  it('returns null without content, a title, or any text', () => {
    expect(extractMainDescriptionMD('')).toBeNull()
    expect(extractMainDescriptionMD('no heading\n')).toBeNull()
    expect(extractMainDescriptionMD('# Title\n![x](y)\n## Next\n')).toBeNull()
  })

  it('stops at a setext heading and drops lines of markdown syntax', () => {
    const content =
      '# Title\nText\n' +
      '[a](b)[c](d)[e](f)[g](h)\n' +
      'see github.com/o/r/actions\n' +
      'Sub\n===\nafter'
    expect(extractMainDescriptionMD(content)).toBe('<p>Text</p>\n')
    expect(extractMainDescriptionMD('# Title\nText\n\n---\nafter')).toBe('<p>Text</p>\n')
  })
})

describe('extractMainDescriptionRST', () => {
  it('renders the text of the first section, without directives and badges', () => {
    expect(extractMainDescriptionRST(RST_README)).toBe(
      '<p>A great project,  with text.</p>\n'
    )
  })

  it('returns null without content, a title, or any text', () => {
    expect(extractMainDescriptionRST('')).toBeNull()
    expect(extractMainDescriptionRST('no title\n')).toBeNull()
    expect(extractMainDescriptionRST('Title\n=====\n.. raw:: html\n\n')).toBeNull()
  })

  it('filters directive remnants, attributes and substitutions', () => {
    const content = [
      'Title',
      '-----',
      '..',
      ':attr: value',
      '| |',
      '.. _link: https://x',
      'Kept text',
    ].join('\n')
    expect(extractMainDescriptionRST(content)).toBe('<p>Kept text</p>\n')
  })
})

describe('getRepoReadme', () => {
  it('extracts the description of a Markdown readme', async () => {
    server.use(repoHandlers()[3])

    expect(await getRepoReadme('o', 'r')).toEqual({
      content: '<p>A <strong>great</strong> project.</p>\n',
      name: 'README.md',
      path: 'README.md',
      sha: 'abc',
      size: MD_README.length,
      downloadUrl: 'https://raw.githubusercontent.com/o/r/main/README.md',
      readmeFormat: 'md',
    })
  })

  it('extracts the description of a reStructuredText readme', async () => {
    server.use(
      http.get(`${GH}/repos/o/r/readme`, () =>
        HttpResponse.json(readme('README.rst', RST_README))
      )
    )

    const result = await getRepoReadme('o', 'r')

    expect(result?.readmeFormat).toBe('rst')
    expect(result?.content).toBe('<p>A great project,  with text.</p>\n')
  })

  it('keeps an unknown format as is, and falls back to the raw readme', async () => {
    server.use(
      http.get(`${GH}/repos/o/r/readme`, () =>
        HttpResponse.json(readme('README.txt', 'raw'))
      )
    )
    expect(await getRepoReadme('o', 'r')).toMatchObject({
      content: 'raw',
      readmeFormat: 'unknown',
    })

    server.use(
      http.get(`${GH}/repos/o/r/readme`, () =>
        HttpResponse.json(readme('README.md', 'no title'))
      )
    )
    expect(await getRepoReadme('o', 'r')).toMatchObject({ content: 'no title' })
  })

  it('returns null when there is no readme, or the request fails', async () => {
    server.use(
      http.get(`${GH}/repos/o/r/readme`, () => new HttpResponse(null, { status: 404 }))
    )
    expect(await getRepoReadme('o', 'r')).toBeNull()

    server.use(
      http.get(`${GH}/repos/o/r/readme`, () => new HttpResponse(null, { status: 500 }))
    )
    expect(await getRepoReadme('o', 'r')).toBeNull()

    server.use(http.get(`${GH}/repos/o/r/readme`, () => HttpResponse.json(null)))
    expect(await getRepoReadme('o', 'r')).toBeNull()
  })
})

describe('getRepoLanguages', () => {
  it('returns each language with its share, largest first', async () => {
    server.use(
      http.get(`${GH}/repos/o/r/languages`, () =>
        HttpResponse.json({ Shell: 100, Python: 300 })
      )
    )

    expect(await getRepoLanguages('o', 'r')).toEqual({
      languages: [
        { name: 'Python', bytes: 300, percentage: '75.0' },
        { name: 'Shell', bytes: 100, percentage: '25.0' },
      ],
      primary_language: 'Python',
      total_bytes: 400,
    })
  })

  it('handles a repo without code', async () => {
    server.use(
      http.get(`${GH}/repos/o/r/languages`, () => HttpResponse.json({ Empty: 0 }))
    )
    expect(await getRepoLanguages('o', 'r')).toEqual({
      languages: [{ name: 'Empty', bytes: 0, percentage: 0 }],
      primary_language: 'Empty',
      total_bytes: 0,
    })

    server.use(http.get(`${GH}/repos/o/r/languages`, () => HttpResponse.json({})))
    expect(await getRepoLanguages('o', 'r')).toMatchObject({ primary_language: null })
  })

  it('returns null when the request fails', async () => {
    server.use(
      http.get(`${GH}/repos/o/r/languages`, () => new HttpResponse(null, { status: 500 }))
    )
    expect(await getRepoLanguages('o', 'r')).toBeNull()

    server.use(http.get(`${GH}/repos/o/r/languages`, () => HttpResponse.json(null)))
    expect(await getRepoLanguages('o', 'r')).toBeNull()
  })
})

describe('getTotalCommits', () => {
  it('reads the count from the last page link', async () => {
    server.use(...repoHandlers())

    expect(await getTotalCommits('o', 'r')).toBe(42)
  })

  it('counts the commits when there is no link header', async () => {
    server.use(
      repoHandlers()[0],
      http.get(`${GH}/repos/o/r/commits`, () => HttpResponse.json([{}, {}]))
    )
    expect(await getTotalCommits('o', 'r')).toBe(2)

    server.use(
      http.get(`${GH}/repos/o/r/commits`, () =>
        HttpResponse.json([{}], { headers: { link: '<x>; rel="next"' } })
      )
    )
    expect(await getTotalCommits('o', 'r')).toBe(1)
  })

  it('returns null without repo info, a default branch, or commits', async () => {
    server.use(http.get(`${GH}/repos/o/r`, () => new HttpResponse(null, { status: 404 })))
    expect(await getTotalCommits('o', 'r')).toBeNull()

    server.use(http.get(`${GH}/repos/o/r`, () => HttpResponse.json({})))
    expect(await getTotalCommits('o', 'r')).toBeNull()

    server.use(
      repoHandlers()[0],
      http.get(`${GH}/repos/o/r/commits`, () => new HttpResponse(null, { status: 409 }))
    )
    expect(await getTotalCommits('o', 'r')).toBeNull()
  })
})

describe('getRepoCommitInfo', () => {
  it('combines the commit, language and readme info', async () => {
    server.use(...repoHandlers())

    const info = await getRepoCommitInfo('https://github.com/o/r')

    expect(info).toMatchObject({
      last_commit_date: '2025-01-01T00:00:00Z',
      total_commits: 42,
      languages: [
        { name: 'Python', bytes: 300, percentage: '75.0' },
        { name: 'Shell', bytes: 100, percentage: '25.0' },
      ],
      readme: { readmeFormat: 'md' },
    })
  })

  it('tolerates failed requests', async () => {
    server.use(
      http.get(`${GH}/repos/o/r`, () =>
        HttpResponse.json({ message: 'x' }, { status: 500 })
      ),
      http.get(`${GH}/repos/o/r/commits`, () =>
        HttpResponse.json({ message: 'x' }, { status: 500 })
      ),
      http.get(
        `${GH}/repos/o/r/languages`,
        () => new HttpResponse(null, { status: 500 })
      ),
      http.get(`${GH}/repos/o/r/readme`, () => new HttpResponse(null, { status: 404 }))
    )

    expect(await getRepoCommitInfo('https://github.com/o/r')).toEqual({
      last_commit_date: null,
      total_commits: null,
      languages: [],
      readme: null,
    })
  })

  it('returns null on a network error, and throws for a url that is not GitHub', async () => {
    server.use(http.get(`${GH}/repos/o/r/commits`, () => HttpResponse.error()))
    expect(await getRepoCommitInfo('https://github.com/o/r')).toBeNull()

    await expect(getRepoCommitInfo('https://example.com/x')).rejects.toThrow(
      'Invalid GitHub repo URL'
    )
  })
})

describe('fetchSingleRepo', () => {
  it('returns the repo fields and skills', async () => {
    server.use(repoHandlers()[0])

    expect(await fetchSingleRepo('o', 'r')).toEqual({
      name: 'o/r',
      html_url: 'https://github.com/o/r',
      private: false,
      description: 'About r',
      visibility: 'public',
      forks: 1,
      open_issues: 2,
      watchers: 3,
      stargazers_count: 4,
      topics: ['python'],
      skills: ['full-stack'],
    })
  })

  it('defaults topics to []', async () => {
    server.use(http.get(`${GH}/repos/o/r`, () => HttpResponse.json(apiRepo('o', 'r'))))

    expect(await fetchSingleRepo('o', 'r')).toMatchObject({ topics: [], skills: [] })
  })

  it('returns null when the request fails', async () => {
    server.use(http.get(`${GH}/repos/o/r`, () => new HttpResponse(null, { status: 404 })))
    expect(await fetchSingleRepo('o', 'r')).toBeNull()

    server.use(http.get(`${GH}/repos/o/r`, () => HttpResponse.error()))
    expect(await fetchSingleRepo('o', 'r')).toBeNull()
  })
})

describe('fetchGitHubOrg', () => {
  it('falls back from orgs to users', async () => {
    server.use(
      http.get(`${GH}/orgs/me/repos`, () => new HttpResponse(null, { status: 404 })),
      http.get(`${GH}/users/me/repos`, () =>
        HttpResponse.json([apiRepo('me', 'a', ['react']), apiRepo('me', 'b')])
      )
    )

    const repos = await fetchGitHubOrg('me')

    expect(repos.map((repo) => repo.name)).toEqual(['me/a', 'me/b'])
    expect(repos[0].skills).toEqual(['react'])
    expect(repos[1].topics).toEqual([])
  })

  it('returns [] when both fail', async () => {
    server.use(
      http.get(`${GH}/orgs/me/repos`, () => HttpResponse.error()),
      http.get(`${GH}/users/me/repos`, () => new HttpResponse(null, { status: 404 }))
    )

    expect(await fetchGitHubOrg('me')).toEqual([])
  })
})

describe('fetchGitHub, fetchIndividualRepos and main', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'github-fetcher-test-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  function orgHandler() {
    return http.get(`${GH}/orgs/:org/repos`, ({ params }) =>
      HttpResponse.json(
        params.org === 'smarter-sh'
          ? [apiRepo('smarter-sh', 'smarter'), apiRepo('smarter-sh', '.github')]
          : []
      )
    )
  }

  it('lists the repos of every org and the individual repos', async () => {
    server.use(orgHandler(), ...repoHandlers())

    expect((await fetchGitHub()).map((repo) => repo.name)).toEqual([
      'smarter-sh/smarter',
      'smarter-sh/.github',
    ])
    expect((await fetchIndividualRepos()).map((repo) => repo.name)).toEqual(
      INDIVIDUAL_REPOS.map((repo) => `${repo.username}/${repo.repoName}`)
    )
  })

  it('drops the individual repos that fail', async () => {
    server.use(http.get(`${GH}/repos/:owner/:repo`, () => HttpResponse.error()))

    expect(await fetchIndividualRepos()).toEqual([])
  })

  it('writes every repo that is not excluded, with its commit info', async () => {
    vi.stubEnv('PAT', 'secret')
    server.use(orgHandler(), ...repoHandlers())
    const outputPath = join(dir, 'github.json')

    await main(outputPath)

    const written = JSON.parse(readFileSync(outputPath, 'utf8')) as {
      name: string
      total_commits: number
      readme: unknown
    }[]
    expect(written.map((repo) => repo.name)).toContain('smarter-sh/smarter')
    expect(written.map((repo) => repo.name)).not.toContain('smarter-sh/.github')
    expect(written[0].total_commits).toBe(42)
    expect(console.log).toHaveBeenCalledWith(
      'GitHub Personal Access Token (PAT) found as environment variable'
    )
  })

  it('writes nulls when the commit info fails', async () => {
    vi.stubEnv('PAT', '')
    server.use(
      orgHandler(),
      repoHandlers()[0],
      http.get(`${GH}/repos/:owner/:repo/commits`, () => HttpResponse.error())
    )
    const outputPath = join(dir, 'github.json')

    await main(outputPath)

    const written = JSON.parse(readFileSync(outputPath, 'utf8')) as Record<
      string,
      unknown
    >[]
    expect(written[0]).toMatchObject({
      last_commit_date: null,
      total_commits: null,
      languages: [],
      readme: null,
    })
  })

  it('exits 1 when there are no repos', async () => {
    server.use(
      http.get(`${GH}/orgs/:org/repos`, () => HttpResponse.json([])),
      http.get(`${GH}/repos/:owner/:repo`, () => new HttpResponse(null, { status: 404 }))
    )
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`exit ${code}`)
    })

    await expect(main(join(dir, 'github.json'))).rejects.toThrow('exit 1')
  })
})
