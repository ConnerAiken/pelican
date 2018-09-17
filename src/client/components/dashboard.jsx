// Node.JS
import React from "react";   
import utils from "./../assets/utils";
import ClientDash from "./clientDashboard.jsx";
import DriverDash from "./driverDashboard.jsx";
import Sidebar from "./sidebar.jsx";
import {withRouter} from "react-router-dom";

import './dashboard.scss';
 

class Dash extends React.Component {

  constructor(props) {
    super(props);    
    this.state = { 
      user: utils.decodeToken(localStorage.getItem("token"))
    }; 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
      <React.Fragment>
        <Sidebar/>
        <DriverDash/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <React.Fragment id="wrapper">
          <Sidebar/>
          <ClientDash/>
        </React.Fragment>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Dash);