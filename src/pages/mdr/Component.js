/*
    To do: add modal with title
 */
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { Helmet } from 'react-helmet'
import Loading from '../../components/Loading'
//import MatrixRainingLetters from '../../components/matrixRainingLetters/matrixRainingLetters';
import { MatrixRainingLetters } from 'react-mdr'

import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdVideoObjectList_FSWL } from '../../shared/seo/gsdVideoObject'
import { gsdGraph } from '../../shared/seo/gsdGraph'

import { APP_CONFIG } from '../../shared/constants'
import './styles.css'

class MRLPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMounted: false,
      isOpen: true,
    }
  }

  componentDidMount() {
    document.body.classList.add('matrixPage')
    this.setState({
      isMounted: true,
    })
  }

  componentWillUnmount() {
    document.body.classList.remove('matrixPage')
  }

  render() {
    const slug = 'matrix-digital-rain-for-react'
    const webpageName = 'Matrix Digital Rain Effect for React'
    const webpageDescription = 'Matrix Digital Rain effect for React.'
    const primaryImageUrl = ''
    const pageType = ''
    const relatedLink = ''
    const graphExtraData = [gsdPersonLawrenceMcDaniel, gsdVideoObjectList_FSWL]

    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Helmet>
              <link rel="canonical" href={APP_CONFIG.urls.site + '/react-mdr'} />
              <meta
                name="description"
                content="Lawrence McDaniel - Matrix digital rain for React"
              />
              <script type="application/ld+json">
                {JSON.stringify(
                  gsdGraph(
                    slug,
                    webpageName,
                    webpageDescription,
                    primaryImageUrl,
                    pageType,
                    relatedLink,
                    graphExtraData
                  )
                )}
              </script>
              <meta
                property="og:description"
                content="Lawrence McDaniel - Matrix digital rain for React"
              />
              <meta
                name="keywords"
                content="Lawrence McDaniel, Matrix Digital Rain, NPM, React, ReactJS"
              />
            </Helmet>
            <main className="matrixPage m-0 p-0">
              {this.state.isMounted ? (
                <React.Fragment>
                  <MatrixRainingLetters key="" custom_class="ml-0 pl-0" />
                  <div role="alert">
                    <Modal show={this.state.isOpen} centered size="lg" backdrop="static">
                      <Modal.Header>
                        <Modal.Title>Matrix Digital Rain for React</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>npm i react-mdr</p>
                        <p>
                          <a
                            href="https://www.npmjs.com/package/react-mdr"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://www.npmjs.com/package/react-mdr
                          </a>
                        </p>
                      </Modal.Body>
                    </Modal>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
            </main>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

MRLPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default MRLPage
