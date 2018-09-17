// Node.JS
import React from "react";   
import utils from "./../assets/utils";
import ClientDash from "./clientDashboard.jsx";
import DriverDash from "./driverDashboard.jsx";
import {withRouter} from "react-router-dom";
 

class Dash extends React.Component {

  constructor(props) {
    super(props);    
    this.state = { 
      user: utils.decodeToken(localStorage.getItem("token"))
    }; 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (<DriverDash/>);
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (<ClientDash/>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Dash);