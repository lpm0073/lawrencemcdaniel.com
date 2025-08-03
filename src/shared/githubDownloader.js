/*
GitHub Api downloader utility. Creates a list of json objects of repository metadata by organization.
*/
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

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

async function getRepoCommitInfo(repoUrl) {
  // Example repoUrl: https://github.com/username/reponame
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
      headers: { 'Accept': 'application/vnd.github+json' },
    });
    if (!commitsRes.ok) console.error("Failed to fetch commits", repoUrl, commitsRes);
    const commits = await commitsRes.json();
    const lastCommitDate = commits[0]?.commit?.committer?.date || null;

    // Get total commits from repo info
    const repoRes = await fetch(countUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/vnd.github+json' },
    });
    if (!repoRes.ok) console.error("Failed to fetch repo info", repoUrl, repoRes);
    const repo = await repoRes.json();
    const totalCommits = repo?.default_branch
      ? await getTotalCommits(username, repoName, repo.default_branch)
      : null;

    return {
      last_commit_date: lastCommitDate,
      total_commits: totalCommits
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
    headers: { 'Accept': 'application/vnd.github+json' },
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
    headers: { 'Accept': 'application/vnd.github+json' },
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
      headers: { 'Accept': 'application/vnd.github+json' },
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
        stargazers_count: repo.stargazers_count
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
        headers: { 'Accept': 'application/vnd.github+json' },
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
          stargazers_count: repo.stargazers_count
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
      total_commits: commitInfo?.total_commits || null
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
