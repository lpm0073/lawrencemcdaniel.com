import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import Loading from '../../components/Loading';
import './styles.css';


const PortfolioDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.project != null) {
        return(

            <React.Fragment>
                <div className="">
                    <div className="site-page ">
                        <RenderPageTitle theme="light" icon="fa-briefcase" title="PROJECT" boxed_title="Detail" />
                    </div>
                    <div className="row">
                        <div className="col">
                            {props.project.content.rendered}
                        </div>
                    </div>
                </div>              
            </React.Fragment>
        );
    
    }    


}

export default PortfolioDetail;