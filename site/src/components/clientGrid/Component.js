import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import "react-multi-carousel/lib/styles.css";
import Loading from '../Loading';
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
    "backgroundImage": background_url
  };
  const transform = {
    exitTransform: 'scale(0.5) translateY(-50%)'
  };

  return (
        <div className="col-lg-4 col-md-6 col-sm-12" key={props.indx}>
          <div className="client-item my-2 px-0 py-1">
              {!props.isSet ?
                <FadeTransform in transformProps={transform}>
                  <div className="client-image" style={item_style} />
                </FadeTransform>
                :
                <div className="client-image" style={item_style} />
              }
          </div>
        </div>
  );

}
class ClientGrid extends Component {

  componentWillUnmount() {
    this.props.actions.setClientGrid();
  }

  filterLogos(logos, filter = "all") {
    if (filter==="edx") return logos.filter(logo => logo.tags.includes(55));
    return logos;
  }

  render() {
    const itemList=this.filterLogos(this.props.clients.logos, this.props.filter);

    return (
        <div key="client-grid">
          {this.props.isLoading ? (
            <Loading />
          ) : (
            <div id="clients-carousel" className="ml-2 mr-2">
                <div className="row my-2 mx-0 px-0 text-center">
                  {itemList.map((client, indx) => {
                    return(
                      <ClientCard isSet={this.props.clientGrid.isSet} client={client} indx={indx} key={indx} />
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



