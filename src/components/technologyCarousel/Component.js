import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { getInitialLogos } from '../../shared/getInitialLogos'
import Loading from '../Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import './styles.css'

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
}

const stripHtml = (html) => html.replace(/<[^>]+>/g, '')

const getFilteredLogos = (specialties, skill) => {
  if (!Array.isArray(specialties.items)) {
    return []
  }

  let items = [...specialties.items]

  if (skill) {
    items = items.filter((item) =>
      Array.isArray(item.skills) ? item.skills.includes(skill) : item.skill === skill
    )
  }

  const logos = items.map((item) => {
    return {
      id: item.id,
      title: stripHtml(item.title.rendered),
      description:
        stripHtml(item.excerpt.rendered) ||
        stripHtml(item.title.rendered) + ', a technology specialty of mine',
      url: wpGetFeaturedImage(item, 'medium'),
      site: item.acf?.url,
    }
  })

  return logos
}

class TechnologyCarousel extends Component {
  constructor(props) {
    super(props)
    /* grab a locally-stored set of six logos for initializing the cube sides */
    this.state = {
      shuffledLogos: [...getInitialLogos()],
    }
  }

  componentDidMount() {
    const { specialties, skill } = this.props

    if (specialties.isLoading) return

    const logos = getFilteredLogos(specialties, skill)

    this.setState({
      shuffledLogos: [...logos].sort(() => Math.random() - 0.5),
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoading || this.props.specialties === prevProps.specialties) {
      return
    }

    const prevLogos = prevProps.specialties && prevProps.specialties.logos
    const currLogos = getFilteredLogos(this.props.specialties, this.props.skill)

    if (
      Array.isArray(currLogos) &&
      currLogos.length > 0 &&
      JSON.stringify(prevLogos) !== JSON.stringify(currLogos)
    ) {
      this.setState({
        shuffledLogos: [...currLogos].sort(() => Math.random() - 0.5),
      })
    }
  }

  render() {
    const { isLoading } = this.props
    const { shuffledLogos } = this.state

    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div id="specialties-carousel">
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={1}
              transitionDuration={3000}
            >
              {shuffledLogos.map((logo, indx) => (
                <React.Fragment key={indx}>
                  <a
                    href={logo.site}
                    title={logo.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className="specialty-item"
                      style={{ backgroundImage: `url('${logo.url}')` }}
                    >
                      <img
                        src={logo.url}
                        alt={logo.description}
                        title={logo.title}
                        style={{
                          opacity: 0,
                          width: '1px',
                          height: '1px',
                          position: 'absolute',
                          pointerEvents: 'none',
                        }}
                        aria-hidden="false"
                        tabIndex={-1}
                      />
                      <span className="visually-hidden">{logo.description}</span>
                    </div>
                  </a>
                </React.Fragment>
              ))}
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
    isLoading: PropTypes.bool.isRequired,
    logos: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    featured_logos: PropTypes.array.isRequired,
  }).isRequired,
  skill: PropTypes.string.isRequired,
}

export default TechnologyCarousel
