import { Component } from 'react'
import BlankSpace from '../../components/blankSpace/Component'
import Carousel from '../../components/carousel'
import 'react-multi-carousel/lib/styles.css'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import { shuffleArray } from '../../shared/shuffle'
import type { WPPost } from '../../types'
import { paragraphHtml } from '../../shared/htmlFragments'
import { monthYear } from '../../shared/monthYear'

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

interface RecommendationsCarouselProps {
  recommendations: WPPost[]
}

interface RecommendationsCarouselState {
  /** the recommendations, shuffled once mounted; in their own order until then. */
  shuffled: WPPost[] | null
}

/**
 * The recommendations in a random order, shuffled after the first render, so
 * that it matches the page's prerendered html (src/prerender/), and shuffled
 * again only when the recommendations change.
 */
class RecommendationsCarousel extends Component<
  RecommendationsCarouselProps,
  RecommendationsCarouselState
> {
  state: RecommendationsCarouselState = { shuffled: null }

  componentDidMount() {
    this.setState({ shuffled: shuffleArray(this.props.recommendations) })
  }

  componentDidUpdate(prevProps: RecommendationsCarouselProps) {
    if (prevProps.recommendations !== this.props.recommendations) {
      this.setState({ shuffled: shuffleArray(this.props.recommendations) })
    }
  }

  render() {
    const recommendationsList = this.state.shuffled ?? this.props.recommendations

    return (
      <section
        key="recommendations-carousel"
        className="hide-small"
        aria-label="Recommendations Carousel"
      >
        <div id="recommendation-carousel" className="mt-5 ml-4 mr-4 ">
          {/* ssr: render the slides before the carousel has measured itself, so that
              the recommendations are in the page's prerendered html (src/prerender/).
              One slide at every width, so the device type changes nothing. */}
          <Carousel
            ssr
            deviceType="desktop"
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

              const title = paragraphHtml(rawContent, 'title') ?? ''
              const relationship = paragraphHtml(rawContent, 'relationship') ?? ''
              const description = paragraphHtml(rawContent, 'description') ?? ''

              function unescapedString(str: string) {
                return { __html: str }
              }

              return (
                <article
                  className="row m-sm-3"
                  key={indx}
                  aria-label={`LinkedIn Recommendation ${recommendation?.title?.rendered}`}
                >
                  <div className="col-md-5">
                    <div className="row">
                      <div className="col-md-3 ">
                        <img
                          className="recommendation-pic mt-1"
                          src={
                            wpGetFeaturedImage(recommendation, 'thumbnail') ?? undefined
                          }
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
                            {monthYear(recommendation.date)},
                            <BlankSpace />
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
                </article>
              )
            })}
          </Carousel>
        </div>
      </section>
    )
  }
}

export default RecommendationsCarousel
