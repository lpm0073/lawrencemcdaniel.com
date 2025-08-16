/*
    To do: add modal with title
 */
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { Helmet } from 'react-helmet'
import Loading from '../../components/Loading'
import { MatrixRainingLetters } from 'react-mdr'
import { APP_CONFIG } from '../../shared/constants'
import './styles.css'

class PageNotFound extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMounted: false,
    }
  }

  componentDidMount() {
    document.body.classList.add('matrixPage')
    console.log('mounted.')
    this.setState({
      isMounted: true,
    })
  }

  componentWillUnmount() {
    document.body.classList.remove('matrixPage')
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Helmet>
              <link rel="canonical" href={APP_CONFIG.urls.site + '/matrix'} />
              <meta name="description" content="Lawrence McDaniel - Page Not Found" />
            </Helmet>
            <main className="matrixPage m-0 p-0" aria-label="404 Page Not Found">
              {this.state.isMounted ? (
                <React.Fragment>
                  <MatrixRainingLetters key="" custom_class="ml-0 pl-0" />
                  <div role="alert">
                    <Modal show={true} centered size="lg" backdrop="static">
                      <Modal.Header>
                        <Modal.Title>404 Page Not Found</Modal.Title>
                      </Modal.Header>
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

PageNotFound.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default PageNotFound
