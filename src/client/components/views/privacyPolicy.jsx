// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import PrivacyPolicyDash from "./../dashboards/privacyPolicy.jsx";  
import {withRouter} from "react-router-dom";

import './privacyPolicy.scss';
 

class PrivacyPolicy extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    return (<PrivacyPolicyDash/>); 
  }
}; 


export default withRouter(PrivacyPolicy);