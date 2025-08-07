import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { loadEnv } from '../dotenv.js'
import { YOUTUBE_API_BASE_URL, YOUTUBE_CHANNEL_ID } from '../constants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = join(__dirname, '../../../public/data/youtube.json')

const URL_EXCLUSIONS = []
const INDIVIDUAL_VIDEOS = []

/**
 * Fetch all published videos from the FullStackWithLawrence YouTube channel
 * @returns {Promise<Array>} Array of video objects with metadata
 */
export async function fetchChannelVideos() {
  try {
    // First, get the channel's uploads playlist ID
    const url = new URL(`${YOUTUBE_API_BASE_URL}/channels`)
    url.searchParams.append('part', 'contentDetails')
    url.searchParams.append('id', YOUTUBE_CHANNEL_ID)
    url.searchParams.append('key', YOUTUBE_API_KEY)
    const headers = new Headers()
    headers.append('Accept', 'application/json')
    url.headers = headers

    console.log(`Fetching channel uploads playlist from: ${url}`)
    const channelResponse = await fetch(url)

    if (!channelResponse.ok) {
      throw new Error(`Channel API error: ${channelResponse.status}`)
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId =
      channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist')
    }

    // Fetch all videos from the uploads playlist
    const videos = []
    let nextPageToken = ''

    do {
      const playlistResponse = await fetch(
        `${YOUTUBE_API_BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}&key=${YOUTUBE_API_KEY}`
      )

      if (!playlistResponse.ok) {
        throw new Error(`Playlist API error: ${playlistResponse.status}`)
      }

      const playlistData = await playlistResponse.json()

      // Extract video IDs for detailed metadata
      const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId)

      // Get detailed video information
      const videoResponse = await fetch(
        `${YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(
          ','
        )}&key=${YOUTUBE_API_KEY}`
      )

      if (!videoResponse.ok) {
        throw new Error(`Video API error: ${videoResponse.status}`)
      }

      const videoData = await videoResponse.json()

      // Process and add videos to our collection
      const processedVideos = videoData.items.map((video) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnails: video.snippet.thumbnails,
        tags: video.snippet.tags || [],
        duration: video.contentDetails.duration,
        viewCount: parseInt(video.statistics.viewCount || 0),
        likeCount: parseInt(video.statistics.likeCount || 0),
        commentCount: parseInt(video.statistics.commentCount || 0),
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
export async function fetchVideo(videoId) {
  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`Video API error: ${response.status}`)
    }

    const data = await response.json()
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
      viewCount: parseInt(video.statistics.viewCount || 0),
      likeCount: parseInt(video.statistics.likeCount || 0),
      commentCount: parseInt(video.statistics.commentCount || 0),
      url: `https://www.youtube.com/watch?v=${video.id}`,
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error)
    throw error
  }
}

// module operations
// ----------------------------------------------------------------------------

loadEnv()
if (process.env.YT) {
  console.log('YouTube API Key found in .env')
}
const YOUTUBE_API_KEY = process.env.YT

async function fetchIndividualVideos() {
  const individualRepos = await Promise.all(
    INDIVIDUAL_VIDEOS.map((video) => fetchVideo(video))
  )
  return individualRepos.filter((video) => video !== null)
}

const baseVideos = [...(await fetchChannelVideos()), ...(await fetchIndividualVideos())]

console.log(`Total videos before filtering: ${baseVideos.length}`)
console.log('URLs being excluded:', URL_EXCLUSIONS)

const videos = await Promise.all(
  baseVideos
    .filter((video) => !URL_EXCLUSIONS.includes(video.html_url))
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
