// Node.JS
import React from "react";   
import utils from "../../assets/utils";
import VerifyDash from "../dashboards/verify"; 
import Sidebar from "../dashboards/sidebar";
import {withRouter} from "react-router-dom";
import withAuth from "./../higherOrder/withAuth";
import {Container, Row, Col } from "reactstrap";
import SidebarBtn from "./../widgets/sidebarBtn.jsx";

import './verify.scss';
 

class Verify extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
        <Container fluid={true}>
          <Row noGutters={true}>  
          {this.props.sidebar.collapsed ? <SidebarBtn/> : <Col  
                 xs={6} 
                 sm={4} 
                 md={2} 
                 lg={2} 
                 xl={2}>
              <Sidebar/>
            </Col>}
            <Col xs={this.props.sidebar.collapsed ? 12 : 6} 
                 sm={this.props.sidebar.collapsed ? 12 : 8} 
                 md={this.props.sidebar.collapsed ? 12 : 10} 
                 lg={this.props.sidebar.collapsed ? 12 : 10} 
                 xl={this.props.sidebar.collapsed ? 12 : 10}>
                 <VerifyDash/>
            </Col>
          </Row> 
        </Container>
        ); 
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <Container fluid={true}>
          <Row noGutters={true}>  
          {this.props.sidebar.collapsed ? <SidebarBtn/> : <Col  
                 xs={6} 
                 sm={4} 
                 md={2} 
                 lg={2} 
                 xl={2}>
              <Sidebar/>
            </Col>}
            <Col xs={this.props.sidebar.collapsed ? 12 : 6} 
                 sm={this.props.sidebar.collapsed ? 12 : 8} 
                 md={this.props.sidebar.collapsed ? 12 : 10} 
                 lg={this.props.sidebar.collapsed ? 12 : 10} 
                 xl={this.props.sidebar.collapsed ? 12 : 10}>
                 <VerifyDash/>
            </Col>
          </Row> 
        </Container>
        ); 
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
        <Container fluid={true}>
          <Row noGutters={true}>  
          {this.props.sidebar.collapsed ? <SidebarBtn/> : <Col  
                 xs={6} 
                 sm={4} 
                 md={2} 
                 lg={2} 
                 xl={2}>
              <Sidebar/>
            </Col>}
            <Col xs={this.props.sidebar.collapsed ? 12 : 6} 
                 sm={this.props.sidebar.collapsed ? 12 : 8} 
                 md={this.props.sidebar.collapsed ? 12 : 10} 
                 lg={this.props.sidebar.collapsed ? 12 : 10} 
                 xl={this.props.sidebar.collapsed ? 12 : 10}>
                 <VerifyDash/>
            </Col>
          </Row> 
        </Container>
        ); 
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(withAuth(Verify));