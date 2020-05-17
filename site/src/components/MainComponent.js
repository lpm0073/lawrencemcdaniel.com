import React, { Component } from 'react';

// Shared
import Header from './header/Component';
import Footer from './footer/Component';
import Routes from './Routes';


class Main extends Component {

  render() {
    return ( 
      <div className="container">
        <Header />
        <Routes />
        <Footer />
      </div>
    )
  }
}

export default Main;
