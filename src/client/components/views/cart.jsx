// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import CartDash from "./../dashboards/cart.jsx"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";
import withAuth from "./../higherOrder/withAuth";

import './cart.scss';
 

class Cart extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      this.props.history.push('/deliveries');
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <React.Fragment>
          <Sidebar/>
          <CartDash/>
        </React.Fragment>);
    }else if(this.state.user && this.state.user.accountType == "store") {
      this.props.history.push('/orders');
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(withAuth(Cart));