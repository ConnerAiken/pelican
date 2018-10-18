// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import ShareDash from "./../dashboards/share.jsx"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";
import withAuth from "./../higherOrder/withAuth";
import {Container, Row, Col } from "reactstrap";
import SidebarBtn from "./../widgets/sidebarBtn.jsx";

import './share.scss';
 

class Share extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
        <Container fluid={true} style={{padding: 0}}  className="full-height">
          <Row noGutters={true}  className="full-height">  
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
                 <ShareDash/>
            </Col>
          </Row> 
        </Container>
        );  
    }else if(this.state.user && this.state.user.accountType == "client") {
      return (
        <Container fluid={true} style={{padding: 0}}  className="full-height">
          <Row noGutters={true}  className="full-height">  
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
                 <ShareDash/>
            </Col>
          </Row> 
        </Container>
        );  
    }else if(this.state.user && this.state.user.accountType == "store") {
      return (
        <Container fluid={true} style={{padding: 0}} className="full-height">
          <Row noGutters={true}  className="full-height">  
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
                 <ShareDash/>
            </Col>
          </Row> 
        </Container>
        );  
    }

    return <p>Please Login</p>;
  }
}; 


export default withRouter(withAuth(Share));