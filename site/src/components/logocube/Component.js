/*
    Renders a spinning cube that shows random collections of logos that randomly
    update at random intervals. Logos are provided by a REST api that is 
    managed by Redux: 
    https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&per_page=100

    The cube, which is pure CSS and HTML, was scaffolded from a D3 example that I liked, created by Noah Veltman. 
    Ironically, the D3 source code itself wasn't useful. I encountered a variety of challenges with using D3.js for this component. 
    Though all of these challenges were solvable, in the end it was most practical to leave the DOM manipulations to ReactJS.
    Noah's original cube: https://bl.ocks.org/veltman/4c989172ac2f820b0b7267c53cb96975 

    The component life cycle is as follows:
    =================================================

    1. Animated cube rendering (1000 ms):
    This is intended to distract the site visitor for a moment while we pre-fetch the first set
    of logo images (for slow internet connections).

    2. Initial logo display (5000 ms):
    Display six "featured" logos (one per cube side) that I most want visitors to see.
    (React, Redux, Angular, Django, AWS, Wordpress)

    3. Update infinitely:
    Randomly show lots of other logos. The longer the site visitor stares at this logo cube
    the better, because it buys time for the image pre-fetcher to download more 
    site content in the background. Don't be impressed however, I stole this idea from nytimes.com


    Some of the challenges, and their solutions:
    =================================================
    A. Lack of impact
    The logo cube is supposed to be a creative way of showcasing my most important
    (self-proclaimed) technology skills to site visitors. Most visitors however,
    will only see the cube for a couple of seconds and then move on to some other page.
    Thus, a random selection of logos works at cross purposes to this design objective since 
    most of the logos pertain to lesser-known supporting technologies.

    solution: I created a 2nd api feed consisting of six "featured" logos.
    I initialize the cube with the featured logos, and then hold these
    logos in place for 5 seconds before initiating the random logo replacements.
    
    B. Disappointing logo shuffle.
    It bothered me that sometimes all six cube sides would display only
    the logos of unimpressive technologies for an extended period of time.
    I found myself staring at the cube anxiously waiting for a "good" 
    logo to appear.

    solution: 
    I reserve one of the six cube sides for exclusively displaying
    one of the six featured logos.

    C. Screen flicker. 
    React mounts/unmounts components multiple times, often for 
    reasons that are external to the component. React also calls render()
    several times during normal component initialization. Both of these are 
    problems for CSS animations because these end up getting killed in mid-animation and
    restarted multiple times (ie screen flicker), which looks terrible.

    solution: I fixed the screen flicker with a few different kinds of timers
    that are intended to delay rendering the cube (and thus initiating the CSS
    animations) until React has had enough time to get the home screen 
    completely setup.

    D. Erratic Logo updates. 
    Logos change at random intervals. However, it looks bad if a logo is replaced too quickly. 

    solution: I added 6 timers to track the elapsed lifetime of each logo,
    and then I only replace a logo if its been visible for a minimum
    length of time.

    E. Orphan Threads.
    Launching the painter() method with a timer delay is tricky
    because it is initiated on a new asynchronous background thread.
    When the component mounts/unmounts very quickly, the threads lives on,
    resulting in several painter() threads co-existing, which causes
    the cube to update multitudes more frequently than I wanted.

    solution: I fixed the threading issue by keeping track of, and explicitly killing 
    all background threads that I create.

    F. Slow loading logos.
    The cube itself is rendered purely in CSS and so always renders smoothly, but it
    depends on a collection of around 75 logo images provided by the
    REST api via Redux. On a slow internet connection you could see each new logo
    downloading on the cube side, which looked terrible. 

    solution: i setup an image pre-fetcher inside of Redux, not just for
    this logo cube but for the hundreds of other images on this site as
    well.

    G. Duplicate logos
    It bothered me that the same logo would sometimes appears on two (or more)
    sides.

    solution: i added some "no collision" logic to prevent the random logo
    selector from choosing any logos that are currently being displayed.

*/
import React, { Component } from 'react';
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage';
import './styles.css';
import Loading from '../Loading';


class LogoCube extends Component {

    constructor(props) {
        super(props);

        var d = new Date();

        /* Logo urls from Redux */
        const logos =  this.props.logos.items.map((post, indx) => {
            /* 
            image list is managed by a Wordpress api and a custom
            plugin that a) web-optimizes images b) uploads images to
            the CDN, and c) creates a collection of alternative 
            image sizes. The rest api therefore returns
            many possible URL's for each URL. wpGetFeaturedImage()
            sifts through the list to choose the best image for our
            particular need.
             */
            return wpGetFeaturedImage(post, null);
        });

        /* I flagged six images in Wordpress that I want displayed
        when the cube first renders. */
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
            /* logo lists */
            logos: logos,
            featured_logos: featured_logos,

            /* the current logo image URL for each of the 6 logos */
            cubeTopBackgroundUrl: null,
            cubeBottomBackgroundUrl: null,
            cubeLeftBackgroundUrl: null,
            cubeRightBackgroundUrl: null,
            cubeFrontBackgroundUrl: null,
            cubeBackBackgroundUrl: null,

            /* delay threads, to prevent the component from re-rendering if we're in mid-animation */
            repaintDelay: null,
            logosDelay: null,
            shouldUpdate: false,

            /* time stamps to track elapsed time of each logo image */
            constructed: d,
            cubeTop: d,
            cubeBottom: d,
            cubeLeft: d,
            cubeRight: d,
            cubeFront: d,
            cubeBack: d

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

            /* this is a general purpose moratorium on React
            updates for the first 500ms of the component's
            life cycle. */
            var myTimeout = setTimeout(function() {
                self.setState({shouldUpdate: true});
            }, 500);    

            /* This is intended to create a small dramatic delay between the initial
            cube-rendering animation and the presentation of the first set of logos. */
            myTimeout = setTimeout(function() {
                self.setBackgroundUrl("left", self.getSerializedLogo(self.state.featured_logos, 0));                
                self.setBackgroundUrl("right", self.getSerializedLogo(self.state.featured_logos, 1));                
                self.setBackgroundUrl("top", self.getSerializedLogo(self.state.featured_logos, 2));
                self.setBackgroundUrl("bottom", self.getSerializedLogo(self.state.featured_logos, 3));                
                self.setBackgroundUrl("front", self.getSerializedLogo(self.state.featured_logos, 4));                
                self.setBackgroundUrl("back", self.getSerializedLogo(self.state.featured_logos, 5));
            }, 500);
            self.setState({logosDelay: myTimeout});

            /* Begin random logo updates after a 5-second initial delay */
            myTimeout = setTimeout(function() {
                self.repaint();
            }, 5000);    
            this.setState({repaintDelay: myTimeout});
    
        }   

    }

    componentWillUnmount() {
        /* kill any pending background threads that were
        invoked in componentDidMount(). */
        clearTimeout(this.state.repaintDelay);
        clearTimeout(this.state.logosDelay);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        /* Potentially veto React's decisions to update the 
        component, calling render() */
        return this.state.shouldUpdate;
    }

    render() {

        return(
            <div key="logo-cube" className="d3-container mt-0">
            {(this.props.logos.isLoading || this.getElapsedTime() < 350) ? (
                <div className="mt-5 pt-5">
                    <Loading />
                </div>
              ) : (
                <div className="d3-cube mt-5">
                    <CubeSide side="top" url={this.getBackgroundUrl("top")} classes="fade-in" />
                    <CubeSide side="bottom" url={this.getBackgroundUrl("bottom")} classes="fade-in" />
                    <CubeSide side="front" url={this.getBackgroundUrl("front")} classes="grow-side"/>
                    <CubeSide side="back" url={this.getBackgroundUrl("back")} classes="grow-side" />
                    <CubeSide side="right" url={this.getBackgroundUrl("right")} classes="grow-side" />
                    <CubeSide side="left" url={this.getBackgroundUrl("left")} classes="grow-side" />
                </div>
              )}
            </div>
        );
    }

    repaint() {
        /* place a random logo on a random side at a random point in time. */
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

    /* ---------------------------------------------------------------
        Hereon, the drudgerous grind of working with a six-sided object.  
     * --------------------------------------------------------------- */
    getBackgroundUrl(side) {
        let retval;
        switch(side) {
            case "top": retval = this.state.cubeTopBackgroundUrl; break;
            case "bottom": retval =  this.state.cubeBottomBackgroundUrl; break;
            case "left": retval =  this.state.cubeLeftBackgroundUrl; break;
            case "right": retval =  this.state.cubeRightBackgroundUrl; break;
            case "front": retval =  this.state.cubeFrontBackgroundUrl; break;
            case "back": retval =  this.state.cubeBackBackgroundUrl; break;
            default: retval = null; break;
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
            default: state = {}; break;
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
            default: state = {}; break;
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
            default: return d - this.state.constructed;
        }
    }
      
    getSerializedLogo(logos, i) {
        /* this handles the hopefully-rare case
        where I might stupidly neglect to have 6 more
        featured logos in the Wordpress api. */
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
            default: return null;
        }
    
    }
    
}

export default LogoCube;

const CubeSide = (props) => {

    const clsId = "d3-side " + props.side + " " + props.classes;
    const divId = "cube-" + props.side + "-logo-div";
    const divStyle = {
        backgroundImage: "url('" + props.url + "')"
      }

    return(
        <React.Fragment >
            <div key={divId}
                 className={clsId}>
                <div>
                    <div key={divId+"-logo"} className="logo" 
                        style={divStyle}>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}