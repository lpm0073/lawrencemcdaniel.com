/*
    Videos Component.

    This is a Redux-managed React component that renders a table of code samples from
    GitHub Api. It displays repositories with metadata such as
    engagement metrics, last commit date, languages used, and skills.
 */
import React, { useState, type ReactElement } from 'react'
import { useVideos, useSpecialties } from '../../../redux/hooks'
import type { Video as YouTubeVideo } from '../../../types'
import { skillIcon, skillLabel } from '../Component'
import Loading from '../../Loading'

import './styles.css'

/** A video from the site's data, with its skill labels and icons. */
type VideoRow = YouTubeVideo & {
  skillLabels: string[]
  skillIcons: ReactElement[]
}

interface VideoProps {
  video: VideoRow
}

// ---------------------------- Internal Components ------------------------------

const VideoMetadata = ({ video }: VideoProps) => {
  /*
   Top-level component that renders metadata information for the given repository.
   Only shown on medium and larger screens.
   */

  return (
    <React.Fragment>
      <img
        className="img-fluid"
        src={video.thumbnails.standard?.url}
        alt={video.title}
        title={video.title}
        loading="lazy"
      />
    </React.Fragment>
  )
}

const VideoLink = ({ video }: VideoProps) => {
  /*
   Renders a link to the given repository, with a padlock icon if it's private.
   */
  return (
    <React.Fragment>
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        <strong>{video.title}</strong>
      </a>
    </React.Fragment>
  )
}

const VideoDescription = ({ video }: VideoProps) => {
  /*
    Renders the README content snippet for the given repository, or a placeholder if none exists.
    README filtering logic is handled in shared/githubDownloader.js.
   */
  return (
    <React.Fragment>
      <div
        className="align-top text-break"
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <p>{video.description}</p>
      </div>
    </React.Fragment>
  )
}

const Video = ({ video }: VideoProps) => {
  /*
    Top-level component that renders the repository link and description.
   */
  return (
    <article aria-label={video.title}>
      <table className="mb-0">
        <tbody>
          <tr>
            <td>
              <VideoLink video={video} />
            </td>
          </tr>
          <tr>
            <td className="ps-3 pt-3">
              <VideoDescription video={video} />
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

// ------------------------------ Main Component ------------------------------

interface VideosTableProps {
  /** A skill slug from APP_CONFIG.skills. Omit for every video. */
  skill?: string
  maxrows?: number
}

const VideosTable = ({ skill, maxrows = 100 }: VideosTableProps) => {
  /*
   Renders a table of videos and other publications.
   */
  const [currentMaxRows, setCurrentMaxRows] = useState(maxrows)
  const videos = useVideos()
  const specialties = useSpecialties().data

  const unfilteredVideos = [
    ...(skill
      ? videos.data.filter((video) => video.skills.includes(skill))
      : videos.data),
  ]
    .map((video) => {
      let prunedDescription = video.description
      let markerIndex: number
      if (video.description) {
        markerIndex = video.description.indexOf('THIS VIDEO IS NOT SPONSORED')
        if (markerIndex > 0) {
          prunedDescription = video.description.substring(0, markerIndex).trim()
        }
      }

      return {
        ...video,
        description: prunedDescription,
      }
    })
    .map((video) => {
      // If skill is specified, remove the corresponding entry so that it doesn't
      // redundantly appear in the table.
      if (skill) {
        const skillIndex = video.skills.indexOf(skill)
        if (skillIndex !== -1) {
          return {
            ...video,
            skills: video.skills.filter((_, index) => index !== skillIndex),
          }
        }
      }
      return video
    })
    .map((video) => ({
      ...video,
      skillLabels: video.skills.map(skillLabel).filter(Boolean),
      skillIcons: video.skills
        .map((skillCode) => skillIcon(skillCode, specialties))
        .filter(Boolean),
    }))
    .sort((a, b) => {
      // sort by a weighted score that emphasizes engagement via likes and comments
      const weightComment = 10
      const weightLikes = 5
      const scoreA =
        a.viewCount + a.likeCount * weightLikes + a.commentCount * weightComment
      const scoreB =
        b.viewCount + b.likeCount * weightLikes + b.commentCount * weightComment
      return scoreB - scoreA
    })

  const unfilteredCount = unfilteredVideos.length
  const filteredVideos = unfilteredVideos.slice(0, currentMaxRows)

  const handleShowMore = () => {
    setCurrentMaxRows(1000)
  }

  return (
    <section className="table-responsive" aria-label="Videos">
      {videos.isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <table
            className="table table-bordered table-striped table-fixed mt-1 w-100"
            id="videos-table"
          >
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '80%' }}>Video</th>
                <th className="hide-medium" style={{ width: '20%' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((video) => (
                <tr key={video.id}>
                  <td className="align-top">
                    <Video video={video} />
                  </td>
                  <td className="hide-medium p-0 m-0">
                    <VideoMetadata video={video} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {unfilteredCount > currentMaxRows && (
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={handleShowMore}>
                More ({unfilteredCount - currentMaxRows} remaining)
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </section>
  )
}

export default VideosTable
