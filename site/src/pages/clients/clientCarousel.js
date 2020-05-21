import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from '../../components/Loading';
import {wpGetFeaturedImage} from '../../shared/wpGetFeaturedImage';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 10000, min: 1500 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class ClientCarousel extends Component {

  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    const itemList = this.shuffleArray(this.props.clients.logos);
    return (
        <div >
          {this.props.isLoading ? (
            <Loading />
          ) : (
            <div id="clients-carousel" className="mt-5 mb-5 p-5">
              <Carousel responsive={responsive}
                additionalTransfrom={0}
                autoPlay
                autoPlaySpeed={1}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                customTransition="all .5s ease"
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
                slidesToSlide={4}
                swipeable
                transitionDuration={5000}
                >
                {itemList.map((client, indx) => {
                  var item_url = wpGetFeaturedImage(client, null);
                  const background_url = "url('" + item_url + "')";
                  const item_style = {
                    "background-image": background_url
                  }

                  return (
                      <div className="client-item" key={indx} style={item_style} />
                  );
                })}
              </Carousel>
            </div>
          )}
        </div>
    );
  }
}


export default ClientCarousel;