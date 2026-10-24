// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { http, HttpResponse } from 'msw'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../../../test/server.ts'
import {
  assertItems,
  fetchChannelVideos,
  fetchIndividualVideos,
  fetchVideo,
  INDIVIDUAL_VIDEOS,
  main,
  URL_EXCLUSIONS,
} from './youtubeFetcher.ts'

// never read the real .env
vi.mock('../dotenv.ts', () => ({ loadEnv: vi.fn() }))

const API = 'https://www.googleapis.com/youtube/v3'

function apiVideo(id: string, statistics: Record<string, string> = {}, tags?: string[]) {
  return {
    id,
    snippet: {
      title: `Title ${id}`,
      description: `Description ${id}`,
      publishedAt: '2026-02-10T02:55:51Z',
      thumbnails: {
        default: {
          url: `https://i.ytimg.com/vi/${id}/default.jpg`,
          width: 120,
          height: 90,
        },
      },
      tags,
    },
    contentDetails: { duration: 'PT10M' },
    statistics,
  }
}

function channelHandlers() {
  return [
    http.get(`${API}/channels`, () =>
      HttpResponse.json({
        items: [{ contentDetails: { relatedPlaylists: { uploads: 'UPLOADS' } } }],
      })
    ),
    http.get(`${API}/playlistItems`, ({ request }) => {
      const page = new URL(request.url).searchParams.get('pageToken')
      return page
        ? HttpResponse.json({ items: [{ snippet: { resourceId: { videoId: 'b' } } }] })
        : HttpResponse.json({
            items: [{ snippet: { resourceId: { videoId: 'a' } } }],
            nextPageToken: 'PAGE2',
          })
    }),
    http.get(`${API}/videos`, ({ request }) => {
      const ids = (new URL(request.url).searchParams.get('id') ?? '').split(',')
      return HttpResponse.json({
        items: ids.map((id) =>
          apiVideo(id, { viewCount: '10', likeCount: '2', commentCount: '1' }, ['t'])
        ),
      })
    }),
  ]
}

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  INDIVIDUAL_VIDEOS.length = 0
  URL_EXCLUSIONS.length = 0
})

describe('assertItems', () => {
  it('accepts an object with an items list and rejects anything else', () => {
    expect(() => assertItems({ items: [] }, 'X')).not.toThrow()
    expect(() => assertItems(null, 'X')).toThrow('X API error: unexpected response')
    expect(() => assertItems('x', 'X')).toThrow()
    expect(() => assertItems({ items: 1 }, 'X')).toThrow()
  })
})

describe('fetchChannelVideos', () => {
  it('pages through the uploads playlist', async () => {
    server.use(...channelHandlers())

    const videos = await fetchChannelVideos()

    expect(videos.map((video) => video.id)).toEqual(['a', 'b'])
    expect(videos[0]).toEqual({
      id: 'a',
      title: 'Title a',
      description: 'Description a',
      publishedAt: '2026-02-10T02:55:51Z',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/a/default.jpg', width: 120, height: 90 },
      },
      tags: ['t'],
      duration: 'PT10M',
      viewCount: 10,
      likeCount: 2,
      commentCount: 1,
      url: 'https://www.youtube.com/watch?v=a',
    })
  })

  it('throws when the channel request fails', async () => {
    server.use(http.get(`${API}/channels`, () => new HttpResponse(null, { status: 403 })))

    await expect(fetchChannelVideos()).rejects.toThrow('Channel API error: 403')
  })

  it('throws when there is no uploads playlist', async () => {
    server.use(http.get(`${API}/channels`, () => HttpResponse.json({ items: [] })))

    await expect(fetchChannelVideos()).rejects.toThrow('Could not find uploads playlist')
  })

  it('throws when the playlist request fails', async () => {
    server.use(
      channelHandlers()[0],
      http.get(`${API}/playlistItems`, () => new HttpResponse(null, { status: 500 }))
    )

    await expect(fetchChannelVideos()).rejects.toThrow('Playlist API error: 500')
  })

  it('throws when the videos request fails', async () => {
    server.use(
      channelHandlers()[0],
      channelHandlers()[1],
      http.get(`${API}/videos`, () => new HttpResponse(null, { status: 500 }))
    )

    await expect(fetchChannelVideos()).rejects.toThrow('Video API error: 500')
  })
})

describe('fetchVideo', () => {
  it('returns one video, with zero counts and no tags as defaults', async () => {
    server.use(
      http.get(`${API}/videos`, () => HttpResponse.json({ items: [apiVideo('z')] }))
    )

    const video = await fetchVideo('z')

    expect(video).toMatchObject({
      id: 'z',
      tags: [],
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
    })
  })

  it('throws when the video is missing or the request fails', async () => {
    server.use(http.get(`${API}/videos`, () => HttpResponse.json({ items: [] })))
    await expect(fetchVideo('z')).rejects.toThrow('Video not found')

    server.use(http.get(`${API}/videos`, () => new HttpResponse(null, { status: 400 })))
    await expect(fetchVideo('z')).rejects.toThrow('Video API error: 400')
  })
})

describe('fetchIndividualVideos', () => {
  it('fetches each listed video', async () => {
    server.use(
      http.get(`${API}/videos`, () => HttpResponse.json({ items: [apiVideo('i')] }))
    )
    INDIVIDUAL_VIDEOS.push('i')

    expect((await fetchIndividualVideos()).map((video) => video.id)).toEqual(['i'])
  })
})

describe('main', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'youtube-fetcher-test-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
    vi.unstubAllEnvs()
  })

  it('writes the videos that are not excluded', async () => {
    vi.stubEnv('YT', 'test-key')
    server.use(...channelHandlers())
    URL_EXCLUSIONS.push('https://www.youtube.com/watch?v=b')
    const outputPath = join(dir, 'youtube.json')

    await main(outputPath)

    const written = JSON.parse(readFileSync(outputPath, 'utf8')) as { id: string }[]
    expect(written.map((video) => video.id)).toEqual(['a'])
    expect(console.log).toHaveBeenCalledWith(
      'YouTube API Key found as environment variable'
    )
  })

  it('exits 1 when there are no videos', async () => {
    vi.stubEnv('YT', '')
    server.use(
      channelHandlers()[0],
      http.get(`${API}/playlistItems`, () => HttpResponse.json({ items: [] })),
      http.get(`${API}/videos`, () => HttpResponse.json({ items: [] }))
    )
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`exit ${code}`)
    })

    await expect(main(join(dir, 'youtube.json'))).rejects.toThrow('exit 1')
  })
})
