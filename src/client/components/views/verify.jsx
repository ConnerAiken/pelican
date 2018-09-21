// Node.JS
import React from "react";   
import utils from "../../assets/utils";
import VerifyDash from "../dashboards/verify"; 
import Sidebar from "../dashboards/sidebar";
import {withRouter} from "react-router-dom";
import withAuth from "./../higherOrder/withAuth";

import './verify.scss';
 

class Verify extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (<VerifyDash/>);
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (<VerifyDash/>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (<VerifyDash/>);
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(withAuth(Verify));