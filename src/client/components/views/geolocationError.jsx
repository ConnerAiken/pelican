// Node.JS
import React from "react";   
import utils from "../../assets/utils";
import GeolocationErrorDash from "../dashboards/geolocationError";  
import {withRouter} from "react-router-dom";
import withAuth from "../higherOrder/withAuth";

import './geolocationError.scss';
 

class GeolocationError extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (<GeolocationErrorDash/>);
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (<GeolocationErrorDash/>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (<GeolocationErrorDash/>);
    } 

  }
}; 


export default withRouter(withAuth(GeolocationError));