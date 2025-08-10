const { APP_CONFIG } = require('../../shared/constants.js')

const { SitemapStream } = require('sitemap')
const { createWriteStream } = require('fs')

const urlCloud = '/' + APP_CONFIG.skills.cloud
const urlDataScience = '/' + APP_CONFIG.skills.dataScience
const urlFullStack = '/' + APP_CONFIG.skills.fullStack
const urlOpenEdx = '/' + APP_CONFIG.skills.openEdx
const urlReact = '/' + APP_CONFIG.skills.react

const routes = [
  '/',
  '/contact',
  '/consulting',
  '/qr',
  '/about',
  urlCloud,
  urlDataScience,
  urlFullStack,
  urlOpenEdx,
  urlReact,
  '/bio',
  '/specialties',
  '/portfolio',
  '/education',
  '/react-mdr',
  '/clients',
]

const priorities = {
  '/': 1.0,
  '/consulting': 0.9,
  urlCloud: 0.8,
  urlDataScience: 0.8,
  urlFullStack: 0.8,
  urlOpenEdx: 0.8,
  urlReact: 0.8,
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

routes.forEach((url) => {
  sitemap.write({
    url,
    lastmod,
    changefreq,
    priority: priorities[url] || 0.5,
  })
})

sitemap.end()
sitemap.pipe(writeStream)
