import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Script from 'react-load-script';
import { LinkedIn_apikey } from '../passwords';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class RecommendationsCarousel extends Component {
  state = {
    loading: false,
    data: [],
    headline: []
  };

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
    console.log('LinkedIn created');
  }
   
  handleScriptError() {
    this.setState({ scriptError: true });
    console.log('LinkedIn error');
  }
   
  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
    console.log('LinkedIn loaded');
  }

  componentDidMount() {
    this.setState({ loading: true });

      /*
    fetch("/linkedin_api_proxy/v2/me")
      .then(specialties => specialties.json())
      .then(specialties =>

        this.setState({ data: specialties, loading: false }, () =>
          console.log("data loaded")
        )

      )
      .catch(error => console.log('LinkedIn api error:' + error));
      */
  }
  /* more: 
  
    Script: https://www.npmjs.com/package/react-load-script 
    LinkedIn app: 
      https://www.linkedin.com/developers/apps/22820243/auth
    
    LinkedIn API documentation: https://docs.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api#retrieve-current-members-profile
    
  
  <script type="text/javascript" src="//platform.linkedin.com/in.js">
    api_key:   77u781qdeoltry
    onLoad:    [ONLOAD]
    authorize: true
  </script>

   */
  render() {

    const linkedinAttributes = {
      'api_key': LinkedIn_apikey,
      'authorize': 'true'
    }

    return (
        <div className="container">
          {this.state.loading ? (
            "loading..."
          ) : (

            <div id="specialties-carousel">

              <Script
                url="//platform.linkedin.com/in.js"
                attributes={linkedinAttributes}
                onCreate={this.handleScriptCreate.bind(this)}
                onError={this.handleScriptError.bind(this)}
                onLoad={this.handleScriptLoad.bind(this)}
              />

              <div>
                {this.state.data}
              </div>

            </div>
          )}
        </div>
    );
  }
}


export default RecommendationsCarousel;