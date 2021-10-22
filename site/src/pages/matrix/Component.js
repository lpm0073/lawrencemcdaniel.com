import React, { Component } from 'react';

import {Helmet} from "react-helmet";
import Loading from '../../components/Loading';
import MatrixRainingLetters from '../../components/matrixRainingLetters/matrixRainingLetters';

import './styles.css';

class Matrix extends Component {

    componentDidMount() {
        document.body.classList.add('matrixPage');
    }

    componentWillUnmount() {
        document.body.classList.remove('matrixPage');
    }

    render() {

        return(
            <React.Fragment>
            {this.props.isLoading ? (
              <Loading />
            ) : (
              <React.Fragment>
                  <Helmet>
                      <link rel="canonical" href="https://lawrencemcdaniel.com/matrix/" />
                  </Helmet>
                  <div className="matrixPage m-0 p-0">
                      <MatrixRainingLetters key="" custom_class="ml-0 pl-0" />
                  </div>
              </React.Fragment>
              )}
          </React.Fragment>
              );
        }
}


export default Matrix;

