/**
 * Small, realistic fixtures for tests: one or two of each kind of record the
 * site loads, in the shapes of src/types.ts.
 */
import type { Article, Repository, Video, WPMedia, WPPost } from '../src/types'

export function makeMedia(overrides: Partial<WPMedia> = {}): WPMedia {
  return {
    id: 3694,
    slug: 'black-logo',
    source_url: 'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo.webp',
    media_details: {
      width: 1000,
      height: 420,
      sizes: {
        medium: {
          width: 300,
          height: 126,
          source_url:
            'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp',
        },
      },
    },
    ...overrides,
  }
}

export function makePost(overrides: Partial<WPPost> = {}): WPPost {
  return {
    id: 1,
    slug: 'example-post',
    date: '2025-08-14T15:59:06',
    modified: '2025-08-14T15:59:06',
    title: { rendered: 'Example Post' },
    content: { rendered: '<p>Example content.</p>' },
    excerpt: { rendered: '<p>Example excerpt.</p>' },
    categories: [43],
    tags: [],
    _embedded: { 'wp:featuredmedia': [makeMedia()] },
    ...overrides,
  }
}

export function makeArticle(overrides: Partial<Article> = {}): Article {
  return {
    id: 5909,
    slug: 'chatgpt-full-stack-using-react-aws-serverless',
    link: 'https://blog.lawrencemcdaniel.com/chatgpt-full-stack-using-react-aws-serverless/',
    excerpt: { rendered: '<p>Build a custom ChatGPT web app.</p>' },
    categories: ['aws', 'reactjs'],
    tags: [],
    skills: [],
    ...overrides,
  }
}

export function makeRepository(overrides: Partial<Repository> = {}): Repository {
  return {
    name: 'FullStackWithLawrence/react-mdr',
    html_url: 'https://github.com/FullStackWithLawrence/react-mdr',
    description: 'Matrix digital rain effect for ReactJS',
    forks: 6,
    open_issues: 1,
    watchers: 24,
    stargazers_count: 24,
    topics: ['react'],
    skills: ['react'],
    last_commit_date: '2023-11-27T17:30:06Z',
    total_commits: 5,
    languages: [{ name: 'JavaScript', bytes: 4130, percentage: '100.0' }],
    ...overrides,
  }
}

export function makeVideo(overrides: Partial<Video> = {}): Video {
  return {
    id: 'a6C1iuQ2Iac',
    title: 'Complete Django Setup in 2026',
    description: 'Get setup and running on the Python Django web framework.',
    publishedAt: '2026-02-10T02:55:51Z',
    thumbnails: {
      standard: {
        url: 'https://i.ytimg.com/vi/a6C1iuQ2Iac/sddefault.jpg',
        width: 640,
        height: 480,
      },
    },
    tags: ['python', 'django'],
    duration: 'PT35M17S',
    viewCount: 1286,
    likeCount: 47,
    commentCount: 0,
    url: 'https://www.youtube.com/watch?v=a6C1iuQ2Iac',
    skills: [],
    ...overrides,
  }
}
