import { render, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { helmetHead, metaContent } from '../../test/pageHead'
import { APP_CONFIG } from '../shared/constants'
import { pageUrl } from '../shared/pageUrl'
import PageMeta from './PageMeta'

describe('PageMeta', () => {
  it("gives the page its canonical url, description and the site's preview image", async () => {
    render(<PageMeta path="/cloud" description="Cloud computing." />)

    const url = 'https://lawrencemcdaniel.com/cloud'
    await waitFor(() =>
      expect(helmetHead().linkTags).toEqual([{ rel: 'canonical', href: url }])
    )
    expect(metaContent('og:url')).toBe(url)
    for (const name of ['description', 'og:description', 'twitter:description']) {
      expect(metaContent(name)).toBe('Cloud computing.')
    }
    const image = APP_CONFIG.static.images.share.default
    expect(metaContent('og:image')).toBe(image.url)
    expect(metaContent('og:image:width')).toBe('1200')
    expect(metaContent('og:image:height')).toBe('630')
    expect(metaContent('og:image:alt')).toBe(image.alt)
    expect(metaContent('twitter:image')).toBe(image.url)
    expect(metaContent('twitter:image:alt')).toBe(image.alt)
  })

  it("leaves the description to the site's default when the page has none", async () => {
    render(<PageMeta path="/" />)

    await waitFor(() => expect(metaContent('og:url')).toBe(APP_CONFIG.urls.site))
    expect(metaContent('description')).toBeUndefined()
    expect(metaContent('og:description')).toBeUndefined()
  })

  it("uses the page's own preview image", async () => {
    const image = APP_CONFIG.static.images.share.smarter
    render(<PageMeta path="/smarter" image={image} />)

    await waitFor(() => expect(metaContent('og:image')).toBe(image.url))
    expect(metaContent('twitter:image:alt')).toBe(image.alt)
  })
})

describe('pageUrl', () => {
  it("is the site's url for the home page, and has no trailing slash", () => {
    expect(pageUrl('/')).toBe('https://lawrencemcdaniel.com')
    expect(pageUrl('/portfolio/x')).toBe('https://lawrencemcdaniel.com/portfolio/x')
  })
})
