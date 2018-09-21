// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import DriverPayment from "./../dashboards/driver.payment.jsx";
import ClientPayment from "./../dashboards/client.payment.jsx";
import StorePayment from "./../dashboards/store.payment.jsx"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";

import './payment.scss';
 

class Payment extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
      <React.Fragment>
        <Sidebar/>
        <DriverPayment/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <React.Fragment>
          <Sidebar/>
          <ClientPayment/>
        </React.Fragment>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
        <React.Fragment>
          <Sidebar/>
          <StorePayment/>
        </React.Fragment>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Payment);