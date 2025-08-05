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
  '/consulting': 0.9,
  '/openedx': 0.8,
  '/data-science': 0.8,
  '/full-stack-developer': 0.8,
  '/reactjs': 0.8,
  '/contact': 0.7,
  '/about': 0.6,
  '/bio': 0.6,
  '/specialties': 0.6,
  '/portfolio': 0.6,
  '/education': 0.6,
  '/clients': 0.6,
  '/react-mdr': 0.5,
  '/qr': 0.5,
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

