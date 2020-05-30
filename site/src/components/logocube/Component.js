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
        // D3 Code to create the chart
        if (this.props.logos.items.length > 0) {
            this.repaint();
        }

    }

    componentDidUpdate() {
        // D3 Code to update the chart

        if (this.props.logos.items.length > 0) {
            this.repaint();
        }
    }

    render() {

        return(

            <div className="d3-container">
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

    random_logo() {
        var self = this;
        const arr = self.shuffleArray(self.props.logos.items);
        return arr[Math.floor(Math.random() * self.props.logos.items.length)];
    }

    repaint() {
        var self = this;
        console.log("repaint()", self.props.logos.items.length);
        const logos = self.props.logos;

              
        var idx = Math.floor(Math.random() * selectAll(".logo").size());
        selectAll(".logo")
          .filter(function(d, i) {return i === idx})
          .each(function() {
      
            var side = select(this);
            setTimeout(function() {
              side.transition()
                  .duration(500)
                  .style("opacity", 0);
      
              side.style("background-image", "url('" + self.random_logo() + "')");
      
              side.transition()
                  .duration(500)
                  .style("opacity", 1);
      
                  self.repaint();
              }, 3000*Math.random());   
      
      
          });
      
    }
      
}

export default LogoCube;
