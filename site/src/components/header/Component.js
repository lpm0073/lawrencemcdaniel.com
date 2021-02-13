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
        <header key="app-header" >
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
                            <NavLink className="nav-link"  to='/clients'>Clients</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className="hide-medium">
                            <DropdownToggle nav caret>Code Samples</DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem>
                                    <a className="" href='https://github.com/lpm0073' target="_blank" rel="noopener noreferrer">Me on Github</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='/openedx' target="_self">Open edX</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='/reactjs' target="_self">ReactJS</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://horrors.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">Angular</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://blog.lawrencemcdaniel.com/comprehensive-django-setup-guide-part-i/' target="_blank" rel="noopener noreferrer">Django</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://api.lawrencemcdaniel.com/' target="_blank" rel="noopener noreferrer">REST api</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='https://blog.lawrencemcdaniel.com/category/aws/' target="_blank" rel="noopener noreferrer">Dev Ops</a>
                                </DropdownItem>
                                <DropdownItem>
                                    <a className="" href='/machine-learning/' target="_self" rel="noopener noreferrer">Machine Learning</a>
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
                            <a className="nav-link" href='https://blog.lawrencemcdaniel.com/' target="_self" rel="noopener noreferrer">Blog</a>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/contact'>Contact</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>

        );
    }
}

export default Header;