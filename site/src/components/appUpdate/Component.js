import React from 'react'; 
import {Alert, Toast, ToastHeader, ToastBody, Button} from 'reactstrap';

import './styles.css';

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
        <Toast isOpen={isOpen} className="position-absolute top-50 start-50 translate-middle border border-light bg-info">
            <ToastHeader className="">An update is available</ToastHeader>
            <ToastBody>
            New content is available and will be used when all tabs for this page
            are closed.
            <hr />
            <div className="col text-center">
              <Button
                  color="primary"
                  onClick={ok_handler}
                >Upgrade Now</Button>
            </div>
            
            </ToastBody>
        </Toast>
      </React.Fragment> 
    );
}

export function _AppUpdateSuccessAlert(props) { 
  console.log("AppUpdateSuccessAlert()");
  const handler = props.handler;
  let isOpen = true;

  setTimeout(() => {
    isOpen = false;
  }, 10);

  return (
    <React.Fragment>
      <Alert isOpen={isOpen} fade={true} className="position-absolute top-50 start-50 translate-middle bg-info">
        App updated successfully.
      </Alert>
    </React.Fragment>
  );
}

class AppUpdateSuccessAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      visible : false
    }
  }

  componentDidMount() {

    this.setState({
      visible:true
    }, ()=>{window.setTimeout(()=>{
        this.setState({visible:false})
      },1500)
    });

  }

  render() { 
    return(
      <React.Fragment>
      <Alert isOpen={this.state.visible} fade={true} className="position-absolute top-50 start-50 translate-middle bg-info">
        App updated successfully.
      </Alert>
    </React.Fragment>
  );
  }
}

export default AppUpdateSuccessAlert;
