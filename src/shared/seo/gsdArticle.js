import { baseUrl, datePublished, dateModified } from './gsdCommon'

const ensureTrailingSlash = (str) => (str.endsWith('/') ? str : str + '/')
export const gsdArticle = (slug, headline) => {
    const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
    const slugWithSlash = ensureTrailingSlash(slug)
  return {
    '@type': 'Article',
    '@id': baseUrlWithSlash + slugWithSlash + '#article',
    isPartOf: {
      '@id': baseUrlWithSlash + slugWithSlash + '#webpage',
    },
    author: {
      '@id': baseUrlWithSlash + '#me',
    },
    headline: headline,
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      '@id': baseUrlWithSlash + slugWithSlash + '#webpage',
    },
    commentCount: 0,
    publisher: baseUrlWithSlash + '#me',
    image: baseUrlWithSlash + '#logo',
    articleSection: slugWithSlash,
    inLanguage: 'en-US',
  }
}
