/*
    https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
 */
import React, { Component } from 'react';
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage';
import './styles.css';
import Loading from '../Loading';


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

        const featured_logos =  this.props.logos.items.filter((post, indx) => {
            for (var i=0 ; i < post.categories.length ; i++) {
                if (post.categories[i] === 48) {  /* featured technology */
                    return true;
                }
            }
            return false;
        }).map((featuredPost, indx) => {
            return wpGetFeaturedImage(featuredPost, null);
        });

        this.state = {
            logos: logos,
            featured_logos: featured_logos,
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
        this.getSerializedLogo = this.getSerializedLogo.bind(this);
        this.isLogoCollision = this.isLogoCollision.bind(this);
    
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

            this.setBackgroundUrl("left", this.getSerializedLogo(this.state.featured_logos, 0));                
            this.setBackgroundUrl("right", this.getSerializedLogo(this.state.featured_logos, 1));                
            this.setBackgroundUrl("top", this.getSerializedLogo(this.state.featured_logos, 2));
            this.setBackgroundUrl("bottom", this.getSerializedLogo(this.state.featured_logos, 3));                
            this.setBackgroundUrl("front", this.getSerializedLogo(this.state.featured_logos, 4));                
            this.setBackgroundUrl("back", this.getSerializedLogo(this.state.featured_logos, 5));                

            /* kick off an infinite loop of repaint() */
            var myTimeout = setTimeout(function() {
                self.repaint();
            }, 1000);    
        }
        this.setState({timeout: myTimeout});

    }

    componentWillUnmount() {
        /* kill any pending repaint() invocation from componentDidMount(). */
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

        const side = self.getRandomSide();
        const logos = (side === "front") ? self.state.featured_logos: self.state.logos;
        const logo = self.getRandomLogo(logos);
        const elapsed = self.getElapsedTime(side);
        if (side != null && elapsed > 3000) {
            self.setBackgroundUrl(side, logo);
        }
    
        setTimeout(function() {
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
      
    getSerializedLogo(logos, i) {
        if (i < logos.length) {
            return logos[i];
        }
    }
    isLogoCollision(logo) {

        switch (logo) {
            case this.state.cubeTopBackgroundUrl:
            case this.state.cubeBottomBackgroundUrl:
            case this.state.cubeBackBackgroundUrl:
            case this.state.cubeFrontBackgroundUrl:
            case this.state.cubeLeftBackgroundUrl:
            case this.state.cubeRightBackgroundUrl:
                return true;
            default:
                return false;
        }

    }
    getRandomLogo(logos) {
        var logo, i = 0;
        do {
            logo = logos[Math.floor(Math.random() * logos.length)];
            i++;
        } while (this.isLogoCollision(logo) && (i <= logos.length))
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

const CubeSide = (props) => {

    const clsId = "d3-side " + props.side;
    const divId = "cube-" + props.side + "-logo";
    const divStyle = {
        backgroundImage: "url('" + props.url + "')"
      }

    return(
        <React.Fragment >
            <div key={divId}  
                 className={clsId}>
                <div>
                    <div className="logo" 
                        style={divStyle}>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}