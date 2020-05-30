/*
    https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
 */
import React, { Component } from 'react';
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage';
import './styles.css';
import Loading from '../Loading';

const CubeSide = (props) => {

    const clsId = "d3-side " + props.side;
    const divId = "cube-" + props.side + "-logo";
    const divStyle = {
        backgroundImage: "url('" + props.url + "')"
      }

    return(
        <React.Fragment >
            <div className={clsId}><div>
                <div key={divId} 
                     className="logo" 
                     style={divStyle}>
                </div>
            </div></div>
        </React.Fragment>
    );
}
class LogoCube extends Component {

    constructor(props) {
        super(props);

        /*
            Note: one ugly side effect of the randomness in choosing which side to update, and
            the time at which to update is that, sometimes, the same panel gets chosen very quickly
            which leads to jerky-looking behavior.

            To prevent this we keep track of how long each logo has been on a given cube side.
            the repaint() method will only repaint a side if that side has been in the same state 
            for at least X milliseconds.
         */
        var d = new Date();
        d.setSeconds(d.getSeconds() - 2);

        const logos =  this.props.logos.items.map((post, indx) => {
            return wpGetFeaturedImage(post, null);
        });

        this.state = {
            logos: logos,
            timeout: null,
            cubeTop: d,
            cubeBottom: d,
            cubeLeft: d,
            cubeRight: d,
            cubeFront: d,
            cubeBack: d,

            cubeTopBackgroundUrl: null,
            cubeBottomBackgroundUrl: null,
            cubeLeftBackgroundUrl: null,
            cubeRightBackgroundUrl: null,
            cubeFrontBackgroundUrl: null,
            cubeBackBackgroundUrl: null
          };

        this.resetElapsedTime = this.resetElapsedTime.bind(this);
        this.getElapsedTime = this.getElapsedTime.bind(this);
        this.getBackgroundUrl = this.getBackgroundUrl.bind(this);
        this.setBackgroundUrl = this.setBackgroundUrl.bind(this);
        this.getRandomSide = this.getRandomSide.bind(this);
        this.getRandomLogo = this.getRandomLogo.bind(this);
    
        this.repaint = this.repaint.bind(this);
        }



    componentDidMount() {
        /*
            Note: componentDidMount() gets called a half dozen times bc the Home component
            which instantiates this component itself mounts and unmounts multiple times.

            we therefore delay the first repaint for a while. however
            we also have to keep track of the repaint() threads that we invoke so that 
            we can kill them in cases where the component mounts and then quickly unmounts.
         */
        var self = this;
        if (!this.props.logos.isLoading) {

            this.setBackgroundUrl("top", this.getRandomLogo());                
            this.setBackgroundUrl("bottom", this.getRandomLogo());                
            this.setBackgroundUrl("left", this.getRandomLogo());                
            this.setBackgroundUrl("right", this.getRandomLogo());                
            this.setBackgroundUrl("front", this.getRandomLogo());                
            this.setBackgroundUrl("back", this.getRandomLogo());                

            /*
                kick off an infinite loop of repaint()
             */
            var myTimeout = setTimeout(function() {
                self.repaint();
            }, 1000);    
        }
        this.setState({timeout: myTimeout});

    }

    componentWillUnmount() {
        /*
            kill any pending repaint() invocation from componentDidMount().
         */
        clearTimeout(this.state.timeout);        
    }
    
    render() {

        return(
            <div id="logoprop" className="d3-container">
            {this.props.logos.isLoading ? (
                <Loading />
              ) : (
                <div className="d3-cube">
                    <CubeSide side={"top"} url={this.getBackgroundUrl("top")} />
                    <CubeSide side={"bottom"} url={this.getBackgroundUrl("bottom")} />
                    <CubeSide side={"front"} url={this.getBackgroundUrl("front")} />
                    <CubeSide side={"back"} url={this.getBackgroundUrl("back")} />
                    <CubeSide side={"right"} url={this.getBackgroundUrl("right")} />
                    <CubeSide side={"left"} url={this.getBackgroundUrl("left")} />
                </div>
              )}
            </div>
        );
    }

    repaint() {
        var self = this;
        
        setTimeout(function() {
            const side = self.getRandomSide();
            const logo = self.getRandomLogo();
            const elapsed = self.getElapsedTime(side);
            if (side != null && elapsed > 3000) {
                self.setBackgroundUrl(side, logo);
            }
            self.repaint();
        }, 1000 * Math.random());   
      
    }


    getBackgroundUrl(side) {
        let retval;
        switch(side) {
            case "top": retval = this.state.cubeTopBackgroundUrl; break;
            case "bottom": retval =  this.state.cubeBottomBackgroundUrl; break;
            case "left": retval =  this.state.cubeLeftBackgroundUrl; break;
            case "right": retval =  this.state.cubeRightBackgroundUrl; break;
            case "front": retval =  this.state.cubeFrontBackgroundUrl; break;
            case "back": retval =  this.state.cubeBackBackgroundUrl; break;
        }
        return retval;
    }

    setBackgroundUrl(side, url) {

        let state;
        switch(side) {
            case "top": state = {cubeTopBackgroundUrl: url}; break;
            case "bottom": state = {cubeBottomBackgroundUrl: url}; break;
            case "left": state = {cubeLeftBackgroundUrl: url}; break;
            case "right": state = {cubeRightBackgroundUrl: url}; break;
            case "front": state = {cubeFrontBackgroundUrl: url}; break;
            case "back": state = {cubeBackBackgroundUrl: url}; break;
        }
        this.setState(state, () => {
            this.resetElapsedTime(side);
        });

    }

    resetElapsedTime(side) {
        const d = new Date();
        let state;
        switch(side) {
            case "top": state = {cubeTop: d}; break;
            case "bottom": state = {cubeBottom: d}; break;
            case "left":state = {cubeLeft: d}; break;
            case "right": state = {cubeRight: d}; break;
            case "front": state = {cubeFront: d}; break;
            case "back": state = {cubeBack: d}; break;
        }
        this.setState(state);

    }

    getElapsedTime(side) {
        const d = new Date();
        switch(side) {
            case "top": return d - this.state.cubeTop;
            case "bottom": return d - this.state.cubeBottom;
            case "left": return d - this.state.cubeLeft;
            case "right": return d - this.state.cubeRight;
            case "front": return d - this.state.cubeFront;
            case "back": return d - this.state.cubeBack;
        }
    }
      
    getRandomLogo() {

        /*
            choose a random logo
        */
        const logo = this.state.logos[Math.floor(Math.random() * this.state.logos.length)];

        /* 
          we don't want to see the same logo twice, so if we got a duplicate then
          reshuffle.
         */
        if (logo === this.state.cubeTopBackgroundUrl) {return this.getRandomLogo()}
        if (logo === this.state.cubeBottomBackgroundUrl) {return this.getRandomLogo()}
        if (logo === this.state.cubeBackBackgroundUrl) {return this.getRandomLogo()}
        if (logo === this.state.cubeFrontBackgroundUrl) {return this.getRandomLogo()}
        if (logo === this.state.cubeLeftBackgroundUrl) {return this.getRandomLogo()}
        if (logo === this.state.cubeRightBackgroundUrl) {return this.getRandomLogo()}

        return logo;
    }

    
    getRandomSide() {

        const side = Math.floor(Math.random() * 6);
        switch(side) {
            case 0: return "top";
            case 1: return "bottom";
            case 2: return "left";
            case 3: return "right";
            case 4: return "front";
            case 5: return "back";
        }
    
    }
    
}

export default LogoCube;
