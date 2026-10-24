/*
   List of technologies from Logocube.
   Appended to Organization object for Fullstack and Specialties pages.
 */
import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
import { datePublished } from './gsdCommon'
import { APP_CONFIG } from '../constants'
import type { WPPost } from '../../types'

/**
 * The technologies, as schema.org SoftwareApplication objects.
 * @param specialties - e.g. useSpecialties().data.items; empty while loading.
 */
export const gsdKnowsAbout = (specialties: WPPost[]) => {
  const retVal = specialties.map((specialty) => {
    // ACF field names are lower case: WordPress sends applicationcategory, not applicationCategory.
    const applicationCategory = specialty.acf?.applicationcategory
    const operatingSystem = specialty.acf?.operatingsystem
    const url = specialty.acf?.url
    const appName = specialty.title.rendered
    const about = specialty.title.rendered
    const thumbnailUrl = wpGetFeaturedImage(specialty)

    return {
      '@type': 'SoftwareApplication',
      applicationCategory: applicationCategory,
      operatingSystem: operatingSystem,
      thumbnailUrl: thumbnailUrl,
      image: thumbnailUrl,
      url: url,
      name: appName,
      sameAs: url,
      '@id': url + '/#software-app-id',
      review: [
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            '@id': APP_CONFIG.schema.me,
          },
          datePublished: datePublished,
          name: 'Review by Lawrence',
          reviewBody: 'My self review of this product.',
          reviewRating: {
            '@type': 'Rating',
            bestRating: 10,
            ratingValue: 10,
            worstRating: 1,
          },
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 10,
        reviewCount: 1,
        bestRating: 10,
        worstRating: 1,
      },
      about: about,
      offers: {
        '@type': 'Offer',
        price: 1.0,
        priceCurrency: 'USD',
      },
    }
  })
  return retVal
}
