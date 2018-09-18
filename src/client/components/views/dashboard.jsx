// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import ClientDash from "./../dashboards/client.map.jsx";
import DriverDash from "./../dashboards/driver.map.jsx";
import Sidebar from "./../dashboards/sidebar";
import {withRouter} from "react-router-dom";

import './dashboard.scss';
 

class Dash extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeComponent.call(this, utils); 
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
        <React.Fragment>
          <Sidebar/>
          <ClientDash/>
        </React.Fragment>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
        <React.Fragment>
          <Sidebar/>
          <ClientDash/>
        </React.Fragment>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Dash);