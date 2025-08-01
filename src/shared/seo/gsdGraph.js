import { datePublished, dateModified, baseUrl, nameLawrenceMcDaniel } from './gsdCommon'
import { SCHEMA_PERSON_ID_ME } from '../constants'

export const defaultPageDescription = (webpageDescription) => {
  if (webpageDescription !== '') return webpageDescription
  return 'Data Scientist, Full Stack Web Developer, Open edX® Consultant, and digital content creator specializing in Python, ReactJS, Kubernetes, Terraform, AWS and Azure.'
}

const brandLogo = {
  '@id': baseUrl + '/#logo',
}

const pageTypes = (pageType) => {
  if (pageType !== '') return pageType
  return 'WebPage'
}

const pageName = (webpageName) => {
  return nameLawrenceMcDaniel + ' - ' + webpageName
}

const pageImage = (imageUrl) => {
  if (imageUrl !== '')
    return imageUrl
  return brandLogo
}

const webSite = () => {
  return {
    '@type': 'WebSite',
    '@id': baseUrl + '/#website',
    url: baseUrl + '/',
    name: nameLawrenceMcDaniel,
    description: 'Personal Web Site & Portfoio',
    publisher: {
      '@id': SCHEMA_PERSON_ID_ME,
    },
    inLanguage: 'en-US',
  }
}

const ensureTrailingSlash = (str) => (str.endsWith('/') ? str : str + '/')
const webPage = (
  pageType,
  slug,
  webpageName,
  webpageDescription,
  relatedLink,
  primaryImageUrl
) => {
  const slugWithSlash = slug ? ensureTrailingSlash(slug) : ''
  const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
  var retVal = {
    '@type': pageTypes(pageType),
    '@id': baseUrlWithSlash + slugWithSlash + '#webpage',
    url: baseUrlWithSlash + slugWithSlash,
    name: webpageName,
    isPartOf: {
      '@id': baseUrl + '/#website',
    },
    datePublished: datePublished,
    dateModified: dateModified,
    description: webpageDescription,
    breadcrumb: {
      '@id': baseUrlWithSlash + slugWithSlash + '#breadcrumb',
    },
    inLanguage: 'en-US',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: [baseUrlWithSlash + slugWithSlash],
      },
    ],
  }
  if (relatedLink !== '') retVal.relatedLink = relatedLink
  if (primaryImageUrl !== '') retVal.image = pageImage(primaryImageUrl)
  if (pageType === 'BlogPosting') {
    retVal.headline = webpageName
    retVal.image = primaryImageUrl
  }
  return retVal
}

const listItem = (position, slug, itemName, pageType = 'WebPage', pageImage) => {
  const slugWithSlash = slug ? ensureTrailingSlash(slug) : ''
  const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
  var listItemUrl = baseUrlWithSlash + slugWithSlash
  if (slug === '') listItemUrl = baseUrlWithSlash

  var item = {
    '@type': pageType,
    '@id': listItemUrl + '#breadcrumb',
    url: listItemUrl,
    name: itemName,
  }

  if (pageType === 'BlogPosting') {
    item.headline = itemName
    item.image = pageImage
  }
  return {
    '@type': 'ListItem',
    name: itemName,
    '@id': listItemUrl + '#listitem',
    position: position,
    item: item,
  }
}

const breadcrumbList = (slug, webpageName, pageType, pageImage) => {
  const slugWithSlash = slug ? ensureTrailingSlash(slug) : ''
  const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
  const validPageType = pageType && pageType !== '' ? pageType : 'WebPage'
  var itemListElement = [listItem(1, '', 'homepage', 'WebSite')]
  if (slug !== '')
    itemListElement.push(listItem(2, slug, pageName(webpageName), validPageType, pageImage))

  return {
    '@type': 'BreadcrumbList',
    '@id': baseUrlWithSlash + slugWithSlash + '#breadcrumb',
    itemListElement: itemListElement,
    name: slug,
  }
}

/*
   This is the main entry point for adding Google Structured Data
   to the <head> of a page.
 */
export const gsdGraph = (
  slug,
  webpageName,
  webpageDescription,
  primaryImageUrl = '',
  pageType = '',
  relatedLink = '',
  extraData = []
) => {
  return {
    '@context': 'https://schema.org',
    '@graph': extraData.concat([
      webSite(),
      /* pageImage(primaryImageUrl), */
      webPage(
        pageType,
        slug,
        webpageName,
        defaultPageDescription(webpageDescription),
        relatedLink,
        pageImage(primaryImageUrl)
      ),
      breadcrumbList(slug, webpageName, pageType, pageImage(primaryImageUrl)),
    ]),
  }
}
