import { baseUrl, datePublished, dateModified } from './gsdCommon'
import { SCHEMA_PERSON_ID_ME } from '../constants'

const ensureTrailingSlash = (str) => (str.endsWith('/') ? str : str + '/')
export const gsdArticle = (slug, headline) => {
  const baseUrlWithSlash = ensureTrailingSlash(baseUrl)
  const slugWithSlash = ensureTrailingSlash(slug)
  return {
    '@type': 'Article',
    '@id': baseUrlWithSlash + slugWithSlash + '#article',
    // isPartOf: {
    //   '@id': baseUrlWithSlash + slugWithSlash + '#webpage',
    // },
    author: {
      '@type': 'Person',
      '@id': SCHEMA_PERSON_ID_ME,
    },
    headline: headline,
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      '@id': baseUrlWithSlash + slugWithSlash + '#webpage',
    },
    commentCount: 0,
    publisher: {
      '@type': 'Person',
      '@id': SCHEMA_PERSON_ID_ME,
    },
    // image: baseUrlWithSlash + '#logo',
    articleSection: slugWithSlash,
    inLanguage: 'en-US',
  }
}
