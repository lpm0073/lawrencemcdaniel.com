import { convertToSlug } from '../slug'
import { brandLawrenceMcDaniel } from './gsdCommon'
import { datePublished, hourlyRate, nameLawrenceMcDaniel } from './gsdCommon'
import { URL_SITE } from '../constants'

const itemOffer = (name, description = '') => {
  return {
    '@type': 'Offer',
    '@id': URL_SITE + '/openedx/#' + convertToSlug(name),
    price: hourlyRate,
    priceCurrency: 'USD',
    priceSpecification: 'HOUR',
    availability: 'InStock',
    priceValidUntil: '2050-12-31',
    itemOffered: {
      '@type': 'Service',
      additionalType: 'https://www.wikidata.org/wiki/Q96072517',
      name: name,
      description: description,
    },
    url: URL_SITE + '/openedx',
  }
}

const subjectOf = (url) => {
  return {
    '@type': 'Url',
    '@id': url + '#tech-article',
    url: url,
    mainEntity: 'https://open.edx.org/',
  }
}

export const gsdServiceOpenedX = {
  '@type': 'Service',
  '@id': URL_SITE + '/openedx/#service',
  identifier: URL_SITE + '/openedx',
  serviceType: 'ProfessionalService',
  additionalType: 'https://en.wikipedia.org/wiki/Consultant',
  category: 'https://open.edx.org/',
  url: URL_SITE + '/openedx',
  areaServed: 'https://en.wikipedia.org/wiki/Americas',
  provider: {
    '@id': URL_SITE + '/#me',
  },
  serviceOutput: {
    '@type': 'Product',
    name: 'Open edX Platform',
    sku: 'openedx',
    isbn: 'openedx',
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
    review: [
      {
        '@type': 'Review',
        author: nameLawrenceMcDaniel,
        datePublished: datePublished,
        name: 'Review by Lawrence',
        reviewBody: 'My self review of this product.',
        reviewRating: {
          '@type': 'Rating',
          bestRating: '10',
          ratingValue: '10',
          worstRating: '1',
        },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '10',
      reviewCount: '1',
      bestRating: '10',
      worstRating: '1',
    },
    offers: [itemOffer('Full Stack Development')],
  },
  name: 'Open edX® Consulting Services',
  brand: brandLawrenceMcDaniel,
  description:
    'I am a 20-year veteran web developer specializing in the Open edX® platform. Thousands of organizations around the world have used my Open edX® blog articles to turn their online education vision into reality. In fact, my how-to guides and tutorials on production installation, platform scaling, custom theming, and configuration have been viewed more than fifty thousand times. Based in North America, I split my time between Cambridge, Massachusetts and Mexico City. As a freelancer with a low-overhead lifestyle I tend to be the most economical option in many cases. I provide personalized service and fast response to clients located around the world. All of my customers have my personal mobile phone number and can reach me any time by voice, whatsapp or email. My Portfolio, Client List and Recommendations are all available on this site.',
  image: {
    '@type': 'ImageObject',
    url: 'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/28144740/open-edx-logo-with-reg.png',
    height: 71,
    width: 365,
    '@id': URL_SITE + '/#open-edx-logo.png',
  },
  logo: {
    '@id': URL_SITE + '/#open-edx-logo.png',
  },
  subjectOf: [
    subjectOf(
      'https://blog.lawrencemcdaniel.com/reset-the-mysql-root-password-in-open-edx/'
    ),
    subjectOf('https://blog.lawrencemcdaniel.com/scaling-open-edx/'),
    subjectOf('https://blog.lawrencemcdaniel.com/scaling-memcached-for-open-edx/'),
    subjectOf('https://blog.lawrencemcdaniel.com/scaling-mongodb-for-open-edx/'),
    subjectOf('https://blog.lawrencemcdaniel.com/scaling-mysql-for-open-edx/'),
    subjectOf(
      'https://blog.lawrencemcdaniel.com/open-edx-configuration-management-tutorial/'
    ),
    subjectOf('https://blog.lawrencemcdaniel.com/open-edx-configuration-tutorial/'),
    subjectOf('https://blog.lawrencemcdaniel.com/open-edx-installation/'),
    subjectOf('https://blog.lawrencemcdaniel.com/open-edx-complete-backup-solution/'),
    subjectOf(
      'https://blog.lawrencemcdaniel.com/tutor-1-click-installer-open-edx-installation-guide/'
    ),
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Open edX Support Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Open edX Administration & Devops',
        itemListElement: [
          itemOffer('Open edX Front-line support'),
          itemOffer('Open edX Site monitoring & maintenance'),
          itemOffer('Open edX Routine software upgrades'),
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Open edX Consulting Services',
        itemListElement: [
          itemOffer(
            'Open edX Installation & configuration',
            "I have performed dozens of production installations for clients since 2016 on cloud platforms including AWS and Digital Ocean as well as specialized regional cloud providers across Asia and Afrika. I publish technical articles that fully describe all of my methods for preparing your Open edX® platform for production use, including off-site data backup, setting up SMTP email, adding SSL certificates, and taking care of SEO. I am an expert in configuring the Open edX platform for a variety of common use cases including multi-language and e-commerce enabled platforms of widely varying scale. Open edX® is a mature and stable platform that is also highly configurable. Many customization requests can be implemented via the platform's many configuration parameters. However, configuring the Open edX® platform is a knowledge and experience-intensive endeavor. Properly managing your configuration is also something of a trade craft which you can read more about, here, Open edX Configuration Management Tutorial."
          ),
          itemOffer(
            'Open edX Custom theming',
            'You can customize the appearance of your Open edX® platform by creating and implementing a custom theme. In addition to creating a turn-key custom theming solution for your organization, I have also worked with many organizations around the world to train their inhouse graphic and web designers on how to re-style the look & feel of the platform as well as how to add custom content.'
          ),
          itemOffer(
            'Open edX Scaling & Capacity Planning',
            "I work with clients around the globe to ensure that their users' experiences are performant and reliable. Open edX® is massively scalable, as you can see from the site edx.org which is one of the largest MOOCs in the world and which runs on exactly the same software and is supported by the same team. The Open edX® platform leverages considerable open source community know-how and best practices in order to maximize its configurability and scalability. Mind you however, scaling is a highly technical topic, and even more so in the case of a complex platform like Open edX®."
          ),
          itemOffer(
            'Open edX Custom programming',
            "Most clients never require any custom programming. The Open edX® platform is highly configurable, and, it is extensible via its pluggable XBlock architecture. In the vast majority of cases, my clients find the custom features they require from existing XBlocks which I can typically install for them in only a few hours. If you're one of the exceptions to his rule however then let's talk. I have an extensive portfolio of low-level programming projects using Python-Django and ReactJS."
          ),
          itemOffer('Open edX Site Migration'),
          itemOffer(
            'Open edX Advisory & Training',
            'I advise project teams around the world, providing expert advise on technical best practices, project and risk management, and relevant context about technical strategies within the Open edX® platform.'
          ),
        ],
      },
    ],
  },
}
