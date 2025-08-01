/*
    Renders a spinning cube that shows random collections of logos that randomly
    update at random intervals. Logos are provided by a REST api that is
    managed by Redux.

    Logos API: https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&per_page=100

    The cube, which is pure CSS and HTML, was scaffolded from a D3 example that I liked, created by Noah Veltman.
    Ironically, the D3 source code itself wasn't useful. I encountered a variety of challenges with using D3.js for this component.
    Though all of these challenges were solvable, in the end it was most practical to leave the DOM manipulations to ReactJS.
    You can review the GitHub commit history of this file to see the early versions of this component implemented with D3.js

    Noah's original cube: https://bl.ocks.org/veltman/4c989172ac2f820b0b7267c53cb96975


    The component life cycle is as follows:
    =================================================

    I. Animated cube rendering (approximately 1,500 ms):
    This is intended to distract the site visitor for a moment while we pre-fetch the first set
    of logo images (for slow internet connections). We initialize the cube w 6 locally-stored
    and highly-optimized logos (one per cube side) that, incidentally, I most want visitors to see.
    (React, Redux, Angular, Django, AWS, Wordpress)

    II. Update infinitely:
    Randomly show lots of other logos. The longer the site visitor stares at this logo cube
    the better, because it buys time for the image pre-fetcher to download more
    site content in the background. Don't be impressed however, I stole this idea from nytimes.com


    Some of the challenges, and their solutions:
    =================================================
    A. Lack of impact
    The logo cube is supposed to be a creative way of showcasing my most important
    (self-proclaimed) technology skills to site visitors. Most visitors however,
    will only see the cube for a couple of seconds and then move on to some other page.
    Thus, a random selection of logos works at cross purposes to this design objective since
    most of the logos pertain to lesser-known supporting technologies.

    solution: I created a 2nd api feed consisting of six "featured" logos.
    I initialize the cube with the featured logos, and then hold these
    logos in place for 5 seconds before initiating the random logo replacements.

    B. Disappointing logo shuffle.
    It bothered me that sometimes all six cube sides would display only
    the logos of unimpressive technologies for an extended period of time.
    I found myself staring at the cube anxiously waiting for a "good"
    logo to appear.

    solution:
    I reserve one of the six cube sides for exclusively displaying
    one of the six featured logos.

    C. Reverse Rotation (aka "Wagon Wheel" Effect)
    I had trouble visually tracking the motion of the original version of the cube's spinning animations.
    The cube would sometimes appear to be spinning left-to-right, and other times right-to-left. In
    the latter cases the cube appeared mal-constructed and disfigured. Here's a technical explanation
    of the nature of this problem: https://en.wikipedia.org/wiki/Wagon-wheel_effect

    solution:
    First, i tinkered with the opacity of the cube sides so that the side that is supposed to be in front is brighter,
    and the reverse side is darker. Secondly, adding the cube rendering helped a lot because the cube begins
    as a 2-dimensional spinning square, which afterwards grows to become a cube. The 2D spinning image is easier for your
    visual cortex to process, and the growth animation provides a way for your mind to bootstrap and retain what's
    happening on-screen.

    D. Screen flicker.
    React mounts/unmounts components multiple times, often for
    reasons that are external to the component. React also calls render()
    several times during normal component initialization. Both of these are
    problems for CSS animations because these end up getting killed in mid-animation and
    restarted multiple times (ie screen flicker), which looks terrible.

    solution: I fixed the screen flicker with a few different kinds of timers
    that are intended to delay rendering the cube (and thus initiating the CSS
    animations) until React has had enough time to get the home screen
    completely setup.

    E. Erratic Logo updates.
    Logos change at random intervals. However, it looks bad if a logo is replaced too quickly.

    solution: I added 6 timers to track the elapsed lifetime of each logo,
    and then I only replace a logo if its been visible for a minimum
    length of time.

    F. Orphan Threads.
    Launching the painter() method with a timer delay is tricky
    because it is initiated on a new asynchronous background thread.
    When the component mounts/unmounts very quickly, the threads lives on,
    resulting in several painter() threads co-existing, which causes
    the cube to update multitudes more frequently than I wanted.

    solution: I fixed the threading issue by keeping track of, and explicitly killing
    all background threads that I create.

    G. Slow loading logos.
    The cube itself is rendered purely in CSS and so always renders smoothly, but it
    depends on a collection of around 75 logo images provided by the
    REST api via Redux. On a slow internet connection you could see each new logo
    downloading on the cube side, which looked terrible.

    solution:
    a.) i setup an image pre-fetcher inside of Redux, not just for
    this logo cube but for the hundreds of other images on this site as
    well.

    b.) i store the first six logos locally so that these are included in the React
    bundles and are delivered to the browser immediately.

    c.) i web-optimized all of the logos to decrease network load.

    d.) i make AWS Cloudfront gzip all of the images, which reduces an additional 30%
    or so of network overhead.

    H. Duplicate logos
    It bothered me that the same logo would sometimes appears on two (or more)
    sides.

    solution: i added some "no collision" logic to prevent the random logo
    selector from choosing any logos that are currently being displayed.

    I. React Insomnia.
    Every time the cube rendered, React would behave as if the site visitor had just
    arrived to the site, even when this was not the case. For example, if a user lands
    on the home page then they would see the glory of the Logo Cube. But if they navigated
    to another page and later returned to the home page then they'd see then entire
    construction of the cube, and the same 6 initialization logos.

    solution: i push the component state to Redux, and disable the initial rendering animations
    if the cube has already been rendered. More: https://medium.com/the-web-tub/managing-your-react-state-with-redux-affab72de4b1

*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../redux/ActionCreators'

import { getInitialLogos } from '../../shared/getInitialLogos'
import './styles.css'

const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
})

const CubeSide = (props) => {
  const clsId = 'd3-side ' + props.side + ' ' + props.classes
  const divId = 'cube-' + props.side + '-logo-div'
  const divStyle = {
    backgroundImage: "url('" + props.url + "')",
  }

  return (
    <React.Fragment>
      <div key={divId} className={clsId}>
        <div>
          <div key={divId + '-logo'} className="logo" style={divStyle}></div>
        </div>
      </div>
    </React.Fragment>
  )
}

class LogoCube extends Component {
  constructor(props) {
    super(props)

    this.getElapsedTime = this.getElapsedTime.bind(this)
    this.getBackgroundUrl = this.getBackgroundUrl.bind(this)
    this.setBackgroundUrl = this.setBackgroundUrl.bind(this)
    this.getRandomSide = this.getRandomSide.bind(this)
    this.getRandomLogo = this.getRandomLogo.bind(this)
    this.getSerializedLogo = this.getSerializedLogo.bind(this)
    this.isLogoCollision = this.isLogoCollision.bind(this)
    this.repaint = this.repaint.bind(this)

    /* check for component state in Redux store */
    if (this.props.logoCube.isSet) {
      this.state = this.props.logoCube.state
    } else {
      const d = new Date().toISOString()

      /* grab a locally-stored set of six logos for initializing the cube sides */
      const initialLogos = getInitialLogos()

      this.state = {
        /* delay threads, to prevent the component from re-rendering if we're in mid-animation */
        repaintDelay: null,

        /* the current logo image URL for each of the 6 logos */
        cubeTopBackgroundUrl: this.getSerializedLogo(initialLogos, 0),
        cubeBottomBackgroundUrl: this.getSerializedLogo(initialLogos, 1),
        cubeLeftBackgroundUrl: this.getSerializedLogo(initialLogos, 2),
        cubeRightBackgroundUrl: this.getSerializedLogo(initialLogos, 3),
        cubeFrontBackgroundUrl: this.getSerializedLogo(initialLogos, 4),
        cubeBackBackgroundUrl: this.getSerializedLogo(initialLogos, 5),

        /* time stamps to track elapsed time of each logo image */
        constructed: d,
        cubeTop: d,
        cubeBottom: d,
        cubeLeft: d,
        cubeRight: d,
        cubeFront: d,
        cubeBack: d,
      }
    }
  }

  componentDidMount() {
    /*  we nest repaint() inside of a timer so that we have a means
            of killing the thread in cases where the component
            quickly unmounts.
        */

    const self = this
    const myTimeout = setTimeout(function () {
      self.repaint()
    }, 100)
    this.setState({
      repaintDelay: myTimeout,
    })
  }

  componentWillUnmount() {
    /* kill any pending background threads that were
        invoked in componentDidMount(). */
    clearTimeout(this.state.repaintDelay)
    clearTimeout(this.state.fetchDelay)

    /* send component state to Redux store */
    const state = this.state
    this.props.actions.setLogoState({ state })
  }

  render() {
    const sideClass = !this.props.logoCube.isSet ? 'grow-side' : ''
    const capClass = !this.props.logoCube.isSet ? 'fade-in' : ''

    return (
      <div key="logo-cube" className="d3-container mt-0">
        <div className="d3-cube mt-5">
          <CubeSide side="top" url={this.getBackgroundUrl('top')} classes={capClass} />
          <CubeSide
            side="bottom"
            url={this.getBackgroundUrl('bottom')}
            classes={capClass}
          />
          <CubeSide
            side="front"
            url={this.getBackgroundUrl('front')}
            classes={sideClass}
          />
          <CubeSide side="back" url={this.getBackgroundUrl('back')} classes={sideClass} />
          <CubeSide
            side="right"
            url={this.getBackgroundUrl('right')}
            classes={sideClass}
          />
          <CubeSide side="left" url={this.getBackgroundUrl('left')} classes={sideClass} />
        </div>
      </div>
    )
  }

  repaint() {
    /* place a random logo on a random side at a random point in time. */
    if (!this.props.specialties.isLoading) {
      const side = this.getRandomSide()
      const logos =
        side === 'front'
          ? this.props.specialties.featured_logos
          : this.props.specialties.logos
      const logo = this.getRandomLogo(logos)
      const elapsed = this.getElapsedTime(side)
      if (side != null && elapsed > 4000) {
        this.setBackgroundUrl(side, logo)
      }
    }

    const self = this
    setTimeout(function () {
      self.repaint()
    }, 750 * Math.random())
  }

  /* ---------------------------------------------------------------
        Hereon, the drudgerous grind of working with a six-sided object.
     * --------------------------------------------------------------- */
  getBackgroundUrl(side) {
    let retval
    switch (side) {
      case 'top':
        retval = this.state.cubeTopBackgroundUrl
        break
      case 'bottom':
        retval = this.state.cubeBottomBackgroundUrl
        break
      case 'left':
        retval = this.state.cubeLeftBackgroundUrl
        break
      case 'right':
        retval = this.state.cubeRightBackgroundUrl
        break
      case 'front':
        retval = this.state.cubeFrontBackgroundUrl
        break
      case 'back':
        retval = this.state.cubeBackBackgroundUrl
        break
      default:
        retval = null
        break
    }
    return retval
  }

  setBackgroundUrl(side, url) {
    const d = new Date().toISOString()

    let state
    switch (side) {
      case 'top':
        state = { cubeTopBackgroundUrl: url, cubeTop: d }
        break
      case 'bottom':
        state = { cubeBottomBackgroundUrl: url, cubeBottom: d }
        break
      case 'left':
        state = { cubeLeftBackgroundUrl: url, cubeLeft: d }
        break
      case 'right':
        state = { cubeRightBackgroundUrl: url, cubeRight: d }
        break
      case 'front':
        state = { cubeFrontBackgroundUrl: url, cubeFront: d }
        break
      case 'back':
        state = { cubeBackBackgroundUrl: url, cubeBack: d }
        break
      default:
        state = {}
        break
    }
    this.setState(state)
  }

  getElapsedTime(side) {
    const d = new Date()
    switch (side) {
      case 'top':
        return d - new Date(this.state.cubeTop)
      case 'bottom':
        return d - new Date(this.state.cubeBottom)
      case 'left':
        return d - new Date(this.state.cubeLeft)
      case 'right':
        return d - new Date(this.state.cubeRight)
      case 'front':
        return d - new Date(this.state.cubeFront)
      case 'back':
        return d - new Date(this.state.cubeBack)
      default:
        return d - new Date(this.state.constructed)
    }
  }

  getSerializedLogo(logos, i) {
    /* this handles the hopefully-rare case
        where I might stupidly neglect to have 6 more
        featured logos in the Wordpress api. */

    if (logos === null) return 0

    if (i < logos.length) {
      return logos[i]
    }
  }

  isLogoCollision(logo) {
    switch (logo) {
      case this.state.cubeTopBackgroundUrl:
      case this.state.cubeBottomBackgroundUrl:
      case this.state.cubeBackBackgroundUrl:
      case this.state.cubeFrontBackgroundUrl:
      case this.state.cubeLeftBackgroundUrl:
      case this.state.cubeRightBackgroundUrl:
        return true
      default:
        return false
    }
  }

  getRandomLogo(logos) {
    if (logos === null) return null

    var logo,
      i = 0
    do {
      logo = logos[Math.floor(Math.random() * logos.length)]
      i++
    } while (this.isLogoCollision(logo) && i <= logos.length)
    return logo
  }

  getRandomSide() {
    const side = Math.floor(Math.random() * 6)
    switch (side) {
      case 0:
        return 'top'
      case 1:
        return 'bottom'
      case 2:
        return 'left'
      case 3:
        return 'right'
      case 4:
        return 'front'
      case 5:
        return 'back'
      default:
        return null
    }
  }

} /* LogoCube component */

CubeSide.propTypes = {
  side: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

LogoCube.propTypes = {
  side: PropTypes.string,
  classes: PropTypes.string,
  url: PropTypes.string,
  logoCube: PropTypes.shape({
    isSet: PropTypes.bool,
    state: PropTypes.object,
  }),
  actions: PropTypes.shape({
    setLogoState: PropTypes.func,
  }),
  specialties: PropTypes.shape({
    isLoading: PropTypes.bool,
    featured_logos: PropTypes.array,
    logos: PropTypes.array,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoCube)
