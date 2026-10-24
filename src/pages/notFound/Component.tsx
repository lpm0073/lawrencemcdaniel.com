/*
    To do: add modal with title
 */
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import { Helmet } from 'react-helmet'
import { MatrixRainingLetters } from 'react-mdr'
import './styles.css'

interface PageNotFoundState {
  isMounted: boolean
}

class PageNotFound extends Component<object, PageNotFoundState> {
  constructor(props: object) {
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
        <React.Fragment>
          <Helmet>
            {/* a page that matches no url: never indexed, and so without a canonical url */}
            <meta name="robots" content="noindex" />
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
      </React.Fragment>
    )
  }
}

export default PageNotFound
