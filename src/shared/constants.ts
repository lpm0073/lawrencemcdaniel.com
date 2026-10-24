import packageJson from '../../package.json' with { type: 'json' }

const protocol = 'https'
const domainName = 'lawrencemcdaniel.com'

const URL_SITE = protocol + '://' + domainName
const URL_API = protocol + '://api.' + domainName
const URL_CDN = protocol + '://cdn.' + domainName
const URL_BLOG = protocol + '://blog.' + domainName

const ApiBackendUrl = URL_API + '/wp-json/wp/v2/'

// The posts' fields that the site reads (WPPostSchema in src/schemas.ts), with
// only their featured image embedded. A plain _embed also embeds every post's
// author and terms, which makes WordPress four times slower and the response
// twice as large. Nothing caches WordPress's REST API responses (WP Rocket
// caches pages, not /wp-json/), so every byte is computed for every request.
const POST_FIELDS =
  '&_embed=wp:featuredmedia&_fields=id,date,modified,slug,link,title,content,excerpt,' +
  'categories,tags,featured_media,acf,_links.wp:featuredmedia,_embedded'
const blogBackendUrl = URL_BLOG + '/wp-json/wp/v2/'

const CACHE_VERSION = packageJson.version

function versioned_cached(name: string): string {
  return name + '-' + CACHE_VERSION
}

export const APP_CONFIG = {
  apis: {
    articles: '/data/blog.lawrencemcdaniel.com.json',
    blog_posts: blogBackendUrl + 'posts?&per_page=100',
    blog_categories: blogBackendUrl + 'categories?&per_page=100',
    clients: ApiBackendUrl + 'posts?categories=46&per_page=100' + POST_FIELDS,
    education: ApiBackendUrl + 'posts?categories=44&per_page=100' + POST_FIELDS,
    portfolio: ApiBackendUrl + 'posts?categories=47&per_page=100' + POST_FIELDS,
    projects:
      ApiBackendUrl +
      'media?include=2324,2320,2319,2300,2295,2296,2297,2298,2299,2301,2302,2303',
    repositories: '/data/github.json',
    specialties: ApiBackendUrl + 'posts?categories=43&per_page=100' + POST_FIELDS,
    tags: ApiBackendUrl + 'tags?&per_page=100',
    recommendations: ApiBackendUrl + 'posts?categories=45&per_page=100' + POST_FIELDS,
    videos: '/data/youtube.json',
    youtube: {
      base_url: 'https://www.googleapis.com/youtube/v3',
      channel_id: 'UCzu-gQp7Ca-csmsKGKWOliA',
    },
  },
  caching: {
    names: {
      api: versioned_cached('api'),
      // the API layer's own cache of the site's data, see src/redux/cachedBaseQuery.ts
      data: versioned_cached('data'),
      app: versioned_cached('app'),
      // the prerendered pages that have been visited, for offline use, see src/service-worker.ts
      pages: versioned_cached('pages'),
      cdn: versioned_cached('cdn'), // TO DO: delete this. everything is routing to workbox-precache-v2 via service-worker.js setup.
      staticImages: versioned_cached('static'),
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
      // the link previews' images (og:image, twitter:image), see src/components/PageMeta.tsx.
      // 1200x630 and well under 300 KB: WhatsApp shows no image larger than that.
      share: {
        default: {
          url: URL_SITE + '/assets/images/share/lawrencemcdaniel.jpg',
          width: 1200,
          height: 630,
          alt: 'Lawrence McDaniel',
        },
        smarter: {
          url: URL_SITE + '/assets/images/share/smarter.jpg',
          width: 1200,
          height: 630,
          alt: 'The Smarter Project prompt engineering workbench',
        },
      },
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
    assets: URL_SITE + '/assets/',
    static: URL_SITE + '/static/',
    site: URL_SITE,
  },
}
