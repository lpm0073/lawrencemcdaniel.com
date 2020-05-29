/*
    https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
 */
import React, { Component } from 'react';
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage';
import './styles.css';

class LogoCube extends Component {
    static propTypes = {
        
    }

    componentDidMount() {
        // D3 Code to create the chart
        const logos = this.shuffleArray(this.props.logos.items);
        /*
        var item_url = wpGetFeaturedImage(specialty, null);
         */

    }

    componentDidUpdate() {
        // D3 Code to update the chart
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

    random_logo() {
        const logos = this.shuffleArray(this.props.logos.items);
        return logos[Math.floor(Math.random() * logos.length)];
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
}

export default LogoCube;
