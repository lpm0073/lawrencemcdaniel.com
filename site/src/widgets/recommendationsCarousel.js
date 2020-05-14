import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { backendUrl } from '../shared/urls';
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

    fetch(backendUrl + "posts?categories=43&_embed")
      .then(specialties => specialties.json())
      .then(specialties =>

        this.setState({ data: specialties, loading: false }, () =>
          console.log("data loaded")
        )

      );
  }
  /* more: https://www.npmjs.com/package/react-load-script */

  /*

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

              <Carousel responsive={responsive}
                additionalTransfrom={0}
                autoPlay
                autoPlaySpeed={1}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                customTransition="all 0.5s linear"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                transitionDuration={7500}
                >
                {this.state.data.map((specialty, indx) => {
                  return (
                    <div className="col-8 text-left mt-5" key={indx}>
                      <img
                        style={{ "width": "100%"}}
                        src={specialty._embedded["wp:featuredmedia"][0].source_url}
                        alt={specialty.slug}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          )}
        </div>
    );
  }
}


export default RecommendationsCarousel;