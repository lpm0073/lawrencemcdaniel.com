import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { getInitialLogos } from '../../shared/getInitialLogos'
import Loading from '../Loading'
import './styles.css'

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
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
    const { specialties } = this.props
    if (specialties && specialties.logos && specialties.logos.length > 0) {
      this.setState({
        shuffledLogos: [...specialties.logos].sort(() => Math.random() - 0.5),
      })
    }
  }

  componentDidUpdate(prevProps) {
    const prevLogos = prevProps.specialties && prevProps.specialties.logos
    const currLogos = this.props.specialties && this.props.specialties.logos

    if (
      Array.isArray(currLogos) &&
      currLogos.length > 0 &&
      (prevLogos !== currLogos || JSON.stringify(prevLogos) !== JSON.stringify(currLogos))
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
              {shuffledLogos.map((logoUrl, indx) => (
                <div
                  className="specialty-item"
                  key={indx}
                  style={{ backgroundImage: `url('${logoUrl}')` }}
                ></div>
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
    logos: PropTypes.array,
    featured_logos: PropTypes.array,
  }).isRequired,
}

export default TechnologyCarousel
