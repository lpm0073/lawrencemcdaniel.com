import { URL_SITE } from '../constants'
const d = new Date()
const imageObject = (url, height, width) => {
  return {
    '@type': 'ImageObject',
    inLanguage: 'en-US',
    '@id': url + '/#imageObject',
    url: url,
    width: width,
    height: height,
    name: nameLawrenceMcDaniel,
    caption: nameLawrenceMcDaniel,
  }
}

export const baseUrl = URL_SITE
export const nameLawrenceMcDaniel = 'Lawrence McDaniel'
export const baseTitle = 'Full Stack Developer'
export const basePageTitle = nameLawrenceMcDaniel + ' - ' + baseTitle
export const datePublished = '2017-01-15'
export const dateModified = d.toISOString()
export const lastReviewed = dateModified
export const hourlyRate = 75.0

export const sameAs = [
  'https://blog.lawrencemcdaniel.com/',
  'https://horrors.lawrencemcdaniel.com/',
  'https://clients.lawrencemcdaniel.com/',
  'https://www.linkedin.com/in/lawrencemcdaniel/',
  'https://www.facebook.com/lawrence.p.mcdaniel',
  'https://open.edx.org/marketplace/lawrence-mcdaniel/',
  'https://openedx2018.sched.com/lpm0073',
  'https://github.com/lpm0073',
  'https://angel.co/p/lpm0073-gmail-com',
  'https://www.codementor.io/@lawrencemcdaniel',
  'http://geek.ly/lmcdaniel',
  'https://twitter.com/lorenzodpolanco',
]

export const brandLogo = {
  '@type': 'ImageObject',
  inLanguage: 'en-US',
  '@id': baseUrl + '/#logo',
  url: 'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2019/10/01135455/Lawrence1.jpg',
  width: 500,
  height: 381,
  name: nameLawrenceMcDaniel,
  caption: nameLawrenceMcDaniel,
}

export const brandLawrenceMcDaniel = {
  type: 'Brand',
  '@id': baseUrl + '/#brand',
  logo: brandLogo,
  name: nameLawrenceMcDaniel,
  url: baseUrl + '/',
}

export const imagesLawrenceMcDaniel = [
  brandLogo,
  imageObject('https://cdn.lawrencemcdaniel.com', 512, 512),
  imageObject('https://cdn.lawrencemcdaniel.com/social-1200x675.jpg', 1200, 675),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201857/Lawrence6.jpg',
    1600,
    1084
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201305/Lawrence21.jpg',
    1600,
    1067
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195642/Lawrence19.jpg',
    338,
    500
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220017/lawrence-mcdaniel-portrait.jpg',
    387,
    600
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195700/Lawrence-McDaniel-freelancer.jpg',
    750,
    706
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2016/11/22195702/lawrence-banner-bw.jpg',
    400,
    475
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2016/11/22195703/lawrence-headshot-bw.jpg',
    400,
    600
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2016/09/22195718/lawrence-headshot.jpg',
    500,
    500
  ),
  imageObject(
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2017/09/22195635/lawrencemcdaniel.com-linkedin.png',
    1200,
    627
  ),
]
