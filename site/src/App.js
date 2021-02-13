import React, { Component } from 'react';
import Main from './components/Main';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import {Helmet} from "react-helmet";

const store = ConfigureStore();

class App extends Component {

  render() {
    return ( 
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Helmet>
              <title>Lawrence McDaniel - Full Stack Developer</title>
              <meta name="author" content="Lawrence McDaniel" />
              <link rel="canonical" href="https://lawrencemcdaniel.com/" />
              <meta name="description" content="Full Stack Web Developer and Open edX® Consultant specializing in Python, Django, ReactJS, Redux, AngularJS, and AWS." />
              <meta name="keywords"  content="Lawrence McDaniel, open edx consultant, open edx service provider, Open edX, web developer, freelancer, full stack developer, full stack web developer, web developer, Python, Django, React, ReactJS, Redux, Wordpress, AWS, Boto3, Angular, AngularJS" />

              <link rel="apple-touch-icon" href="https://lawrencemcdaniel.com/logo192.png" />
              <link rel="manifest" href="https://lawrencemcdaniel.com/manifest.json" />

              <link rel="shortcut icon" href="/favicon.jpg" type="image/vnd.microsoft.icon"/>    
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
              <meta name="theme-color" content="#f1f1f1" />

              <meta property="og:description" content="Freelance full stack web developer and Open edX® Consultant specializing in Python, Django, ReactJS, Redux, AngularJS, Wordpress, and AWS." />
              <meta property="og:title" content="Lawrence McDaniel - Full Stack Developer" />
              <meta property="og:author" content="Lawrence McDaniel" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://lawrencemcdaniel.com" />
              <meta property="og:site_name" content="Lawrence McDaniel - Full Stack Developer" />
              <meta property="og:image" content="https://cdn.lawrencemcdaniel.com/social-1200x630.jpg" />
              <meta property="og:image:alt" content="Lawrence McDaniel Banner" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@LorenzoDPolanco" />
              <meta name="twitter:domain" content="lawrencemcdaniel.com" />
              <meta name="twitter:title" content="Lawrence McDaniel - Full Stack Developer" />
              <meta name="twitter:image" content="https://cdn.lawrencemcdaniel.com/social-1200x675.jpg" />
              <meta name="twitter:description" content="Lawrence McDaniel - Full Stack Developer" />
              <meta itemprop="image" content="https://cdn.lawrencemcdaniel.com/social-1200x630.jpg" />
              <script src="https://lawrencemcdaniel.com/assets/seo/gsd-person-lawrencemcdaniel.json" type="application/ld+json" />
            </Helmet>
            <Main  />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
