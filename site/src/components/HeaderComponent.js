import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem,
    UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem} from 'reactstrap';
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
                <div className="container">
                <Navbar className="navbar-dark bg-dark" dark expand="md" fixed="top">
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/about'>About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/specialties'>Specialties</NavLink>
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

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>Code</DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem >
                                        <a className="mx-1" href='https://www.sustainableimpactfund.com/' target="_blank" rel="noopener noreferrer">Wordpress Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="mx-1" href='https://clients.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Ecommerce Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="mx-1" href='https://my.roverbyopenstax.org/' target="_blank" rel="noopener noreferrer">Open edX Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="mx-1" href='https://horrors.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">AngularJS Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="mx-1" href='/' rel="noopener noreferrer">ReactJS (This Site)</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="mx-1" href='https://edx.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Pure HTML</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="mx-1" href='https://webdev-class.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Bootstrap</a>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <a className="mx-1" href='https://github.com/lpm0073' target="_blank" rel="noopener noreferrer">Me on Github</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                                <NavLink className="nav-link" to='https://blog.lawrencemcdaniel.com/'>Blog</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                </div>

            </React.Fragment>
        );
    }
}

export default Header;