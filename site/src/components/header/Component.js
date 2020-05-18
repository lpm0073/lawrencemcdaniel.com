import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem,
    UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './styles.css';

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
                <div className="">
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
                                <NavLink className="nav-link"  to='/recommendations'>Recommendations</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/contact'>Contact</NavLink>
                            </NavItem>

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>Code</DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem>
                                        <a className="" href='/' rel="noopener noreferrer">ReactJS (This Site)</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="" href='https://horrors.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">AngularJS Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="" href='https://my.roverbyopenstax.org/' target="_blank" rel="noopener noreferrer">Open edX Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="" href='/machine-learning' rel="noopener noreferrer">Machine Learning</a>
                                    </DropdownItem>

                                    <DropdownItem divider />

                                    <DropdownItem >
                                        <a className="" href='https://www.sustainableimpactfund.com/' target="_blank" rel="noopener noreferrer">Wordpress Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="" href='https://clients.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Ecommerce Site</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="" href='https://edx.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Pure HTML</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="" href='https://webdev-class.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Bootstrap</a>
                                    </DropdownItem>

                                    <DropdownItem divider />

                                    <DropdownItem>
                                        <a className="" href='https://github.com/lpm0073' target="_blank" rel="noopener noreferrer">Me on Github</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a className="" href='https://blog.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">My Blog</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                </div>

            </React.Fragment>
        );
    }
}

export default Header;