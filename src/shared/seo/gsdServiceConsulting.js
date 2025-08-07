import { convertToSlug } from '../slug'
import { brandLawrenceMcDaniel } from './gsdCommon'
import { hourlyRate } from './gsdCommon'
import {
  URL_SITE,
  WIKIDATA_FULLSTACK,
  WIKIDATA_DATA_SCIENTIST,
  SCHEMA_PERSON_ID_ME,
} from '../constants'

const slug = 'consulting'

const fullstackItemOffer = (name, description = '') => {
  return {
    '@type': 'Offer',
    '@id': URL_SITE + '/full-stack-developer/#' + convertToSlug(name),
    price: hourlyRate,
    priceCurrency: 'USD',
    priceSpecification: 'HOUR',
    availability: 'InStock',
    priceValidUntil: '2050-12-31',
    itemOffered: {
      '@type': 'Service',
      additionalType: WIKIDATA_FULLSTACK,
      name: name,
      description: description,
    },
    url: URL_SITE + '/full-stack-developer',
  }
}

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
      additionalType: WIKIDATA_DATA_SCIENTIST,
      name: name,
      description: description,
    },
    url: URL_SITE + '/' + slug,
  }
}

export const gsdServiceConsulting = {
  '@type': 'Service',
  '@id': URL_SITE + '/' + slug + '/#service',
  identifier: URL_SITE + '/' + slug,
  serviceType: 'ProfessionalService',
  additionalType: 'https://en.wikipedia.org/wiki/Consultant',
  category: 'https://open.edx.org/',
  url: URL_SITE + '/' + slug,
  areaServed: 'https://en.wikipedia.org/wiki/Americas',
  provider: {
    '@id': SCHEMA_PERSON_ID_ME,
  },
  serviceOutput: {
    '@type': 'Product',
    name: 'Data Science, AI/ML, Devops, and Full Stack Development',
    sku: 'data-science-ai-ml-devops-fullstack',
    '@id': URL_SITE + '/' + slug + '/#service-product',
    description:
      'I advise organizations on how to better leverage their existing data, and on migrating technology infrastructure to the cloud. And I’ll even do the work.',
    brand: {
      '@id': URL_SITE,
    },
    offers: [fullstackItemOffer('Full Stack Development')],
  },
  name: 'Consulting Services',
  brand: brandLawrenceMcDaniel,
  description: `I advise organizations on how to better leverage their existing data, and on migrating technology infrastructure to the cloud. And I’ll even do the work.
    Data Science: I help companies prepare data sets, and setup training, testing, evaluation, deployment and monitoring of AI, machine learning and forecasting models; both on premise as well as on popular platforms like AWS, Azure and Google Cloud.
    Training: I provide live and studio prerecorded training about hard skills in cloud computing, data science, and advanced programming techniques.
    Full Stack development: I build complete solutions, from front-end web applications to back-end services, command-line interfaces and automated workflows.
    Cloud Computing: I specialize in cloud native technologies like Docker, Kubernetes, Terraform and GitHub for designing, implementing and managing scalable and secure cloud infrastructure.
    Dev Ops: I help teams work more efficiently by implementing best practices for software development, deployment, and maintenance, including CI/CD pipelines, automated testing, and infrastructure as code. I practice what I preach. I am the principal maintainer of more than 4 dozen open source projects.
    Open edX®: I provide advisory services on installing, configuring and customizing the Open edX® platform.`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Support Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'AI/ML Workload Devops and Monitoring',
        itemListElement: [
          itemOffer(
            'Data Analytics and Visualization',
            'I help organizations analyze and visualize their data to gain insights and make informed decisions.'
          ),
          itemOffer(
            'AI/ML Model Training and Deployment',
            'I assist organizations in training and deploying AI/ML models to improve their business processes.'
          ),
          itemOffer(
            'AI/ML Model Monitoring and Maintenance',
            'I provide ongoing monitoring and maintenance for AI/ML models to ensure optimal performance.'
          ),
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Consulting Services',
        itemListElement: [
          itemOffer(
            'Proof of Concept',
            'I help organizations develop proof of concept projects to validate their ideas and test their assumptions.'
          ),
          itemOffer(
            ' Data Science',
            'I help organizations leverage their data to gain insights and make informed decisions.'
          ),
          itemOffer(
            'Training',
            'I provide training to help organizations build their internal capabilities in data science, AI/ML, and cloud computing.'
          ),
          itemOffer(
            'Full Stack Development',
            'I help organizations build and maintain their web applications, from front-end to back-end development.'
          ),
          itemOffer(
            'Cloud Computing',
            'I help organizations migrate their infrastructure to the cloud and optimize their cloud operations.'
          ),
          itemOffer(
            'Dev Ops',
            'I help organizations implement best practices for software development, deployment, and maintenance, including CI/CD pipelines, automated testing, and infrastructure as code.'
          ),
          itemOffer(
            'Open edX Custom Theming',
            'I help organizations customize the appearance of their Open edX® platform by creating and implementing custom themes.'
          ),
        ],
      },
    ],
  },
}
