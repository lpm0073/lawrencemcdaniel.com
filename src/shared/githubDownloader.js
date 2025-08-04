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
import { marked } from 'marked';

import { loadEnv } from './dotenv.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = join(__dirname, '../../public/github.json')

const URL_EXCLUSIONS = [
  "https://github.com/FullStackWithLawrence/.github",
  "https://github.com/smarter-sh/.github",
  "https://github.com/cookiecutter-openedx/.github",
  "https://github.com/FullStackWithLawrence/ubc-bsd10-track-b",
  "https://github.com/smarter-sh/homebrew-tap",
  "https://github.com/smarter-sh/examples",
  "https://github.com/cookiecutter-openedx/edx-ora2",
  "https://github.com/cookiecutter-openedx/tutor-contrib-s3"
]

const GITHUB_ENTITIES = [
  "FullStackWithLawrence",
  "smarter-sh",
  "cookiecutter-openedx",
];

const INDIVIDUAL_REPOS = [
  { username: "lpm0073", repoName: "lawrencemcdaniel.com" },
]

function githubApiHeaders() {
    const headers = {
        'Accept': 'application/vnd.github+json'
    };
    if (process.env.PAT) {
      headers['Authorization'] = `Bearer ${process.env.PAT}`;
    }

    return headers;
}

// ----------------------------------------------------------------------------
// Fetchers
// ----------------------------------------------------------------------------
function categories(org, topics) {
  const retval = new Set(); // Use Set to automatically handle duplicates
  if (!topics || topics.length === 0) return [];
  if (topics.includes('python')) retval.add('python');
  if (topics.includes('data-science')) retval.add('data-science');
  if (topics.includes('full-stack')) retval.add('full-stack');
  if (topics.includes('fullstack')) retval.add('full-stack');
  if (org === 'smarter-sh') {
    retval.add('full-stack');
  }
  if (topics.includes('react') || topics.includes('reactjs')) {
    retval.add('react');
  }
  if (topics.includes('openedx')) {
    retval.add('openedx');
  }
  return Array.from(retval); // Convert Set back to array
}

function extractMainDescription(readmeContent) {
  if (!readmeContent) return null;

  const lines = readmeContent.split('\n');
  let startIndex = -1;
  let endIndex = lines.length;

  // Find the first # heading
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      startIndex = i + 1; // Start after the heading
      break;
    }
  }

  // If no # heading found, return null
  if (startIndex === -1) return null;

  // Find the next heading (##, ###, etc.) or end of content
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    // Look for any markdown heading that starts with ## or more
    if (line.match(/^#{2,}\s/)) {
      endIndex = i;
      break;
    }
  }

  // Join all content first, then clean as a single string
  let content = lines.slice(startIndex, endIndex).join('\n');

  // Remove all badge patterns - be more aggressive
  // Remove complete badge patterns [![...](...)](/...)
  content = content.replace(/\[\!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, '');
  // Remove image patterns ![...](...)
  content = content.replace(/\!\[[^\]]*\]\([^)]*\)/g, '');
  // Remove any remaining incomplete badge patterns
  content = content.replace(/\[\!\[[^\]]*$/gm, ''); // incomplete at end of line
  content = content.replace(/\[\!\[[^\]]*\n/g, ''); // incomplete spanning lines
  content = content.replace(/^\]\([^)]*\)/gm, ''); // orphaned closing brackets
  // Remove standalone URLs containing badge services
  content = content.replace(/https?:\/\/[^\s]*(?:shields\.io|a11ybadges\.com|img\.shields\.io|badge\.svg|\/badge\?)[^\s]*/g, '');
  // Remove markdown links containing badge services
  content = content.replace(/\[[^\]]*\]\([^)]*(?:shields\.io|a11ybadges\.com|img\.shields\.io|badge\.svg|\/badge\?)[^)]*\)/g, '');
  // Remove any remaining bracket artifacts
  content = content.replace(/\[\]\(\)/g, '');
  content = content.replace(/\[\]/g, '');
  content = content.replace(/\(\)/g, '');
  // Remove HTML line breaks
  content = content.replace(/<br\s*\/?>/gi, '');

  // Clean up whitespace and empty lines
  const cleanedLines = content.split('\n')
    .map(line => line.trim())
    .filter(line => {
      // Filter out empty lines and lines that are just badge remnants
      if (line === '') return false;
      // Filter out lines that look like incomplete badge syntax
      if (line.match(/^\[\!\[/)) return false;
      if (line.match(/^\]\(/)) return false;
      if (line.match(/^[\[\]()!\s]*$/)) return false;
      return true;
    });

  const finalContent = cleanedLines.join('\n').trim();
  return finalContent ? marked(finalContent) : null;
}

async function getRepoReadme(username, repoName) {
  const readmeUrl = `https://api.github.com/repos/${username}/${repoName}/readme`;

  try {
    const response = await fetch(readmeUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    });

    if (response.status === 404) {
      return null; // No README found
    }

    if (!response.ok) {
      console.error(`Failed to fetch README for ${username}/${repoName}:`, response.statusText);
      return null;
    }

    const readmeData = await response.json();
    const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf8');
    const mainDescription = extractMainDescription(readmeContent);

    return {
      content: mainDescription || readmeContent,
      name: readmeData.name,
      path: readmeData.path,
      sha: readmeData.sha,
      size: readmeData.size,
      download_url: readmeData.download_url
    };
  } catch (error) {
    console.error(`Error fetching README for ${username}/${repoName}:`, error);
    return null;
  }
}


async function getRepoLanguages(username, repoName) {
  const languagesUrl = `https://api.github.com/repos/${username}/${repoName}/languages`;

  try {
    const response = await fetch(languagesUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    });

    if (!response.ok) {
      console.error(`Failed to fetch languages for ${username}/${repoName}:`, response.statusText);
      return null;
    }

    const languages = await response.json();

    // Calculate total bytes and percentages
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

    // Convert to array with percentages, sorted by usage
    const languageArray = Object.entries(languages)
      .map(([language, bytes]) => ({
        name: language,
        bytes: bytes,
        percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.bytes - a.bytes);

    return {
      languages: languageArray,
      primary_language: languageArray[0]?.name || null,
      total_bytes: totalBytes
    };
  } catch (error) {
    console.error(`Error fetching languages for ${username}/${repoName}:`, error);
    return null;
  }
}

async function getRepoCommitInfo(repoUrl) {
  // Example repoUrl: https://github.com/lpm0073/lawrencemcdaniel.com
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error("Invalid GitHub repo URL");
  }
  const [_, username, repoName] = match;
  const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=1`;
  const countUrl = `https://api.github.com/repos/${username}/${repoName}`;

  try {
    // Get last commit
    const commitsRes = await fetch(commitsUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    });
    if (!commitsRes.ok) console.error("Failed to fetch commits", repoUrl, commitsRes);
    const commits = await commitsRes.json();
    const lastCommitDate = commits[0]?.commit?.committer?.date || null;

    // Get total commits from repo info
    const repoRes = await fetch(countUrl, {
      method: 'GET',
      headers: githubApiHeaders(),
    });
    if (!repoRes.ok) console.error("Failed to fetch repo info", repoUrl, repoRes);
    const repo = await repoRes.json();
    const totalCommits = repo?.default_branch
      ? await getTotalCommits(username, repoName, repo.default_branch)
      : null;
    const languageInfo = await getRepoLanguages(username, repoName);
    const readmeInfo = await getRepoReadme(username, repoName);

    return {
      last_commit_date: lastCommitDate,
      total_commits: totalCommits,
      languages: languageInfo?.languages || [],
      readme: readmeInfo,
    };
  } catch (error) {
    console.error(`Error fetching commit info for ${repoUrl}:`, error);
    return null;
  }
}

// Helper to get total commits using the 'commits' API with 'sha' param
async function getTotalCommits(username, repoName) {
  // First, fetch repo info to get the default branch
  const repoUrl = `https://api.github.com/repos/${username}/${repoName}`;
  const repoRes = await fetch(repoUrl, {
    method: 'GET',
    headers: githubApiHeaders(),
  });
  if (!repoRes.ok) {
    console.error("Failed to fetch repo info", repoUrl, repoRes);
    return null;
  }
  const repo = await repoRes.json();
  const branch = repo.default_branch;
  if (!branch) return null;

  // Now, fetch commits for the default branch
  const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=1&sha=${branch}`;
  const res = await fetch(commitsUrl, {
    method: 'GET',
    headers: githubApiHeaders(),
  });
  if (!res.ok) {
    console.error("Failed to fetch commits", commitsUrl, res);
    return null;
  }
  const link = res.headers.get('link');
  if (link) {
    const match = link.match(/&page=(\d+)>; rel="last"/);
    if (match) return parseInt(match[1], 10);
  }
  const commits = await res.json();
  return commits.length;
}

async function fetchSingleRepo(username, repoName) {
  const url = `https://api.github.com/repos/${username}/${repoName}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: githubApiHeaders(),
    });
    if (response.ok) {
      const repo = await response.json();
      const categoriesList = categories(username, repo.topics || []);
      return {
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        visibility: repo.visibility,
        forks: repo.forks,
        open_issues: repo.open_issues,
        watchers: repo.watchers,
        stargazers_count: repo.stargazers_count,
        topics: repo.topics || [],
        categories: categoriesList,
      };
    } else {
      console.error(`Error fetching repo ${username}/${repoName}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error fetching repo ${username}/${repoName}:`, error);
  }
  console.error(`Error fetching repo ${username}/${repoName}: Not Found`);
  return null;
}

async function fetchGitHubOrg(entity) {
  for (const type of ["orgs", "users"]) {
    const url = `https://api.github.com/${type}/${entity}/repos?per_page=100`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: githubApiHeaders(),
      });
      if (response.ok) {
        const repos = await response.json();
        return repos.map(repo => {
          const categoriesList = categories(repo.owner.login, repo.topics || []);

          return {
            name: repo.owner.login + '/' + repo.name,
            html_url: repo.html_url,
            description: repo.description,
            visibility: repo.visibility,
            forks: repo.forks,
            open_issues: repo.open_issues,
            watchers: repo.watchers,
            stargazers_count: repo.stargazers_count,
            topics: repo.topics || [],
            categories: categoriesList,
          };
        });
      } else {

        console.error(`Error fetching repos for ${entity} (${type}): ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching repos for ${entity}:`, error);
    }
  }
  console.error(`Error fetching repos for ${entity}: Not Found`);
  return [];
}

async function fetchGitHub() {
  const allRepos = [];
  const repoArrays = await Promise.all(
    GITHUB_ENTITIES.map(fetchGitHubOrg)
  );
  repoArrays.forEach(repos => allRepos.push(...repos));
  return allRepos;
}


// module operations
// ----------------------------------------------------------------------------

loadEnv();
if (process.env.PAT) {
  console.log("PAT found in .env.Using personal access token for GitHub API requests.");
}
async function fetchIndividualRepos() {
  const individualRepos = await Promise.all(
    INDIVIDUAL_REPOS.map(repo => fetchSingleRepo(repo.username, repo.repoName))
  );
  return individualRepos.filter(repo => repo !== null);
}

const baseRepos = [
  ...(await fetchGitHub()),
  ...(await fetchIndividualRepos())
];

console.log(`Total repos before filtering: ${baseRepos.length}`);
console.log('URLs being excluded:', URL_EXCLUSIONS);

const repositories = await Promise.all(
  baseRepos
  .filter(repo => !URL_EXCLUSIONS.includes(repo.html_url))
  .map(async repo => {
    const commitInfo = await getRepoCommitInfo(repo.html_url);
    return {
      ...repo,
      last_commit_date: commitInfo?.last_commit_date || null,
      total_commits: commitInfo?.total_commits || null,
      languages: commitInfo?.languages || [],
      readme: commitInfo?.readme || null,
    };
  })
);


if (repositories.length === 0) {
  console.error("No repositories found.");
  process.exit(1);
}
console.log(`Found ${repositories.length} repositories.`);
writeFileSync(outputPath, JSON.stringify(repositories), 'utf8');
console.log(`Repositories written to ${outputPath}`);
