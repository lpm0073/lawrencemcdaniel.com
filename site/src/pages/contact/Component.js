import React, { Component} from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import './styles.css';


class Contact extends Component {

    render() {

        return(
            <React.Fragment>
            <div className="contact-page">
                <div className="site-page ">
                    <RenderPageTitle theme="light" icon="fa-phone" title="LETS" boxed_title="TALK" />
    
                    <div className="row text-center">
                        <div className="col">
                            <address>
                            210 Broadway, Suite 200<br />
                            Cambridge, MA 02139<br />
                            USA
                            </address>
                            <a href="tel:+1 (617) 834-6172">+1 (617) 834-6172</a>                                

                            <div className="contact-social-buttons">
                                <a target="_blank" href="https://mx.linkedin.com/in/lawrencemcdaniel"><i class="fa fa-linkedin-square fa-3x"></i></a>
                                <a target="_blank" href="https://www.facebook.com/lawrence.p.mcdaniel"><i class="fa fa-facebook-square fa-3x"></i></a>
                                <a target="_blank" href="https://plus.google.com/u/0/+LawrenceMcDanielEstler"><i class="fa fa-github-square fa-3x"></i></a>
                            </div>
                            <h4>Drop me a Line at <a href="mailto:lpm0073@gmail.com">lpm0073@gmail.com</a> or Skype me at mcdaniel0073</h4>

                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

        );
    }
}

export default Contact;