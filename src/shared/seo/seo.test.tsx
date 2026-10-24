import type { ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'

import { makePost, makeRepository } from '../../../test/fixtures'
import { ConfigureStore, type RootState } from '../../redux/configureStore'
import { gsdArticle } from './gsdArticle'
import { baseUrl, brandLawrenceMcDaniel, imagesLawrenceMcDaniel } from './gsdCommon'
import { gsdFAQ } from './gsdFAQ'
import {
  defaultKeywords,
  defaultPageDescription,
  gsdGraph,
  type JsonLd,
} from './gsdGraph'
import { gsdHowToInstallOpenEdx } from './gsdHowToInstall'
import { gsdHowToScaleOpenEdx } from './gsdHowToScale'
import { gsdKnowsAbout } from './gsdKnowsAbout'
import { gsdLocalBusinessLawrenceMcDaniel } from './gsdLocalBusiness'
import { gsdPersonLawrenceMcDaniel, hasOccupation } from './gsdPersonLawrence'
import { gsdQualifications } from './gsdQualifications'
import { gsdServiceConsulting } from './gsdServiceConsulting'
import { gsdServiceOpenedX } from './gsdServiceOpenedx'
import { gsdSkillSchema, gsdSkillSchemaList } from './gsdSkills'
import { gsdSoftwareRepoList, gsdSoftwareSourceCode } from './gsdSoftwareSourceCode'
import { gsdVideoObject, gsdVideoObjectList } from './gsdVideoObject'

const SITE = 'https://lawrencemcdaniel.com'
const ME = SITE + '/#me'

function wrapper(preloadedState: Partial<RootState>) {
  const store = ConfigureStore(preloadedState)
  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
}

const specialty = (title: string, skills: string[]) =>
  makePost({
    title: { rendered: `<b>${title}</b>` },
    excerpt: { rendered: `<p>About ${title}</p>` },
    acf: {
      url: `https://${title}.org`,
      applicationCategory: 'Dev',
      operatingSystem: 'Any',
    },
    skills,
  })

const specialtiesState = (
  items = [specialty('python', ['full-stack']), specialty('react', ['react'])]
) => ({
  isLoading: false,
  errMess: null,
  items,
  logos: [],
  featured_logos: [],
})

describe('gsdCommon', () => {
  it('builds the brand and its images', () => {
    expect(baseUrl).toBe(SITE)
    expect(brandLawrenceMcDaniel['@id']).toBe(SITE + '/#brand')
    expect(imagesLawrenceMcDaniel[1]).toMatchObject({
      '@type': 'ImageObject',
      '@id': 'https://cdn.lawrencemcdaniel.com/#imageObject',
      width: 512,
      height: 512,
    })
  })
})

describe('gsdArticle', () => {
  it('adds trailing slashes once', () => {
    expect(gsdArticle('react', 'Headline')).toMatchObject({
      '@type': 'Article',
      '@id': SITE + '/react/#article',
      headline: 'Headline',
      articleSection: 'react/',
      author: { '@id': ME },
    })
    expect(gsdArticle('react/', 'H')['@id']).toBe(SITE + '/react/#article')
  })
})

describe('gsdFAQ', () => {
  it('points at the Open edX page and lists questions', () => {
    expect(gsdFAQ.url).toBe(SITE + '/openedx')
    expect(gsdFAQ.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      name: 'How much does Open edX cost?',
      acceptedAnswer: { '@type': 'Answer' },
    })
  })
})

describe('gsdGraph', () => {
  const graph = (result: JsonLd) => result['@graph'] as JsonLd[]

  it('falls back to the default description and keywords', () => {
    expect(defaultPageDescription()).toMatch(/^Lawrence McDaniel - Data Scientist/)
    expect(defaultPageDescription('')).toMatch(/^Lawrence McDaniel/)
    expect(defaultPageDescription('Mine')).toBe('Mine')
    expect(defaultKeywords()).toMatch(/^lawrence mcdaniel/)
    expect(defaultKeywords('k')).toBe('k')
  })

  it('builds the website, webpage and breadcrumbs for a page', () => {
    const extra = { '@type': 'Person' }
    const result = gsdGraph('about', 'About', '', '', '', '', [extra])
    const [person, website, webpage, breadcrumbs] = graph(result)

    expect(result['@context']).toBe('https://schema.org')
    expect(person).toBe(extra)
    expect(website).toMatchObject({ '@type': 'WebSite', '@id': SITE + '/#website' })
    expect(webpage).toMatchObject({
      '@type': 'WebPage',
      '@id': SITE + '/about/#webpage',
      url: SITE + '/about/',
      name: 'About',
      image: { '@id': SITE + '/#logo' },
    })
    expect(webpage.description).toMatch(/^Lawrence McDaniel/)
    expect(webpage).not.toHaveProperty('relatedLink')
    expect(webpage).not.toHaveProperty('headline')
    const items = breadcrumbs.itemListElement as JsonLd[]
    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({
      position: 1,
      item: { '@type': 'WebSite', url: SITE + '/' },
    })
    expect(items[1]).toMatchObject({
      position: 2,
      name: 'Lawrence McDaniel - About',
      item: { '@type': 'WebPage', url: SITE + '/about/' },
    })
  })

  it('handles a blog posting with an image and related link', () => {
    const result = gsdGraph(
      'post',
      'Post',
      'Description',
      'https://cdn/x.png',
      'BlogPosting',
      'https://related'
    )
    const [, webpage, breadcrumbs] = graph(result)

    expect(webpage).toMatchObject({
      '@type': 'BlogPosting',
      headline: 'Post',
      image: 'https://cdn/x.png',
      relatedLink: 'https://related',
      description: 'Description',
    })
    expect((breadcrumbs.itemListElement as JsonLd[])[1].item).toMatchObject({
      '@type': 'BlogPosting',
      headline: 'Lawrence McDaniel - Post',
      image: 'https://cdn/x.png',
    })
  })

  it('has only the homepage breadcrumb for the home page', () => {
    const [, webpage, breadcrumbs] = graph(gsdGraph('', 'Home', 'D'))

    expect(webpage.url).toBe(SITE + '/')
    expect(breadcrumbs.itemListElement as JsonLd[]).toHaveLength(1)
  })
})

describe('gsdHowTo', () => {
  it('exports the Open edX how-tos', () => {
    expect(gsdHowToInstallOpenEdx['@type']).toBe('HowTo')
    expect(gsdHowToScaleOpenEdx['@type']).toBe('HowTo')
  })
})

describe('gsdKnowsAbout', () => {
  it('returns [] until there are specialties', () => {
    expect(gsdKnowsAbout(null)).toEqual([])
    expect(gsdKnowsAbout({ isLoading: true, specialties: specialtiesState() })).toEqual(
      []
    )
    expect(gsdKnowsAbout({ isLoading: false })).toEqual([])
    expect(gsdKnowsAbout({ specialties: specialtiesState([]) })).toEqual([])
  })

  it('describes each specialty as a SoftwareApplication', () => {
    const [app] = gsdKnowsAbout({ isLoading: false, specialties: specialtiesState() })

    expect(app).toMatchObject({
      '@type': 'SoftwareApplication',
      applicationCategory: 'Dev',
      operatingSystem: 'Any',
      url: 'https://python.org',
      '@id': 'https://python.org/#software-app-id',
      name: '<b>python</b>',
      thumbnailUrl:
        makePost()._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium
          ?.source_url,
    })
  })
})

describe('gsdLocalBusiness', () => {
  it('describes the business', () => {
    expect(gsdLocalBusinessLawrenceMcDaniel()).toMatchObject({
      '@type': 'LocalBusiness',
      '@id': SITE + '/#business',
    })
  })
})

describe('gsdPersonLawrence', () => {
  it('describes the person and occupation', () => {
    expect(gsdPersonLawrenceMcDaniel).toMatchObject({ '@type': 'Person', '@id': ME })
    expect(hasOccupation['@type']).toBe('Occupation')
  })
})

describe('gsdQualifications', () => {
  it('starts with the degree and adds each certificate', () => {
    const courses = [
      makePost({
        date: '2023-05-12T02:25:59',
        acf: {
          type: 'certificate',
          institution: 'MIT',
          course_title: 'Data Science',
          course_summary: 'Summary',
          institution_url: 'https://web.mit.edu/',
          certificate_url: 'https://cert',
          is_university: 'true',
        },
      }),
      makePost({ acf: { type: 'certificate' } }),
      makePost({ acf: { type: 'course' } }),
      makePost({ acf: undefined }),
    ]

    const [degree, mit, unknown, ...rest] = gsdQualifications(courses)

    expect(degree).toMatchObject({ credentialCategory: 'degree' })
    expect(mit).toMatchObject({
      name: 'Data Science',
      description: 'Summary',
      url: 'https://cert',
      recognizedBy: { '@type': 'CollegeOrUniversity', name: 'MIT' },
      dateCreated: '2023-05-12T02:25:59',
    })
    expect(unknown).toMatchObject({
      name: 'Unknown Course Title',
      recognizedBy: { '@type': 'Organization', name: 'Unknown Institution' },
    })
    expect(rest).toEqual([])
  })
})

describe.each([
  ['gsdServiceConsulting', gsdServiceConsulting, SITE + '/consulting'],
  ['gsdServiceOpenedX', gsdServiceOpenedX, SITE + '/openedx'],
])('%s', (_name, build, url) => {
  it('has no reviews without a list of recommendations', () => {
    for (const recommendations of [null, undefined]) {
      const service = build(recommendations)
      expect(service.url).toBe(url)
      expect(service.serviceOutput.review).toEqual([])
      // 0 / 0: the self review is only added to a list
      expect(service.serviceOutput.aggregateRating.ratingValue).toBeNaN()
    }
  })

  it('adds the self review to an empty list', () => {
    const service = build([])
    expect(service.serviceOutput.review).toHaveLength(1)
    expect(service.serviceOutput.aggregateRating.ratingValue).toBe(4)
  })

  it('reviews each recommendation', () => {
    const service = build([
      {
        link: 'https://a',
        date_gmt: '2020-01-01',
        title: { rendered: '<b>Ann</b>' },
        excerpt: { rendered: '<p>Great</p>' },
      },
      {},
    ])
    const [ann, anonymous] = service.serviceOutput.review

    expect(ann).toMatchObject({
      author: { '@id': 'https://a', name: 'Ann' },
      name: 'Review by Ann',
      reviewBody: 'Great',
      reviewRating: { ratingValue: 5 },
    })
    expect(anonymous.author.name).toBe('Anonymous')
    expect(service.serviceOutput.aggregateRating).toMatchObject({
      ratingValue: 14 / 3,
      reviewCount: 3,
    })
    expect(service.serviceOutput.offers[0].itemOffered.additionalType).toBe(
      'https://www.wikidata.org/wiki/Q96072517'
    )
  })
})

describe('gsdSkills', () => {
  it('describes a skill', () => {
    expect(gsdSkillSchema(specialty('python', []))).toMatchObject({
      '@type': 'DefinedTerm',
      '@id': 'python#skill',
      name: 'python',
      description: 'About python',
      url: 'https://python.org',
    })
    expect(gsdSkillSchema(makePost({ acf: undefined })).url).toBeUndefined()
  })

  it('lists the skills in the store, optionally filtered', () => {
    const options = { wrapper: wrapper({ specialties: specialtiesState() }) }

    expect(renderHook(() => gsdSkillSchemaList(), options).result.current).toHaveLength(2)
    const filtered = renderHook(() => gsdSkillSchemaList('react'), options).result.current
    expect(filtered.map((skill) => skill.name)).toEqual(['react'])
    const none = renderHook(() => gsdSkillSchemaList('react'), {
      wrapper: wrapper({ specialties: specialtiesState([makePost()]) }),
    }).result.current
    expect(none).toEqual([])
  })
})

describe('gsdSoftwareSourceCode', () => {
  it('describes a repository', () => {
    expect(
      gsdSoftwareSourceCode('https://github.com/o/repo/', 'Python', 'About')
    ).toMatchObject({
      '@type': 'SoftwareSourceCode',
      '@id': 'https://github.com/o/repo/#software-source-code',
      name: 'repo',
      programmingLanguage: 'Python',
      description: 'About',
    })
  })

  it('lists the repositories in the store, optionally filtered by skill', () => {
    const repos = [
      makeRepository(),
      makeRepository({
        html_url: 'https://github.com/o/py',
        skills: ['full-stack'],
        languages: [],
      }),
    ]
    const options = {
      wrapper: wrapper({ repositories: { isLoading: false, errMess: null, repos } }),
    }

    const all = renderHook(() => gsdSoftwareRepoList(), options).result.current
    expect(all).toHaveLength(2)
    expect(all[0]).toMatchObject({
      name: 'react-mdr',
      programmingLanguage: 'JavaScript',
      description: 'Matrix digital rain effect for ReactJS react',
    })
    const filtered = renderHook(() => gsdSoftwareRepoList('full-stack'), options).result
      .current
    expect(filtered.map((repo) => repo.name)).toEqual(['py'])
    expect(filtered[0].programmingLanguage).toBeUndefined()
  })
})

describe('gsdVideoObject', () => {
  it('uses today as the default upload date', () => {
    const today = new Date().toISOString().slice(0, 10)

    expect(gsdVideoObject('https://youtu.be/x', 'Name', 'D')).toMatchObject({
      '@type': 'VideoObject',
      contentUrl: 'https://youtu.be/x',
      uploadDate: today + 'T00:00:00-06:00',
    })
    expect(gsdVideoObject('u', 'n', 'd', '2024-01-01').uploadDate).toBe(
      '2024-01-01T00:00:00-06:00'
    )
    expect(gsdVideoObjectList.length).toBeGreaterThan(2)
  })
})
