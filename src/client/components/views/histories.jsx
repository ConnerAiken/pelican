// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import DriverHistories from "../dashboards/driver.histories"; 
import ClientHistories from "../dashboards/client.histories"; 
import StoreHistories from "../dashboards/store.histories"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";

import './histories.scss';
 

class Histories extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
      <React.Fragment>
        <Sidebar/>
        <DriverHistories/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
      <React.Fragment>
        <Sidebar/>
        <ClientHistories/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
      <React.Fragment>
        <Sidebar/>
        <StoreHistories/>
      </React.Fragment> 
      );
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Histories);