/*
    To do: add modal with title: https://reactstrap.github.io/components/modals/
 */
import React, { Component } from 'react'
import { Modal, ModalHeader } from 'reactstrap'
import PropTypes from 'prop-types'

import { Helmet } from 'react-helmet'
import Loading from '../../components/Loading'
//import MatrixRainingLetters from '../../components/matrixRainingLetters/matrixRainingLetters';
import { MatrixRainingLetters } from 'react-mdr'
import { URL_SITE } from '../../shared/constants'
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
              <link rel="canonical" href={URL_SITE + '/matrix'} />
            </Helmet>
            <div className="matrixPage m-0 p-0">
              {this.state.isMounted ? (
                <React.Fragment>
                  <MatrixRainingLetters key="" custom_class="ml-0 pl-0" />
                  <div>
                    <Modal
                      isOpen={true}
                      modalTransition={{ timeout: 2000 }}
                      backdropTransition={{ timeout: 2000 }}
                      centered={true}
                      fade={true}
                      size="lg"
                    >
                      <ModalHeader>404 Page Not Found</ModalHeader>
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

PageNotFound.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default PageNotFound
