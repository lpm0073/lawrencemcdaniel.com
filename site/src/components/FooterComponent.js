import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';

function Footer(props) {

    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <div className="text-center">
                            <span>More about me: </span>
                            <Link className="mx-1" to="/home">Home</Link><span> | </span>
                            <Link className="mx-1" to="/aboutus">About</Link><span> | </span>
                            <Link className="mx-1" to="/menu">Menu</Link><span> | </span>
                            <Link className="mx-1" to="/contactus">Contact</Link>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2015 - 2020. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default Footer;