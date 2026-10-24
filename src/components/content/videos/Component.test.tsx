import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makeVideo } from '../../../../test/fixtures'
import { renderWithProviders } from '../../../../test/render'
import type { Video } from '../../../types'
import VideosTable from './Component'

const VIDEOS: Video[] = [
  makeVideo({
    id: 'few-views',
    title: 'Few views',
    url: 'https://www.youtube.com/watch?v=few-views',
    viewCount: 10,
    likeCount: 0,
    commentCount: 0,
    skills: ['full-stack', 'python'],
    description: 'Django basics. THIS VIDEO IS NOT SPONSORED by anyone.',
  }),
  makeVideo({
    id: 'well-liked',
    title: 'Well liked',
    url: 'https://www.youtube.com/watch?v=well-liked',
    viewCount: 10,
    likeCount: 10,
    commentCount: 1,
    skills: ['full-stack'],
    description: '',
  }),
  makeVideo({
    id: 'react-video',
    title: 'React video',
    viewCount: 1000,
    skills: ['react'],
  }),
]

function renderTable(
  props: { skill?: string; maxrows?: number } = {},
  isLoading = false
) {
  return renderWithProviders(<VideosTable {...props} />, {
    preloadedState: { videos: { isLoading, errMess: null, videos: VIDEOS } },
  })
}

describe('VideosTable', () => {
  it("shows a skill's videos, most engaging first", () => {
    renderTable({ skill: 'full-stack' })

    const videos = screen.getAllByRole('article')
    expect(videos.map((video) => within(video).getByRole('link').textContent)).toEqual([
      'Well liked',
      'Few views',
    ])
    expect(screen.queryByText('React video')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Few views' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=few-views'
    )
    // the sponsorship disclaimer is cut from the description.
    expect(screen.getByText('Django basics.')).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Few views' })[0]).toHaveAttribute(
      'src',
      'https://i.ytimg.com/vi/a6C1iuQ2Iac/sddefault.jpg'
    )
  })

  it('shows every video without a skill, and more on request', async () => {
    const { user } = renderTable({ maxrows: 2 })

    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getAllByRole('article')[0]).toHaveAccessibleName('React video')

    await user.click(screen.getByRole('button', { name: 'More (1 remaining)' }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('shows a spinner while the videos load', () => {
    renderTable({}, true)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
  })
})
