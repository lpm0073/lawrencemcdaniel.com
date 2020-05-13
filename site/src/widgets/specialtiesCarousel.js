import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class SpecialtiesCarousel extends Component {
  state = {
    loading: false,
    data: [],
    headline: []
  };
 
  
  SPECIALTIES =
    [{
      id: 0,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195649/bootstrap.png"
      },
      {
      id: 1,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195645/open-edx.png"
      },
      {
      id: 2,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195650/amazon-web-services.png"
      },
      {
      id: 3,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195643/wordpress-1.png"
      },
      {
      id: 4,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/woocommerce.png"
      },
      {
      id: 5,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/ruby-on-rails.png"
      },
      {
      id: 6,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195650/angularjs.png"
      },
      {
      id: 7,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/ionic.png"
      },
      {
      id: 8,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195649/cordova.png"
      },
      {
      id: 9,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/github.png"
      },
      {
      id: 10,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195649/apache.png"
      },
      {
      id: 11,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195645/php.png"
      },
      {
      id: 12,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/python.png"
      },
      {
      id: 13,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/django.png"
      },
      {
      id: 14,
      image:  "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/excel.png"
      },
      {
      id: 15,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/vba.png"
      },
      {
      id: 16,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/dot-net.png"
      },
      {
      id: 17,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/ios.png"
      },
      {
      id: 18,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195646/objective-c.png"
      },
      {
      id: 19,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195650/android.png"
      },
      {
      id: 20,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195645/postgresql.png"
      },
      {
      id: 21,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195646/mysql.png"
      },
      {
      id: 22,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195646/mssql-server.png"
      },
      {
      id: 23,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/sqlite.png"
      },
      {
      id: 24,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/mongodb.png"
      },
      {
      id: 25,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/hadoop.png"
      },
      {
      id: 26,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195643/xml.png"
      },
      {
      id: 27,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/json.png"
      },
      {
      id: 28,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/git.png"
      },
      {
      id: 29,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195650/ansible.png"
      },

      {
      id: 30,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195649/chef.png"
      },
      {
      id: 31,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195645/puppet.png"
      },
      {
      id: 32,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/jenkins.png"
      },
      {
      id: 33,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/qualcomm-snapdragon.png"
      },
      {
      id: 34,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/d3.png"
      },
      {
      id: 35,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195643/lamp-logo.png"
      },
      {
      id: 36,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/linux.png"
      },
      {
      id: 37,
      image: "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/html5-css-js.png"
      }
    ];   
    
    

  componentDidMount() {
    this.setState({ loading: true });

    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8ee8c21b20d24b37856fc3ab1e22a1e5"
    )
      .then(data => data.json())
      .then(data =>
        /*
        this.setState({ data: data.articles, loading: false }, () =>
          console.log("data loaded")
        )
        */
       this.setState({ data: this.SPECIALTIES, loading: false })

      );
  }

  render() {
    return (
        <div className="container">
          {this.state.loading ? (
            "loading..."
          ) : (
            <div>
              <Carousel responsive={responsive}
                additionalTransfrom={0}
                autoPlay
                autoPlaySpeed={1}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                customTransition="all 1.5s linear"
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
                transitionDuration={3000}
              
                >
                {this.state.data.map((post, indx) => {
                  return (
                    <div className="col-8 text-left mt-5" key={indx}>
                      <img
                        style={{ "width": "100%" }}
                        src={post.image}
                        alt="Alt text"
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


export default SpecialtiesCarousel;