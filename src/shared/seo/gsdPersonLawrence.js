import {
  baseUrl,
  sameAs,
  imagesLawrenceMcDaniel,
  brandLawrenceMcDaniel,
  nameLawrenceMcDaniel,
  lastReviewed,
  baseTitle,
} from './gsdCommon'
import { gsdQualifications } from './gsdQualifications'
import { hourlyRate } from './gsdCommon'
import { URL_SITE } from '../constants'

const aboutMe = 'I am an American data scientist, full stack developer and digital content creator with significant experience with classic backend stacks and cloud infrastructure including Django, React, Terraform, AWS and Azure. I work extensively with the Open edX® learning management system. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for open source, try to keep things DRY and well-documented and when possible I adhere to the principals of 12-factor development. I’m a passionate learner and frequent blogger, currently interested in data science, machine learning and AI.'

export const hasOccupation = {
  '@type': 'Occupation',
  additionalType: 'https://www.wikidata.org/wiki/Q96072517',
  name: baseTitle,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': URL_SITE + '/',
    lastReviewed: lastReviewed,
  },
  description: aboutMe,
  estimatedSalary: {
    '@type': 'MonetaryAmountDistribution',
    name: 'base',
    currency: 'USD',
    median: hourlyRate,
    percentile10: hourlyRate,
    percentile25: hourlyRate,
    percentile75: hourlyRate,
    percentile90: hourlyRate,
    duration: 'PT1H',
  },
  occupationLocation: [
    {
      '@type': 'City',
      name: 'Cambridge',
    },
    {
      '@type': 'City',
      name: 'Mexico City',
    },
  ],
  qualifications: gsdQualifications,
}

const subjectOf = (url) => {
  return {
    '@type': 'Url',
    '@id': url + '#news-article',
    url: url,
  }
}

export const personExtraData = {
  logo: {
    '@id': baseUrl + '/#logo',
  },
  additionalType: 'https://www.wikidata.org/wiki/Q96072517',
  identifier: URL_SITE + '/',
  brand: brandLawrenceMcDaniel,
  birthPlace: 'Houston, TX, USA',
  nationality: 'American',
  birthDate: '1966-12-31',
  height: '183 cm',
  familyName: 'McDaniel',
  givenName: 'Lawrence',
  gender: 'Male',
  email: 'mailto:lpm0073@gmail.com',
  telephone: '+1 (617) 834-6172',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cambridge',
    addressRegion: 'MA',
    postalCode: '02139',
    streetAddress: '210 Broadway Street',
  },
  affiliation: [
    {
      '@type': 'Organization',
      name: 'Open edX Marketplace',
      url: 'https://open.edx.org/marketplace/lawrence-mcdaniel/',
    },
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of North Texas',
      url: 'https://www.unt.edu/',
      sameAs: 'https://www.unt.edu/',
    },
  ],
  subjectOf: [
    subjectOf(
      'https://iblnews.org/installing-and-deploying-an-open-edx-instance-a-view-of-developer-and-author-mcdaniel/'
    ),
    subjectOf('https://opensource.com/user_articles/224351'),
    subjectOf('https://opensource.com/article/18/6/getting-started-open-edx'),
    subjectOf('https://open.edx.org/marketplace/lawrence-mcdaniel/'),
    subjectOf('https://openedx2018.sched.com/lpm0073'),
    subjectOf('https://extendedlearning.ubc.ca/about/our-instructors?field_course_program_areas_target_id_verf=All&field_instr_first_name=Lawrence&field_instr_last_name=McDaniel'),
    subjectOf('http://geek.ly/lmcdaniel'),
  ],
  knowsLanguage: [
    {
      '@type': 'Language',
      name: 'English',
    },
    {
      '@type': 'Language',
      name: 'Spanish',
    },
  ],
}

export const gsdPersonLawrenceMcDaniel = {
  '@type': ['Person', 'Organization'],
  '@id': URL_SITE + '/#me',
  name: nameLawrenceMcDaniel,
  description: aboutMe,
  jobTitle: baseTitle,
  sameAs: sameAs,
  logo: {
    '@id': baseUrl + '/#logo',
  },
  image: imagesLawrenceMcDaniel,
}
