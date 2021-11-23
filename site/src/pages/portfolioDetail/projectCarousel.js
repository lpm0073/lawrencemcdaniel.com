import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from "../../components/Loading";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 10000, min: 1500 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class ProjectCarousel extends Component {
  render() {
    const itemList = this.props.images;
    return (
      <div>
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <div id="project-carousel" className="mt-5 mb-5">
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              centerMode={true}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {itemList.map((url, indx) => {
                return (
                  <div className="item col-8 text-left mt-5 px-5" key={indx}>
                    <img
                      className="project_image mb-5 p-2"
                      src={url}
                      alt={"alt text"}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectCarousel;
