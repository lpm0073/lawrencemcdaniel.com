import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from '../../components/Loading';
import {wpGetFeaturedImage} from '../../shared/wpGetFeaturedImage';


class ClientGrid extends Component {


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
                    var item_url = wpGetFeaturedImage(client, null);
                    const background_url = "url('" + item_url + "')";
                    const item_style = {
                      "background-image": background_url
                    }

                    return (
                        <div className="col-lg-4 col-md-6 col-sm-12" key={indx}>
                          <div className="client-item my-2 px-0 py-1">
                            <div className="client-image" style={item_style} />
                          </div>
                        </div>
                    );
                  })}
                </div>

            </div>
          )}
        </div>
    );
  }
}


export default ClientGrid;

