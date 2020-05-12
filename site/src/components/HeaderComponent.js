import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
          };

          this.toggleNav = this.toggleNav.bind(this);
        }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md" fixed="top">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/about'>About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/specialities'>Specialities</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/portfolio'>Portfolio</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/skills'>Skills</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/education'>Education</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/testimonials'>Testimonials</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/contact'>Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/code'>Code</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/blog'>Blog</NavLink>
                            </NavItem>

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

            </React.Fragment>
        );
    }
}

export default Header;