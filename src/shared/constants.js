/* eslint-disable */
import packageJson from '../../package.json' with { type: 'json' }

export const DEBUG = false
export const baseUrl = 'http://localhost:3001/'
export const DEFAULT_IMAGE =
  'https://cdn.lawrencemcdaniel.com/lawrencemcdaniel-headshot-square.jpeg'

// Base domain and subdomains
// ----------------------------------------------------------------------------
export const protocol = 'https'
export const domainName = 'lawrencemcdaniel.com'
export const CORSOrigins = '*.' + domainName

export const URL_SITE = protocol + '://' + domainName
export const URL_API = protocol + '://api.' + domainName
export const URL_CDN = protocol + '://cdn.' + domainName
export const URL_BLOG = protocol + '://blog.' + domainName

export const resumeUrl = URL_CDN + '/doc/lawrence-mcdaniel-resume-202509.pdf'
export const ApiBackendUrl = URL_API + '/wp-json/wp/v2/'
export const blogBackendUrl = URL_BLOG + '/wp-json/wp/v2/'

export const URL_API_REPOSITORIES = '/data/github.json'
export const URL_API_ARTICLES = '/data/blog.lawrencemcdaniel.com.json'
export const URL_API_VIDEOS = '/data/youtube.json'

// Wordpress API Content URL end points
// ----------------------------------------------------------------------------
export const URL_API_SPECIALTIES =
  ApiBackendUrl + 'posts?categories=43&_embed&per_page=100'
export const URL_API_PORTFOLIO = ApiBackendUrl + 'posts?categories=47&_embed&per_page=100'
export const URL_API_EDUCATION = ApiBackendUrl + 'posts?categories=44&_embed&per_page=100'
export const URL_API_RECOMMENDATIONS =
  ApiBackendUrl + 'posts?categories=45&_embed&per_page=100'
export const URL_API_PROJECTS =
  ApiBackendUrl +
  'media?include=2324,2320,2319,2300,2295,2296,2297,2298,2299,2301,2302,2303'
export const URL_API_CLIENTS = ApiBackendUrl + 'posts?categories=46&_embed&per_page=100'

export const URL_API_BLOG_POSTS = blogBackendUrl + 'posts?&per_page=100'
export const URL_API_BLOG_CATEGORIES = blogBackendUrl + 'categories?&per_page=100'

// YouTube API
// ----------------------------------------------------------------------------
export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'
export const YOUTUBE_CHANNEL_ID = 'UCzu-gQp7Ca-csmsKGKWOliA'

// Schema.org
// ----------------------------------------------------------------------------
export const SCHEMA_PERSON_ID_ME = URL_SITE + '/#me'
export const WIKIDATA_FULLSTACK = 'https://www.wikidata.org/wiki/Q96072517'
export const WIKIDATA_DATA_SCIENTIST = 'https://www.wikidata.org/wiki/Q29169143'

// Cache
// ----------------------------------------------------------------------------
const CACHE_VERSION = packageJson.version

function versioned_cached(name) {
  return name + '-' + CACHE_VERSION
}

export const APP_CONFIG = {
  apis: {
    specialties: URL_API_SPECIALTIES,
    portfolio: URL_API_PORTFOLIO,
    education: URL_API_EDUCATION,
    recommendations: URL_API_RECOMMENDATIONS,
    projects: URL_API_PROJECTS,
    clients: URL_API_CLIENTS,
    articles: URL_API_ARTICLES,
    videos: URL_API_VIDEOS,
  },
  caching: {
    names: {
      staticImages: versioned_cached('static-images'),
      api: versioned_cached('api-responses'),
      app: versioned_cached('manifest'),
      cdn: versioned_cached('cdn-responses'),
    },
    expirations: {
      images: 24 * 60 * 60 * 30, // 30 days
      api: 1 * 60 * 60, // 1 hour
      app: 24 * 60 * 60 * 7, // 7 days
      cdn: 24 * 60 * 60 * 30, // 30 days
    },
  },
}
