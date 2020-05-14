import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { backendUrl } from '../shared/urls';

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

class SpecialtiesCarousel extends Component {
  state = {
    loading: false,
    data: [],
    headline: []
  };
 
  componentDidMount() {
    this.setState({ loading: true });

    fetch(backendUrl + "posts?categories=43&_embed")
      .then(specialties => specialties.json())
      .then(specialties =>

        this.setState({ data: specialties, loading: false }, () =>
          console.log("data loaded")
        )

      );
  }

  render() {
    return (
        <div className="container">
          {this.state.loading ? (
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
                {this.state.data.map((specialty, indx) => {
                  return (
                    <div className="col-8 text-left mt-5" key={indx}>
                      <img
                        style={{ "width": "100%"}}
                        src={specialty._embedded["wp:featuredmedia"][0].source_url}
                        alt={specialty.slug}
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


export default SpecialtiesCarousel;