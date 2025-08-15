import React, { Component } from 'react'
import { Offline } from 'react-detect-offline'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { APP_CONFIG } from '../../shared/constants'

import './styles.css'

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    }

    this.toggleNav = this.toggleNav.bind(this)
    this.toggleNavItem = this.toggleNavItem.bind(this)
    this.getWindowDimensions = this.getWindowDimensions.bind(this)
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    })
  }

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  toggleNavItem() {
    // only want this to work on medium devices and smaller
    // for the hamburger menu items.
    //
    // md = Medium ≥768px. Max container width 720px.
    const windowSize = this.getWindowDimensions()
    if (windowSize.width < 768) {
      this.setState({
        isNavOpen: !this.state.isNavOpen,
      })
    }
  }

  render() {
    return (
      <header key="app-header">
        <Offline key="header-offline-alert">
          <div className="text-center mb-1 mt-1">
            <div className="offline-alert">
              <span className="fa fa-exclamation-triangle"></span> Check your Internet
              connection.
            </div>
          </div>
        </Offline>
        <nav aria-label="Main Navigation">
          <Navbar
            className="navbar-dark app-navbar"
            variant="dark"
            expand="md"
            fixed="top"
            expanded={this.state.isNavOpen}
            onToggle={this.toggleNav}
          >
            <Container fluid>
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/" onClick={this.toggleNavItem}>
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/about"
                    onClick={this.toggleNavItem}
                    className="hide-medium"
                  >
                    About
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/education"
                    onClick={this.toggleNavItem}
                    className="hide-medium"
                  >
                    Education
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/consulting"
                    onClick={this.toggleNavItem}
                    className="hide-medium"
                  >
                    Consulting
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/clients"
                    onClick={this.toggleNavItem}
                    className="hide-medium"
                  >
                    Clients
                  </Nav.Link>
                  <NavDropdown title="Skills" className="hide-medium">
                    <NavDropdown.Item
                      as={NavLink}
                      to={'/' + APP_CONFIG.skills.dataScience}
                      style={{ color: 'gray' }}
                    >
                      <img
                        key="menu-ml-image"
                        className="menu-logo"
                        src="/assets/images/data-science-icon.png"
                        alt="ML logo"
                      />
                      Data Science
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to={'/' + APP_CONFIG.skills.fullStack}
                      style={{ color: 'gray' }}
                    >
                      <img
                        key="menu-ml-image"
                        className="menu-logo"
                        src="/assets/images/pancakes.png"
                        alt="ML logo"
                      />
                      Full Stack
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to={'/' + APP_CONFIG.skills.cloud}
                      style={{ color: 'gray' }}
                    >
                      <img
                        key="menu-cloud-image"
                        className="menu-logo"
                        src="/assets/images/aws-logo.png"
                        alt="Cloud logo"
                      />
                      Cloud
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to={'/' + APP_CONFIG.skills.openEdx}
                      style={{ color: 'gray' }}
                    >
                      <img
                        key="menu-edx-image"
                        className="menu-logo"
                        src="/assets/images/edx-logo.png"
                        alt="Open edX logo"
                      />
                      Open edX
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to={'/' + APP_CONFIG.skills.react}
                      style={{ color: 'gray' }}
                    >
                      <img
                        key="menu-react-image"
                        className="menu-logo"
                        src="/assets/images/react-logo-300x261.png"
                        alt="ReactJS logo"
                      />
                      ReactJS
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={NavLink} to="/contact" onClick={this.toggleNavItem}>
                    Contact
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </nav>
      </header>
    )
  }
}
