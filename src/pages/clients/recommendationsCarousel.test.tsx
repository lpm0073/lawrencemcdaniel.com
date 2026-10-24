import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makeMedia, makePost } from '../../../test/fixtures'
import type { RecommendationsState } from '../../redux/recommendations'
import RecommendationsCarousel from './recommendationsCarousel'

const JANE = makePost({
  id: 10,
  slug: 'jane-doe',
  date: '2019-03-01T12:00:00',
  title: { rendered: 'Jane <em>Doe</em>' },
  content: {
    rendered:
      '<p class="title">CTO at <b>Acme</b></p><p class="relationship">managed Lawrence</p>' +
      '<p class="description">A pleasure to work with.</p>',
  },
  _embedded: {
    'wp:featuredmedia': [
      makeMedia({
        media_details: {
          sizes: {
            thumbnail: {
              width: 150,
              height: 150,
              source_url: 'https://cdn.example/jane.jpg',
            },
          },
        },
      }),
    ],
  },
})

const NO_DETAILS = makePost({
  id: 11,
  slug: 'john-roe',
  title: { rendered: 'John Roe' },
  content: { rendered: '<p>Just a paragraph.</p>' },
  _embedded: {},
})

function recommendations(...items: RecommendationsState['items']): RecommendationsState {
  return { isLoading: false, errMess: null, items }
}

describe('RecommendationsCarousel', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it("shows each recommendation's author, title, date, relationship and text", () => {
    render(<RecommendationsCarousel recommendations={recommendations(JANE)} />)

    expect(
      screen.getByRole('region', { name: 'Recommendations Carousel' })
    ).toBeInTheDocument()
    // the infinite carousel clones its slides, so each one appears more than once.
    const slide = screen.getAllByRole('article', {
      name: 'LinkedIn Recommendation Jane <em>Doe</em>',
      hidden: true,
    })[0]
    expect(within(slide).getByRole('img', { hidden: true })).toHaveAttribute(
      'src',
      'https://cdn.example/jane.jpg'
    )
    expect(within(slide).getByRole('img', { hidden: true })).toHaveAttribute(
      'alt',
      'jane-doe'
    )
    expect(slide).toHaveTextContent('Jane Doe')
    expect(slide).toHaveTextContent('CTO at Acme')
    expect(slide).toHaveTextContent('Mar-2019,')
    expect(slide).toHaveTextContent('managed Lawrence')
    expect(slide).toHaveTextContent('"A pleasure to work with."')
  })

  it('shows a recommendation without a title, relationship or description', () => {
    render(<RecommendationsCarousel recommendations={recommendations(NO_DETAILS)} />)

    const slide = screen.getAllByRole('article', {
      name: 'LinkedIn Recommendation John Roe',
      hidden: true,
    })[0]
    expect(slide).toHaveTextContent('John Roe')
    expect(slide).toHaveTextContent('""')
    expect(within(slide).getByRole('img', { hidden: true })).not.toHaveAttribute('src')
  })

  it('shows a spinner while loading', () => {
    render(
      <RecommendationsCarousel recommendations={recommendations(JANE)} isLoading={true} />
    )

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('article', { hidden: true })).not.toBeInTheDocument()
  })
})
