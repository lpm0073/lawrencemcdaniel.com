/*
 The app's layout, and the notices about the service worker (src/serviceWorkerRegistration.ts):
 the site now works offline, a new release is installing, or it has taken over.
 */
import React, { Component, useEffect } from 'react'
import { BrowserRouter, StaticRouter, useLocation, useNavigate } from 'react-router-dom'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { APP_CONFIG } from './shared/constants'

// the components that draw the app
import SiteRoutes from './components/Routes'
import Head from './components/Head'
import { Header } from './components/header/Component'
import Footer from './components/footer/Component'
import { secureExistingCookies } from './components/cookieSetter'

// UI stuff for service worker notifications
import AppUpdateAlert from './components/appUpdate/Component'

import './App.css'

const OFFLINE_READY_TITLE = 'Ready offline'
const OFFLINE_READY_MESSAGE =
  'This site is saved on your device, so it works without an internet connection.'
const UPDATE_AVAILABLE_TITLE = 'Update available'
const UPDATE_AVAILABLE_MESSAGE =
  'A new version of this site has downloaded. Installing it now.'
const UPDATED_TITLE = 'Site updated'
const UPDATED_MESSAGE = 'The new version is installed. Reload the page to see it.'

/** Which service worker notice is showing, if any. */
type SWNotice = 'offline-ready' | 'updating' | 'updated' | null

interface AppProps {
  /** "online" or "offline", from react-detect-offline in main.tsx. */
  cls: 'online' | 'offline'
  /**
   * The url to render, when the app is rendered to html at build time
   * (src/prerender/render.tsx). The browser's own url otherwise.
   */
  location?: string
}

interface AppState {
  isSet: boolean
  customClass: string
  swNotice: SWNotice
}

class App extends Component<AppProps, AppState> {
  /** Lets the waiting service worker take over; set while the update notice shows. */
  activateUpdate?: () => void

  constructor(props: AppProps) {
    super(props)

    this.state = {
      isSet: false, // True once componentDidMount runs
      customClass: props.cls, // Expects "online" or "offline"
      swNotice: null,
    }

    this.onOfflineReady = this.onOfflineReady.bind(this)
    this.onUpdateReady = this.onUpdateReady.bind(this)
    this.onUpdated = this.onUpdated.bind(this)
    this.onUpdateNoticeClosed = this.onUpdateNoticeClosed.bind(this)
    this.closeNotice = this.closeNotice.bind(this)
  }

  // ---------------------------------------------------------------------------
  // -------- Workbox Service Worker event handlers and state management -------
  // ---------------------------------------------------------------------------

  /** The first install finished: the site works offline from now on. */
  onOfflineReady() {
    if (APP_CONFIG.debug) console.log('App.onOfflineReady()')
    this.setState({ swNotice: 'offline-ready' })
  }

  /** A new release is waiting. Tell the visitor, then let it take over. */
  onUpdateReady(activate: () => void) {
    if (APP_CONFIG.debug) console.log('App.onUpdateReady()')
    this.activateUpdate = activate
    this.setState({ swNotice: 'updating' })
  }

  /** The new release controls the page; a reload shows it. */
  onUpdated() {
    if (APP_CONFIG.debug) console.log('App.onUpdated()')
    this.setState({ swNotice: 'updated' })
  }

  /** The update notice closed, by itself or by the visitor: install the update. */
  onUpdateNoticeClosed() {
    const activate = this.activateUpdate
    this.activateUpdate = undefined
    this.closeNotice()
    if (activate) activate()
  }

  closeNotice() {
    this.setState({ swNotice: null })
  }

  // ----------------------------------------------------
  // ------------ React Component life cycle ------------
  // ----------------------------------------------------
  componentDidMount() {
    if (APP_CONFIG.debug) console.log('App.componentDidMount()')

    this.setState({
      isSet: true,
    })

    // Ensure all cookies have the SameSite and Secure attributes
    secureExistingCookies()

    if (import.meta.env.PROD) {
      serviceWorkerRegistration.register({
        onOfflineReady: this.onOfflineReady,
        onUpdateReady: this.onUpdateReady,
        onUpdated: this.onUpdated,
      })
    }
  }

  render() {
    // to fix Google Search Console warnings about
    // Alternate page with proper canonical tag
    const TrailingSlashRedirect = () => {
      const location = useLocation()
      const navigate = useNavigate()

      useEffect(() => {
        const { pathname, search, hash } = location

        // Remove trailing slash if it exists (except for root)
        if (pathname !== '/' && pathname.endsWith('/')) {
          const newPath = pathname.slice(0, -1)
          navigate(`${newPath}${search}${hash}`, { replace: true })
        }
      }, [location, navigate])

      return null
    }

    if (APP_CONFIG.debug) console.log('App.render()')

    // service worker notices. Each has its own key, so that a new one starts
    // its own timer.
    function AppUpdateAlerts(props: { parent: App }) {
      const parent = props.parent
      if (!parent.state.isSet) return null

      switch (parent.state.swNotice) {
        case 'offline-ready':
          return (
            <AppUpdateAlert
              key="offline-ready"
              variant="updated"
              title={OFFLINE_READY_TITLE}
              msg={OFFLINE_READY_MESSAGE}
              callback={parent.closeNotice}
            />
          )
        case 'updating':
          return (
            <AppUpdateAlert
              key="updating"
              variant="updating"
              title={UPDATE_AVAILABLE_TITLE}
              msg={UPDATE_AVAILABLE_MESSAGE}
              callback={parent.onUpdateNoticeClosed}
            />
          )
        case 'updated':
          return (
            <AppUpdateAlert
              key="updated"
              variant="updated"
              title={UPDATED_TITLE}
              msg={UPDATED_MESSAGE}
              seconds={0}
              action={{ label: 'Reload', onClick: () => window.location.reload() }}
              callback={parent.closeNotice}
            />
          )
        default:
          return null
      }
    }

    const layout = (
      <React.Fragment>
        <TrailingSlashRedirect />
        <div className={'container-fluid p-0 ' + this.state.customClass}>
          <Header />
          <AppUpdateAlerts parent={this} />
          <SiteRoutes />
          <Footer />
        </div>
      </React.Fragment>
    )

    // render the app!
    return (
      <React.Fragment>
        <Head />
        {this.props.location === undefined ? (
          <BrowserRouter>{layout}</BrowserRouter>
        ) : (
          <StaticRouter location={this.props.location}>{layout}</StaticRouter>
        )}
      </React.Fragment>
    )
  }
}

export default App
