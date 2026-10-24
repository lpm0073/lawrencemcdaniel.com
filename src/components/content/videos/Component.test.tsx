import { screen, waitFor, within } from '@testing-library/react'
import { http } from 'msw'
import { describe, expect, it } from 'vitest'

import { makeVideo } from '../../../../test/fixtures'
import { serveSiteData } from '../../../../test/handlers'
import { renderWithProviders } from '../../../../test/render'
import { server } from '../../../../test/server'
import type { Video } from '../../../types'
import VideosTable from './Component'

// a video's skills come from its tags, as the api derives them.
const VIDEOS: Video[] = [
  makeVideo({
    id: 'few-views',
    title: 'Few views',
    url: 'https://www.youtube.com/watch?v=few-views',
    viewCount: 10,
    likeCount: 0,
    commentCount: 0,
    tags: ['full-stack', 'aws'],
    description: 'Django basics. THIS VIDEO IS NOT SPONSORED by anyone.',
  }),
  makeVideo({
    id: 'well-liked',
    title: 'Well liked',
    url: 'https://www.youtube.com/watch?v=well-liked',
    viewCount: 10,
    likeCount: 10,
    commentCount: 1,
    tags: ['django'],
    description: '',
  }),
  makeVideo({
    id: 'react-video',
    title: 'React video',
    viewCount: 1000,
    tags: ['reactjs'],
  }),
]

function renderTable(props: { skill?: string; maxrows?: number } = {}) {
  server.use(...serveSiteData({ videos: VIDEOS }))
  return renderWithProviders(<VideosTable {...props} />)
}

describe('VideosTable', () => {
  it("shows a skill's videos, most engaging first", async () => {
    renderTable({ skill: 'full-stack' })

    const videos = await screen.findAllByRole('article')
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

    expect(await screen.findAllByRole('article')).toHaveLength(2)
    expect(screen.getAllByRole('article')[0]).toHaveAccessibleName('React video')

    await user.click(screen.getByRole('button', { name: 'More (1 remaining)' }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('shows a spinner while the videos load', () => {
    server.use(http.get('*/data/youtube.json', () => new Promise(() => {})))
    renderWithProviders(<VideosTable />)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
  })

  it('shows an empty table when the videos fail to load', async () => {
    server.use(...serveSiteData({ videos: 503 }))
    renderWithProviders(<VideosTable />)

    await waitFor(() =>
      expect(screen.queryByLabelText('three-dots-loading')).not.toBeInTheDocument()
    )
    expect(screen.getByRole('columnheader', { name: 'Video' })).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
