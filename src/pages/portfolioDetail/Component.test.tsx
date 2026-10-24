import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import type { ProjectState } from '../../redux/project'
import { APP_CONFIG } from '../../shared/constants'
import PortfolioDetail from './Component'

// The project's description and images are a JSON object in the post's first <p>,
// written in the WordPress editor: with curly quotes, and <br> line breaks between its fields.
const POST = makePost({
  slug: 'edx-at-scale',
  content: {
    rendered:
      '<p>{“description”: “Open edX at scale on Kubernetes.”,<br />' +
      '“images”: [“https://cdn.example/one.jpg”, “https://cdn.example/two.jpg”]}</p>',
  },
})

const IMAGES: ProjectState = { isLoading: false, errMess: null, images: [] }

describe('PortfolioDetail', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it("shows the project's description and images", async () => {
    render(
      <PortfolioDetail
        post={POST}
        postLoading={false}
        postErrMess={null}
        images={IMAGES}
        imagesLoading={false}
        imagesError={null}
      />
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'PROJECT Detail' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Open edX at scale on Kubernetes.', { exact: false })
    ).toBeInTheDocument()
    const sources = screen
      .getAllByRole('img', { name: 'alt text', hidden: true })
      .map((img) => img.getAttribute('src'))
    expect(sources).toEqual(
      expect.arrayContaining([
        'https://cdn.example/one.jpg',
        'https://cdn.example/two.jpg',
      ])
    )

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/portfolio/')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Portfolio')
    expect(graph).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
    )
  })

  it.each([
    ['invalid JSON', '<p>not JSON</p>'],
    ['no <p>', '<div>nothing here</div>'],
  ])('shows no description or images for a post with %s', (_, rendered) => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(
      <PortfolioDetail
        post={makePost({ content: { rendered } })}
        postLoading={false}
        postErrMess={null}
      />
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'PROJECT Detail' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
    expect(log).toHaveBeenCalledWith('toJSON() - error:', expect.any(Error))
  })

  it('shows a spinner while loading', () => {
    render(<PortfolioDetail post={undefined} postLoading={true} postErrMess={null} />)

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
  })

  it('shows the error message', () => {
    render(
      <PortfolioDetail
        post={undefined}
        postLoading={false}
        postErrMess="Error 404: Not Found"
      />
    )

    expect(
      screen.getByRole('heading', { level: 4, name: 'Error 404: Not Found' })
    ).toBeInTheDocument()
  })

  it('shows nothing when there is no such project', () => {
    const { container } = render(
      <PortfolioDetail post={undefined} postLoading={false} postErrMess={null} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
