/* eslint-disable no-useless-escape, no-unused-vars */
/*
GitHub Api downloader utility. Creates a list of json objects of repository metadata by organization.

Example output:
 [
  {
    "name": "react-mdr",
    "html_url": "https://github.com/FullStackWithLawrence/react-mdr",
    "description": "Matrix digital rain effect for ReactJS",
    "visibility": "public",
    "forks": 5,
    "open_issues": 0,
    "watchers": 22,
    "stargazers_count": 22,
    "last_commit_date": "2023-11-27T17:30:06Z",
    "total_commits": 5
  }
  ]

While an Api key is not technically required (since all of these are public repositories), it is
recommended to use one to avoid rate limiting issues. GitHub's API rate limits control the number of
requests a user or application can make within a given timeframe to prevent abuse and ensure
service stability. These limits vary based on the authentication method and the type of
API being accessed.

REST API Rate Limits:
- Unauthenticated Requests: Limited to 60 requests per hour.
- Authenticated User Requests (Personal Access Tokens, OAuth Apps): Up to 5,000 requests per hour.
- GitHub Apps (Installation Access Tokens):
  - Minimum of 5,000 requests per hour per installation.
  - For installations on a GitHub Enterprise Cloud organization, the limit is 15,000 requests per hour.
  - For installations not on a GitHub Enterprise Cloud organization, the rate limit can scale with the
    number of repositories (up to 20, granting 50 requests per hour per repository) and users
    (up to 20, granting 50 requests per hour per user) within the installation,
    up to a maximum of 12,500 requests per hour.
- Built-in GITHUB_TOKEN in GitHub Actions: 1,000 requests per hour per repository (or 15,000 requests
  per hour per repository for GitHub Enterprise Cloud accounts).
*/

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { marked } from 'marked'

import { APP_CONFIG } from '../../shared/constants.js'
import { loadEnv } from '../dotenv.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = join(__dirname, '../../../public/data/github.json')

const URL_EXCLUSIONS = [
  'https://github.com/FullStackWithLawrence/.github',
  'https://github.com/smarter-sh/.github',
  'https://github.com/cookiecutter-openedx/.github',
  'https://github.com/FullStackWithLawrence/ubc-bsd10-track-b',
  'https://github.com/smarter-sh/homebrew-tap',
  'https://github.com/smarter-sh/examples',
  'https://github.com/cookiecutter-openedx/edx-ora2',
  'https://github.com/cookiecutter-openedx/tutor-contrib-s3',
]

const GITHUB_ENTITIES = ['FullStackWithLawrence', 'smarter-sh', 'cookiecutter-openedx']

const INDIVIDUAL_REPOS = [
  { username: 'lpm0073', repoName: 'lawrencemcdaniel.com' },
  { username: 'lpm0073', repoName: 'openedx_devops' },
  { username: 'Turn-The-Bus', repoName: 'turnthebus-edx-plugin' },
  { username: 'StepwiseMath', repoName: 'stepwise-edx-plugin' },
]

function githubApiHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
  }
  if (process.env.PAT) {
    headers['Authorization'] = `Bearer ${process.env.PAT}`
  }

  return headers
}

// ----------------------------------------------------------------------------
// Fetchers
// ----------------------------------------------------------------------------
function skills(org, topics) {
  const retval = new Set() // Use Set to automatically handle duplicates
  if (!topics || topics.length === 0) return []
  if (topics.includes('python')) retval.add(APP_CONFIG.skills.fullStack)
  if (topics.includes('data-science')) retval.add(APP_CONFIG.skills.dataScience)
  if (topics.includes('full-stack')) retval.add(APP_CONFIG.skills.fullStack)
  if (topics.includes('fullstack')) retval.add(APP_CONFIG.skills.fullStack)
  if (topics.includes('terraform')) retval.add(APP_CONFIG.skills.cloud)
  if (topics.includes('terraform')) retval.add(APP_CONFIG.skills.fullStack)
  if (topics.some((topic) => topic.includes('terraform')))
    retval.add(APP_CONFIG.skills.cloud)
  if (topics.some((topic) => topic.includes('kubernetes')))
    retval.add(APP_CONFIG.skills.cloud)
  if (topics.some((topic) => topic.includes('aws'))) retval.add(APP_CONFIG.skills.cloud)
  if (topics.some((topic) => topic.includes('azure'))) retval.add(APP_CONFIG.skills.cloud)
  if (org === 'smarter-sh') {
    retval.add(APP_CONFIG.skills.fullStack)
  }
  if (topics.includes('react') || topics.includes('reactjs')) {
    retval.add(APP_CONFIG.skills.react)
  }
  if (topics.includes('openedx')) {
    retval.add(APP_CONFIG.skills.openEdx)
  }
  return Array.from(retval) // Convert Set back to array
}

function extractMainDescriptionRST(readmeContent) {
  if (!readmeContent) return null

  const lines = readmeContent.split('\n')
  let startIndex = -1
  let endIndex = lines.length

  // Find the first title (underlined with = or -)
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].trim()
    const nextLine = lines[i + 1].trim()

    // Check if next line is an underline (===== or -----)
    if (
      line &&
      nextLine &&
      (nextLine.match(/^={3,}$/) || nextLine.match(/^-{3,}$/)) &&
      nextLine.length >= line.length
    ) {
      startIndex = i + 2 // Start after the title and underline
      break
    }
  }

  // If no title found, return null
  if (startIndex === -1) return null

  // Find the next section heading or end of content
  for (let i = startIndex; i < lines.length - 1; i++) {
    const line = lines[i].trim()
    const nextLine = lines[i + 1].trim()

    // Look for any section heading (underlined text)
    if (
      line &&
      nextLine &&
      nextLine.match(/^[=\-~^"'`#*+<>]{3,}$/) &&
      nextLine.length >= line.length * 0.8
    ) {
      // Allow some flexibility
      endIndex = i
      break
    }
  }

  // Join all content first, then clean as a single string
  let content = lines.slice(startIndex, endIndex).join('\n')

  // Remove RST directives and their multi-line attributes more aggressively
  // Remove image/figure directives with all their indented attributes
  content = content.replace(
    /\.\.\s+(image|figure)::[^\n]*(?:\n\s+:[^:\n]+:[^\n]*)*\n?/g,
    ''
  )

  // Remove raw HTML directives with content
  content = content.replace(/\.\.\s+raw::\s+html[\s\S]*?(?=\n\n|\n(?!\s)|\n\.\.|$)/g, '')

  // Remove external link definitions with all attributes
  content = content.replace(/\.\.\s+_[^:]*:\s+[^\n]*(?:\n\s+:[^:\n]+:[^\n]*)*\n?/g, '')

  // Remove substitution definitions with all attributes
  content = content.replace(
    /\.\.\s+\|[^|]*\|\s+(image|figure)::[^\n]*(?:\n\s+:[^:\n]+:[^\n]*)*\n?/g,
    ''
  )

  // Remove badge URLs (standalone)
  content = content.replace(
    /https?:\/\/[^\s]*(?:shields\.io|a11ybadges\.com|img\.shields\.io|badge\.svg|\/badge\?)[^\s]*/g,
    ''
  )

  // Remove inline markup for images and substitution references
  content = content.replace(/\|[^|]*(?:badge|shield|build|status)[^|]*\|/gi, '')
  content = content.replace(/\|[^|]*\|/g, '')

  // Remove RST attribute lines (lines starting with :attribute:)
  content = content.replace(/^\s*:[^:\n]+:[^\n]*$/gm, '')

  // Remove lines with just | symbols
  content = content.replace(/^\s*\|\s*$/gm, '')

  // Clean up whitespace and empty lines
  const cleanedLines = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => {
      // Filter out empty lines and directive remnants
      if (line === '') return false
      // Filter out lines that look like RST directives
      if (line.startsWith('..')) return false
      // Filter out lines with only punctuation (underlines, etc.)
      if (line.match(/^[=\-~^"'`#*+<>\s|]*$/)) return false
      // Filter out RST attributes
      if (line.match(/^:[^:]+:.*$/)) return false
      // Filter out substitution references
      if (line.match(/^\|[^|]*\|$/)) return false
      // Filter out lines that are just links or URLs
      if (line.match(/^https?:\/\//)) return false
      return true
    })

  const finalContent = cleanedLines.join('\n').trim()
  return finalContent ? marked(finalContent) : null
}

function extractMainDescriptionMD(readmeContent) {
  if (!readmeContent) return null

  const lines = readmeContent.split('\n')
  let startIndex = -1
  let endIndex = lines.length

  // Find the first # heading
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('# ')) {
      startIndex = i + 1 // Start after the heading
      break
    }
  }

  // If no # heading found, return null
  if (startIndex === -1) return null

  // Find ANY subheading (##, ###, ####, etc.) or end of content
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim()
    // Look for any markdown heading that starts with ## or more
    // Also look for setext-style headings (underlined with = or -)
    if (
      line.match(/^#{2,}\s/) || // ATX headings: ##, ###, etc.
      line.match(/^={3,}$/) || // Setext heading underline (===)
      line.match(/^-{3,}$/) || // Setext heading underline (---)
      (i < lines.length - 1 && lines[i + 1].trim().match(/^[=-]{3,}$/))
    ) {
      // Next line is underline
      endIndex = i
      break
    }
  }

  // Extract lines between headings
  const extractedLines = lines.slice(startIndex, endIndex)

  // Filter out badge lines completely
  const filteredLines = extractedLines.filter((line) => {
    const trimmed = line.trim()

    // Keep empty lines for structure
    if (!trimmed) return true

    // Remove any line that contains badge patterns
    if (trimmed.includes('[![') || trimmed.includes('![')) return false
    if (
      trimmed.includes('shields.io') ||
      trimmed.includes('a11ybadges.com') ||
      trimmed.includes('img.shields.io') ||
      trimmed.includes('badge.svg') ||
      trimmed.includes('/badge?') ||
      trimmed.includes('actions/workflows')
    )
      return false
    if (trimmed.includes('github.com') && trimmed.includes('/actions')) return false

    // Remove lines that are primarily markdown syntax
    const markdownChars = (trimmed.match(/[[\]()!]/g) || []).length
    if (markdownChars > 10 && markdownChars > trimmed.replace(/[[\]()!\s]/g, '').length)
      return false

    return true
  })

  // Join filtered lines
  let content = filteredLines.join('\n')

  // Remove HTML breaks
  content = content.replace(/<br\s*\/?>/gi, '\n')

  // Remove any remaining badge patterns that might have been split across operations
  content = content.replace(/\[\!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/gs, '')
  content = content.replace(/\!\[[^\]]*\]\([^)]*\)/gs, '')
  content = content.replace(
    /\[[^\]]*\]\([^)]*(?:shields\.io|a11ybadges\.com|img\.shields\.io|badge\.svg|\/badge\?|actions\/workflows)[^)]*\)/gs,
    ''
  )

  // Clean up artifacts
  content = content.replace(/\[\]\(\)/g, '')
  content = content.replace(/\[\]/g, '')
  content = content.replace(/\(\)/g, '')

  // Final cleanup - remove empty lines and trim
  const finalLines = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => {
      if (line === '') return false
      if (line.match(/^[\[\]()!\s]*$/)) return false
      return true
    })

  const finalContent = finalLines.join('\n').trim()
  return finalContent ? marked(finalContent) : null
}

async function getRepoReadme(username, repoName) {
  const readmeUrl = `https://api.github.com/repos/${username}/${repoName}/readme`

  try {
    const response = await fetch(readmeUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    })

    if (response.status === 404) {
      return null // No README found
    }

    if (!response.ok) {
      console.error(
        `Failed to fetch README for ${username}/${repoName}:`,
        response.statusText
      )
      return null
    }

    const readmeData = await response.json()
    const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf8')

    // Determine readme format from file extension
    let readmeFormat = null
    if (readmeData) {
      // example: https://raw.githubusercontent.com/smarter-sh/smarter/main/README.md?
      const url = new URL(readmeData.download_url)
      const fileName = url.pathname.toLowerCase()
      if (fileName.endsWith('.md')) {
        readmeFormat = 'md'
      } else if (fileName.endsWith('.rst')) {
        readmeFormat = 'rst'
      } else {
        readmeFormat = 'unknown' // or leave as null if you prefer
      }
    }
    let mainDescription = null
    if (readmeFormat === 'md') {
      // Extract main description from Markdown
      mainDescription = extractMainDescriptionMD(readmeContent)
    } else if (readmeFormat === 'rst') {
      // Extract main description from reStructuredText
      mainDescription = extractMainDescriptionRST(readmeContent)
    } else {
      mainDescription = readmeContent // Keep as is for unknown formats
    }

    return {
      content: mainDescription || readmeContent,
      name: readmeData.name,
      path: readmeData.path,
      sha: readmeData.sha,
      size: readmeData.size,
      downloadUrl: readmeData.download_url,
      readmeFormat: readmeFormat || null,
    }
  } catch (error) {
    console.error(`Error fetching README for ${username}/${repoName}:`, error)
    return null
  }
}

async function getRepoLanguages(username, repoName) {
  const languagesUrl = `https://api.github.com/repos/${username}/${repoName}/languages`

  try {
    const response = await fetch(languagesUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    })

    if (!response.ok) {
      console.error(
        `Failed to fetch languages for ${username}/${repoName}:`,
        response.statusText
      )
      return null
    }

    const languages = await response.json()

    // Calculate total bytes and percentages
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)

    // Convert to array with percentages, sorted by usage
    const languageArray = Object.entries(languages)
      .map(([language, bytes]) => ({
        name: language,
        bytes: bytes,
        percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes)

    return {
      languages: languageArray,
      primary_language: languageArray[0]?.name || null,
      total_bytes: totalBytes,
    }
  } catch (error) {
    console.error(`Error fetching languages for ${username}/${repoName}:`, error)
    return null
  }
}

async function getRepoCommitInfo(repoUrl) {
  // Example repoUrl: https://github.com/lpm0073/lawrencemcdaniel.com
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
  if (!match) {
    throw new Error('Invalid GitHub repo URL')
  }
  const [_, username, repoName] = match
  const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=1`
  const countUrl = `https://api.github.com/repos/${username}/${repoName}`

  try {
    // Get last commit
    const commitsRes = await fetch(commitsUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    })
    if (!commitsRes.ok) console.error('Failed to fetch commits', repoUrl, commitsRes)
    const commits = await commitsRes.json()
    const lastCommitDate = commits[0]?.commit?.committer?.date || null

    // Get total commits from repo info
    const repoRes = await fetch(countUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    })
    if (!repoRes.ok) console.error('Failed to fetch repo info', repoUrl, repoRes)
    const repo = await repoRes.json()
    const totalCommits = repo?.default_branch
      ? await getTotalCommits(username, repoName, repo.default_branch)
      : null
    const languageInfo = await getRepoLanguages(username, repoName)
    const readmeInfo = await getRepoReadme(username, repoName)

    return {
      last_commit_date: lastCommitDate,
      total_commits: totalCommits,
      languages: languageInfo?.languages || [],
      readme: readmeInfo,
    }
  } catch (error) {
    console.error(`Error fetching commit info for ${repoUrl}:`, error)
    return null
  }
}

// Helper to get total commits using the 'commits' API with 'sha' param
async function getTotalCommits(username, repoName) {
  // First, fetch repo info to get the default branch
  const repoUrl = `https://api.github.com/repos/${username}/${repoName}`
  const repoRes = await fetch(repoUrl, {
    method: 'GET',
    headers: githubApiHeaders(),
  })
  if (!repoRes.ok) {
    console.error('Failed to fetch repo info', repoUrl, repoRes)
    return null
  }
  const repo = await repoRes.json()
  const branch = repo.default_branch
  if (!branch) return null

  // Now, fetch commits for the default branch
  const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=1&sha=${branch}`
  const res = await fetch(commitsUrl, {
    method: 'GET',
    headers: githubApiHeaders(),
  })
  if (!res.ok) {
    console.error('Failed to fetch commits', commitsUrl, res)
    return null
  }
  const link = res.headers.get('link')
  if (link) {
    const match = link.match(/&page=(\d+)>; rel="last"/)
    if (match) return parseInt(match[1], 10)
  }
  const commits = await res.json()
  return commits.length
}

async function fetchSingleRepo(username, repoName) {
  const url = `https://api.github.com/repos/${username}/${repoName}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: githubApiHeaders(),
    })
    if (response.ok) {
      const repo = await response.json()
      const skillsList = skills(username, repo.topics || [])
      return {
        name: username + '/' + repo.name,
        html_url: repo.html_url,
        private: repo.private,
        description: repo.description,
        visibility: repo.visibility,
        forks: repo.forks,
        open_issues: repo.open_issues,
        watchers: repo.watchers,
        stargazers_count: repo.stargazers_count,
        topics: repo.topics || [],
        skills: skillsList,
      }
    } else {
      console.error(`Error fetching repo ${username}/${repoName}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(`Error fetching repo ${username}/${repoName}:`, error)
  }
  console.error(`Error fetching repo ${username}/${repoName}: Not Found`)
  return null
}

async function fetchGitHubOrg(entity) {
  for (const type of ['orgs', 'users']) {
    const url = `https://api.github.com/${type}/${entity}/repos?per_page=100`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: githubApiHeaders(),
      })
      if (response.ok) {
        const repos = await response.json()
        return repos.map((repo) => {
          const skillsList = skills(repo.owner.login, repo.topics || [])

          return {
            name: repo.owner.login + '/' + repo.name,
            html_url: repo.html_url,
            private: repo.private,
            description: repo.description,
            visibility: repo.visibility,
            forks: repo.forks,
            open_issues: repo.open_issues,
            watchers: repo.watchers,
            stargazers_count: repo.stargazers_count,
            topics: repo.topics || [],
            skills: skillsList,
          }
        })
      } else {
        console.error(
          `Error fetching repos for ${entity} (${type}): ${response.statusText}`
        )
      }
    } catch (error) {
      console.error(`Error fetching repos for ${entity}:`, error)
    }
  }
  console.error(`Error fetching repos for ${entity}: Not Found`)
  return []
}

async function fetchGitHub() {
  const allRepos = []
  const repoArrays = await Promise.all(GITHUB_ENTITIES.map(fetchGitHubOrg))
  repoArrays.forEach((repos) => allRepos.push(...repos))
  return allRepos
}

// module operations
// ----------------------------------------------------------------------------

loadEnv()
if (process.env.PAT) {
  console.log('GitHub Personal Access Token (PAT) found in .env')
}

async function fetchIndividualRepos() {
  const individualRepos = await Promise.all(
    INDIVIDUAL_REPOS.map((repo) => fetchSingleRepo(repo.username, repo.repoName))
  )
  return individualRepos.filter((repo) => repo !== null)
}

const baseRepos = [...(await fetchGitHub()), ...(await fetchIndividualRepos())]

console.log(`Total repos before filtering: ${baseRepos.length}`)
console.log('URLs being excluded:', URL_EXCLUSIONS)

const repositories = await Promise.all(
  baseRepos
    .filter((repo) => !URL_EXCLUSIONS.includes(repo.html_url))
    .map(async (repo) => {
      const commitInfo = await getRepoCommitInfo(repo.html_url)

      return {
        ...repo,
        last_commit_date: commitInfo?.last_commit_date || null,
        total_commits: commitInfo?.total_commits || null,
        languages: commitInfo?.languages || [],
        readme: commitInfo?.readme || null,
      }
    })
)

if (repositories.length === 0) {
  console.error('No repositories found.')
  process.exit(1)
}
console.log(`Found ${repositories.length} repositories.`)
writeFileSync(outputPath, JSON.stringify(repositories), 'utf8')
console.log(`Repositories written to ${outputPath}`)
