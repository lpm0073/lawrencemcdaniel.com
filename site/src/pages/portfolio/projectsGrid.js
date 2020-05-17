import React, { Component } from "react";
import Loading from '../../components/Loading';

class ProjectsGrid extends Component {

  render() {
    return (
        <React.Fragment>
          {this.props.isLoading ? (
            <Loading />
          ) : (
            <div id="portfolio-grid">
              <div className="row my-5 mx-0 py-5 px-0 text-center">
                  {this.props.portfolio.projects.map((portfolio_item, indx) => {
                      const item_url = portfolio_item._embedded['wp:featuredmedia'][0].source_url;
                      const background_url = "url('" + item_url + "')";
                      const item_style = {
                        "background-image": background_url
                      }
                      return (
                        <div className="col-lg-3 col-md-4 col-sm-6 m-0 px-0 py-1" key={indx}>
                            <div className="portfolio-item mx-1 " 
                                style={item_style}>
                            </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            )
          }
        </React.Fragment>
    );
  }
}

export default ProjectsGrid;