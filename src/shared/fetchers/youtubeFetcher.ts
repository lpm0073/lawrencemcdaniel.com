import { writeFileSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'

import { loadEnv } from '../dotenv.ts'
import { APP_CONFIG } from '../constants.ts'
import type { Video, VideoThumbnail } from '../../types.ts'

/** One item of public/data/youtube.json. skills is added later by the browser. */
type VideoOutput = Omit<Video, 'skills'>

/** The fields this script reads from a YouTube Data API v3 videos item. */
interface YouTubeVideo {
  id: string
  snippet: {
    title: string
    description: string
    publishedAt: string
    thumbnails: Record<string, VideoThumbnail | undefined>
    tags?: string[]
  }
  contentDetails: { duration: string }
  statistics: { viewCount?: string; likeCount?: string; commentCount?: string }
}

interface YouTubeChannelList {
  items: { contentDetails?: { relatedPlaylists?: { uploads?: string } } }[]
}

interface YouTubePlaylistItemList {
  items: { snippet: { resourceId: { videoId: string } } }[]
  nextPageToken?: string
}

interface YouTubeVideoList {
  items: YouTubeVideo[]
}

/** Throws unless the api returned an object with an items list. */
export function assertItems<T extends { items: unknown[] }>(
  data: unknown,
  concept: string
): asserts data is T {
  if (
    typeof data !== 'object' ||
    data === null ||
    !Array.isArray((data as { items?: unknown }).items)
  ) {
    throw new Error(`${concept} API error: unexpected response`)
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const OUTPUT_PATH = join(__dirname, '../../../public/data/youtube.json')

export const URL_EXCLUSIONS: string[] = []
export const INDIVIDUAL_VIDEOS: string[] = []

/**
 * Fetch all published videos from the FullStackWithLawrence YouTube channel
 * @returns {Promise<Array>} Array of video objects with metadata
 */
export async function fetchChannelVideos(): Promise<VideoOutput[]> {
  try {
    // First, get the channel's uploads playlist ID
    const url = new URL(`${APP_CONFIG.apis.youtube.base_url}/channels`)
    url.searchParams.append('part', 'contentDetails')
    url.searchParams.append('id', APP_CONFIG.apis.youtube.channel_id)
    url.searchParams.append('key', String(YOUTUBE_API_KEY))
    const headers = new Headers()
    headers.append('Accept', 'application/json')

    console.log(`Fetching channel uploads playlist from: ${url}`)
    const channelResponse = await fetch(url, { headers })

    if (!channelResponse.ok) {
      throw new Error(`Channel API error: ${channelResponse.status}`)
    }

    const channelData: unknown = await channelResponse.json()
    assertItems<YouTubeChannelList>(channelData, 'Channel')
    const uploadsPlaylistId =
      channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist')
    }

    // Fetch all videos from the uploads playlist
    const videos: VideoOutput[] = []
    let nextPageToken = ''

    do {
      const playlistResponse = await fetch(
        `${APP_CONFIG.apis.youtube.base_url}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}&key=${YOUTUBE_API_KEY}`
      )

      if (!playlistResponse.ok) {
        throw new Error(`Playlist API error: ${playlistResponse.status}`)
      }

      const playlistData: unknown = await playlistResponse.json()
      assertItems<YouTubePlaylistItemList>(playlistData, 'Playlist')

      // Extract video IDs for detailed metadata
      const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId)

      // Get detailed video information
      const videoResponse = await fetch(
        `${
          APP_CONFIG.apis.youtube.base_url
        }/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(
          ','
        )}&key=${YOUTUBE_API_KEY}`
      )

      if (!videoResponse.ok) {
        throw new Error(`Video API error: ${videoResponse.status}`)
      }

      const videoData: unknown = await videoResponse.json()
      assertItems<YouTubeVideoList>(videoData, 'Video')

      // Process and add videos to our collection
      const processedVideos = videoData.items.map((video): VideoOutput => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnails: video.snippet.thumbnails,
        tags: video.snippet.tags || [],
        duration: video.contentDetails.duration,
        viewCount: parseInt(video.statistics.viewCount || '0'),
        likeCount: parseInt(video.statistics.likeCount || '0'),
        commentCount: parseInt(video.statistics.commentCount || '0'),
        url: `https://www.youtube.com/watch?v=${video.id}`,
      }))

      videos.push(...processedVideos)
      nextPageToken = playlistData.nextPageToken || ''
    } while (nextPageToken)

    return videos
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    throw error
  }
}

/**
 * Fetch a single video by ID
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} Video object with metadata
 */
export async function fetchVideo(videoId: string): Promise<VideoOutput> {
  try {
    const response = await fetch(
      `${APP_CONFIG.apis.youtube.base_url}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`Video API error: ${response.status}`)
    }

    const data: unknown = await response.json()
    assertItems<YouTubeVideoList>(data, 'Video')
    const video = data.items[0]

    if (!video) {
      throw new Error('Video not found')
    }

    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      thumbnails: video.snippet.thumbnails,
      tags: video.snippet.tags || [],
      duration: video.contentDetails.duration,
      viewCount: parseInt(video.statistics.viewCount || '0'),
      likeCount: parseInt(video.statistics.likeCount || '0'),
      commentCount: parseInt(video.statistics.commentCount || '0'),
      url: `https://www.youtube.com/watch?v=${video.id}`,
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error)
    throw error
  }
}

// module operations
// ----------------------------------------------------------------------------

/** Set by main() from the YT environment variable. */
let YOUTUBE_API_KEY: string | undefined

export async function fetchIndividualVideos(): Promise<VideoOutput[]> {
  const individualRepos = await Promise.all(
    INDIVIDUAL_VIDEOS.map((video) => fetchVideo(video))
  )
  return individualRepos.filter((video) => video !== null)
}

/** Fetches every video and writes them to outputPath (public/data/youtube.json). */
export async function main(outputPath: string = OUTPUT_PATH): Promise<void> {
  loadEnv()
  if (process.env.YT) {
    console.log('YouTube API Key found as environment variable')
  }
  YOUTUBE_API_KEY = process.env.YT

  const baseVideos = [...(await fetchChannelVideos()), ...(await fetchIndividualVideos())]

  console.log(`Total videos before filtering: ${baseVideos.length}`)
  console.log('URLs being excluded:', URL_EXCLUSIONS)

  const videos = await Promise.all(
    baseVideos
      .filter((video) => !URL_EXCLUSIONS.includes(video.url))
      .map(async (video) => {
        return {
          ...video,
        }
      })
  )

  if (videos.length === 0) {
    console.error('No videos found.')
    process.exit(1)
  }
  console.log(`Found ${videos.length} videos.`)
  writeFileSync(outputPath, JSON.stringify(videos), 'utf8')
  console.log(`Videos written to ${outputPath}`)
}

// Run main() only when Node runs this file directly (node <file>.ts), not when a test imports it.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main()
