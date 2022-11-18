import React from "react";

const WhartonCertificate = (props) => {
  const thisClassName = props.cls + " col-lg-6 col-md-12 mb-1 pe-1";
  const thisSource = props.src;
  const thisHref = props.href;

  return (
    <React.Fragment>
        <div key={props.idx} className={thisClassName}>
            <a href={thisHref}>
                <img 
                    src={thisSource} 
                    alt="Wharton Analytics Completion Certificate for Lawrence McDaniel" 
                    width="100%"
                />
            </a>
        </div>
    </React.Fragment>
  );
};

export default WhartonCertificate;
