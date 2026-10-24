/*
    Articles Component.

    This is a Redux-managed React component that renders a table of code samples from
    GitHub Api. It displays repositories with metadata such as
    engagement metrics, last commit date, languages used, and skills.
 */
import React, { useState, type ReactElement } from 'react'
import { useArticles, useSpecialties } from '../../../redux/hooks'
import type { Article as BlogArticle } from '../../../types'
import { skillIcon, skillLabel } from '../Component'
import Loading from '../../Loading'
import { articleHost, articleTitle } from '../../../shared/articleTitle'

import './styles.css'

/** An article from the site's data, with its skill labels and icons. */
type ArticleRow = BlogArticle & {
  skillLabels: string[]
  skillIcons: ReactElement[]
}

interface ArticleProps {
  article: ArticleRow
}

// ---------------------------- Internal Components ------------------------------

const ArticleMetadata = ({ article }: ArticleProps) => {
  /*
   Top-level component that renders metadata information for the given repository.
   Only shown on medium and larger screens.
   */
  const image = article.yoast_head_json?.og_image?.[0]
  if (!image?.url) {
    // an article without any image gets a tile with its blog's name
    return (
      <div className="article-image article-image-placeholder" aria-hidden="true">
        {articleHost(article)}
      </div>
    )
  }
  return (
    <article>
      <img
        className="img-fluid article-image"
        src={image.url}
        alt={articleTitle(article)}
        title={articleTitle(article)}
        loading="lazy"
        width={image.width || undefined}
        height={image.height || undefined}
      />
    </article>
  )
}

const ArticleLink = ({ article }: ArticleProps) => {
  /*
   Renders a link to the given repository, with a padlock icon if it's private.
   */
  return (
    <React.Fragment>
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        <strong>{articleTitle(article)}</strong>
      </a>
    </React.Fragment>
  )
}

const ArticleDescription = ({ article }: ArticleProps) => {
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
        dangerouslySetInnerHTML={{
          __html: article.excerpt?.rendered || '<em>No description available</em>',
        }}
      />
    </React.Fragment>
  )
}

const Article = ({ article }: ArticleProps) => {
  /*
    Top-level component that renders the repository link and description.
   */
  return (
    <article>
      <table className="mb-0" aria-label={`Article ${article?.title?.rendered}`}>
        <tbody>
          <tr>
            <td>
              <ArticleLink article={article} />
            </td>
          </tr>
          <tr>
            <td className="ps-3 pt-3">
              <ArticleDescription article={article} />
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

// ------------------------------ Main Component ------------------------------

interface ArticlesTableProps {
  /** A skill slug from APP_CONFIG.skills. Omit for every article. */
  skill?: string
  maxrows?: number
}

const ArticlesTable = ({ skill, maxrows = 100 }: ArticlesTableProps) => {
  /*
   Renders a table of blog articles and other publications.
   */
  const [currentMaxRows, setCurrentMaxRows] = useState(maxrows)
  const articles = useArticles()
  const specialties = useSpecialties().data

  const unfilteredArticles = [
    ...(skill
      ? articles.data.filter((article) => article.skills.includes(skill))
      : articles.data),
  ]
    .map((article) => {
      // If skill is specified, remove the corresponding entry so that it doesn't
      // redundantly appear in the table.
      if (skill) {
        const skillIndex = article.skills.indexOf(skill)
        if (skillIndex !== -1) {
          return {
            ...article,
            skills: article.skills.filter((_, index) => index !== skillIndex),
          }
        }
      }
      return article
    })
    .map((article) => ({
      ...article,
      skillLabels: article.skills.map(skillLabel).filter(Boolean),
      skillIcons: article.skills
        .map((skillCode) => skillIcon(skillCode, specialties))
        .filter(Boolean),
    }))
    .sort((a, b) => {
      return (
        new Date(b.modified_gmt ?? '').getTime() -
        new Date(a.modified_gmt ?? '').getTime()
      )
    })

  const unfilteredCount = unfilteredArticles.length
  const filteredArticles = unfilteredArticles.slice(0, currentMaxRows)

  const handleShowMore = () => {
    setCurrentMaxRows(1000)
  }

  return (
    <section className="table-responsive" aria-label="Articles">
      {articles.isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <table
            className="table table-bordered table-striped table-fixed mt-1 w-100"
            id="articles-table"
          >
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '80%' }}>Article</th>
                <th className="hide-medium" style={{ width: '20%' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.link}>
                  <td className="align-top">
                    <Article article={article} />
                  </td>
                  <td className="hide-medium p-0">
                    <ArticleMetadata article={article} />
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

export default ArticlesTable
