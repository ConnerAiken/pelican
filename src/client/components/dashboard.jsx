// Node.JS
import React from "react";   
import utils from "./../assets/utils";
import {ClientDash} from "./clientDashboard.jsx";
import {DriverDash} from "./driverDashboard.jsx";
 

export class Dash extends React.Component {

  constructor(props) {
    super(props);    
    this.state = { 
      user: utils.decodeToken(localStorage.getItem("token"))
    }; 
  }
  
  render() {
    console.log(this.state.user.accountType);
    if(this.state.user && this.state.user.accountType == "driver") {
      return (<DriverDash/>);
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (<ClientDash/>);
    }

    return <p>Please Login</p>;
  }
}; 
 