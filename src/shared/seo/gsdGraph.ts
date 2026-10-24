import {
  datePublished,
  dateModified,
  baseUrl,
  nameLawrenceMcDaniel,
} from './gsdCommon.js'
import { APP_CONFIG } from '../constants.js'

/** A schema.org JSON-LD object. Not modeled further: it is only serialized. */
export type JsonLd = Record<string, unknown>

/** An image url, or a reference to the brand logo's ImageObject. */
type ImageRef = string | { '@id': string }

export const defaultPageDescription = (webpageDescription?: string): string => {
  if (webpageDescription && webpageDescription !== '') return webpageDescription
  return 'Lawrence McDaniel - Data Scientist, Python Programmer, Open edX Consultant, online instructor and digital content creator.'
}

export const defaultKeywords = (keywords?: string): string => {
  if (keywords && keywords !== '') return keywords
  return 'lawrence mcdaniel, data science, Python, AI, machine learning, consulting, ci-cd, react, aws, azure, terraform, django'
}

const brandLogo = {
  '@id': baseUrl + '/#logo',
}

const pageTypes = (pageType: string): string => {
  if (pageType !== '') return pageType
  return 'WebPage'
}

const pageName = (webpageName: string): string => {
  return nameLawrenceMcDaniel + ' - ' + webpageName
}

const pageImage = (imageUrl: ImageRef): ImageRef => {
  if (imageUrl !== '') return imageUrl
  return brandLogo
}

const webSite = (): JsonLd => {
  return {
    '@type': 'WebSite',
    '@id': baseUrl + '/#website',
    url: baseUrl + '/',
    name: nameLawrenceMcDaniel,
    description: 'Personal Web Site & Portfoio',
    publisher: {
      '@id': APP_CONFIG.schema.me,
    },
    inLanguage: 'en-US',
  }
}

const ensureTrailingSlash = (str: string): string => (str.endsWith('/') ? str : str + '/')
const webPage = (
  pageType: string,
  slug: string,
  webpageName: string,
  webpageDescription: string,
  relatedLink: string,
  primaryImageUrl: ImageRef
): JsonLd => {
  const slugWithSlash = slug ? ensureTrailingSlash(slug) : ''
  const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
  const retVal: JsonLd = {
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

const listItem = (
  position: number,
  slug: string,
  itemName: string,
  pageType: string = 'WebPage',
  pageImage?: ImageRef
): JsonLd => {
  const slugWithSlash = slug ? ensureTrailingSlash(slug) : ''
  const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
  let listItemUrl = baseUrlWithSlash + slugWithSlash
  if (slug === '') listItemUrl = baseUrlWithSlash

  const item: JsonLd = {
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

const breadcrumbList = (
  slug: string,
  webpageName: string,
  pageType: string,
  pageImage: ImageRef
): JsonLd => {
  const slugWithSlash = slug ? ensureTrailingSlash(slug) : ''
  const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
  const validPageType = pageType && pageType !== '' ? pageType : 'WebPage'
  const itemListElement = [listItem(1, '', 'homepage', 'WebSite')]
  if (slug !== '')
    itemListElement.push(
      listItem(2, slug, pageName(webpageName), validPageType, pageImage)
    )

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
  slug: string,
  webpageName: string,
  webpageDescription: string,
  primaryImageUrl: string = '',
  pageType: string = '',
  relatedLink: string = '',
  extraData: JsonLd[] = []
): JsonLd => {
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
