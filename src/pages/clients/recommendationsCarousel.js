import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import BlankSpace from '../../components/blankSpace/Component'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Moment from 'moment'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import { shuffleArray } from '../../shared/shuffle'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
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
}

class RecommendationsCarousel extends Component {
  render() {
    const recommendationsList = shuffleArray(this.props.recommendations.items)

    return (
      <div key="recommendations-carousel" className="hide-small">
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <div id="recommendation-carousel" className="mt-5 ml-4 mr-4 ">
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              arrows
              autoPlay
              autoPlaySpeed={15000}
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
              {recommendationsList.map((recommendation, indx) => {
                const rawContent = recommendation.content.rendered

                var parser = new DOMParser()
                var doc = parser.parseFromString(rawContent, 'text/html')

                var title = doc.querySelector('.title').innerHTML
                var relationship = doc.querySelector('.relationship').innerHTML
                var description = doc.querySelector('.description').innerHTML

                Moment.locale('en')

                function unescapedString(str) {
                  return { __html: str }
                }

                return (
                  <div className="row m-sm-3" key={indx}>
                    <div className="col-md-5">
                      <div className="row">
                        <div className="col-md-3 ">
                          <img
                            className="recommendation-pic mt-1"
                            src={wpGetFeaturedImage(recommendation, 'thumbnail')}
                            alt={recommendation.slug}
                          />
                        </div>
                        <div className="col-md-9">
                          <div
                            className="recommendation-name"
                            dangerouslySetInnerHTML={unescapedString(
                              recommendation.title.rendered
                            )}
                          />
                          <div
                            className="recommendation-title"
                            dangerouslySetInnerHTML={unescapedString(title)}
                          />
                          <div className="">
                            <span className="recommendation-date">
                              {Moment(recommendation.date).format('MMM-YYYY')},<BlankSpace />
                            </span>
                            <span
                              className="recommendation-relationship"
                              dangerouslySetInnerHTML={unescapedString(relationship)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7 text-justify border-white">
                      <div
                        className="recommendation-description"
                        dangerouslySetInnerHTML={unescapedString(
                          '&quot;' + description + '&quot;'
                        )}
                      />
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </div>
        )}
      </div>
    )
  }
}

RecommendationsCarousel.propTypes = {
  recommendations: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default RecommendationsCarousel
