import { Component } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { getInitialLogos } from '../../shared/getInitialLogos'
import Loading from '../Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import type { SpecialtiesState } from '../../redux/specialties'
import './styles.css'

/** One slide. The locally-stored initial logos have only a url. */
interface CarouselLogo {
  id?: number
  title?: string
  description?: string
  url: string | null
  site?: string
}

interface TechnologyCarouselProps {
  specialties: SpecialtiesState
  /** A skill slug from APP_CONFIG.skills; shows only the specialties tagged with it. Omit for all. */
  skill?: string
  /** Shows the loading spinner instead of the carousel. */
  isLoading?: boolean
}

interface TechnologyCarouselState {
  shuffledLogos: CarouselLogo[]
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
}

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')

const getFilteredLogos = (
  specialties: SpecialtiesState,
  skill: string | undefined
): CarouselLogo[] => {
  if (!Array.isArray(specialties.items)) {
    return []
  }

  let items = [...specialties.items]

  if (skill) {
    items = items.filter((item) =>
      // a WPPost has no 'skill' field (fetchSpecialties() always sets 'skills'), so
      // the old fallback, item.skill === skill, was always false.
      Array.isArray(item.skills) ? item.skills.includes(skill) : false
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

class TechnologyCarousel extends Component<
  TechnologyCarouselProps,
  TechnologyCarouselState
> {
  constructor(props: TechnologyCarouselProps) {
    super(props)
    /* grab a locally-stored set of six logos for initializing the cube sides */
    this.state = {
      shuffledLogos: getInitialLogos().map((url) => ({ url })),
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

  componentDidUpdate(prevProps: TechnologyCarouselProps) {
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
          <section id="specialties-carousel" aria-label="Technology Specialties Carousel">
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={1}
              transitionDuration={3000}
            >
              {shuffledLogos.map((logo, indx) => (
                <article key={indx} aria-label={logo.title}>
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
                        src={logo.url ?? undefined}
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
                </article>
              ))}
            </Carousel>
          </section>
        )}
      </div>
    )
  }
}

export default TechnologyCarousel
