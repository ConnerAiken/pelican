// Node.JS
import React from "react";   
import utils from "../../assets/utils"; 
import DriverStatusDash from "../dashboards/driverStatus";
import Sidebar from "../dashboards/sidebar";
import SidebarBtn from "../widgets/sidebarBtn";
import {withRouter} from "react-router-dom";
import withAuth from "../higherOrder/withAuth";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";


import './driverStatus.scss';

const mapStateToProps = state => { 
  return { driver: state.driver, sidebar: state.sidebar };
};

class DriverStatus extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() {   
    if(this.state.user && this.state.user.accountType == "driver") {
      return (
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
               xl={this.props.sidebar.collapsed ? 12 : 10}
               id="driverStatusDash">
            <DriverStatusDash/>
          </Col>
        </Row> 
      );
    }else {
      this.props.history.replace('/logout');
    } 
  }
}; 


DriverStatus = connect(mapStateToProps)(withRouter(withAuth(DriverStatus)));

export default DriverStatus; 