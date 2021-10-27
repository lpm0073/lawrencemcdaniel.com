import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './components/Routes';
import { Header } from './components/header/Component';
import Footer from './components/footer/Component';
import Head from './components/Head';

import './App.css';

class App extends Component {

  render() {
    return ( 
      <React.Fragment>
        <Head />
        <BrowserRouter>
          <div className="container-fluid p-0">
            <Header />
            <Routes />
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;
