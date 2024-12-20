import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Loading from '../../components/Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import { shuffleArray } from '../../shared/shuffle'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

class TechnologyCarousel extends Component {
  render() {
    const itemList = shuffleArray(this.props.specialties.items)
    return (
      <div className="">
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <div id="specialties-carousel">
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              autoPlay
              autoPlaySpeed={1}
              centerMode={false}
              className=""
              containerClass=""
              customTransition="all 1.5s linear"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass="carousel-class"
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
              {itemList.map((specialty, indx) => {
                var item_url = wpGetFeaturedImage(specialty, null)
                const background_url = "url('" + item_url + "')"
                const item_style = {
                  backgroundImage: background_url,
                }

                return (
                  <div className="specialty-item" key={indx} style={item_style}></div>
                )
              })}
            </Carousel>
          </div>
        )}
      </div>
    )
  }
}

TechnologyCarousel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  specialties: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
}

export default TechnologyCarousel
