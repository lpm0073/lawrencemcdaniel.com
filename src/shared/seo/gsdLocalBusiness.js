import { brandLawrenceMcDaniel, imagesLawrenceMcDaniel, basePageTitle } from './gsdCommon'
import { APP_CONFIG } from '../constants.js'
/* DEPRECATE???? */
/* eslint-disable-next-line no-unused-vars */
export const gsdLocalBusinessLawrenceMcDaniel = (includeExtraData = false) => {
  var retVal = {
    '@type': 'LocalBusiness',
    additionalType: APP_CONFIG.schema.professions.dataScientist,
    image: imagesLawrenceMcDaniel,
    '@id': APP_CONFIG.urls.site + '/#business',
    brand: brandLawrenceMcDaniel,
    name: basePageTitle,
    priceRange: '$$',
    employee: [
      {
        '@id': APP_CONFIG.schema.me,
      },
    ],
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Colonia Doctores',
        addressRegion: 'CDMX',
        postalCode: '06720',
        streetAddress: 'Doctor Carmona y Valle 122B',
        addressCountry: 'Mexico',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Cambridge',
        addressRegion: 'MA',
        postalCode: '02139',
        streetAddress: '210 Broadway Street',
      },
    ],
    url: APP_CONFIG.urls.site + '/',
    logo: 'https://cdn.lawrencemcdaniel.com/',
    telephone: '+1 (617) 834-6172',
    email: 'mailto:lpm0073@gmail.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  }
  return retVal
}
