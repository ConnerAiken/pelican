// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import ShareDash from "./../dashboards/share.jsx"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";

import './share.scss';
 

class Share extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
      <React.Fragment>
        <Sidebar/>
        <ShareDash/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <React.Fragment>
          <Sidebar/>
          <ShareDash/>
        </React.Fragment>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
        <React.Fragment>
          <Sidebar/>
          <ShareDash/>
        </React.Fragment>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Share);