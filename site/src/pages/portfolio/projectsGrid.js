import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import {wpGetFeaturedImage} from '../../shared/wpGetFeaturedImage';

class ProjectsGrid extends Component {

  render() {

    function RenderProjectItem({ project }) {
      const item_url = wpGetFeaturedImage(project, null); 
      const background_url = "url('" + item_url + "')";
      const item_style = {
        "backgroundImage": background_url
      }
      return (
        <Link to={`/portfolio/${project.slug}`} >
              <div className="portfolio-item p-1">
                <div className="portfolio-item-image"
                    style={item_style}>
                </div>
                <div className="portfolio-item-overlay" >
                  {project.title.rendered}
                </div>
              </div>
        </Link>
      );

  }
    return (
        <div key="projects-grid">
          {this.props.isLoading ? (
            <Loading />
          ) : (
            <div id="portfolio-grid">
              <div className="row my-5 mx-0 py-5 px-0 text-center">
                  {this.props.portfolio.projects.map((portfolio_item) => {
                    return(
                        <div key={portfolio_item.id} className="col-lg-3 col-md-4 col-sm-6 m-0 p-0 noselect">
                          <RenderProjectItem project={portfolio_item} />
                        </div>
                    );
                  })}
              </div>
            </div>
            )
          }
        </div>
    );
  }
}

export default ProjectsGrid;