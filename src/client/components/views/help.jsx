// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import HelpDash from "./../dashboards/help.jsx"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";

import withAuth from "./../higherOrder/withAuth";
import './help.scss';
 

class Help extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
      <React.Fragment>
        <Sidebar/>
        <HelpDash/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <React.Fragment>
          <Sidebar/>
          <HelpDash/>
        </React.Fragment>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
        <React.Fragment>
          <Sidebar/>
          <HelpDash/>
        </React.Fragment>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(withAuth(Help));