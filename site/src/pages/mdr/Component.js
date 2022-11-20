/*
    To do: add modal with title: https://reactstrap.github.io/components/modals/
 */
import React, { Component } from 'react'
import { Modal, ModalHeader } from 'reactstrap'

import { Helmet } from 'react-helmet'
import Loading from '../../components/Loading'
//import MatrixRainingLetters from '../../components/matrixRainingLetters/matrixRainingLetters';
import { MatrixRainingLetters } from 'react-mdr'
import { URL_SITE } from '../../shared/constants'
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
    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Helmet>
              <link rel="canonical" href={URL_SITE + '/react-mdr/'} />
              <meta name="description" content="Matrix digital rain for React" />
              <meta property="og:description" content="Matrix digital rain for React" />
              <meta
                name="keywords"
                content="Lawrence McDaniel, Matrix Digital Rain, NPM, React, ReactJS"
              />
            </Helmet>
            <div className="matrixPage m-0 p-0">
              {this.state.isMounted ? (
                <React.Fragment>
                  <MatrixRainingLetters key="" custom_class="ml-0 pl-0" />
                  <div>
                    <Modal
                      isOpen={this.state.isOpen}
                      modalTransition={{ timeout: 2000 }}
                      backdropTransition={{ timeout: 2000 }}
                      centered={true}
                      fade={true}
                      size="lg"
                    >
                      <ModalHeader>Matrix Digital Rain for React</ModalHeader>
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
                    </Modal>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default MRLPage
