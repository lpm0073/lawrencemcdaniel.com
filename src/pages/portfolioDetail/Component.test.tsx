import { screen, waitFor } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { helmetHead, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import type { WPPost } from '../../types'
import PortfolioDetail from './Component'

// The project's description and images are a JSON object in the post's first <p>,
// written in the WordPress editor: with curly quotes, and <br> line breaks between its fields.
const POST = makePost({
  id: 7,
  slug: 'edx-at-scale',
  title: { rendered: 'Open edX &#8211; at Scale' },
  content: {
    rendered:
      '<p>{“description”: “Open edX at scale on Kubernetes.”,<br />' +
      '“images”: [“https://cdn.example/one.jpg”, “https://cdn.example/two.jpg”]}</p>',
  },
})

const OTHER = makePost({
  id: 8,
  slug: 'another-project',
  content: {
    rendered: '<p>{"description": "Another project.", "images": []}</p>',
  },
})

/** The page at /portfolio/<slug>, as Routes renders it, with these portfolio posts. */
function renderProject(slug: string, portfolio: WPPost[] | number = [OTHER, POST]) {
  server.use(...serveSiteData({ portfolio }))
  return renderWithProviders(
    <Routes>
      <Route path="/portfolio/:portfolioId" element={<PortfolioDetail />} />
    </Routes>,
    { route: `/portfolio/${slug}` }
  )
}

describe('PortfolioDetail', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it("shows the description and images of the project in the url's slug", async () => {
    renderProject('edx-at-scale')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'PROJECT Detail' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Open edX at scale on Kubernetes.', { exact: false })
    ).toBeInTheDocument()
    expect(screen.queryByText('Another project.')).not.toBeInTheDocument()
    const sources = screen
      .getAllByRole('img', { name: 'alt text', hidden: true })
      .map((img) => img.getAttribute('src'))
    expect(sources).toEqual(
      expect.arrayContaining([
        'https://cdn.example/one.jpg',
        'https://cdn.example/two.jpg',
      ])
    )

    // its own url, title and description, for search engines and link previews.
    expect(
      screen.getByRole('heading', { level: 2, name: 'Open edX – at Scale' })
    ).toBeInTheDocument()
    const url = APP_CONFIG.urls.site + '/portfolio/edx-at-scale'
    const graph = await waitForCanonical(url)
    expect(metaContent('og:url')).toBe(url)
    expect(metaContent('description')).toBe('Open edX at scale on Kubernetes.')
    expect(metaContent('og:title')).toBe('Lawrence McDaniel - Open edX – at Scale')
    await waitFor(() =>
      expect(helmetHead().title).toBe('Lawrence McDaniel - Open edX – at Scale')
    )
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'WebPage', url, name: 'Open edX – at Scale' }),
      ])
    )
  })

  it('reads the JSON as WordPress writes it: with character references and primes', async () => {
    // WordPress's texturize turns quotes into curly quotes, written as character
    // references, and a quote after a digit into a prime: "Python 3″.
    renderProject('wordpress', [
      makePost({
        slug: 'wordpress',
        content: {
          rendered:
            '<p>{&#8220;description&#8221;:&#8221;Django &amp; Celery.&#8221;,' +
            '&#8221;images&#8221;:[],&#8221;stack&#8221;:[&#8220;Python 3&#8243;]}</p>',
        },
      }),
    ])

    expect(
      await screen.findByText('Django & Celery.', { exact: false })
    ).toBeInTheDocument()
  })

  it('finds another project by its slug', async () => {
    renderProject('another-project')

    expect(
      await screen.findByText('Another project.', { exact: false })
    ).toBeInTheDocument()
    expect(screen.queryByText(/Open edX at scale/)).not.toBeInTheDocument()
  })

  it.each([
    ['invalid JSON', '<p>not JSON</p>'],
    ['no <p>', '<div>nothing here</div>'],
  ])('shows no description or images for a post with %s', async (_, rendered) => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    renderProject('broken', [makePost({ slug: 'broken', content: { rendered } })])

    expect(
      await screen.findByRole('heading', { level: 1, name: 'PROJECT Detail' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
    expect(log).toHaveBeenCalledWith('toJSON() - error:', expect.any(Error))
  })

  it('shows a spinner while the portfolio loads', async () => {
    renderProject('edx-at-scale')

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { level: 1, name: 'PROJECT Detail' })
    ).toBeInTheDocument()
    expect(screen.queryByLabelText('three-dots-loading')).not.toBeInTheDocument()
  })

  it("shows the error if the portfolio doesn't load", async () => {
    renderProject('edx-at-scale', 503)

    expect(
      await screen.findByRole('heading', { level: 4, name: 'Error 503' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument()
  })

  it('shows nothing when there is no project with the slug', async () => {
    const { container } = renderProject('no-such-project')

    // the spinner shows until the portfolio has loaded; then nothing does.
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    await waitFor(() => expect(container).toBeEmptyDOMElement())
  })
})
