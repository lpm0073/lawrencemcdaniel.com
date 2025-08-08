/*
   List of technologies from Logocube.
   Appended to Organization object for Fullstack and Specialties pages.
 */
import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
import { datePublished, SCHEMA_PERSON_ID_ME } from './gsdCommon'

/* eslint-disable no-unused-vars */
export const gsdKnowsAbout = (props) => {
  if (
    !props ||
    props.isLoading ||
    !props.specialties ||
    props.specialties.items.length === 0
  )
    return []

  const itemList = props.specialties.items
  const retVal = itemList.map((specialty, indx) => {
    const applicationCategory = specialty.acf.applicationCategory
    const operatingSystem = specialty.acf.operatingSystem
    const url = specialty.acf.url
    const appName = specialty.title.rendered
    const about = specialty.title.rendered
    const thumbnailUrl = wpGetFeaturedImage(specialty, null)

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
            '@id': SCHEMA_PERSON_ID_ME,
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
