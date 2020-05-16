import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Moment from 'moment';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class RecommendationsCarousel extends Component {

  render() {
    return (
        <div className="container">
          {this.props.isLoading ? (
            "loading..."
          ) : (
            <div id="recommendation-carousel" className="p-5 m-5">
              <Carousel responsive={responsive}
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={10000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                customTransition="all 1s linear"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                transitionDuration={2000}
                >
                {this.props.recommendations.items.map((recommendation, indx) => {
                  const rawContent = recommendation.content.rendered;
                  
                  var parser = new DOMParser();
                  var doc = parser.parseFromString(rawContent, "text/html");
                  var title = doc.querySelector(".title").innerHTML;
                  var relationship = doc.querySelector(".relationship").innerHTML;
                  var description = doc.querySelector(".description").innerHTML;

                  Moment.locale('en');
                  
                  function unescapedString(str) {
                    return {__html: str};
                  }

                  return (
                    <React.Fragment>
                      <div className="row m-0 p-0" key={indx}>
                        <div className="col-lg-5 m-0 p-0">
                          <div className="row p-0">
                            <div className="col-lg-3 ">
                              <img className="recommendation-pic mt-1" 
                                  src={recommendation._embedded["wp:featuredmedia"][0].source_url}
                                  alt={recommendation.slug}
                              />
                            </div>
                            <div className="col-lg-9">
                              <div className="recommendation-name" >{recommendation.title.rendered}</div>
                              <div className="recommendation-title" dangerouslySetInnerHTML={unescapedString(title)} />
                              <div className="m-0 p-0">
                                <span className="recommendation-date" >{Moment(recommendation.date).format('MMM-YYYY')}, </span>
                                <span className="recommendation-relationship" dangerouslySetInnerHTML={unescapedString(relationship)} />
                              </div>
                            </div>                            
                          </div>
                        </div>
                        <div className="col-lg-7 text-justify m-0 ">
                          <div className="recommendation-description" dangerouslySetInnerHTML={unescapedString(description)} />
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </Carousel>
            </div>
          )}
        </div>
    );
  }
}


export default RecommendationsCarousel;