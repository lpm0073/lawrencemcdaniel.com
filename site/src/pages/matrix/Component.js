import React, { Component } from 'react';

import {Helmet} from "react-helmet";
import Loading from '../../components/Loading';
import MatrixRainingLetters from '../../components/matrixRainingLetters/matrixRainingLetters';
import { siteUrl } from '../../shared/urls';
import './styles.css';

class Matrix extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMounted: false
          };

        }

    componentDidMount() {
        document.body.classList.add('matrixPage');
        console.log("mounted.")
        this.state.isMounted = true;
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
                      <link rel="canonical" href={siteUrl + "/matrix/"} />
                  </Helmet>
                  <h1>this.props.location</h1>
                  <div className="matrixPage m-0 p-0">
                      {this.state.isMounted ? (
                        <MatrixRainingLetters key="" custom_class="ml-0 pl-0" />
                      ) : (
                        <React.Fragment />
                      )}
                  </div>
              </React.Fragment>
              )}
          </React.Fragment>
              );
        }
}


export default Matrix;

