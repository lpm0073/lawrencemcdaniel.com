import { render, waitFor } from '@testing-library/react'
import { Helmet } from 'react-helmet'
import { describe, expect, it } from 'vitest'

import Head from './Head'
import { basePageTitle } from '../shared/seo/gsdCommon'

describe('Head', () => {
  it("sets the site's default title and meta tags", async () => {
    render(<Head />)

    await waitFor(() => expect(document.title).toBe(basePageTitle))
    const head = Helmet.peek()
    expect(head.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'robots', content: 'index, follow' }),
        expect.objectContaining({ property: 'og:title', content: basePageTitle }),
      ])
    )
    expect(head.linkTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rel: 'canonical',
          href: 'https://lawrencemcdaniel.com/',
        }),
      ])
    )
  })
})
