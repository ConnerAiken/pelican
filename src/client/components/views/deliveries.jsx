// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import DeliveriesDash from "./../dashboards/deliveries.jsx"; 
import Sidebar from "../dashboards/sidebar";
import {withRouter} from "react-router-dom";

import './deliveries.scss';
 

class Deliveries extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
      <React.Fragment>
        <Sidebar/>
        <DeliveriesDash/>
      </React.Fragment> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      this.props.history.push('/cart');
    }else if(this.state.user && this.state.user.accountType == "store") {
      this.props.history.push('/orders');
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(Deliveries);