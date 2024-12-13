import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'

function RenderProjectItem({ project }) {
  const item_url = wpGetFeaturedImage(project, null)
  const background_url = "url('" + item_url + "')"
  const item_style = {
    backgroundImage: background_url,
  }
  return (
    <Link to={`/portfolio/${project.slug}`}>
      <div className="portfolio-item p-1">
        <div className="portfolio-item-image" style={item_style}></div>
        <div className="portfolio-item-overlay">{project.title.rendered}</div>
      </div>
    </Link>
  )
}
class ProjectsGrid extends Component {
  render() {
    return (
      <div key="projects-grid">
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <div id="portfolio-grid">
            <div className="row my-5 mx-0 py-5 px-0 text-center">
              {this.props.portfolio.projects.map((portfolio_item) => {
                return (
                  <div
                    key={portfolio_item.id}
                    className="col-lg-3 col-md-4 col-sm-6 m-0 p-0 noselect"
                  >
                    <RenderProjectItem project={portfolio_item} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}
RenderProjectItem.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

ProjectsGrid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  portfolio: PropTypes.shape({
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
}

export default ProjectsGrid
