// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import ClientProfile from "./../dashboards/client.profile.jsx"; 
import DriverProfile from "./../dashboards/driver.profile.jsx";  
import StoreProfile from "./../dashboards/store.profile.jsx"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";

import './profile.scss';
 

class Profile extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeComponent.call(this, utils); 
  }
  
  render() { 
    console.log("Rendering profile view");

    if(this.state.user && this.state.user.accountType == "driver") {
      return (
      <React.Fragment>
        <Sidebar/>
        <DriverProfile/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <React.Fragment>
          <Sidebar/>
          <ClientProfile/>
        </React.Fragment>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
        <React.Fragment>
          <Sidebar/>
          <StoreProfile/>
        </React.Fragment>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Profile);