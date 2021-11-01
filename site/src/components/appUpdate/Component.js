import React from 'react'; 
import { Alert } from 'reactstrap';

import './styles.css';

const ALERT_VISIBILITY_SECONDS = 5.0;

class AppUpdateAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      visible : false,
      msg: props.msg
    }

    // Bind the callback so we can execute
    // it from anywhere inside this class, and
    // so that garbage collection knows to
    // leave it alone while we're running.
    if (props.callback) this.callback = props.callback.bind(this);

  }

  // make ourself `visible` so that the Bootstrap alert
  // renders to the screen. Also set a Timeout to automatically 
  // fire after X seconds to automatically disappear the
  // the alert as well as to execute the callback function.
  componentDidMount() {
    this.setState({
      visible:true
    }, ()=>{window.setTimeout(()=>{
        this.setState({
          visible:false
        });
        if (this.callback) this.callback();
      }, 1000 * ALERT_VISIBILITY_SECONDS);
    });

  }

  render() { 
    return(
      <React.Fragment>
        <div className="fixed-top m-0 p-5 text-right">
          <Alert isOpen={this.state.visible} fade={true} className="border border-light alert alert-warning text-center">
            {this.state.msg}
          </Alert>
        </div>
    </React.Fragment>
  );
  }
}


export default AppUpdateAlert;
