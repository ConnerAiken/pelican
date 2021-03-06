// Node.JS
import React from "react";   
import utils from "./../../assets/utils";
import HelpDash from "./../dashboards/help.jsx"; 
import Sidebar from "./../dashboards/sidebar.jsx";
import {withRouter} from "react-router-dom";
import {Container, Row, Col } from "reactstrap";
import SidebarBtn from "./../widgets/sidebarBtn.jsx";

import withAuth from "./../higherOrder/withAuth";
import './help.scss';
 

class Help extends React.Component {

  constructor(props) {
    super(props);    
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() {  
    return (
      <Container fluid={true} style={{padding: 0}} className="full-height">
        <Row noGutters={true} className="full-height">  
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
               <HelpDash/>
          </Col>
        </Row> 
      </Container>
      );
  }
}; 


export default withRouter(withAuth(Help));