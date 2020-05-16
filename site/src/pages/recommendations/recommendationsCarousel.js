import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
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
            <div id="specialties-carousel">
              <Carousel responsive={responsive}
                additionalTransfrom={0}
                autoPlay
                autoPlaySpeed={1}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                customTransition="all 1.5s linear"
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
                transitionDuration={3000}
                >
                {this.props.recommendations.items.map((recommendation, indx) => {
                  const rawContent = recommendation.content.rendered;
                  
                  var parser = new DOMParser();
                  var doc = parser.parseFromString(rawContent, "text/html");
                  var title = doc.querySelector(".title").innerHTML;
                  var relationship = doc.querySelector(".relationship").innerHTML;

                  function unescapedString(str) {
                    return {__html: str};
                  }

                  return (
                    <React.Fragment>
                      <div className="col-8 text-left mt-5" key={indx}>
                        <img
                          style={{ "width": "100%"}}
                          src={recommendation._embedded["wp:featuredmedia"][0].source_url}
                          alt={recommendation.slug}
                        />
                      </div>
                      <div>{recommendation.date}</div>
                      <div dangerouslySetInnerHTML={unescapedString(title)} />
                      <div dangerouslySetInnerHTML={unescapedString(relationship)} />
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