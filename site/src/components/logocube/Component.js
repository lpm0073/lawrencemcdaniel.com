/*
    https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
 */
import React, { Component } from 'react';
import { selectAll, select } from "d3-selection";
import transition from 'd3-transition';
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage';
import './styles.css';
import { nominalTypeHack } from 'prop-types';

class LogoCube extends Component {

    constructor(props) {
        super(props);

        /*
            Note: one ugly side effect of the randomness in choosing which side to update, and
            the time at which to update is that, sometimes, the same panel gets chosen very quickly
            which leads to jerky-looking behavior.

            To prevent this we keep track of how long each logo has been on a given cube side.
            the repaint() method will only repaint a side if that side has in-state for at least 
            X milliseconds.
         */
        var d = new Date();
        d.setSeconds(d.getSeconds() - 2);

        this.state = {
            timeout: null,
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


    componentDidMount() {
        /*
            Note: componentDidMount() gets called a half dozen times bc the Home component
            which instantiates this component itself mounts and unmounts multiple times.

            we therefore have to keep track of any repaint() threads that we invoke so that 
            we can kill them if necessary.
         */
        var self = this;
        if (!this.props.logos.isLoading) {
            var myTimeout = setTimeout(function() {
                self.repaint();
            }, 1000);    
        }
        this.setState({timeout: myTimeout});

    }

    componentWillUnmount() {
        clearTimeout(this.state.timeout);        
    }
    
    render() {

        return(

            <div id="logoprop" className="d3-container">
                <div className="d3-cube">
                    <div className="d3-side top"><div>
                        <div id="cube-top" className="logo"></div>
                    </div></div>
                    <div className="d3-side bottom"><div>
                        <div id="cube-bottom" className="logo"></div>
                    </div></div>
                    <div className="d3-side front"><div>
                        <div id="cube-front" className="logo"></div>
                    </div></div>
                    <div className="d3-side back"><div>
                        <div id="cube-back" className="logo"></div>
                    </div></div>
                    <div className="d3-side right"><div>
                        <div id="cube-right" className="logo"></div>
                    </div></div>
                    <div className="d3-side left"><div>
                        <div id="cube-left" className="logo"></div>
                    </div></div>
                </div>
            </div>

        );
    }

    timestampSide(side) {
        const d = new Date();
        switch(side) {
            case "cube-top":
                this.setState({cubeTop: d});
                break;
            case "cube-bottom":
                this.setState({cubeBottom: d});
                break;
            case "cube-left":
                this.setState({cubeLeft: d});
                break;
            case "cube-right":
                this.setState({cubeRight: d});
                break;
            case "cube-front":
                this.setState({cubeFront: d});
                break;
            case "cube-back":
                this.setState({cubeBack: d});
                break;
        }        
    }

    timeElapsedSide(side) {
        const d = new Date();
        switch(side) {
            case "cube-top": return d - this.state.cubeTop;
            case "cube-bottom": return d - this.state.cubeBottom;
            case "cube-left": return d - this.state.cubeLeft;
            case "cube-right": return d - this.state.cubeRight;
            case "cube-front": return d - this.state.cubeFront;
            case "cube-back": return d - this.state.cubeBack;
                                                                      }        
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
            var sideId = this.id;

            setTimeout(function() {
               side.transition()
               .duration(500)
               .style("opacity", 0);
               
               if (Math.random() < 0.10) {
                   side.style("background-image", "none");
               } else {
                   if (self.timeElapsedSide(sideId) > 5000) {
                        side.style("background-image", "url('" + random_logo(logos) + "')");
                        self.timestampSide(sideId);
                   }
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
