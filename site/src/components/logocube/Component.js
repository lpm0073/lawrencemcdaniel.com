/*
    https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
 */
import React, { Component } from 'react';
import { selectAll, select } from "d3-selection";
import transition from 'd3-transition';
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage';
import './styles.css';

class LogoCube extends Component {

    constructor(props) {
        super(props);

        var d = new Date();
        d.setHours(d.getSeconds() - 2);

        
        this.state = {
            cubeTop: d,
            cubeBottom: d,
            cubeLeft: d,
            cubeRight: d,
            cubeFront: d,
            cubeBack: d
          };

          this.timestampSide = this.timestampSide.bind(this);
          this.timeElapsedSide = this.timeElapsedSide.bind(this);
          this.logos = this.logos.bind(this);
          this.shuffleArray = this.shuffleArray.bind(this);
          this.repaint = this.repaint.bind(this);
        }

    timestampSide(side) {
        var d = new Date();

        switch(side) {
            case "cube-top":
                this.setState({
                    cubeTop: d
                });
                break;
            case "cube-bottom":
                this.setState({
                    cubeBottom: d
                });
                break;
            case "cube-left":
                this.setState({
                    cubeLeft: d
                });
                break;
            case "cube-right":
                this.setState({
                    cubeRight: d
                });
                break;
            case "cube-front":
                this.setState({
                    cubeFront: d
                });
                break;
            case "cube-back":
                this.setState({
                    cubeBack: d
                });
                break;
        }        
    }

    timeElapsedSide(side) {
        var d = new Date();

        switch(side) {
            case "cube-top":
                return d - this.state.cubeTop;
            case "cube-bottom":
                return d - this.state.cubeBottom;
            case "cube-left":
                return d - this.state.cubeLeft;
            case "cube-right":
                return d - this.state.cubeRight;
            case "cube-front":
                return d - this.state.cubeFront;
            case "cube-back":
                return d - this.state.cubeBack;
                                                                      }        
    }

    componentDidMount() {
        
        var self = this;
        if (!this.props.logos.isLoading) {
            setTimeout(function() {
                self.repaint();
            }, 1000);    
        }

    }

    render() {

        return(

            <div id="logoprop" className="d3-container">
                <div className="d3-cube">
                    <div id="cube-top" className="d3-side top"><div>
                        <div className="logo"></div>
                    </div></div>

                    <div id="cube-front" className="d3-side front"><div>
                        <div className="logo"></div>
                    </div></div>

                    <div id="cube-back" className="d3-side back"><div>
                        <div className="logo"></div>
                    </div></div>

                    <div id="cube-right" className="d3-side right">
                        <div>
                        <div className="logo"></div>
                        </div>
                    </div>
                    <div id="cube-left" className="d3-side left">
                        <div>
                        <div className="logo"></div>
                        </div>
                    </div>
                    <div id="cube-bottom" className="d3-side bottom"><div>
                        <div className="logo"></div>
                    </div></div>
                </div>
            </div>

        );
    }

    logos() {
        var self = this;
        return self.props.logos.items;
    }

    shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    repaint() {
        var self = this;
        if (self.props.logos.isLoading || self.props.logos.items.length === 0) {
            return false;
        }

        function random_logo(logos) {
            return logos[Math.floor(Math.random() * logos.length)];
        }
    
        const logos =  this.props.logos.items.map((post, indx) => {
            return wpGetFeaturedImage(post, null);
        });
              
        var idx = Math.floor(Math.random() * selectAll(".logo").size());
        selectAll(".logo")
          .filter(function(d, i) {return i === idx})
          .each(function() {
      
            var side = select(this);
            setTimeout(function() {
               side.transition()
               .duration(500)
               .style("opacity", 0);
               
               if (Math.random() < 0.10) {
                   side.style("background-image", "none");
               } else {
                   side.style("background-image", "url('" + random_logo(logos) + "')");
               }
       
               side.transition()
                   .duration(500)
                   .style("opacity", 1);
   
                self.repaint();
              }, 3000*Math.random());   
      
      
          });
      
    }
      
}

export default LogoCube;
