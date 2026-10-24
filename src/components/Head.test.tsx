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
    // each page names its own canonical url (PageMeta), so there is no default one.
    expect(head.linkTags).toEqual(
      expect.not.arrayContaining([expect.objectContaining({ rel: 'canonical' })])
    )
    expect(head.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'og:image',
          content:
            'https://lawrencemcdaniel.com/assets/images/share/lawrencemcdaniel.jpg',
        }),
        expect.objectContaining({ property: 'og:image:width', content: '1200' }),
      ])
    )
  })
})
