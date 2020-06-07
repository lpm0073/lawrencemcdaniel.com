import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import "react-multi-carousel/lib/styles.css";
import Loading from '../../components/Loading';
import {wpGetFeaturedImage} from '../../shared/wpGetFeaturedImage';
import { FadeTransform } from 'react-animation-components';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = (dispatch) => ({
actions: bindActionCreators(Actions, dispatch)
});


const ClientCard = (props) => {
    
  var item_url = wpGetFeaturedImage(props.client, null);
  const background_url = "url('" + item_url + "')";
  const item_style = {
    "background-image": background_url
  };
  const transform = {
    exitTransform: 'scale(0.5) translateY(-50%)'
  };

  return (
        <div className="col-lg-4 col-md-6 col-sm-12" key={props.indx}>
          <div className="client-item my-2 px-0 py-1">
              <FadeTransform in transformProps={transform}>
                <div className="client-image" style={item_style} />
              </FadeTransform>                      
          </div>
        </div>
  );

}
class ClientGrid extends Component {

  constructor(props) {
    super(props);
    if (this.props.clientGrid.isSet) {
      console.log("Client Grid is set", this.props.clientGrid.state);
    }

    this.state = {
      clientGrid: false
    }
  }

  componentWillUnmount() {
    const state = this.state;
    this.props.actions.setClientGrid({state});
  }

  render() {
    const itemList = this.props.clients.logos;
    return (
        <div key="client-grid">
          {this.props.isLoading ? (
            <Loading />
          ) : (
            <div id="clients-carousel" className="ml-2 mr-2">
                <div className="row my-2 mx-0 px-0 text-center">
                  {itemList.map((client, indx) => {
                    return(
                      <ClientCard client={client} indx={indx} />
                    );
                  })}
                </div>

            </div>
          )}
        </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClientGrid);



