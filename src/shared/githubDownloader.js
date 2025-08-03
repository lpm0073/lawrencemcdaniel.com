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

import { loadEnv } from './dotenv.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = join(__dirname, '../../public/github.json')


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

    return {
      last_commit_date: lastCommitDate,
      total_commits: totalCommits,
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
      return {
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        visibility: repo.visibility,
        forks: repo.forks,
        open_issues: repo.open_issues,
        watchers: repo.watchers,
        stargazers_count: repo.stargazers_count,
        topics: repo.topics || []
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
        return repos.map(repo => ({
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          visibility: repo.visibility,
          forks: repo.forks,
          open_issues: repo.open_issues,
          watchers: repo.watchers,
          stargazers_count: repo.stargazers_count,
          topics: repo.topics || []
        }));
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

const repositories = await Promise.all(
  baseRepos.map(async repo => {
    const commitInfo = await getRepoCommitInfo(repo.html_url);
    return {
      ...repo,
      last_commit_date: commitInfo?.last_commit_date || null,
      total_commits: commitInfo?.total_commits || null,
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
