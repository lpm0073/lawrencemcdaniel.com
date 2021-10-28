import React, { Component } from 'react';
import { Offline } from "react-detect-offline";
import { Navbar, Nav, NavbarToggler, Collapse, NavItem,
    UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import './styles.css';

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
          };

          this.toggleNav = this.toggleNav.bind(this);
          this.toggleNavItem = this.toggleNavItem.bind(this);
          this.getWindowDimensions = this.getWindowDimensions.bind(this);
        }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }

    toggleNavItem() {
        // only want this to work on medium devices and smaller
        // for the hamburger menu items.
        //
        // md = Medium ≥768px. Max container width 720px.
        const windowSize = this.getWindowDimensions();
        if (windowSize.width < 768) {
            this.setState({
                isNavOpen: !this.state.isNavOpen
            });
    
        }
    }


    render() {
        return(
        <header key="app-header" >
            <Offline key="header-offline-alert">
                <div className="text-center mb-1 mt-1">
                    <div className="offline-alert"><span className="fa fa-exclamation-triangle"></span> Check your Internet connection.</div>
                </div>
            </Offline>
            <Navbar className="navbar-dark app-navbar" dark expand="md" fixed="top">
                <NavbarToggler onClick={this.toggleNav} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink onClick={this.toggleNavItem} className="nav-link"  to='/'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.toggleNavItem} className="nav-link" to='/about'>About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.toggleNavItem} className="nav-link"  to='/clients'>Clients</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className="hide-medium">
                            <DropdownToggle nav caret className="">Skills</DropdownToggle>
                            <DropdownMenu className="bg-dark">
                                <DropdownItem>
                                    <NavLink className="nav-link p-0 m-0"  to='/openedx'>
                                        <img key="menu-edx-image" className="react-logo" src="/assets/images/edx-logo.png" alt="Open edX logo" />
                                        Open edX
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link p-0 m-0"  to='/reactjs'>
                                        <img key="menu-react-image" className="react-logo" src="/assets/images/react-logo-300x261.png" alt="ReactJS logo" />
                                        ReactJS
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://horrors.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">
                                        <img key="menu-angular-image" className="react-logo" src="/assets/images/angular-logo.png" alt="ReactJS logo" />
                                        Angular
                                    </a>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link p-0 m-0"  to='/machine-learning/'>
                                        Machine Learning
                                    </NavLink>
                                </DropdownItem>


                                <DropdownItem divider className="color-light" />

                                <DropdownItem>
                                    <NavLink className="nav-link p-0 m-0"  to='/specialties'>Competencies</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link p-0 m-0"  to='/skills'>Technologies</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-link p-0 m-0"  to='/education'>Training</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink onClick={this.toggleNavItem} className="nav-link p-0 m-0"  to='/portfolio'>Portfolio</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar className="hide-medium">
                            <DropdownToggle nav caret>Code</DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem>
                                    <a className="" href='https://github.com/lpm0073' target="_blank" rel="noopener noreferrer">Me on Github</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://blog.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">My Blog</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://api.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">REST api</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://blog.lawrencemcdaniel.com/category/aws/' target="_blank" rel="noopener noreferrer">Dev Ops</a>
                                </DropdownItem>
                                <DropdownItem divider />

                                <DropdownItem >
                                    <a className="" href='https://www.freshfrommexico.com/' target="_blank" rel="noopener noreferrer">Wordpress</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://clients.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">E-commerce</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://webdev-class.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Bootstrap</a>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink onClick={this.toggleNavItem} className="nav-link" to='/contact'>Contact</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>

        );
    }
}
