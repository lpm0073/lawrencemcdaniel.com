import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import Loading from '../../components/Loading';
import unescapedString from '../../shared/unescapedString';

import './styles.css';


const PortfolioDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.project != null) {

        function innerHTML(selector) {

            if (selector) {
                return selector.innerHTML;
            }
            return null;
        }

        function getURL(posts) {

            fetch('https://lawrencemcdaniel.com/wp-json/wp/v2/media?include=' + posts)
            .then(async response => {
                const data = await response.json();
    
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                console.log(data);
                return data;
            })
            .catch(error => {
                console.error('error:', error);
            });            
        }

        const rawContent = props.project.content.rendered;
                  
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
                                <br />
                                images:
                                <ul>
                                {images}
                                </ul>
                                <br />
                                links:
                                <ul> 
                                {links}
                                </ul>
                                <br />
                                <div>help me lord.</div>
                                {getURL(gallery)}
                                <div><br /><br /></div>
                            <div className="recommendation-name" dangerouslySetInnerHTML={unescapedString(props.project.content.rendered)} /> 
                        </div>
                    </div>
                    </div>
                </div>              
            </React.Fragment>
        );
    } 
}

export default PortfolioDetail;