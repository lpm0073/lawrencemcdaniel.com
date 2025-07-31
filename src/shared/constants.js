export const DEBUG = false

export const baseUrl = 'http://localhost:3001/'

export const protocol = 'https'
export const domainName = 'lawrencemcdaniel.com'
export const DEFAULT_IMAGE =
  'https://cdn.lawrencemcdaniel.com/lawrencemcdaniel-headshot-square.jpeg'
export const CORSOrigins = '*.' + domainName

export const URL_SITE = protocol + '://' + domainName
export const URL_API = protocol + '://api.' + domainName
export const URL_CDN = protocol + '://cdn.' + domainName

export const resumeUrl = URL_CDN + '/doc/Resume-Lawrence-McDaniel-202211b.pdf'
export const backendUrl = URL_API + '/wp-json/wp/v2/'

// Wordpress API Content URL end points
export const URL_API_SPECIALTIES = backendUrl + 'posts?categories=43&_embed&per_page=100'
export const URL_API_PORTFOLIO = backendUrl + 'posts?categories=47&_embed&per_page=100'
export const URL_API_EDUCATION = backendUrl + 'posts?categories=44&_embed&per_page=100'
export const URL_API_RECOMMENDATIONS =
  backendUrl + 'posts?categories=45&_embed&per_page=100'
export const URL_API_PROJECTS =
  backendUrl + 'media?include=2324,2320,2319,2300,2295,2296,2297,2298,2299,2301,2302,2303'
export const URL_API_CLIENTS = backendUrl + 'posts?categories=46&_embed&per_page=100'

export const CACHE_NAME_API = 'wp-api-apiCache'
export const CACHE_NAME_IMAGE = 'wp-image-apiCache'
