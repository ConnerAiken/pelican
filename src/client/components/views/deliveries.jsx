// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import DeliveriesDash from "./../dashboards/deliveries.jsx"; 
import Sidebar from "../dashboards/sidebar";
import {withRouter} from "react-router-dom";
import withAuth from "./../higherOrder/withAuth";
import {Container, Row, Col } from "reactstrap";
import SidebarBtn from "./../widgets/sidebarBtn.jsx";

import './deliveries.scss';
 

class Deliveries extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
        <Container fluid={true} style={{padding: 0}} className="full-height">
          <Row noGutters={true} className="full-height">  
          {this.props.sidebar.collapsed ? <SidebarBtn/> : <Col  
                 xs={10} 
                 sm={4} 
                 md={2} 
                 lg={2} 
                 xl={2}>
              <Sidebar/>
            </Col>}
            <Col xs={this.props.sidebar.collapsed ? 12 : 2} 
                 sm={this.props.sidebar.collapsed ? 12 : 8} 
                 md={this.props.sidebar.collapsed ? 12 : 10} 
                 lg={this.props.sidebar.collapsed ? 12 : 10} 
                 xl={this.props.sidebar.collapsed ? 12 : 10}>
                <DeliveriesDash/>
            </Col>
          </Row> 
        </Container> 
      );
    }else if(this.state.user && this.state.user.accountType == "client") {
      this.props.history.push('/cart');
    }else if(this.state.user && this.state.user.accountType == "store") {
      this.props.history.push('/orders');
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(withAuth(Deliveries));