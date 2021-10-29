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

    this.callback = props.callback.bind(this);

  }

  componentDidMount() {
    this.setState({
      visible:true
    }, ()=>{window.setTimeout(()=>{
        this.setState({
          visible:false
        });
        this.callback();
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
