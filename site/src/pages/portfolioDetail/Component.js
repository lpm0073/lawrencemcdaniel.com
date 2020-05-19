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

        const rawContent = props.post.content.rendered;
                  
        var parser = new DOMParser();
        var doc = parser.parseFromString(rawContent, "text/html");
        var raw = innerHTML(doc.querySelector("p"));

        // remove curly quotes
        raw = raw.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

        // replace <br> with actual carriage return
        raw = raw.replace(/<br\s*[\/]?>/gi, "\n");

        var my_json = JSON.parse(raw);

        var description = my_json.description;
        var urls = my_json.images;

        return(
            <React.Fragment>
                <div className="project-page">
                    <div className="site-page ">
                        <RenderPageTitle theme="light" icon="fa-briefcase" title="PROJECT" boxed_title="Detail" />
                        <div className="row">
                            <div className="col">
                                {description}

                                <hr />

                                {urls.map((url, indx) => {
                                    return (
                                        <img key={indx} src={url} />
                                    );
                                    })}
                        </div>
                    </div>
                    </div>
                </div>              
            </React.Fragment>
        );
    } 
}

export default PortfolioDetail;