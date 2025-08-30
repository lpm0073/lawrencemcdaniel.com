/* eslint-disable */
import packageJson from '../../package.json' with { type: 'json' }

const protocol = 'https'
const domainName = 'lawrencemcdaniel.com'

const URL_SITE = protocol + '://' + domainName
const URL_API = protocol + '://api.' + domainName
const URL_CDN = protocol + '://cdn.' + domainName
const URL_BLOG = protocol + '://blog.' + domainName

const ApiBackendUrl = URL_API + '/wp-json/wp/v2/'
const blogBackendUrl = URL_BLOG + '/wp-json/wp/v2/'

const CACHE_VERSION = packageJson.version

function versioned_cached(name) {
  return name + '-' + CACHE_VERSION
}

export const APP_CONFIG = {
  apis: {
    articles: '/data/blog.lawrencemcdaniel.com.json',
    blog_posts: blogBackendUrl + 'posts?&per_page=100',
    blog_categories: blogBackendUrl + 'categories?&per_page=100',
    clients: ApiBackendUrl + 'posts?categories=46&_embed&per_page=100',
    education: ApiBackendUrl + 'posts?categories=44&_embed&per_page=100',
    portfolio: ApiBackendUrl + 'posts?categories=47&_embed&per_page=100',
    projects:
      ApiBackendUrl +
      'media?include=2324,2320,2319,2300,2295,2296,2297,2298,2299,2301,2302,2303',
    repositories: '/data/github.json',
    specialties: ApiBackendUrl + 'posts?categories=43&_embed&per_page=100',
    tags: ApiBackendUrl + 'tags?&per_page=100',
    recommendations: ApiBackendUrl + 'posts?categories=45&_embed&per_page=100',
    videos: '/data/youtube.json',
    youtube: {
      base_url: 'https://www.googleapis.com/youtube/v3',
      channel_id: 'UCzu-gQp7Ca-csmsKGKWOliA',
    },
  },
  caching: {
    names: {
      api: versioned_cached('api-responses'),
      app: versioned_cached('manifest'),
      cdn: versioned_cached('cdn-responses'),  // TO DO: delete this. everything is routing to workbox-precache-v2 via service-worker.js setup.
      staticImages: versioned_cached('static-images'),
      workbox_precache: 'workbox-precache-v2',
    },
    expirations: {
      api: 1 * 60 * 60, // 1 hour
      app: 24 * 60 * 60 * 7, // 7 days
      cdn: 24 * 60 * 60 * 30, // 30 days
      images: 24 * 60 * 60 * 30, // 30 days
    },
  },
  debug: false,
  static: {
    images: {
      default: 'https://cdn.lawrencemcdaniel.com/lawrencemcdaniel-headshot-square.jpeg',
    },
  },
  schema: {
    me: URL_SITE + '/#me',
    professions: {
      fullstack: 'https://www.wikidata.org/wiki/Q96072517',
      dataScientist: 'https://www.wikidata.org/wiki/Q29169143',
    },
  },
  skills: {
    cloud: 'cloud',
    fullStack: 'full-stack',
    dataScience: 'data-science',
    openEdx: 'openedx',
    react: 'react',
  },
  urls: {
    api: URL_API,
    blog: URL_BLOG,
    cdn: URL_CDN,
    resume: URL_CDN + '/doc/lawrence-mcdaniel-resume-202509.pdf',
    site: URL_SITE,
  },
}
