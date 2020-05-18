import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import Loading from '../../components/Loading';
import unescapedString from '../../shared/unescapedString';

import './styles.css';


const PortfolioDetail = (props) => {

    if (props.postLoading) {
        return(
            <div className="">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.postErrMess) {
        return(
            <div className="">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.post != null) {

        function innerHTML(selector) {

            if (selector) {
                return selector.innerHTML;
            }
            return null;
        }

        function ImageList() {

            if (props.imagesLoading) {
                return(
                    <React.Fragment>
                        <Loading />
                    </React.Fragment>
                );
    
            } else if (props.imagesError) {
                return(
                    <React.Fragment>
                        <div>Images error</div>
                    </React.Fragment>
                );

            } else if (props.images != null) {
                return(
                    <React.Fragment>
                        <div>
                        {props.images.images.map((post) => {
                                return(
                                    <div key={post.id} className="">
                                        <img src={post.source_url} alt={post.slug} />                                        
                                    </div>
                                );
                            })}
                        </div>
                    </React.Fragment>
                );
            }
            
        }

        const rawContent = props.post.content.rendered;
                  
        var parser = new DOMParser();
        var doc = parser.parseFromString(rawContent, "text/html");
        
        var description = innerHTML(doc.querySelector(".description"));
        var images = innerHTML(doc.querySelector(".images"));
        var links = innerHTML(doc.querySelector(".links"));
        var gallery = innerHTML(doc.querySelector(".gallery"));

        return(
            <React.Fragment>
                <div className="project-page">
                    <div className="site-page ">
                        <RenderPageTitle theme="light" icon="fa-briefcase" title="PROJECT" boxed_title="Detail" />
                        <div className="row">
                            <div className="col">
                                {description}
                                <ImageList />
                        </div>
                    </div>
                    </div>
                </div>              
            </React.Fragment>
        );
    } 
}

export default PortfolioDetail;