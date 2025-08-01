const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')

const routes = [
  'schema.json',
  '/',
  '/contact',
  '/consulting',
  '/qr',
  '/about',
  '/openedx',
  '/data-science',
  '/bio',
  '/specialties',
  '/portfolio',
  '/education',
  '/full-stack-developer',
  '/reactjs',
  '/react-mdr',
  '/clients',
]

const priorities = {
  '/': 1.0,
  '/contact': 0.9,
  '/consulting': 0.75,
  '/qr': 0.5,
  '/about': 0.75,
  '/openedx': 0.75,
  '/data-science': 0.75,
  '/bio': 0.75,
  '/specialties': 0.75,
  '/portfolio': 0.75,
  '/education': 0.75,
  '/full-stack-developer': 0.75,
  '/reactjs': 0.5,
  '/react-mdr': 0.25,
  '/clients': 0.75,
}

const lastmod = new Date().toISOString()
const changefreq = 'monthly'

const sitemap = new SitemapStream({ hostname: 'https://lawrencemcdaniel.com' })
const writeStream = createWriteStream('./public/sitemap.xml')

routes.forEach(url => {
  sitemap.write({
    url,
    lastmod,
    changefreq,
    priority: priorities[url] || 0.5,
  })
})

sitemap.end()
sitemap.pipe(writeStream)

