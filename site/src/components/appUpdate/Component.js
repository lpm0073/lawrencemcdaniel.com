import React from 'react'; 
import {Alert, Toast, ToastHeader, ToastBody, Button} from 'reactstrap';

import './styles.css';

const ALERT_VISIBILITY_SECONDS = 5.0;

class AppUpdateAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      visible : false,
      msg: props.msg
    }
  }

  componentDidMount() {
    console.log("AppUpdateAlert.componentDidMount()")
    this.setState({
      visible:true
    }, ()=>{window.setTimeout(()=>{
        this.setState({
          visible:false
        })
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

export function AppUpdateToast(props) { 
    console.log("AppUpdateToast()");
    const handler = props.handler;
    let isOpen = true;
    
    function toastDismiss() {
      console.log("toastDismiss()")
      isOpen = false;
      return;
    }

    function ok_handler() {
      toastDismiss();
      handler();
    }

    return (
      <React.Fragment>
        <Toast isOpen={isOpen} className="position-absolute bottom-0 end-0 translate-middle border border-light bg-info">
            <ToastHeader className="">An update to this web app is available</ToastHeader>
            <ToastBody>
            New content is available and will be used when all tabs for this page
            are closed.
            <hr />
            <div className="col text-center">
              <Button color="primary" onClick={ok_handler}>Ok</Button>
            </div>
            </ToastBody>
        </Toast>
      </React.Fragment> 
    );
}

export default AppUpdateAlert;
