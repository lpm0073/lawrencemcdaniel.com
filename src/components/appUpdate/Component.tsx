import React from 'react'
import { Fade } from 'react-bootstrap'

import './styles.css'

const ALERT_VISIBILITY_SECONDS = 5.0

interface AppUpdateAlertProps {
  /** A few words, in the site's Courier voice, e.g. "Update available". */
  title: string
  msg: string
  /** 'updating' shows a turning icon, 'updated' a check mark. */
  variant: 'updating' | 'updated'
  /** Called once, when the notice closes itself or the visitor closes it. */
  callback?: () => void
  /** A button, e.g. Reload, that runs onClick and closes the notice. */
  action?: { label: string; onClick: () => void }
  /** How long the notice stays open. 0 keeps it open until the visitor closes it. */
  seconds?: number
}

interface AppUpdateAlertState {
  visible: boolean
}

/**
 * A small notice in the corner of the screen that tells the visitor about a new
 * release of the site, or that it now works offline. It closes itself after a few
 * seconds, with a bar that shows the time left, or when the visitor closes it.
 */
class AppUpdateAlert extends React.Component<AppUpdateAlertProps, AppUpdateAlertState> {
  timer?: number
  closed = false

  constructor(props: AppUpdateAlertProps) {
    super(props)
    this.state = { visible: false }
    this.close = this.close.bind(this)
    this.runAction = this.runAction.bind(this)
  }

  seconds(): number {
    return this.props.seconds ?? ALERT_VISIBILITY_SECONDS
  }

  componentDidMount() {
    this.setState({ visible: true })
    if (this.seconds() > 0)
      this.timer = window.setTimeout(this.close, 1000 * this.seconds())
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer)
  }

  close() {
    if (this.closed) return
    this.closed = true
    window.clearTimeout(this.timer)
    this.setState({ visible: false })
    if (this.props.callback) this.props.callback()
  }

  runAction() {
    this.props.action?.onClick()
    this.close()
  }

  render() {
    const { title, msg, variant, action } = this.props
    const seconds = this.seconds()
    const icon = variant === 'updating' ? 'fa-refresh' : 'fa-check'
    const style = {
      '--app-update-seconds': seconds + 's',
    } as React.CSSProperties

    return (
      <div className="app-update-region">
        <Fade in={this.state.visible} unmountOnExit>
          <div
            className={'app-update app-update-' + variant}
            role="status"
            aria-live="polite"
            style={style}
          >
            <span className="app-update-icon" aria-hidden="true">
              <i className={'fa ' + icon}></i>
            </span>
            <div className="app-update-text">
              <p className="app-update-title">{title}</p>
              <p className="app-update-msg">{msg}</p>
              {action && (
                <button
                  type="button"
                  className="app-update-action"
                  onClick={this.runAction}
                >
                  {action.label}
                </button>
              )}
            </div>
            <button
              type="button"
              className="app-update-close"
              aria-label="Close"
              onClick={this.close}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            {seconds > 0 && <span className="app-update-timer" aria-hidden="true"></span>}
          </div>
        </Fade>
      </div>
    )
  }
}

export default AppUpdateAlert
