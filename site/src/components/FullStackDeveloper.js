import React from 'react';
import {baseTitle} from '../shared/seo/gsdCommon';

const FullStackDeveloper = (props) => {

    const thisClassName = props.cls;

    return ( 
      <React.Fragment>
        <div key={props.idx} className={thisClassName}>
            <p className="jumbotron-subtitle mb-0">{baseTitle}</p>
            <p className="lead mt-0 mb-0 hide-medium">
                <span className="open-edx-consultant-bookends" role="img" aria-label="Close">⇥📙📚 </span>
                <a href="/openedx"><span className="open-edx-consultant">Open edX® Consultant</span></a>
                <span className="open-edx-consultant-bookends" role="img" aria-label="Close"> 📚📘⇤</span>
            </p>
        </div>
      </React.Fragment>
    );
}

export default FullStackDeveloper;