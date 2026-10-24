import { Component } from 'react'
import { Link } from 'react-router-dom'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import type { WPPost } from '../../types'

interface RenderProjectItemProps {
  project: WPPost
}

function RenderProjectItem({ project }: RenderProjectItemProps) {
  // no size: the 'medium' image, the full image if there is none
  const item_url = wpGetFeaturedImage(project)
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
interface ProjectsGridProps {
  projects: WPPost[]
}

class ProjectsGrid extends Component<ProjectsGridProps> {
  render() {
    return (
      <div key="projects-grid">
        <div id="portfolio-grid">
          <div className="row my-5 mx-0 py-5 px-0 text-center">
            {this.props.projects.map((portfolio_item) => {
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
      </div>
    )
  }
}
export default ProjectsGrid
