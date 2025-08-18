import { convertToSlug } from '../slug'
import { brandLawrenceMcDaniel } from './gsdCommon'
import { hourlyRate } from './gsdCommon'
import { APP_CONFIG } from '../constants'

const urlOpenedX = APP_CONFIG.urls.site + '/' + APP_CONFIG.skills.openedX
function stripHtmlTags(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/<[^>]*>/g, '')
}
const getReview = (recommendation) => {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      '@id': recommendation?.link,
    },
    datePublished: recommendation?.date_gmt,
    name: 'Review by ' + stripHtmlTags(recommendation?.title?.rendered),
    reviewBody: stripHtmlTags(recommendation?.excerpt?.rendered),
    reviewRating: {
      '@type': 'Rating',
      bestRating: 5,
      ratingValue: recommendation?.ratingValue || 5,
      worstRating: 1,
    },
  }
}

const getReviews = (recommendations) => {
  if (!recommendations || !Array.isArray(recommendations)) {
    return []
  }
  const retval = recommendations.map((recommendation) => getReview(recommendation))
  const my_self_recommendation = {
    link: APP_CONFIG.schema.me,
    date_gmt: '2023-10-01',
    title: { rendered: 'Lawrence McDaniel' },
    excerpt: { rendered: 'My self review of this product.' },
    ratingValue: 4,
  }
  retval.push(getReview(my_self_recommendation))
  return retval
}

const fullstackItemOffer = (name, description = '') => {
  return {
    '@type': 'Offer',
    '@id':
      APP_CONFIG.urls.site +
      '/' +
      APP_CONFIG.skills.fullStack +
      '/#' +
      convertToSlug(name),
    price: hourlyRate,
    priceCurrency: 'USD',
    priceSpecification: 'HOUR',
    availability: 'InStock',
    priceValidUntil: '2050-12-31',
    itemOffered: {
      '@type': 'Service',
      additionalType: APP_CONFIG.schema.professions.fullStackDeveloper,
      name: name,
      description: description,
    },
    url: APP_CONFIG.urls.site + '/' + APP_CONFIG.skills.fullStack,
  }
}

const openedxItemOffer = (name, description = '') => {
  return {
    '@type': 'Offer',
    '@id': urlOpenedX + '/#' + convertToSlug(name),
    price: 90.0,
    priceCurrency: 'USD',
    priceSpecification: 'HOUR',
    availability: 'InStock',
    priceValidUntil: '2050-12-31',
    itemOffered: {
      '@type': 'Service',
      additionalType: APP_CONFIG.schema.professions.fullstack,
      name: name,
      description: description,
    },
    url: urlOpenedX,
  }
}

// const subjectOf = (url) => {
//   return {
//     '@type': 'Url',
//     '@id': url + '#tech-article',
//     url: url,
//     mainEntity: 'https://open.edx.org/',
//   }
// }

export const gsdServiceOpenedX = (recommendations) => {
  const reviews = getReviews(recommendations)
  const aggregateRatingValue =
    reviews
      .map((review) => review.reviewRating?.ratingValue || 0)
      .reduce((a, b) => a + b, 0) / reviews.length

  return {
    '@type': 'Service',
    '@id': urlOpenedX + '/#service',
    identifier: urlOpenedX,
    serviceType: 'ProfessionalService',
    additionalType: 'https://en.wikipedia.org/wiki/Consultant',
    category: 'https://open.edx.org/',
    url: urlOpenedX,
    areaServed: 'https://en.wikipedia.org/wiki/Americas',
    provider: {
      '@id': APP_CONFIG.schema.me,
    },
    serviceOutput: {
      '@type': 'Product',
      name: 'Open edX Platform',
      sku: 'openedx',
      '@id': 'https://en.wikipedia.org/wiki/EdX#Open_edX_Platform',
      description:
        'Open edX platform is the open-source platform software developed by edX and made freely available to other institutions of higher learning that want to make similar offerings. On June 1, 2013, edX open sourced its entire platform.[20] The source code can be found on GitHub.',
      image: {
        '@type': 'ImageObject',
        url: 'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/28144740/open-edx-logo-with-reg.png',
        height: 71,
        width: 365,
        '@id':
          'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/28144740/open-edx-logo-with-reg.png',
      },
      brand: {
        '@id': 'https://open.edx.org/',
      },
      review: reviews,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRatingValue,
        reviewCount: reviews.length,
        bestRating: 5,
        worstRating: 1,
      },
      offers: [fullstackItemOffer('Full Stack Development')],
    },
    name: 'Open edX® Consulting Services',
    brand: brandLawrenceMcDaniel,
    description: `I am a veteran data scientist and full stack developer. I also advise
  clients on the Open edX® online learning management platform. I am an online instructor
  for University of British Columbia's extended learning program. I teach Artificial Intelligence
  and Cloud Computing courses. I reside in Mexico City. My Portfolio, Client List and
  Recommendations are all available on this site.`,
    image: {
      '@type': 'ImageObject',
      url: 'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/28144740/open-edx-logo-with-reg.png',
      height: 71,
      width: 365,
      '@id': APP_CONFIG.urls.site + '/#open-edx-logo.png',
    },
    logo: {
      '@id': APP_CONFIG.urls.site + '/#open-edx-logo.png',
    },
    // subjectOf: [
    //   subjectOf(
    //     'https://blog.lawrencemcdaniel.com/reset-the-mysql-root-password-in-open-edx/'
    //   ),
    //   subjectOf('https://blog.lawrencemcdaniel.com/scaling-open-edx/'),
    //   subjectOf('https://blog.lawrencemcdaniel.com/scaling-memcached-for-open-edx/'),
    //   subjectOf('https://blog.lawrencemcdaniel.com/scaling-mongodb-for-open-edx/'),
    //   subjectOf('https://blog.lawrencemcdaniel.com/scaling-mysql-for-open-edx/'),
    //   subjectOf(
    //     'https://blog.lawrencemcdaniel.com/open-edx-configuration-management-tutorial/'
    //   ),
    //   subjectOf('https://blog.lawrencemcdaniel.com/open-edx-configuration-tutorial/'),
    //   subjectOf('https://blog.lawrencemcdaniel.com/open-edx-installation/'),
    //   subjectOf('https://blog.lawrencemcdaniel.com/open-edx-complete-backup-solution/'),
    //   subjectOf(
    //     'https://blog.lawrencemcdaniel.com/tutor-1-click-installer-open-edx-installation-guide/'
    //   ),
    // ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Open edX Support Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Open edX Administration & Devops',
          itemListElement: [
            openedxItemOffer('Open edX Front-line support'),
            openedxItemOffer('Open edX Site monitoring & maintenance'),
            openedxItemOffer('Open edX Routine software upgrades'),
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Open edX Consulting Services',
          itemListElement: [
            openedxItemOffer(
              'Open edX Installation & configuration',
              "I have performed dozens of production installations for clients since 2016 on cloud platforms including AWS and Digital Ocean as well as specialized regional cloud providers across Asia and Afrika. I publish technical articles that fully describe all of my methods for preparing your Open edX® platform for production use, including off-site data backup, setting up SMTP email, adding SSL certificates, and taking care of SEO. I am an expert in configuring the Open edX platform for a variety of common use cases including multi-language and e-commerce enabled platforms of widely varying scale. Open edX® is a mature and stable platform that is also highly configurable. Many customization requests can be implemented via the platform's many configuration parameters. However, configuring the Open edX® platform is a knowledge and experience-intensive endeavor. Properly managing your configuration is also something of a trade craft which you can read more about, here, Open edX Configuration Management Tutorial."
            ),
            openedxItemOffer(
              'Open edX Custom theming',
              'You can customize the appearance of your Open edX® platform by creating and implementing a custom theme. In addition to creating a turn-key custom theming solution for your organization, I have also worked with many organizations around the world to train their inhouse graphic and web designers on how to re-style the look & feel of the platform as well as how to add custom content.'
            ),
            openedxItemOffer(
              'Open edX Scaling & Capacity Planning',
              "I work with clients around the globe to ensure that their users' experiences are performant and reliable. Open edX® is massively scalable, as you can see from the site edx.org which is one of the largest MOOCs in the world and which runs on exactly the same software and is supported by the same team. The Open edX® platform leverages considerable open source community know-how and best practices in order to maximize its configurability and scalability. Mind you however, scaling is a highly technical topic, and even more so in the case of a complex platform like Open edX®."
            ),
            openedxItemOffer(
              'Open edX Custom programming',
              "Most clients never require any custom programming. The Open edX® platform is highly configurable, and, it is extensible via its pluggable XBlock architecture. In the vast majority of cases, my clients find the custom features they require from existing XBlocks which I can typically install for them in only a few hours. If you're one of the exceptions to his rule however then let's talk. I have an extensive portfolio of low-level programming projects using Python-Django and ReactJS."
            ),
            openedxItemOffer('Open edX Site Migration'),
            openedxItemOffer(
              'Open edX Advisory & Training',
              'I advise project teams around the world, providing expert advise on technical best practices, project and risk management, and relevant context about technical strategies within the Open edX® platform.'
            ),
          ],
        },
      ],
    },
  }
}
