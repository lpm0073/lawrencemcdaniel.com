/*
    https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
 */
import React, { Component } from 'react';
import { selectAll, select } from "d3-selection";
import transition from 'd3-transition';
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage';
import './styles.css';

class LogoCube extends Component {


    componentDidMount() {
        
        var self = this;
        if (!this.props.logos.isLoading) {
            setTimeout(function() {
                self.repaint();
            }, 1000);    
        }

    }

    componentDidUpdate() {

    }

    render() {

        return(

            <div id="logoprop" className="d3-container">
                <div className="d3-cube">
                    <div className="d3-side top"><div>
                        <div className="logo"></div>
                    </div></div>

                    <div className="d3-side front"><div>
                        <div className="logo"></div>
                    </div></div>

                    <div className="d3-side back"><div>
                        <div className="logo"></div>
                    </div></div>

                    <div className="d3-side right">
                        <div>
                        <div className="logo"></div>
                        </div>
                    </div>
                    <div className="d3-side left">
                        <div>
                        <div className="logo"></div>
                        </div>
                    </div>
                    <div className="d3-side bottom"><div>
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
