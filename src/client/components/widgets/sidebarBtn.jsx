import React from "react";  
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { toggleSidebar } from "../../actions";
import { withRouter } from 'react-router-dom';
import utils from "./../../assets/utils";  
import "./sidebarBtn.scss";



const mapStateToProps = state => {
  return {  sidebar: state.sidebar };
};


class SidebarBtn extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
    this.toggleSidebar = this.toggleSidebar.bind(this);
  } 

  toggleSidebar() {  
      this.props.dispatch(toggleSidebar());
  }

  render() { 
    return (<Button id="navBtn" onClick={this.toggleSidebar}><i className="fa fa-bars"></i></Button>);
  }
};


SidebarBtn = connect(mapStateToProps)(withRouter(SidebarBtn));

export default SidebarBtn;