import {
  sameAs,
  //imagesLawrenceMcDaniel,
  nameLawrenceMcDaniel,
  lastReviewed,
  baseTitle,
} from './gsdCommon.js'
import { gsdQualifications } from './gsdQualifications.js'
import { hourlyRate } from './gsdCommon.js'
import {
  URL_SITE,
  DEFAULT_IMAGE,
  WIKIDATA_DATA_SCIENTIST,
  SCHEMA_PERSON_ID_ME,
} from '../constants.js'

const aboutMe = `American data scientist, full stack developer, online instructor and digital
content creator. I work with AWS and Azure cloud infrastructure and I code in Python,
React and Terraform. I also work with the Open edX® learning management system.
I am a veteran of multiple startups and early-stage ventures with dozens of successful product
launches in multiple industries and markets around the world. I advocate for open source,
try to keep things DRY and well-documented and when possible I adhere to the principals of
12-factor development. I’m a passionate learner and frequent blogger, currently interested in
data science, machine learning and AI.`

export const hasOccupation = {
  '@type': 'Occupation',
  additionalType: WIKIDATA_DATA_SCIENTIST,
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
    percentile10: 38.48,
    percentile25: 48.13,
    percentile75: 73.08,
    percentile90: 90.0,
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
    '@type': 'WebPage',
    '@id': url + '#subject-of',
    url: url,
  }
}

export const gsdPersonLawrenceMcDaniel = {
  '@type': 'Person',
  '@id': SCHEMA_PERSON_ID_ME,
  name: nameLawrenceMcDaniel,
  description: aboutMe,
  jobTitle: baseTitle,
  image: DEFAULT_IMAGE,
  sameAs: sameAs,
  birthPlace: 'Houston, TX, USA',
  birthDate: '1966-12-31',
  nationality: 'American',
  gender: 'Male',
  height: '183 cm',
  familyName: 'McDaniel',
  givenName: 'Lawrence',
  email: 'mailto:lpm0073@gmail.com',
  telephone: '+1 (617) 834-6172',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cambridge',
    addressRegion: 'MA',
    postalCode: '02139',
    streetAddress: '210 Broadway Street',
  },
  knowsLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Spanish' },
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
    subjectOf(
      'https://extendedlearning.ubc.ca/about/our-instructors?field_course_program_areas_target_id_verf=All&field_instr_first_name=Lawrence&field_instr_last_name=McDaniel'
    ),
    subjectOf('https://geek.ly/lmcdaniel'),
  ],
}
